import React, { useState, useEffect } from "react";
import "./MealsPage.css";

const MealsPage = ({ onNavigate, onAddSelections, onShowDetails, selections = [] }) => {
  const meals = [
    {
      name: "Breakfast",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&q=80&w=647",
    },
    {
      name: "Lunch",
      price: 65,
      image:
        "https://images.unsplash.com/photo-1627309302198-09a50ae1b209?auto=format&fit=crop&q=80&w=1074",
    },
    {
      name: "High Tea",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1578332199311-59268b20e383?auto=format&fit=crop&q=80&w=1170",
    },
    {
      name: "Dinner",
      price: 70,
      image:
        "https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&q=80&w=1170",
    },
  ];

  // ✅ Restore previously selected meals (kung meron)
  const [selectedMeals, setSelectedMeals] = useState(() => {
    return selections
      .filter((item) => meals.some((m) => m.name === item.name))
      .map((m) => m.name);
  });

  const [numPeople, setNumPeople] = useState(() => {
    const meal = selections.find((item) => meals.some((m) => m.name === item.name));
    return meal ? meal.quantity : 0;
  });

  // ✅ Persist selections automatically
  useEffect(() => {
    const updatedSelections = meals
      .filter((meal) => selectedMeals.includes(meal.name))
      .map((meal) => ({
        type: "Meal",
        name: meal.name,
        price: meal.price,
        quantity: numPeople,
      }))
      .filter((item) => item.quantity > 0);

    onAddSelections(updatedSelections);
  }, [selectedMeals, numPeople]);

  const handleCheckboxChange = (mealName) => {
    setSelectedMeals((prev) =>
      prev.includes(mealName)
        ? prev.filter((name) => name !== mealName)
        : [...prev, mealName]
    );
  };

  const totalCost = selectedMeals.reduce((sum, mealName) => {
    const meal = meals.find((m) => m.name === mealName);
    return sum + meal.price * numPeople;
  }, 0);

  return (
    <div className="meals-page">
      {/* ✅ Navbar */}
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

      {/* ✅ Header */}
      <h3 className="page-title">Meals Selection</h3>

      {/* ✅ Input for number of people */}
      <div className="input-section">
        <label>Number of People:</label>
        <input
          type="number"
          min="0"
          value={numPeople}
          onChange={(e) => setNumPeople(Number(e.target.value))}
        />
      </div>

      {/* ✅ Meals List */}
      <div className="meals-container">
        {meals.map((meal, index) => (
          <div className="meal-item" key={index}>
            <img src={meal.image} alt={meal.name} />
            <label>
              <input
                type="checkbox"
                checked={selectedMeals.includes(meal.name)}
                onChange={() => handleCheckboxChange(meal.name)}
              />
              <strong>{meal.name}</strong>
            </label>
            <p>
  ${meal.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per person
</p>
          </div>
        ))}
      </div>

      {/* ✅ Total Section */}
      <div className="total-section">
        <h3>Total Cost: ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
      </div>
    </div>
  );
};

export default MealsPage;
