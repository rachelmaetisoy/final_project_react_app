import React, { useState, useEffect } from "react";
import "./AddOnsPage.css";

const AddOnsPage = ({ onNavigate, onAddSelections, onShowDetails, selections = [] }) => {
  const addons = [
    {
      name: "Projector",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    },
    {
      name: "Speaker",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1609702847389-b8aec1b0b929?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1926",
    },
    {
      name: "Microphone",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    },
    {
      name: "Whiteboard",
      price: 80,
      image:
        "https://images.unsplash.com/photo-1638189906269-c37fdb5a9351?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=425",
    },
    {
      name: "Signage",
      price: 80,
      image:
        "https://images.unsplash.com/photo-1588873233618-1296823859a2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1025",
    },
  ];

  //  Restore previously selected add-ons (kung meron)
  const [quantities, setQuantities] = useState(() => {
    const saved = selections.filter((item) =>
      addons.some((a) => a.name === item.name)
    );
    return addons.map(
      (a) => saved.find((s) => s.name === a.name)?.quantity || 0
    );
  });

  //  Update selections globally every time quantities change
  useEffect(() => {
    const updatedSelections = addons
      .map((item, i) => ({
        type: "Add-on",
        name: item.name,
        price: item.price,
        quantity: quantities[i],
      }))
      .filter((item) => item.quantity > 0);

    onAddSelections(updatedSelections);
  }, [quantities]);

  const handleIncrement = (index) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index]++;
      return newQuantities;
    });
  };

  const handleDecrement = (index) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      if (newQuantities[index] > 0) newQuantities[index]--;
      return newQuantities;
    });
  };

  const totalCost = addons.reduce(
    (sum, item, i) => sum + item.price * quantities[i],
    0
  );

  return (
    <div className="addons-page">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Conference Expense Planner</h2>
        <div className="nav-links">
          <a href="#" onClick={() => onNavigate("venue")}>
            Venue
          </a>
          <a href="#" onClick={() => onNavigate("addons")}>
            Add-ons
          </a>
          <a href="#" onClick={() => onNavigate("meals")}>
            Meals
          </a>
        </div>
        <button className="details-btn" onClick={onShowDetails}>
          Show Details
        </button>
      </nav>

      {/* Page Header */}
      <h3 className="page-title">Add-ons Selection</h3>

      {/* Add-ons List */}
      <div className="addons-container">
        {addons.map((item, index) => (
          <div className="addon-card" key={index}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
           <p className="price">
  ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(index)}>-</button>
              <span>{quantities[index]}</span>
              <button onClick={() => handleIncrement(index)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/*  Total Section */}
      <div className="total-section">
        <h3>Total Cost: ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
      </div>
    </div>
  );
};

export default AddOnsPage;
