import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers";
import React from "react";

import HeaderBar from "../src/components/HeaderBar";
import { Tab, TabBar } from "../src/components/TabBar";

export default function runTabBar() {
  storiesOf("TabBar", module)
    .addDecorator(i18nDecorator)
    .add("Tab 1 of 3 open", () => (
      <TabBar isSelected={0} handleTabClick={action("handleTabClick()")}>
        <Tab title="Settings">
          <HeaderBar title="Map Settings" />
        </Tab>
        <Tab title="Account">
          Tab two
        </Tab>
        <Tab title="Help">
          Tab three
        </Tab>
      </TabBar>
    ))
    .add("Tab 2 of 3 open", () => (
      <TabBar isSelected={1} handleTabClick={action("handleTabClick()")}>
        <Tab title="Settings">
          Tab one
        </Tab>
        <Tab title="Account">
          <HeaderBar title="Account Settings" />
        </Tab>
        <Tab title="Help">
          Tab three
        </Tab>
      </TabBar>
    ))
    .add("Tab 3 of 3 open", () => (
      <TabBar isSelected={2} handleTabClick={action("handleTabClick()")}>
        <Tab title="Settings">
          Tab one
        </Tab>
        <Tab title="Account">
          Tab two
        </Tab>
        <Tab title="Help">
          <HeaderBar title="Support" />
        </Tab>
      </TabBar>
    ));
}