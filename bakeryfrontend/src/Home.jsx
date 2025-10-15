// src/Home.jsx
import React, { useEffect, useState } from "react";
import BASE_URL from "./config";
import "./home.css";

const Home = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ itemName: "", price: "", category: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all items
  const getAllItems = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ itemName: "", price: "", category: "", quantity: "" });
    setEditingId(null);
    getAllItems();
  };

  // Edit item
  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  // Delete item
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    getAllItems();
  };

  return (
    <div className="container">
      <h1>🍞 Bakery Items CRUD</h1>

      {/* Form */}
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" name="itemName" placeholder="Item Name" value={form.itemName} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update Item" : "Add Item"}</button>
      </form>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.itemName}</td>
              <td>₹{item.price}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
