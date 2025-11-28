# CRUD Patterns

## Custom Hook Pattern

This project uses a reusable `useCrud` hook for all CRUD operations.

### Usage

```javascript
import { useCrud } from '../hooks/useCrud';

const {
  items,
  selectedItem,
  create,
  update,
  remove,
  select,
} = useCrud(initialData, generateId);
```

### Guidelines

- Use `useCrud` for all entity management (Products, Categories, Suppliers)
- Don't write manual CRUD operations
- Keep entity-specific logic in the component
- Use specific hooks (useProducts, useCategories) when needed

### File Location

- Hook implementation: `src/hooks/useCrud.js`
- Entity-specific hooks: `src/hooks/use[EntityName].js`

### Example

See `src/projects/ProductManagerExample.jsx` for reference implementation.
