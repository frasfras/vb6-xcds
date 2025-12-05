import React, { useState } from 'react';
import { useCrud } from '../../.kiro/hooks';
import { Window, WindowHeader, WindowContent, Button, TextField } from 'react95';

const genId = () => 'id_' + Math.random().toString(36).slice(2);

export default function ProductManagerExample() {
  const {
    items: products,
    selectedItem: selectedProduct,
    create,
    update,
    remove,
    select,
  } = useCrud([], genId);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0,
  });

  const handleSubmit = () => {
    if (selectedProduct) {
      // UPDATE
      update(selectedProduct.id, formData);
    } else {
      // CREATE
      create(formData);
    }
    setFormData({ name: '', price: 0, quantity: 0 });
  };

  const handleEdit = (product) => {
    select(product);
    setFormData({ name: product.name, price: product.price, quantity: product.quantity });
  };

  return (
    <Window style={{ width: 600, height: 500 }}>
      <WindowHeader>Product Manager (CRUD Example)</WindowHeader>
      <WindowContent>
        {/* Form */}
        <div style={{ marginBottom: 20 }}>
          <TextField
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          />
          <TextField
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          />
          <Button onClick={handleSubmit}>
            {selectedProduct ? 'Update' : 'Create'}
          </Button>
        </div>

        {/* List */}
        <table border={1} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Button size="sm" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button size="sm" onClick={() => remove(product.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </WindowContent>
    </Window>
  );
}
