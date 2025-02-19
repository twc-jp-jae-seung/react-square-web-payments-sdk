import * as r from "react";
import { payments as k } from "../../node_modules/@square/web-sdk/dist/index.es.mjs";
import w from "../../components/error-screen/error-screen.es.mjs";
import { useDynamicCallback as b } from "../../hooks/use-dynamic-callback.es.mjs";
const i = r.createContext({
  cardTokenizeResponseReceived: null,
  createPaymentRequest: null,
  payments: null
});
function T({ applicationId: e, locationId: o, children: u, overrides: l, ...n }) {
  const [a, m] = r.useState(), [f] = r.useState(
    () => n.createPaymentRequest?.()
  );
  r.useEffect(() => {
    const t = new AbortController(), { signal: s } = t;
    async function y(v) {
      await k(e, o, l).then((c) => {
        if (c === null)
          throw new Error("Square Web Payments SDK failed to load");
        if (!v?.aborted)
          return m(c), c;
      });
    }
    return e && o && y(s), () => {
      t.abort();
    };
  }, [e, o]);
  const R = b(async (t) => {
    if (t.errors || !n.createVerificationDetails) {
      await n.cardTokenizeResponseReceived(t);
      return;
    }
    const s = await a?.verifyBuyer(String(t.token), n.createVerificationDetails());
    await n.cardTokenizeResponseReceived(t, s);
  });
  if (!e || !o)
    return /* @__PURE__ */ r.createElement(w, null);
  if (!a)
    return null;
  const d = {
    cardTokenizeResponseReceived: R,
    createPaymentRequest: f,
    payments: a
  };
  return /* @__PURE__ */ r.createElement(i.Provider, { value: d }, u);
}
const x = () => {
  const e = r.useContext(i);
  if (e === void 0)
    throw new Error("useForm must be used within a FormProvider");
  return e;
};
export {
  i as FormContext,
  T as default,
  x as useForm
};
//# sourceMappingURL=form.es.mjs.map
