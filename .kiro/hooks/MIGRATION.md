# useCrud Hook Migration Guide

The `useCrud` hook has been moved to the `.kiro/hooks` directory to establish it as a canonical Kiro pattern.

## What Changed

- **Old Location:** `src/hooks/useCrud.js`
- **New Location:** `.kiro/hooks/useCrud.js`

## Migration Steps

### 1. Update Import Statements

**Before:**
```javascript
import { useCrud } from '../hooks/useCrud';
```

**After:**
```javascript
import { useCrud } from '../../.kiro/hooks/useCrud';
```

### 2. Adjust Path Based on File Location

The import path depends on where your file is located:

```javascript
// From src/projects/
import { useCrud } from '../../.kiro/hooks/useCrud';

// From src/components/
import { useCrud } from '../../.kiro/hooks/useCrud';

// From src/hooks/ (for wrapper hooks)
import { useCrud } from '../../.kiro/hooks/useCrud';
```

## Migration Status

### ✅ Migrated Files
- `src/projects/ProductManagerExample.jsx`

### 📝 Files to Check
If you have other files using useCrud, update them with:

```bash
# Search for old imports
grep -r "from '../hooks/useCrud'" src/
grep -r "from './hooks/useCrud'" src/
```

## Why This Change?

1. **Centralized Patterns** - Kiro hooks are reusable patterns that should be easily discoverable
2. **Documentation** - The .kiro folder includes comprehensive documentation
3. **Consistency** - All Kiro-specific patterns live in .kiro directory
4. **Version Control** - Easier to track changes to core patterns

## Legacy Support

The old `src/hooks/useCrud.js` file still exists but is considered deprecated. It will be removed in a future update.

## Need Help?

See `.kiro/hooks/README.md` for full documentation and examples.
