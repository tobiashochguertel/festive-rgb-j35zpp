import React from "react";
import { DatePicker } from "@blueprintjs/datetime";
import { H5 } from "@blueprintjs/core";
import { Example } from "./Example";

export const DatetimeExample: React.FC = () => {
  return (
    <Example header="@blueprintjs/datetime">
      <H5>DatePicker</H5>
      <DatePicker className="example-datepicker" timePrecision="minute" />
    </Example>
  );
};
