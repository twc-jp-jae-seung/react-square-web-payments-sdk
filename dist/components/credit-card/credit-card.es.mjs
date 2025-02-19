import * as r from "react";
import { useForm as P } from "../../contexts/form/form.es.mjs";
import { useEventListener as L } from "../../hooks/use-event-listener.es.mjs";
import { LoadingCard as $, PayButton as j } from "./credit-card.styles.es.mjs";
function x({
  buttonProps: u,
  callbacks: c,
  children: h,
  focus: s,
  id: d = "rswps-card-container",
  includeInputLabels: l,
  postalCode: f,
  recalculateSize: m,
  render: w,
  style: b,
  ...v
}) {
  const [a, R] = r.useState(() => {
  }), [k, p] = r.useState(!1), y = r.useRef(null), { cardTokenizeResponseReceived: z, payments: E } = P(), O = r.useMemo(() => {
    const e = {
      includeInputLabels: l,
      postalCode: f,
      style: b
    };
    return Object.keys(e).reduce((t, n) => (e[n] !== void 0 && (t[n] = e[n]), t), {});
  }, [l, f, b]), S = async (e) => {
    if (e.stopPropagation(), !u?.isLoading) {
      if (!a) {
        console.warn("Credit Card button was clicked, but no Credit Card instance was found.");
        return;
      }
      p(!0);
      try {
        const t = await a.tokenize();
        if (t.status === "OK")
          return await z(t);
        let n = `Tokenization failed with status: ${t.status}`;
        if (t?.errors)
          throw n += ` and errors: ${JSON.stringify(t?.errors)}`, new Error(n);
        console.warn(n);
      } catch (t) {
        console.error(t);
      } finally {
        p(!1);
      }
    }
  };
  if (r.useEffect(() => {
    const e = new AbortController(), { signal: t } = e;
    return (async (i) => {
      const o = await E?.card(O).then((C) => i.aborted ? null : (R(C), C));
      await o?.attach(`#${d}`), s && await o?.focus(s), i.aborted && await o?.destroy();
    })(t), () => {
      e.abort();
    };
  }, [E, d]), r.useEffect(() => {
    a && s && a.focus(s);
  }, [a, s]), c)
    for (const e of Object.keys(c))
      a?.addEventListener(
        e,
        c[e]
      );
  m && m(a?.recalculateSize), L({
    listener: S,
    type: "click",
    element: y,
    options: {
      passive: !0
    }
  });
  const g = ({ children: e, isLoading: t, ...n }) => {
    const i = "rswp-card-button", o = t || !a || k;
    return /* @__PURE__ */ r.createElement(
      j,
      {
        ...n,
        "aria-disabled": o,
        css: n?.css,
        disabled: o,
        id: i,
        ref: y,
        type: "button"
      },
      e ?? "Pay"
    );
  };
  return /* @__PURE__ */ r.createElement(r.Fragment, null, /* @__PURE__ */ r.createElement("div", { ...v, "data-testid": "rswps-card-container", id: d, style: { minHeight: 89 } }, !a && /* @__PURE__ */ r.createElement($, null)), typeof w == "function" ? w(g) : /* @__PURE__ */ r.createElement(g, { ...u }, h ?? "Pay"));
}
export {
  x as default
};
//# sourceMappingURL=credit-card.es.mjs.map
