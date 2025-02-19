import * as r from "react";
import { useForm as g } from "../../contexts/form/form.es.mjs";
function P({
  callbacks: a,
  id: p = "rswps-cash-app-pay",
  redirectURL: c,
  referenceId: u,
  shape: m = "round",
  size: l = "medium",
  values: d = "dark",
  width: f = "static",
  ...q
}) {
  const [A, R] = r.useState(), { createPaymentRequest: n, payments: i } = g(), w = r.useMemo(
    () => ({
      redirectURL: c || window.location.href,
      referenceId: u
    }),
    [c, u]
  ), y = r.useMemo(() => {
    const t = {
      shape: m,
      size: l,
      values: d,
      width: f
    };
    return Object.keys(t).reduce((o, e) => (t[e] !== void 0 && (o[e] = t[e]), o), {});
  }, [m, l, d, f]);
  if (r.useEffect(() => {
    if (!n)
      throw new Error("`createPaymentRequest()` is required when using digital wallets");
    const t = new AbortController(), { signal: o } = t;
    let e;
    return (async (b) => {
      const h = i?.paymentRequest(n);
      if (!h)
        throw new Error("`paymentRequest` is required when using digital wallets");
      try {
        e = await i?.cashAppPay(h, w).then((s) => {
          if (!b?.aborted)
            return R(s), s;
        }), await e?.attach(`#${p}`, y);
      } catch (s) {
        console.error("Initializing Cash App Pay failed", s);
      }
    })(o), () => {
      t.abort(), e?.destroy();
    };
  }, [n, y, w, i]), a)
    for (const t of Object.keys(a))
      A?.addEventListener(
        t.toLowerCase(),
        a[t]
      );
  return /* @__PURE__ */ r.createElement("div", { ...q, id: p });
}
export {
  P as default
};
//# sourceMappingURL=cash-app-pay.es.mjs.map
