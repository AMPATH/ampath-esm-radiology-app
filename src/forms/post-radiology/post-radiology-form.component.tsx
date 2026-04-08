import React, { useCallback, useState } from "react";
import {
  closeWorkspace,
  ExtensionSlot,
  OpenmrsDatePicker,
  ResponsiveWrapper,
  showSnackbar,
  useAbortController,
  useConfig,
  useDebounce,
  useSession,
} from "@openmrs/esm-framework";
import {
  Form,
  Stack,
  ComboBox,
  TextArea,
  Layer,
  FormLabel,
  ButtonSet,
  Button,
  Search,
  InlineLoading,
  Tile,
  Tag,
} from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "./post-radiology-form.scss";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  savePostRadiology,
  updateOrder,
  updateOrderResult,
  useConditionsSearch,
  useProvidersSearch,
} from "./post-radiology.resource";
import dayjs from "dayjs";
import { mutate } from "swr";
import { type CodedCondition, type CodedProvider, type Order } from "../../types";
import { type Config, StringPath } from "../../config-schema";
import { useInvalidateRadiologyOrders } from "../../resources/radiology.resources";

const validationSchema = z.object({
  startDatetime: z.date({ required_error: "Start datetime is required" }),
  endDatetime: z.date({ required_error: "End datetime is required" }),
  radiologyReport: z.string({ required_error: "radiology report is required" })
});

type PostRadiologyFormSchema = z.infer<typeof validationSchema>;

type PostRadiologyFormProps = {
  order: Order;
};

