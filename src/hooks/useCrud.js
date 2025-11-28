import { useState } from 'react';

/**
 * Reusable CRUD hook for managing entities
 * @param {Array} initialData - Initial data array
 * @param {Function} generateId - Function to generate unique IDs
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
