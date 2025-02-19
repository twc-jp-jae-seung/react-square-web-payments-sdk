import * as React from 'react';
type UseEventListenerProps = {
    type: keyof WindowEventMap;
    listener: EventListener;
    element?: React.RefObject<Element> | HTMLElement | Document | Window | null;
    options?: AddEventListenerOptions;
};
declare function useEventListener({ type, listener, element, options, }: UseEventListenerProps): void;
export { useEventListener };
export type { UseEventListenerProps };
//# sourceMappingURL=use-event-listener.d.ts.map