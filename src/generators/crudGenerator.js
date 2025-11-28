/**
 * CRUD Component Generator
 * Generates a complete CRUD component based on entity schema
 */

export const generateCrudComponent = (config) => {
  const {
    entityName,        // e.g., "Product"
    fields,            // e.g., [{ name: 'title', type: 'text', label: 'Title' }]
    initialData = [],
  } = config;

  return `
import React, { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button, TextField } from 'react95';

const genId = () => 'id_' + Math.random().toString(36).slice(2);

export default function ${entityName}Manager() {
  const [items, setItems] = useState(${JSON.stringify(initialData)});
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    ${fields.map(f => `${f.name}: ${f.type === 'number' ? '0' : "''"},`).join('\n    ')}
  });

  const handleCreate = () => {
    setItems([...items, { ...formData, id: genId() }]);
    resetForm();
  };

  const handleUpdate = () => {
    setItems(items.map(item => 
      item.id === selectedItem.id ? { ...item, ...formData } : item
    ));
    resetForm();
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      ${fields.map(f => `${f.name}: item.${f.name},`).join('\n      ')}
    });
  };

  const resetForm = () => {
    setFormData({
      ${fields.map(f => `${f.name}: ${f.type === 'number' ? '0' : "''"},`).join('\n      ')}
    });
    setSelectedItem(null);
  };

  return (
    <Window style={{ width: 700, height: 600 }}>
      <WindowHeader>${entityName} Manager</WindowHeader>
      <WindowContent>
        <div style={{ marginBottom: 20 }}>
          ${fields.map(f => `
          <div style={{ marginBottom: 10 }}>
            <label>${f.label}:</label>
            <TextField
              type="${f.type === 'number' ? 'number' : 'text'}"
              value={formData.${f.name}}
              onChange={(e) => setFormData({ ...formData, ${f.name}: ${f.type === 'number' ? 'parseFloat(e.target.value)' : 'e.target.value'} })}
            />
          </div>`).join('')}
          
          <Button onClick={selectedItem ? handleUpdate : handleCreate}>
            {selectedItem ? 'Update' : 'Create'}
          </Button>
          {selectedItem && <Button onClick={resetForm}>Cancel</Button>}
        </div>

        <table border={1} style={{ width: '100%' }}>
          <thead>
            <tr>
              ${fields.map(f => `<th>${f.label}</th>`).join('\n              ')}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                ${fields.map(f => `<td>{item.${f.name}}</td>`).join('\n                ')}
                <td>
                  <Button size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                  <Button size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </WindowContent>
    </Window>
  );
}
`;
};

// Usage example:
export const productCrudConfig = {
  entityName: 'Product',
  fields: [
    { name: 'name', type: 'text', label: 'Product Name' },
    { name: 'price', type: 'number', label: 'Price' },
    { name: 'quantity', type: 'number', label: 'Quantity' },
    { name: 'category', type: 'text', label: 'Category' },
  ],
  initialData: [],
};
