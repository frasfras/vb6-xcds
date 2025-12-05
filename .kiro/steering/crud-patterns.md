# CRUD Patterns

## Custom Hook Pattern

This project uses a reusable `useCrud` hook for all CRUD operations.

### Usage

```javascript
import { useCrud } from '../../.kiro/hooks/useCrud';

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
- Keep entity-specific logic in wrapper hooks
- Use specific hooks (useProducts, useCategories) when needed

### File Locations

- **Kiro Hook (canonical):** `.kiro/hooks/useCrud.js`
- **Legacy location:** `src/hooks/useCrud.js` (deprecated, use .kiro version)
- **Entity-specific hooks:** `src/hooks/use[EntityName].js`
- **Documentation:** `.kiro/hooks/README.md`

### Import Path

Always import from the .kiro/hooks directory:

```javascript
// ✅ Recommended (using index)
import { useCrud } from '../../.kiro/hooks';

// ✅ Also correct (direct import)
import { useCrud } from '../../.kiro/hooks/useCrud';

// ❌ Deprecated
import { useCrud } from '../hooks/useCrud';
```

### Examples

See these files for reference implementations:
- `src/projects/InventoryApp.jsx`
- `src/projects/ProductManagerExample.jsx`
- `src/projects/ProjectManagerApp.jsx`
