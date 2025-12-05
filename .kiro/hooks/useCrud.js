import { useState } from 'react';

/**
 * Reusable CRUD Hook for Managing Entities
 * 
 * A Kiro hook that provides a complete CRUD (Create, Read, Update, Delete) interface
 * for managing collections of entities with built-in selection state.
 * 
 * @param {Array} initialData - Initial data array (default: [])
 * @param {Function} generateId - Function to generate unique IDs (default: Date.now)
 * 
 * @returns {Object} CRUD operations and state
 * @returns {Array} items - Current array of items
 * @returns {Object|null} selectedItem - Currently selected item
 * @returns {Function} create - Create new item with auto-generated ID
 * @returns {Function} getAll - Get all items
 * @returns {Function} getById - Get item by ID
 * @returns {Function} update - Update item by ID
 * @returns {Function} remove - Delete item by ID
 * @returns {Function} removeMany - Delete multiple items by IDs
 * @returns {Function} select - Set selected item
 * @returns {Function} clearSelection - Clear selected item
 * @returns {Function} reset - Reset to initial data
 * @returns {Function} setItems - Set items directly (for bulk operations)
 * 
 * @example
 * // Basic usage
 * const {
 *   items,
 *   selectedItem,
 *   create,
 *   update,
 *   remove,
 *   select
 * } = useCrud([], () => Date.now());
 * 
 * // Create a new item
 * const newProduct = create({ name: 'Widget', price: 9.99 });
 * 
 * // Update an item
 * update(newProduct.id, { price: 12.99 });
 * 
 * // Select an item
 * select(newProduct);
 * 
 * // Delete an item
 * remove(newProduct.id);
 * 
 * @example
 * // With custom ID generator
 * import { v4 as uuidv4 } from 'uuid';
 * 
 * const { items, create } = useCrud([], uuidv4);
 * 
 * @example
 * // Entity-specific hook wrapper
 * export const useProducts = () => {
 *   const crud = useCrud([], () => `PROD-${Date.now()}`);
 *   
 *   const createProduct = (product) => {
 *     // Add validation or business logic
 *     if (!product.name) throw new Error('Name required');
 *     return crud.create(product);
 *   };
 *   
 *   return { ...crud, createProduct };
 * };
 */
export const useCrud = (initialData = [], generateId = () => Date.now()) => {
  const [items, setItems] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState(null);

  // CREATE
  const create = (newItem) => {
    const itemWithId = { ...newItem, id: generateId() };
    setItems([...items, itemWithId]);
    return itemWithId;
  };

  // READ (already in state)
  const getAll = () => items;
  
  const getById = (id) => items.find(item => item.id === id);

  // UPDATE
  const update = (id, updates) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  // DELETE
  const remove = (id) => {
    setItems(items.filter(item => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  // BULK DELETE
  const removeMany = (ids) => {
    setItems(items.filter(item => !ids.includes(item.id)));
  };

  // SELECT
  const select = (item) => {
    setSelectedItem(item);
  };

  // CLEAR SELECTION
  const clearSelection = () => {
    setSelectedItem(null);
  };

  // RESET ALL
  const reset = () => {
    setItems(initialData);
    setSelectedItem(null);
  };

  return {
    items,
    selectedItem,
    create,
    getAll,
    getById,
    update,
    remove,
    removeMany,
    select,
    clearSelection,
    reset,
    setItems, // For bulk operations like load from file
  };
};
