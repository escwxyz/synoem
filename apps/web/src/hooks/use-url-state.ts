"use client";

import { useCallback, useEffect, useState } from "react";

export function useUrlState<T>(
  key: string,
  defaultValue: T,
  options?: {
    parser?: (value: string) => T;
    serializer?: (value: T) => string;
  },
) {
  // 参数解析器和序列化器
  const parser = options?.parser || ((v: string) => v as unknown as T);
  const serializer = options?.serializer || ((v: T) => String(v));

  // 初始化状态
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;

    const params = new URLSearchParams(window.location.search);
    const param = params.get(key);

    return param ? parser(param) : defaultValue;
  });

  // 更新 URL 参数并同步状态
  const updateValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolvedValue =
          typeof newValue === "function"
            ? (newValue as (prev: T) => T)(prev)
            : newValue;

        const params = new URLSearchParams(window.location.search);

        if (
          resolvedValue === defaultValue ||
          resolvedValue === undefined ||
          resolvedValue === null
        ) {
          params.delete(key);
        } else {
          params.set(key, serializer(resolvedValue));
        }

        const newUrl =
          window.location.pathname +
          (params.toString() ? `?${params.toString()}` : "") +
          window.location.hash;
        window.history.replaceState(null, "", newUrl);

        return resolvedValue;
      });
    },
    [key, defaultValue, serializer],
  );

  // 同步 URL 变化到状态
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const param = params.get(key);
      setValue(param ? parser(param) : defaultValue);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [key, defaultValue, parser]);

  return [value, updateValue] as const;
}

export function useMultiUrlState(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultValues: Record<string, any>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  parsers: Record<string, (value: string) => any> = {},
) {
  const [values, setValues] = useState(() => {
    if (typeof window === "undefined") return defaultValues;

    const params = new URLSearchParams(window.location.search);
    const initialValues = { ...defaultValues };

    for (const key in defaultValues) {
      const param = params.get(key);
      if (param) {
        const parser = parsers[key] || ((v: string) => v);
        initialValues[key] = parser(param);
      }
    }

    return initialValues;
  });

  const updateValues = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (updates: Record<string, any>) => {
      setValues((prev) => {
        const newValues = { ...prev, ...updates };
        const params = new URLSearchParams(window.location.search);

        for (const key in updates) {
          if (
            updates[key] === defaultValues[key] ||
            updates[key] === undefined ||
            updates[key] === null
          ) {
            params.delete(key);
          } else {
            params.set(key, String(updates[key]));
          }
        }

        const newUrl =
          window.location.pathname +
          (params.toString() ? `?${params.toString()}` : "") +
          window.location.hash;
        window.history.replaceState(null, "", newUrl);

        return newValues;
      });
    },
    [defaultValues],
  );

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const newValues = { ...defaultValues };

      for (const key in defaultValues) {
        const param = params.get(key);
        if (param) {
          const parser = parsers[key] || ((v: string) => v);
          newValues[key] = parser(param);
        }
      }

      setValues(newValues);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [defaultValues, parsers]);

  return [values, updateValues] as const;
}
