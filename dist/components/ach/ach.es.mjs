import * as e from "react";
import { useForm as A } from "../../contexts/form/form.es.mjs";
import { useEventListener as C } from "../../hooks/use-event-listener.es.mjs";
import { PayButton as p, SvgIcon as S } from "./ach.styles.es.mjs";
import { transformPlaidEventName as _ } from "./ach.utils.es.mjs";
function B({
  accountHolderName: h,
  redirectURI: w,
  transactionId: E,
  callbacks: s,
  buttonProps: b,
  children: c,
  svgProps: y
}) {
  const [n, v] = e.useState(() => {
  }), [g, f] = e.useState(!1), { cardTokenizeResponseReceived: R, payments: u } = A(), i = e.useRef(null), x = async (r) => {
    if (r.stopPropagation(), !n) {
      console.warn("ACH button was clicked, but no ACH instance was found.");
      return;
    }
    f(!0);
    try {
      const t = await n.tokenize({
        accountHolderName: h
      });
      if (t.status === "OK")
        return await R(t);
      let a = `Tokenization failed with status: ${t.status}`;
      if (t?.errors)
        throw a += ` and errors: ${JSON.stringify(t?.errors)}`, new Error(a);
      console.warn(a);
    } catch (t) {
      console.error(t);
    } finally {
      f(!1);
    }
  };
  if (e.useEffect(() => {
    const r = new AbortController(), { signal: t } = r;
    return (async (l) => {
      const k = await u?.ach({
        redirectURI: w,
        transactionId: E
      }).then((m) => {
        if (!l?.aborted)
          return v(m), m;
      });
      l.aborted && await k?.destroy();
    })(t), () => {
      r.abort();
    };
  }, [u]), s)
    for (const r of Object.keys(s))
      n?.addEventListener(
        _(r),
        s[r]
      );
  C({
    listener: x,
    type: "click",
    element: i,
    options: {
      passive: !0
    }
  });
  const { isLoading: z, ...d } = b ?? {}, o = z || !n || g;
  return c ? /* @__PURE__ */ e.createElement(p, { ...d, "aria-disabled": o, disabled: o, ref: i, type: "button" }, c) : /* @__PURE__ */ e.createElement(p, { ...d, "aria-disabled": o, disabled: o, ref: i, type: "button" }, /* @__PURE__ */ e.createElement(
    S,
    {
      fill: "none",
      height: "1em",
      viewBox: "0 0 36 24",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      ...y
    },
    /* @__PURE__ */ e.createElement("rect", { fill: "url(#prefix__paint0_linear)", height: 24, rx: 4, width: 36 }),
    /* @__PURE__ */ e.createElement(
      "path",
      {
        clipRule: "evenodd",
        d: "M18.509 6.16a.89.89 0 00-1.018 0l-6.124 4.285a.848.848 0 00-.325.96.873.873 0 00.833.595h1.75v4.286h-1.75a.866.866 0 00-.875.857c0 .473.392.857.875.857h12.25a.866.866 0 00.875-.857.866.866 0 00-.875-.857h-1.75V12h1.75c.38 0 .717-.24.833-.596a.848.848 0 00-.324-.959L18.509 6.16zm2.116 10.126V12h-5.25v4.286h5.25zM18 7.91l3.395 2.376h-6.79L18 7.91z",
        fill: "#fff",
        fillRule: "evenodd"
      }
    ),
    /* @__PURE__ */ e.createElement("defs", null, /* @__PURE__ */ e.createElement("linearGradient", { gradientUnits: "userSpaceOnUse", id: "prefix__paint0_linear", x1: 36, x2: 0, y1: 12, y2: 12 }, /* @__PURE__ */ e.createElement("stop", { stopColor: "#01D09E" }), /* @__PURE__ */ e.createElement("stop", { offset: 1, stopColor: "#03E4AE" })))
  ), /* @__PURE__ */ e.createElement("span", null, "Pay with Direct debit (ACH)"));
}
export {
  B as Ach,
  B as default
};
//# sourceMappingURL=ach.es.mjs.map
