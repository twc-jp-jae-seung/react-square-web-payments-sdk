import * as r from "react";
import { useForm as z } from "../../contexts/form/form.es.mjs";
import { useEventListener as O } from "../../hooks/use-event-listener.es.mjs";
import { LoadingCard as P, PayButton as S } from "./gift-card.styles.es.mjs";
function F({
  buttonProps: y = {
    id: "rswps-gift-card-button"
  },
  callbacks: s,
  children: C,
  focus: f,
  id: i = "rswps-gift-card-container",
  includeInputLabels: u,
  render: d,
  style: l,
  ...h
}) {
  const [a, E] = r.useState(() => {
  }), [v, m] = r.useState(!1), { cardTokenizeResponseReceived: R, payments: w } = z(), b = r.useRef(null), k = r.useMemo(() => {
    const e = {
      includeInputLabels: u,
      style: l
    };
    return Object.keys(e).reduce((t, n) => (e[n] !== void 0 && (t[n] = e[n]), t), {});
  }, [u, l]), G = async (e) => {
    if (e.stopPropagation(), !a) {
      console.warn("Gift Card button was clicked, but no Gift Card instance was found.");
      return;
    }
    m(!0);
    try {
      const t = await a?.tokenize();
      if (t.status === "OK")
        return await R(t);
      let n = `Tokenization failed with status: ${t.status}`;
      if (t?.errors)
        throw n += ` and errors: ${JSON.stringify(t?.errors)}`, new Error(n);
      console.warn(n);
    } catch (t) {
      console.error(t);
    } finally {
      m(!1);
    }
  };
  if (r.useEffect(() => {
    const e = new AbortController(), { signal: t } = e;
    return (async (o) => {
      const c = await w?.giftCard(k).then((p) => o.aborted ? null : (E(p), p));
      await c?.attach(`#${i}`), f && await c?.focus(f), o.aborted && await c?.destroy();
    })(t), () => {
      e.abort();
    };
  }, [w, i]), s)
    for (const e of Object.keys(s))
      a?.addEventListener(
        e,
        s[e]
      );
  O({
    listener: G,
    type: "click",
    element: b,
    options: {
      passive: !0
    }
  });
  const g = ({ isLoading: e, ...t }) => {
    const n = "rswp-gift-card-button", o = e || !a || v;
    return /* @__PURE__ */ r.createElement(
      S,
      {
        ...t,
        "aria-disabled": o,
        css: t?.css,
        disabled: o,
        id: n,
        ref: b,
        type: "button"
      },
      t?.children ?? "Pay with Gift Card"
    );
  };
  return /* @__PURE__ */ r.createElement(r.Fragment, null, /* @__PURE__ */ r.createElement("div", { ...h, "data-testid": "rswps-gift-card-container", id: i, style: { minHeight: 89 } }, !a && /* @__PURE__ */ r.createElement(P, null)), typeof d == "function" ? d(g) : /* @__PURE__ */ r.createElement(g, { ...y }, C ?? "Pay with Gift Card"));
}
export {
  F as default
};
//# sourceMappingURL=gift-card.es.mjs.map
