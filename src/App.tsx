import classNames from "classnames";
import { useCallback, useState } from "react";
import { Classes } from "@blueprintjs/core";
import { Navigation } from "./Navigation";
import { CoreExample } from "./CoreExample";
import { DatetimeExample } from "./DatetimeExample";
import { Popover2Example } from "./Popover2Example";
import { SelectExample } from "./SelectExample";
import { TreeExample } from "./treeExample";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const handleDarkThemeToggle = useCallback(
    () => setDarkTheme(!darkTheme),
    [darkTheme]
  );

  return (
    <div
      className={classNames("app", {
        [Classes.DARK]: darkTheme,
      })}
    >
      <Navigation
        darkTheme={darkTheme}
        onToggleDarkTheme={handleDarkThemeToggle}
      />
      <div className="examples-container">
        <TreeExample />
        {/* <CoreExample />
        <DatetimeExample />
        <Popover2Example />
        <SelectExample /> */}
      </div>
    </div>
  );
}

export default App;
