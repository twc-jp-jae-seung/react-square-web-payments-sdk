import * as e from "react";
import { useForm as w } from "../form/form.es.mjs";
const c = e.createContext(null);
function q({ children: t, onShippingAddressChange: o, onShippingOptionChange: s }) {
  const [l, y] = e.useState(null), { createPaymentRequest: a, payments: n } = w();
  if (!a)
    throw new Error("`createPaymentRequest()` is required when using digital wallets");
  return e.useEffect(() => {
    const i = new AbortController(), { signal: d } = i;
    return (async (u) => {
      const r = n?.paymentRequest(a);
      if (!r)
        throw new Error("`paymentRequest` is required when using digital wallets");
      o && r.addEventListener("afterpay_shippingaddresschanged", o), s && r.addEventListener("afterpay_shippingoptionchanged", s);
      const p = await n?.afterpayClearpay(r).then((f) => u.aborted ? null : (y(f), f));
      u.aborted && await p?.destroy();
    })(d), () => {
      i.abort();
    };
  }, [a, n]), /* @__PURE__ */ e.createElement(c.Provider, { value: l }, t);
}
function v() {
  const t = e.useContext(c);
  if (t === void 0)
    throw new Error("`useAfterpay()` must be used within an `<AfterpayProvider>`");
  return t;
}
export {
  c as AfterpayContext,
  q as default,
  v as useAfterpay
};
//# sourceMappingURL=afterpay.es.mjs.map
