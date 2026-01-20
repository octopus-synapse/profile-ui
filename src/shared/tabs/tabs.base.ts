import { useState } from "react";
import type { TabsProps } from "./tabs.types";

export function useTabs(props: TabsProps) {
 const { value: controlled, defaultValue = "", onValueChange } = props;
 const [internal, setInternal] = useState(defaultValue);

 const value = controlled ?? internal;
 const setValue = (v: string) => {
  if (controlled === undefined) setInternal(v);
  onValueChange?.(v);
 };

 return { value, setValue };
}

export * from "./tabs.types";
