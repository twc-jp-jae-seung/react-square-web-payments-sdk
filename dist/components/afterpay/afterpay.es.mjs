import * as e from "react";
import E, { useAfterpay as m } from "../../contexts/afterpay/afterpay.es.mjs";
import { AfterpayContext as x, default as z } from "../../contexts/afterpay/afterpay.es.mjs";
import { useEventListener as g } from "../../hooks/use-event-listener.es.mjs";
import { useForm as d } from "../../contexts/form/form.es.mjs";
import { ButtonLoader as k } from "./afterpay.styles.es.mjs";
function A({
  Button: t,
  buttonColor: n = "black",
  buttonType: o = "buy_now_with_afterpay",
  finalCtaButtonType: c = "buy_now",
  id: r = "rswps-afterpay-button",
  ...f
}) {
  const i = e.useRef(null), a = m(), { cardTokenizeResponseReceived: u } = d(), l = e.useMemo(
    () => ({
      buttonColor: n,
      buttonType: o,
      finalCtaButtonType: c,
      useCustomButton: Boolean(t)
    }),
    [t, n, o, c]
  ), w = async (p) => {
    if (p.stopPropagation(), !a) {
      console.warn("Afterpay/Clearpay button was clicked, but no Afterpay/Clearpay instance was found.");
      return;
    }
    try {
      const s = await a.tokenize();
      if (s.status === "OK")
        return u(s);
      let y = `Tokenization failed with status: ${s?.status}`;
      if (s?.errors)
        throw y += ` and errors: ${JSON.stringify(s?.errors)}`, new Error(y);
      console.warn(y);
    } catch (s) {
      console.error(s);
    }
  };
  return e.useEffect(() => (a && a?.attach(`#${r}`, l), () => {
    a && a?.destroy();
  }), [a]), g({
    listener: w,
    type: "click",
    element: i,
    options: {
      passive: !0
    }
  }), t ? /* @__PURE__ */ e.createElement(t, { ...f, id: r, ref: i }) : /* @__PURE__ */ e.createElement("div", { ...f, id: r, ref: i }, a ? null : /* @__PURE__ */ e.createElement(k, null));
}
function C({
  badgeTheme: t = "black-on-mint",
  component: n,
  id: o = "rswps-afterpay-message",
  modalLinkStyle: c = "circled-info-icon",
  modalTheme: r = "mint",
  size: f = "md",
  ...i
}) {
  const a = e.useRef(null), u = m(), l = e.useMemo(
    () => ({
      badgeTheme: t,
      modalLinkStyle: c,
      modalTheme: r,
      size: f
    }),
    [t, c, r, f]
  );
  e.useEffect(() => {
    const s = async () => {
      await u?.attachMessaging(`#${o}`, l);
    };
    u && !n?.Message && s();
  }, [u, n?.Message, l]), g({
    listener: async (s) => {
      s.stopPropagation(), u?.displayInformationModal({ modalTheme: r });
    },
    type: "click",
    element: a,
    options: {
      passive: !0
    }
  });
  const p = n?.Message;
  return p ? /* @__PURE__ */ e.createElement(p, { ...i, id: o, ref: a }) : /* @__PURE__ */ e.createElement("div", { ...i, id: o });
}
function P({ includeBranding: t, id: n = "rswps-afterpay-widget", ...o }) {
  const c = e.useRef(null), r = m();
  return e.useEffect(() => {
    r && (async () => {
      await r?.attachCheckoutWidget(`#${n}`, {
        includeBranding: t
      });
    })();
  }, [r, t]), /* @__PURE__ */ e.createElement("div", { ...o, id: n, ref: c });
}
function $(t) {
  return /* @__PURE__ */ e.createElement(E, null, /* @__PURE__ */ e.createElement(A, { ...t }));
}
export {
  A as AfterpayButton,
  x as AfterpayContext,
  C as AfterpayMessage,
  z as AfterpayProvider,
  P as AfterpayWidget,
  $ as default
};
//# sourceMappingURL=afterpay.es.mjs.map
