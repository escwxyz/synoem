import { useEffect, type RefObject } from "react";

type EventType = "mousedown" | "mouseup" | "touchstart" | "touchend" | "focusin" | "focusout";

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null> | RefObject<T | null>[],
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: EventType = "mousedown",
): void {
  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as Node;

      if (!target || !target.isConnected) {
        return;
      }

      const isOutside = Array.isArray(ref)
        ? ref
            .filter((r) => Boolean(r.current))
            .every((r) => r.current && !r.current.contains(target))
        : ref?.current && !ref?.current.contains(target);

      if (isOutside) {
        handler(event as MouseEvent | TouchEvent | FocusEvent);
      }
    };

    document.addEventListener(eventType, listener);
    return () => document.removeEventListener(eventType, listener);
  }, [ref, handler, eventType]);
}
