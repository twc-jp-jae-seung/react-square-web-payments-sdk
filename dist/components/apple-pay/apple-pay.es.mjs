import * as o from "react";
import { useForm as P } from "../../contexts/form/form.es.mjs";
import { useEventListener as h } from "../../hooks/use-event-listener.es.mjs";
import { ApplePayContainer as b } from "./apple-pay.styles.es.mjs";
function v({ id: y = "rswps-apple-pay", ...f }) {
  const [t, d] = o.useState(() => {
  }), { cardTokenizeResponseReceived: w, createPaymentRequest: a, payments: s } = P(), l = o.useRef(null), m = async (r) => {
    if (r.stopPropagation(), !t) {
      console.warn("Apple Pay button was clicked, but no Apple Pay instance was found.");
      return;
    }
    try {
      const e = await t.tokenize();
      if (e.status === "OK")
        return w(e);
      let n = `Tokenization failed with status: ${e.status}`;
      if (e?.errors)
        throw n += ` and errors: ${JSON.stringify(e?.errors)}`, new Error(n);
      console.warn(n);
    } catch (e) {
      console.error(e);
    }
  };
  return o.useEffect(() => {
    if (!a)
      throw new Error("`createPaymentRequest()` is required when using digital wallets");
    const r = new AbortController(), { signal: e } = r;
    return (async (p) => {
      const c = s?.paymentRequest(a);
      if (!c)
        throw new Error("`paymentRequest` is required when using digital wallets");
      try {
        const i = await s?.applePay(c).then((u) => {
          if (!p?.aborted)
            return d(u), u;
        });
        p.aborted && await i?.destroy();
      } catch (i) {
        console.error("Initializing Apple Pay failed", i);
      }
    })(e), () => {
      r.abort();
    };
  }, [a, s]), h({
    listener: m,
    type: "click",
    element: l,
    options: {
      passive: !0
    }
  }), /* @__PURE__ */ o.createElement(
    b,
    {
      ...f,
      css: {
        display: t ? "block" : "none",
        opacity: t ? 1 : 0.5,
        pointerEvents: t ? "auto" : "none",
        visibility: t ? "visible" : "hidden"
      },
      id: y,
      ref: l
    }
  );
}
export {
  v as default
};
//# sourceMappingURL=apple-pay.es.mjs.map
