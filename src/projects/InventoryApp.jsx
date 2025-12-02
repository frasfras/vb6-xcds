import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  TextField,
} from "react95";
import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";

/* -------------------------
   Helper to generate unique IDs
-------------------------- */
const genId = () => "id_" + Math.random().toString(36).slice(2);

/* -------------------------
   Main Inventory App
-------------------------- */
export default function InventoryApp() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    productCode: "",
    productName: "",
    category: "Electronics",
    quantity: 0,
    unitPrice: 0,
    reorderLevel: 10,
    supplier: "",
    description: "",
  });

  /* Load sample data for demo */
  useEffect(() => {
    setProducts([
      {
        id: genId(),
        productCode: "ELEC001",
        productName: "Laptop Dell XPS 15",
        category: "Electronics",
        quantity: 25,
        unitPrice: 1299.99,
        reorderLevel: 5,
        supplier: "Dell Inc.",
        description: "High-performance laptop with 16GB RAM",
      },
      {
        id: genId(),
        productCode: "FURN002",
        productName: "Office Chair Ergonomic",
        category: "Furniture",
        quantity: 8,
        unitPrice: 249.99,
        reorderLevel: 10,
        supplier: "Office Depot",
        description: "Comfortable ergonomic office chair",
      },
      {
        id: genId(),
        productCode: "STAT003",
        productName: "Printer Paper A4",
        category: "Stationery",
        quantity: 150,
        unitPrice: 4.99,
        reorderLevel: 50,
        supplier: "Staples",
        description: "500 sheets per pack",
      },
      {
        id: genId(),
        productCode: "ELEC004",
        productName: "Wireless Mouse",
        category: "Electronics",
        quantity: 3,
        unitPrice: 29.99,
        reorderLevel: 10,
        supplier: "Logitech",
        description: "Bluetooth wireless mouse",
      },
    ]);
  }, []);

  /* -------------------------
     Calculate Statistics
  -------------------------- */
  const getStats = () => {
    const totalProducts = products.length;
    const totalValue = products.reduce(
      (sum, p) => sum + p.quantity * p.unitPrice,
      0
    );
    const lowStockItems = products.filter(
      (p) => p.quantity <= p.reorderLevel
    ).length;
    return { totalProducts, totalValue, lowStockItems };
  };

  /* -------------------------
     Open Detail Window
  -------------------------- */
  const openDetail = (product) => {
    if (product) setFormValues({ ...product });
    else
      setFormValues({
        productCode: "",
        productName: "",
        category: "Electronics",
        quantity: 0,
        unitPrice: 0,
        reorderLevel: 10,
        supplier: "",
        description: "",
      });
    setDetailOpen(true);
  };

  /* -------------------------
     Save product
  -------------------------- */
  const saveProduct = () => {
    if (!formValues.productCode || !formValues.productName) {
      alert("Product Code and Name are required!");
      return;
    }

    if (formValues.id) {
      // Update
      setProducts(
        products.map((p) => (p.id === formValues.id ? formValues : p))
      );
    } else {
      // Add new
      setProducts([...products, { ...formValues, id: genId() }]);
    }
    setDetailOpen(false);
  };

  /* -------------------------
     Delete product
  -------------------------- */
  const deleteProduct = () => {
    if (!selectedProduct) return;
    if (
      window.confirm(
        `Delete product "${selectedProduct.productName}"?`
      )
    ) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      setSelectedProduct(null);
    }
  };

  /* -------------------------
     Stock In/Out
  -------------------------- */
  const adjustStock = (amount) => {
    if (!selectedProduct) return;
    const newQty = selectedProduct.quantity + amount;
    if (newQty < 0) {
      alert("Insufficient stock!");
      return;
    }
    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id ? { ...p, quantity: newQty } : p
      )
    );
    setSelectedProduct({ ...selectedProduct, quantity: newQty });
  };

  const stats = getStats();

  return (
    <div style={{ background: "#008080", minHeight: "100vh", padding: 20 }}>
      {/* -------------------------
          Top Menu Bar
      -------------------------- */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 40,
          background: "#c0c0c0",
          borderBottom: "2px solid #808080",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
          zIndex: 10000,
        }}
      >
        <Button size="sm" onClick={() => openDetail(null)} style={{ minWidth: 100, padding: "2px 8px" }}>
          Add 
        </Button>
        <Button
          size="sm"
          onClick={() => openDetail(selectedProduct)}
          disabled={!selectedProduct}
          style={{ minWidth: 100, padding: "2px 8px" }}
        >
          Edit Product
        </Button>
        <Button size="sm" onClick={deleteProduct} disabled={!selectedProduct} style={{ minWidth: 110, padding: "2px 8px" }}>
          Delete 
        </Button>
        <div style={{ width: 20 }} />
        <Button
          size="sm"
          onClick={() => adjustStock(10)}
          disabled={!selectedProduct}
          style={{ minWidth: 110, padding: "2px 8px" }}
        >
          Stock In (+10)
        </Button>
        <Button
          size="sm"
          onClick={() => adjustStock(-10)}
          disabled={!selectedProduct}
          style={{ minWidth: 120, padding: "2px 8px" }}
        >
          Stock Out (-10)
        </Button>
        <div style={{ width: 20 }} />
        <Button size="sm" onClick={() => setStatsOpen(!statsOpen)} style={{ minWidth: 100, padding: "2px 8px" }}>
          {statsOpen ? "Hide Stats" : "Show Stats"}
        </Button>
      </div>

      {/* -------------------------
          Statistics Window
      -------------------------- */}
      {statsOpen && (
        <Rnd
          default={{ x: 20, y: 69, width: 300, height: 180 }}
          dragHandleClassName="drag-handle"
        >
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader className="drag-handle">
              Inventory Statistics
            </WindowHeader>
            <WindowContent>
              <div style={{ fontSize: 14, lineHeight: 2 }}>
                <div>
                  <strong>Total Products:</strong> {stats.totalProducts}
                </div>
                <div>
                  <strong>Total Inventory Value:</strong> $
                  {stats.totalValue.toFixed(2)}
                </div>
                <div
                  style={{
                    color: stats.lowStockItems > 0 ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  <strong>Low Stock Items:</strong> {stats.lowStockItems}
                </div>
              </div>
            </WindowContent>
          </Window>
        </Rnd>
      )}

      {/* -------------------------
          Products List Window
      -------------------------- */}
      <Rnd
        default={{ x: 340, y: 60, width: 700, height: 450 }}
        dragHandleClassName="drag-handle"
      >
        <Window style={{ width: "100%", height: "100%" }}>
          <WindowHeader className="drag-handle">Products List</WindowHeader>
          <WindowContent style={{ overflowY: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12,
              }}
              border={1}
            >
              <thead>
                <tr style={{ background: "#000080", color: "white" }}>
                  <th>Code</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const isLowStock = product.quantity <= product.reorderLevel;
                  return (
                    <tr
                      key={product.id}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedProduct?.id === product.id
                            ? "#000080"
                            : isLowStock
                            ? "#ffcccc"
                            : "",
                        color:
                          selectedProduct?.id === product.id ? "white" : "",
                      }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <td>{product.productCode}</td>
                      <td>{product.productName}</td>
                      <td>{product.category}</td>
                      <td style={{ textAlign: "center" }}>
                        {product.quantity}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        ${product.unitPrice.toFixed(2)}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        ${(product.quantity * product.unitPrice).toFixed(2)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {isLowStock ? (
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            ⚠ LOW
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>✓ OK</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </WindowContent>
        </Window>
      </Rnd>

      {/* -------------------------
          Product Details Window
      -------------------------- */}
      {selectedProduct && !detailOpen && (
        <Rnd
          default={{ x: 1060, y: 60, width: 320, height: 400 }}
          dragHandleClassName="drag-handle"
        >
          <Window style={{ width: "100%", height: "100%", background: "#c0c0c0" }}>
            <WindowHeader className="drag-handle">
              Product Details
            </WindowHeader>
            <WindowContent style={{ background: "#c0c0c0" }}>
              <div style={{ fontSize: 12, lineHeight: 1.8 }}>
                <div>
                  <strong>Code:</strong> {selectedProduct.productCode}
                </div>
                <div>
                  <strong>Name:</strong> {selectedProduct.productName}
                </div>
                <div>
                  <strong>Category:</strong> {selectedProduct.category}
                </div>
                <div>
                  <strong>Quantity:</strong> {selectedProduct.quantity}
                </div>
                <div>
                  <strong>Unit Price:</strong> $
                  {selectedProduct.unitPrice.toFixed(2)}
                </div>
                <div>
                  <strong>Total Value:</strong> $
                  {(
                    selectedProduct.quantity * selectedProduct.unitPrice
                  ).toFixed(2)}
                </div>
                <div>
                  <strong>Reorder Level:</strong> {selectedProduct.reorderLevel}
                </div>
                <div>
                  <strong>Supplier:</strong> {selectedProduct.supplier}
                </div>
                <div style={{ marginTop: 10 }}>
                  <strong>Description:</strong>
                  <div
                    style={{
                      marginTop: 5,
                      padding: 8,
                      background: "white",
                      border: "1px solid #808080",
                    }}
                  >
                    {selectedProduct.description}
                  </div>
                </div>
              </div>
            </WindowContent>
          </Window>
        </Rnd>
      )}

      {/* -------------------------
          Add/Edit Product Window
      -------------------------- */}
      {detailOpen && (
        <Rnd
          default={{ x: 400, y: 150, width: 450, height: 500 }}
          dragHandleClassName="drag-handle"
        >
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader className="drag-handle">
              {formValues.id ? "Edit Product" : "Add New Product"}
            </WindowHeader>
            <WindowContent
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                overflowY: "auto",
              }}
            >
              <label style={{ fontSize: 12 }}>
                <strong>Product Code *</strong>
              </label>
              <TextField
                value={formValues.productCode}
                onChange={(e) =>
                  setFormValues({ ...formValues, productCode: e.target.value })
                }
                placeholder="e.g., ELEC001"
              />

              <label style={{ fontSize: 12 }}>
                <strong>Product Name *</strong>
              </label>
              <TextField
                value={formValues.productName}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    productName: e.target.value,
                  })
                }
                placeholder="e.g., Laptop Dell XPS"
              />

              <label style={{ fontSize: 12 }}>
                <strong>Category</strong>
              </label>
              <select
                value={formValues.category}
                onChange={(e) =>
                  setFormValues({ ...formValues, category: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "4px",
                  border: "2px inset #808080",
                  background: "white",
                  fontFamily: "ms_sans_serif",
                  fontSize: 12,
                }}
              >
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Stationery">Stationery</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Tools & Equipment">Tools & Equipment</option>
                <option value="Clothing & Apparel">Clothing & Apparel</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Automotive">Automotive</option>
                <option value="Books & Media">Books & Media</option>
                <option value="Toys & Games">Toys & Games</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Other">Other</option>
              </select> 
         

              <label style={{ fontSize: 12 }}>
                <strong>Quantity</strong>
              </label>
              <TextField
                type="number"
                value={formValues.quantity}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
              />

              <label style={{ fontSize: 12 }}>
                <strong>Unit Price ($)</strong>
              </label>
              <TextField
                type="number"
                step="0.01"
                value={formValues.unitPrice}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    unitPrice: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <label style={{ fontSize: 12 }}>
                <strong>Reorder Level</strong>
              </label>
              <TextField
                type="number"
                value={formValues.reorderLevel}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    reorderLevel: parseInt(e.target.value) || 0,
                  })
                }
              />

              <label style={{ fontSize: 12 }}>
                <strong>Supplier</strong>
              </label>
              <TextField
                value={formValues.supplier}
                onChange={(e) =>
                  setFormValues({ ...formValues, supplier: e.target.value })
                }
                placeholder="e.g., Dell Inc."
              />

              <label style={{ fontSize: 12 }}>
                <strong>Description</strong>
              </label>
              <TextField
                multiline
                rows={3}
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    description: e.target.value,
                  })
                }
                placeholder="Product description..."
              />

              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <Button onClick={saveProduct}>Save</Button>
                <Button onClick={() => setDetailOpen(false)}>Cancel</Button>
              </div>
            </WindowContent>
          </Window>
        </Rnd>
      )}
    </div>
  );
}
