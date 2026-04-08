import useSWR from "swr";
import {
  type OpenmrsResource,
  openmrsFetch,
  restBaseUrl,
  useConfig,
} from "@openmrs/esm-framework";
import { type CodedProvider, type CodedCondition, type Order } from "../../types";

type Provider = {
  uuid: string;
  display: string;
  person: OpenmrsResource;
};

export const useProviders = () => {
  const url = `${restBaseUrl}/provider?v=custom:(uuid,display,person:(uuid,display))`;
  const { data, error, isLoading } = useSWR<{
    data: { results: Array<Provider> };
  }>(url, openmrsFetch);

  return {
    providers: data?.data.results ?? [],
    isLoadingProviders: isLoading,
    loadingProvidersError: error,
  };
};

export const savePostRadiology = async (payload: object) => {
  const response = await openmrsFetch(`${restBaseUrl}/radiology`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export function useConditionsSearch(conditionToLookup: string) {
  const config = useConfig();
  const conditionConceptClassUuid = config?.conditionConceptClassUuid;
  const conditionsSearchUrl = `${restBaseUrl}/conceptsearch?conceptClasses=${conditionConceptClassUuid}&q=${conditionToLookup}`;
  const { data, error, isLoading } = useSWR<
    { data: { results: Array<CodedCondition> } },
    Error
  >(conditionToLookup ? conditionsSearchUrl : null, openmrsFetch);

  return {
    searchResults: data?.data?.results ?? [],
    error: error,
    isSearching: isLoading,
  };
}

export function useProvidersSearch(providerToLookup: string) {
  const providerSearchUrl = `${restBaseUrl}/provider?v=custom:(uuid,display,person:(uuid,display))&q=${providerToLookup}`;
  const { data, error, isLoading } = useSWR<
    { data: { results: Array<CodedProvider> } },
    Error
  >(providerToLookup ? providerSearchUrl : null, openmrsFetch);

  return {
    providerSearchResults: data?.data?.results ?? [],
    error: error,
    isProviderSearching: isLoading,
  };
}

export async function updateOrder(uuid: string, body: any) {
  const abortController = new AbortController();
  return openmrsFetch(`${restBaseUrl}/order/${uuid}/fulfillerdetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal: abortController.signal,
    body: body,
  });
}

export async function updateOrderResult(
  orderUuid: string,
  encounterUuid: string,
  obsPayload: any,
  body: any,
  abortController: AbortController,
) {
  const saveEncounter = await openmrsFetch(`${restBaseUrl}/encounter/${encounterUuid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: abortController.signal,
    body: obsPayload,
  });

  if (saveEncounter.ok) {
    const fulfillOrder = await openmrsFetch(`${restBaseUrl}/order/${orderUuid}/fulfillerdetails/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      body: body,
    });
    return fulfillOrder;
  }
  throw new Error('Failed to update order');
}

export function useOrderResults(
  order: Order,
  radiologyReportFreetextUuid: any
) {
  const customRepresentation = `v=custom:(uuid,concept:(uuid,display),value,status,order:(uuid,orderNumber))`;
  const url = `${restBaseUrl}/obs?patient=${order.patient.uuid}&encounter=${order.encounter.uuid}&${customRepresentation}`;
  const { data, error, isLoading } = useSWR<
    {
      data: {
        results: Array<{
          uuid: string,
          value: string,
          concept: {
            uuid: string
          },
          order: {
            uuid: string,
            orderNumber: string
          }
        }>
      }
    },
    Error
  >(url, openmrsFetch);
  const results = data?.data?.results;
  const obs = results?.find(v => v?.concept?.uuid === radiologyReportFreetextUuid && v?.order?.uuid === order?.uuid);
  return {
    isLoading,
    data: obs
  }
}
