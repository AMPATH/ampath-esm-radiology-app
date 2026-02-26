import { useSession, useConfig, restBaseUrl, openmrsFetch, Order } from "@openmrs/esm-framework";
import dayjs from "dayjs";
import useSWR, { mutate } from 'swr';
import { Config } from "../config-schema";
import { useCallback } from "react";

export function useProcedureOrders(status: string) {
  const { dateRange } = {
    dateRange: [dayjs().startOf('day').toDate(), new Date()]
  };
  const { sessionLocation } = useSession();

  const { procedureOrderTypeUuid } = useConfig<Config>();
  const customRepresentation = `custom:(uuid,orderNumber,patient:(uuid,display,person:(uuid,display,age,birthdate,gender),identifiers:(preferred,uuid,voided)),concept:(uuid,display),action,careSetting:(uuid,display,description,careSettingType,display),previousOrder,dateActivated,scheduledDate,dateStopped,autoExpireDate,encounter:(uuid,display,location:(uuid)),orderer:(uuid,display),orderReason,orderReasonNonCoded,orderType:(uuid,display,name,description,conceptClasses,parent),urgency,instructions,commentToFulfiller,display,fulfillerStatus,fulfillerComment,accessionNumber)`;
  let url = `${restBaseUrl}/order?orderTypes=${procedureOrderTypeUuid}&v=${customRepresentation}`;
  url = `${url}&fulfillerStatus=${status}`;
  url = `${url}&excludeCanceledAndExpired=true&excludeDiscontinueOrders=true`;
  // url = dateRange
  //   ? `${url}&activatedOnOrAfterDate=${dateRange.at(0).toISOString()}&activatedOnOrBeforeDate=${dateRange
  //     .at(1)
  //     .toISOString()}`
  //   : url;

  const { data, error, isLoading, isValidating } = useSWR<{
    data: { results: Array<Order> };
  }>(`${url}`, openmrsFetch);

  let filteredOrders = data?.data?.results?.filter((order) => order.encounter?.location?.uuid === sessionLocation?.uuid);

  return {
    orders: filteredOrders ?? [],
    isLoading,
    isError: error,
    isValidating,
  };
}

export function setFulfillerStatus(orderId: string, status: string, abortController: AbortController) {
  return openmrsFetch(`${restBaseUrl}/order/${orderId}/fulfillerdetails/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: abortController.signal,
    body: { fulfillerStatus: status },
  });
}

export function rejectProcedureOrder(orderId: string, comment: string, abortController: AbortController) {
  return openmrsFetch(`${restBaseUrl}/order/${orderId}/fulfillerdetails/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: abortController.signal,
    body: {
      fulfillerStatus: 'DECLINED',
      fulfillerComment: comment,
    },
  });
}

export function useInvalidateProcedureOrders() {
  const { procedureOrderTypeUuid } = useConfig<Config>();

  return useCallback(() => {
    mutate(
      (key) => typeof key === 'string' && key.startsWith(`${restBaseUrl}/order?orderTypes=${procedureOrderTypeUuid}`),
      undefined,
      { revalidate: true },
    );
  }, [procedureOrderTypeUuid]);
}