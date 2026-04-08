import React from "react";
import { useOrderResults } from "../forms/post-radiology/post-radiology.resource";
import { type Order } from "../types";
import { type Config, useConfig } from "@openmrs/esm-framework";
import { InlineLoading } from "@carbon/react";

interface OrderResultsProps {
    order: Order
}

const OrderResults: React.FC<OrderResultsProps> = ({ order }) => {
    const {
        radiologyReportFreetextUuid
    } = useConfig<Config>();
    const { data, isLoading } = useOrderResults(order, radiologyReportFreetextUuid);

    if (isLoading) {
        return <InlineLoading />;
    }

    return <>
        <p>{data?.value}</p>
    </>
}

export default OrderResults;