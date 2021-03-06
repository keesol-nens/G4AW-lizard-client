import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import SearchResultCardItem from "../src/components/SearchResultCardItem";

const vnLongTitle = "Hàng Tiệc Cưới Hàng Tiệc Cưới";

function getComponent(kvargs = {}) {
  const DEFAULTS = {
    title: "Bông trang",
    subtitle: "BTR-Q-31673",
    indicatorColor: "#aaaaaa",
    ripple: true
  };
  const getVal = key =>
    kvargs[key] !== undefined ? kvargs[key] : DEFAULTS[key];
  return (
    <SearchResultCardItem
      handleClick={action("Clicked!")}
      title={getVal("title")}
      subtitle={getVal("subtitle")}
      indicatorColor={getVal("indicatorColor")}
      ripple={getVal("ripple")}
    />
  );
}

export default function runSearchResultCardItem() {
  storiesOf("SearchResultCardItem", module)
    .addDecorator(i18nDecorator)
    .add("default result", () => getComponent())
    .add("long title", () => getComponent({ title: vnLongTitle }))
    .add("colored indicator", () => getComponent({ indicatorColor: "#ff0000" }))
    .add("long subtitle", () => getComponent({ subtitle: vnLongTitle }))
    .add("no ripple", () => getComponent({ ripple: false }));
}
