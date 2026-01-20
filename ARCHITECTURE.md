# Profile UI Architecture

## Philosophy: Chakra-UI Inspired Design

Profile UI follows the **Chakra UI architectural pattern** for component composition and styling.

---

## Core Principles

### 1. **Primitive vs Semantic Components**

**Primitives** (Layout/Structure):

- `Box` - Generic container (div/View wrapper)
- `Stack`, `VStack`, `HStack` - Flexbox layouts
- `Grid`, `GridItem` - Grid layouts
- `Text`, `Heading` - Typography

**Semantic Components** (Render Native Elements):

- `Button` → renders `<button>` / `<Pressable>`
- `Input` → renders `<input>` / `<TextInput>`
- `Checkbox` → renders `<input type="checkbox">` / custom
- `Avatar`, `Card`, `Modal` → semantic wrappers

### 2. **Shared Style System**

All components accept **SystemProps** (spacing, color, typography, layout):

```tsx
// Primitives
<Box p={4} bg="gray.100" borderRadius="md">...</Box>

// Semantic components
<Button px={6} py={3} fontSize="lg">Click</Button>
<Input mb={4} w="100%" />
```

### 3. **Composition Over Inheritance**

**❌ DON'T:**

```tsx
// Button extends Box (wrong)
<Box as="button" ...buttonProps />
```

**✅ DO:**

```tsx
// Button renders native element with SystemProps
<button {...parseStyleProps(props)}>...</button>
```

---

## Component Classification

| Category        | Examples                | Base Element                   | SystemProps |
| --------------- | ----------------------- | ------------------------------ | ----------- |
| **Primitives**  | Box, Stack, Text, Grid  | Generic (`<div>`, `<View>`)    | ✅ Full     |
| **Interactive** | Button, Input, Checkbox | Native (`<button>`, `<input>`) | ✅ Full     |
| **Composite**   | Avatar, Card, Modal     | Composed primitives            | ✅ Full     |

---

## When to Use What

### Use `Box` when:

- Generic layout wrapper needed
- No semantic HTML element applies
- Building custom compositions
- Polymorphic component needed (`as` prop)

```tsx
<Box display="flex" gap={4} p={6}>
 <Box flex={1}>Left</Box>
 <Box flex={1}>Right</Box>
</Box>
```

### Use Native Elements when:

- Semantic meaning exists (`<button>`, `<input>`, `<a>`)
- Accessibility matters
- Native behavior required

```tsx
<Button px={4} py={2}>Native button with style props</Button>
<Input w="100%" mb={4} placeholder="Native input" />
```

### Use `Stack` when:

- Vertical/horizontal layout with spacing
- Replacing manual flex containers

```tsx
<VStack spacing={4}>
 <Box>Item 1</Box>
 <Box>Item 2</Box>
</VStack>
```

---

## Example: Button Composition

**Current (Correct):**

```tsx
// button.component.web.tsx
export const Button = ({ px, py, bg, ...props }) => {
 const styles = parseStyleProps({ px, py, bg });

 return (
  <button style={styles} {...props}>
   {children}
  </button>
 );
};
```

**Not This (Wrong):**

```tsx
// ❌ Don't wrap button in Box
<Box as="button" px={4} py={2}>
 Click
</Box>
```

---

## Cross-Platform Strategy

### Web (`*.component.web.tsx`)

- Uses HTML elements (`<div>`, `<button>`, `<input>`)
- Style props → CSS via `parseStyleProps()`
- Tailwind classes for utilities

### Mobile (`*.component.mobile.tsx`)

- Uses RN components (`<View>`, `<Pressable>`, `<TextInput>`)
- Style props → RN StyleSheet
- No Tailwind (RN doesn't support)

### Shared (`*.base.ts`)

- Business logic hooks (`useButton`, `useInput`)
- Type contracts (`ButtonProps`, `InputProps`)
- Design tokens (colors, sizes, spacing)
- **No rendering** (platform-agnostic)

---

## Migration Checklist

When creating new components:

- [ ] Determine if primitive or semantic
- [ ] Extend `SystemProps` in component interface
- [ ] Use `parseStyleProps()` for web
- [ ] Use appropriate base element (Box vs native)
- [ ] Support pseudo props (`_hover`, `_focus`, etc.)
- [ ] Add mobile variant
- [ ] Test cross-platform

---

## References

- **Chakra UI**: https://chakra-ui.com/docs/styled-system/style-props
- **Styled System**: https://styled-system.com/
- **Theme UI**: https://theme-ui.com/sx-prop

---

**Decision Date**: 2026-01-20  
**Status**: Accepted  
**Architect**: @profile-ui
