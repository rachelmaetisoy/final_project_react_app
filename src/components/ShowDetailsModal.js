import React from "react";
import "./ShowDetailsModal.css";

function ShowDetailsModal({ selections, totalCost, onClose }) {
  // Sort items in desired order
  const order = [
    "Conference Room (Capacity:15)",
    "Auditorium Hall (Capacity:200)",
    "Presentation Room (Capacity:50)",
    "Large Meeting Room (Capacity:10)",
    "Small Meeting Room (Capacity:5)",
    "Projector",
    "Speaker",
    "Microphone",
    "Whiteboard",
    "Signage",
    "Breakfast",
    "Lunch",
    "High Tea",
    "Dinner",
  ];

  const selectedItems = selections
    .filter((i) => i.quantity > 0)
    .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>TOTAL COST FOR THE EVENT</h2>
        <h1>${totalCost.toLocaleString()}</h1>

        <table className="details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>${item.price.toLocaleString()}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="bottom-total">Total Cost: ${totalCost.toLocaleString()}</h3>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ShowDetailsModal;
