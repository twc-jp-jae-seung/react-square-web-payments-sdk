import * as e from "react";
import { Container as n, SvgContainer as o, Svg as a, TextContainer as l, Title as c, Text as m } from "./error-screen.styles.es.mjs";
function i({ isDevelopment: r = process.env.NODE_ENV === "development" }, t) {
  if (process.env.NODE_ENV !== "development")
    throw new Error("Please contact your developer to provide the required parameters to use the Web Payments SDK.");
  return /* @__PURE__ */ e.createElement(
    n,
    {
      ref: t
    },
    /* @__PURE__ */ e.createElement(o, null, /* @__PURE__ */ e.createElement(a, { height: 17, viewBox: "0 0 20 17", width: 20 }, /* @__PURE__ */ e.createElement(
      "path",
      {
        d: "M10.874.573l8.3 14.941A1 1 0 0118.3 17H1.7a1 1 0 01-.875-1.486l8.3-14.94a1 1 0 011.75 0zM9 12v2h2v-2H9zm2-1V7H9v4h2z",
        fill: "#d92b2b",
        fillRule: "evenodd"
      }
    ))),
    /* @__PURE__ */ e.createElement(l, null, /* @__PURE__ */ e.createElement(c, null, r ? "No location ID or app ID found. Please check your configuration." : "Error"), /* @__PURE__ */ e.createElement(m, null, r ? /* @__PURE__ */ e.createElement(e.Fragment, null, "Please provide a location ID or app ID to use the", " ", /* @__PURE__ */ e.createElement(
      "a",
      {
        href: "https://developer.squareup.com/docs/web-payments/overview",
        rel: "noopener noreferrer",
        target: "_blank"
      },
      "Web Payments SDK"
    ), " ", "to take payments on a web client.") : /* @__PURE__ */ e.createElement(e.Fragment, null, "An error occurred has ocurred while loading your Payment Form.")))
  );
}
const u = e.forwardRef(i), s = u;
export {
  s as default
};
//# sourceMappingURL=error-screen.es.mjs.map
