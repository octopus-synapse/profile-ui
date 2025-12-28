/**
 * Animation durations
 */
export const duration = {
 75: "75ms",
 100: "100ms",
 150: "150ms",
 200: "200ms",
 300: "300ms",
 500: "500ms",
 700: "700ms",
 1000: "1000ms",
} as const;

/**
 * Animation timing functions
 */
export const easing = {
 linear: "linear",
 in: "cubic-bezier(0.4, 0, 1, 1)",
 out: "cubic-bezier(0, 0, 0.2, 1)",
 inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
 // Custom easings
 bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
 smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
} as const;

/**
 * Animation presets
 */
export const animation = {
 // Fade
 fadeIn: {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: duration[200],
  easing: easing.out,
 },
 fadeOut: {
  from: { opacity: 1 },
  to: { opacity: 0 },
  duration: duration[150],
  easing: easing.in,
 },

 // Scale
 scaleIn: {
  from: { opacity: 0, transform: "scale(0.95)" },
  to: { opacity: 1, transform: "scale(1)" },
  duration: duration[200],
  easing: easing.out,
 },
 scaleOut: {
  from: { opacity: 1, transform: "scale(1)" },
  to: { opacity: 0, transform: "scale(0.95)" },
  duration: duration[150],
  easing: easing.in,
 },

 // Slide
 slideInFromBottom: {
  from: { opacity: 0, transform: "translateY(10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
  duration: duration[300],
  easing: easing.out,
 },
 slideInFromTop: {
  from: { opacity: 0, transform: "translateY(-10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
  duration: duration[300],
  easing: easing.out,
 },

 // Pulse (for loading states)
 pulse: {
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
  duration: duration[1000],
  easing: easing.inOut,
 },

 // Spin
 spin: {
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
  duration: duration[1000],
  easing: easing.linear,
 },
} as const;

export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
