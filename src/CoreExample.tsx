import React, { useState } from "react";
import { Button, ControlGroup, Slider, KeyCombo, H5 } from "@blueprintjs/core";
import { Example } from "./Example";

export const CoreExample: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(8);
  return (
    <Example header="@blueprintjs/core">
      <H5>ControlGroup, Button</H5>
      <ControlGroup>
        <Button intent="primary" text="Primary" />
        <Button intent="warning" text="Warning" />
        <Button intent="success" text="Success" />
        <Button intent="danger" text="Danger" />
      </ControlGroup>
      <br />

      <H5>KeyCombo</H5>
      <KeyCombo combo="mod" />
      <br />

      <H5>Slider</H5>
      <Slider min={0} max={11} onChange={setSliderValue} value={sliderValue} />
    </Example>
  );
};
