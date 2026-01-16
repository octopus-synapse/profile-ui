import React, { useState, useCallback, useRef, useMemo } from "react";
import type { TooltipProps, TooltipPosition } from "./Tooltip.types";
import { tooltipTokens } from "./Tooltip.types";

const getPlacementStyles = (position: TooltipPosition): React.CSSProperties => {
 const styles: Record<TooltipPosition, React.CSSProperties> = {
  top: {
   bottom: "100%",
   left: "50%",
   transform: "translateX(-50%)",
   marginBottom: tooltipTokens.offset,
  },
  bottom: {
   top: "100%",
   left: "50%",
   transform: "translateX(-50%)",
   marginTop: tooltipTokens.offset,
  },
  left: {
   right: "100%",
   top: "50%",
   transform: "translateY(-50%)",
   marginRight: tooltipTokens.offset,
  },
  right: {
   left: "100%",
   top: "50%",
   transform: "translateY(-50%)",
   marginLeft: tooltipTokens.offset,
  },
 };
 return styles[position];
};

export function useTooltip(props: TooltipProps) {
 const { position = "top", delay = 200, disabled = false } = props;
 const [isVisible, setIsVisible] = useState(false);
 const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

 const show = useCallback(() => {
  if (disabled) return;
  timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
 }, [delay, disabled]);

 const hide = useCallback(() => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  setIsVisible(false);
 }, []);

 const placementStyles = useMemo(
  () => getPlacementStyles(position),
  [position]
 );

 return { isVisible, show, hide, position, disabled, placementStyles };
}

export * from "./Tooltip.types";
