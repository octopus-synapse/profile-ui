# @octopus-synapse/profile-ui

Design system components for Octopus Synapse profile platform.

## Philosophy

**Always Black & White** - Clean, minimal, developer-focused aesthetic with accent colors per tech area.

### Variants

| Variant   | Accent | Use Case                  |
| --------- | ------ | ------------------------- |
| `dev`     | White  | Development / Programming |
| `product` | Blue   | Product Management        |
| `design`  | Purple | UX/UI Design              |
| `data`    | Green  | Data Science / Analytics  |
| `devops`  | Orange | DevOps / Infrastructure   |

## Installation

```bash
npm install @octopus-synapse/profile-ui
# or
yarn add @octopus-synapse/profile-ui
# or
pnpm add @octopus-synapse/profile-ui
```

## Usage

### Basic Import

```tsx
import { Button, Card, Badge } from "@octopus-synapse/profile-ui";
import "@octopus-synapse/profile-ui/styles/globals.css";

function App() {
 return (
  <Card variant="dev">
   <Button variant="dev">Click me</Button>
   <Badge variant="product">Product</Badge>
  </Card>
 );
}
```

### Using Specific Modules

```tsx
// Tokens only
import { colors, spacing } from "@octopus-synapse/profile-ui/tokens";

// Components only
import { Button } from "@octopus-synapse/profile-ui/components";

// Hooks only
import { useTheme, useVariant } from "@octopus-synapse/profile-ui/hooks";

// Utils only
import { cn } from "@octopus-synapse/profile-ui/utils";
```

### Theme Provider

```tsx
import { ThemeProvider } from "@octopus-synapse/profile-ui";

function App() {
 return <ThemeProvider defaultVariant="dev">{/* Your app */}</ThemeProvider>;
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Run tests
npm test

# Type check
npm run typecheck
```

## Structure

```
src/
├── tokens/          # Design tokens (colors, spacing, typography)
├── styles/          # Global styles and themes
├── primitives/      # Base layout components (Box, Stack, Grid)
├── components/      # UI components (Button, Card, Badge, etc)
├── layouts/         # Page layouts and containers
├── hooks/           # React hooks (useTheme, useVariant)
├── utils/           # Utilities (cn, cva helpers)
└── types/           # TypeScript types
```

## License

MIT © Octopus Synapse
