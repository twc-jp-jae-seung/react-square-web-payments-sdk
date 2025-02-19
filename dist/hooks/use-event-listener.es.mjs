import * as n from "react";
const i = !(typeof window < "u" && window.document?.createElement);
function u({
  type: t,
  listener: s,
  element: c = i ? void 0 : window,
  options: o
}) {
  const d = n.useRef();
  n.useEffect(() => {
    d.current = s;
  }, [s]);
  const r = n.useCallback((e) => {
    d.current?.(e);
  }, []);
  n.useEffect(() => {
    const e = c;
    return e?.addEventListener(t, r, o), () => e?.removeEventListener(t, r);
  }, [t, c, o, r]);
}
export {
  u as useEventListener
};
//# sourceMappingURL=use-event-listener.es.mjs.map
