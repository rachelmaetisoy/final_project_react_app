import React, { useState, useEffect } from "react";
import "./ProductSelectionPage.css";
import ShowDetailsModal from "./ShowDetailsModal";

const ProductSelectionPage = ({ onNavigate, onAddSelections, onShowDetails, selections }) => {
  const rooms = [
    {
      name: "Conference Room",
      capacity: 15,
      price: 1500,
      image: "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    },
    {
      name: "Auditorium Hall",
      capacity: 200,
      price: 5500,
      image: "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1787",
    },
    {
      name: "Presentation Room",
      capacity: 50,
      price: 3500,
      image: "https://images.unsplash.com/photo-1621020512837-280d1c1ccc7b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    },
    {
      name: "Large Meeting Room",
      capacity: 10,
      price: 1000,
      image: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    },
    {
      name: "Small Meeting Room",
      capacity: 5,
      price: 800,
      image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1025",
    },
  ];

  // keep room quantities persistent
  const [quantities, setQuantities] = useState(rooms.map(() => 0));

  // restore selections when navigating back to this page
  useEffect(() => {
    const saved = rooms.map(
      (r) => selections.find((s) => s.name === r.name)?.quantity || 0
    );
    setQuantities(saved);
  }, [selections]);

  const handleIncrement = (index) => {
    const updated = [...quantities];
    updated[index]++;
    setQuantities(updated);
  };

  const handleDecrement = (index) => {
    const updated = [...quantities];
    if (updated[index] > 0) updated[index]--;
    setQuantities(updated);
  };

  const handleSaveSelections = () => {
    const selectedRooms = rooms.map((r, i) => ({
      name: r.name,
      price: r.price,
      quantity: quantities[i],
    }));
    onAddSelections(selectedRooms);
  };

  const totalCost = rooms.reduce(
    (sum, room, i) => sum + room.price * quantities[i],
    0
  );

  return (
    <div className="product-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2>Conference Expense Planner</h2>
        <div className="nav-links">
          <a
            href="#"
            onClick={() => {
              handleSaveSelections();
              onNavigate("venue");
            }}
          >
            Venue
          </a>
          <a
            href="#"
            onClick={() => {
              handleSaveSelections();
              onNavigate("addons");
            }}
          >
            Add-ons
          </a>
          <a
            href="#"
            onClick={() => {
              handleSaveSelections();
              onNavigate("meals");
            }}
          >
            Meals
          </a>
        </div>
        <button
          className="details-btn"
          onClick={() => {
            handleSaveSelections();
            onShowDetails();
          }}
        >
          Show Details
        </button>
      </nav>

      {/* Title */}
      <h3 className="page-title">Venue Room Selection</h3>

      {/* Room Cards */}
      <div className="room-container">
        {rooms.map((room, index) => (
          <div className="room-card" key={index}>
            <img src={room.image} alt={room.name} />
            <h4>{room.name}</h4>
            <p className="capacity-text">(Capacity: {room.capacity})</p>
            <p className="price-tag">
  ${room.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
</p>


            <div className="quantity-controls">
              <button onClick={() => handleDecrement(index)}>-</button>
              <span>{quantities[index]}</span>
              <button onClick={() => handleIncrement(index)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Cost */}
      <div className="total-section">
        <h3>Total Cost: ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
      </div>
    </div>
  );
};

export default ProductSelectionPage;
