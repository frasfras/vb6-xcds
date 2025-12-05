# Kiro Hooks

Reusable React hooks for common patterns in this project.

## Available Hooks

### useCrud

A comprehensive CRUD (Create, Read, Update, Delete) hook for managing collections of entities.

**Location:** `.kiro/hooks/useCrud.js`

**Usage:**

```javascript
import { useCrud } from '../../.kiro/hooks/useCrud';

const MyComponent = () => {
  const {
    items,
    selectedItem,
    create,
    update,
    remove,
    select,
  } = useCrud([], () => Date.now());

  const handleAdd = () => {
    create({ name: 'New Item', value: 100 });
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id} onClick={() => select(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
};
```

**API:**

- `items` - Array of all items
- `selectedItem` - Currently selected item (or null)
- `create(newItem)` - Add new item with auto-generated ID
- `getAll()` - Get all items
- `getById(id)` - Find item by ID
- `update(id, updates)` - Update item properties
- `remove(id)` - Delete item by ID
- `removeMany(ids)` - Delete multiple items
- `select(item)` - Set selected item
- `clearSelection()` - Clear selection
- `reset()` - Reset to initial data
- `setItems(items)` - Set items directly

**Creating Entity-Specific Hooks:**

```javascript
// src/hooks/useProducts.js
import { useCrud } from '../../.kiro/hooks/useCrud';

export const useProducts = () => {
  const crud = useCrud([], () => `PROD-${Date.now()}`);
  
  // Add custom business logic
  const createProduct = (product) => {
    if (!product.name) {
      throw new Error('Product name is required');
    }
    if (product.price < 0) {
      throw new Error('Price must be positive');
    }
    return crud.create(product);
  };
  
  return {
    ...crud,
    createProduct,
  };
};
```

## Guidelines

1. **Use useCrud for all entity management** - Don't write manual CRUD operations
2. **Keep entity-specific logic in wrapper hooks** - Create `useProducts`, `useCategories`, etc.
3. **Import from .kiro/hooks** - This is the canonical location
4. **Add validation in wrapper hooks** - Keep useCrud generic, add business rules in wrappers

## Examples

See these files for reference implementations:
- `src/projects/InventoryApp.jsx`
- `src/projects/ProductManagerExample.jsx`
- `src/projects/ProjectManagerApp.jsx`
