import React from "react";
import { Button, H5, Menu, MenuItem } from "@blueprintjs/core";
import { ContextMenu2 } from "@blueprintjs/popover2";
import { Example } from "./Example";

export const Popover2Example: React.FC = () => {
  const menu = (
    <Menu>
      <MenuItem text="hello world" />
    </Menu>
  );

  return (
    <Example header="@blueprintjs/popover2">
      <H5>ContextMenu2</H5>
      <ContextMenu2 content={menu}>
        <Button
          fill={true}
          intent="primary"
          outlined={true}
          text="Right click me"
        />
      </ContextMenu2>
    </Example>
  );
};