const PostRadiologyForm: React.FC<PostRadiologyFormProps> = ({
  order
}) => {
  const abortController = useAbortController();
  const { sessionLocation } = useSession();
  const { t } = useTranslation();
  const invalidateOrders = useInvalidateRadiologyOrders();

  const [providerSearchTerm, setProviderSearchTerm] = useState("");
  const debouncedProviderSearchTerm = useDebounce(providerSearchTerm);
  const { providerSearchResults, isProviderSearching } = useProvidersSearch(
    debouncedProviderSearchTerm
  );
  const [selectedProvider, setSelectedProvider] = useState<CodedProvider>(null);
  const handleProviderSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setProviderSearchTerm(event.target.value);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const { searchResults, isSearching } =
    useConditionsSearch(debouncedSearchTerm);
  const [selectedCondition, setSelectedCondition] =
    useState<CodedCondition>(null);

  const handleParticipantSearchInputChange = (event) => {
    const value = event.target.value;
    setProviderSearchTerm(value);
    if (!value) {
      setSelectedProvider(null);
      setShowParticipants(false);
    } else {
      setShowParticipants(true);
    }
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (!value) {
      setSelectedCondition(null);
      setShowItems(false);
    } else {
      setShowItems(true);
    }
  };

  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const [showItems, setShowItems] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleParticipantSelect = useCallback((item: CodedProvider) => {
    setSelectedProvider(item);
  }, []);

  const handleSelect = useCallback((item: CodedCondition) => {
    setSelectedCondition(item);
  }, []);

  const {
    radiologyOrderTypeUuid,
    radiologyReportFreetextUuid
  } = useConfig<Config>();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PostRadiologyFormSchema>({
    defaultValues: {},
    resolver: zodResolver(validationSchema),
  });

  const handleProviderChange = useCallback(
    (selectedProvider: CodedProvider) => {
      setSelectedProvider(selectedProvider);
    },
    []
  );

  const onSubmit = async (data: PostRadiologyFormSchema) => {
    if (!data.startDatetime || !data.endDatetime) {
      // Handle the error case when dates are invalid or missing
      showSnackbar({
        title: t("error", "Error"),
        subtitle: t("invalidDates", "Invalid or missing dates"),
        timeoutInMs: 5000,
        isLowContrast: true,
        kind: "error",
      });
      return;
    }

    const payload = {
      // patient: patientUuid,
      // status: "COMPLETED",
      // outcome: data.outcome,
      // location: sessionLocation?.uuid,
      // startDatetime: dayjs(data.startDatetime).format("YYYY-MM-DDTHH:mm:ss"),
      // endDatetime: dayjs(data.endDatetime).format("YYYY-MM-DDTHH:mm:ss"),
      // radiologyReport: data.radiologyReport,
      // encounters: [
      //   {
      //     encounterDatetime: new Date(),
      //     patient: patientUuid,
      //     encounterType: radiologyResultEncounterType,
      //     encounterProviders: participants,
      //     obs: complications,
      //   },
      // ],
    };
    const body = {
      fulfillerComment: "",
      fulfillerStatus: "COMPLETED",
    };
    try {
      // const response = await savePostRadiology(payload);
      // if (
      //   response.status === 201
      // ) {

      // } 
      const obsPayload = {
        obs: [
          {
            value: data.radiologyReport,
            concept: {
              uuid: radiologyReportFreetextUuid,
            },
            status: 'FINAL',
            order: {
              uuid: order.uuid
            }
          }]
      };
      updateOrderResult(order.uuid, order.encounter.uuid, obsPayload, body, abortController).then((v) => {
        // updateOrder(order.uuid, body) &&
        showSnackbar({
          title: t("radiologySaved", "Radiology saved"),
          subtitle: t(
            "radiologySavedSuccessfully",
            "Radiology saved successfully"
          ),
          timeoutInMs: 5000,
          isLowContrast: true,
          kind: "success",
        });
        invalidateOrders();
        closeWorkspace('post-radiology-form-workspace');
      });
    } catch (error) {
      showSnackbar({
        title: t("error", "Error"),
        subtitle: t("errorSavingRadiology", "Error saving radiology"),
        timeoutInMs: 5000,
        isLowContrast: true,
        kind: "error",
      });
    }
  };

  const onError = (error: any) => {
    console.error(error);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={styles.formContainer}
    >
      <Stack gap={4}>
        <Layer>
          <FormLabel className={styles.formLabel}>
            {t("date", "Date")}
          </FormLabel>
          <Controller
            control={control}
            name="startDatetime"
            render={({ field: { onChange, value } }) => (
              <OpenmrsDatePicker
                value={value}
                id="startDatetime"
                labelText={t("startDatetime", "Start Datetime")}
                onChange={onChange}
                isInvalid={!!errors.startDatetime}
                autoFocus
              />
            )}
          />
        </Layer>
        <Layer>
          <Controller
            control={control}
            name="endDatetime"
            render={({ field: { onChange, value } }) => (
              <OpenmrsDatePicker
                value={value}
                id="endDatetime"
                labelText={t("endDatetime", "End Datetime")}
                onChange={onChange}
                isInvalid={!!errors.endDatetime}
              />
            )}
          />
        </Layer>
        <Layer>
          <FormLabel className={styles.formLabel}>
            {t("radiologyReport", "Radiology report")}
          </FormLabel>
          <Controller
            control={control}
            name="radiologyReport"
            render={({ field: { onChange } }) => (
              <TextArea
                id="radiologyReport"
                labelText={t("radiologyReport", "Radiology report")}
                rows={4}
                onChange={onChange}
                placeholder={t(
                  "radiologyReportPlaceholder",
                  "Enter radiology report"
                )}
                invalid={!!errors.radiologyReport}
                invalidText={errors.radiologyReport?.message}
              />
            )}
          />
        </Layer>
        <Layer>
          <ResponsiveWrapper>
            <ExtensionSlot name="patient-chart-attachments-dashboard-slot" state={{ patientUuid: order?.patient?.uuid }} />
          </ResponsiveWrapper>
        </Layer>
      </Stack>
      <ButtonSet className={styles.buttonSetContainer}>
        <Button onClick={() => closeWorkspace('post-radiology-form-workspace')} size="lg" kind="secondary">
          {t("discard", "Discard")}
        </Button>
        <Button type="submit" size="lg" kind="primary">
          {t("saveAndClose", "Save & Close")}
        </Button>
      </ButtonSet>
    </Form>
  );
};

export default PostRadiologyForm;
