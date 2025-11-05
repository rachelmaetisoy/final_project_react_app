import React, { useState } from "react";
import LandingPage from "./components/LandingPage"; 
import ProductSelectionPage from "./components/ProductSelectionPage";
import AddOnsPage from "./components/AddOnsPage";
import MealsPage from "./components/MealsPage";
import ShowDetailsModal from "./components/ShowDetailsModal";

function App() {
  const [currentPage, setCurrentPage] = useState("landing"); 
  const [showModal, setShowModal] = useState(false);
  const [allSelections, setAllSelections] = useState([]);

  // Store selected items globally
  const handleAddSelections = (newSelections) => {
    setAllSelections((prev) => {
      const updated = [...prev];
      newSelections.forEach((item) => {
        const existing = updated.find((i) => i.name === item.name);
        if (existing) {
          existing.quantity = item.quantity;
          existing.totalCost = item.price * item.quantity;
        } else {
          updated.push({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            totalCost: item.price * item.quantity,
          });
        }
      });
      return updated.filter((i) => i.quantity > 0);
    });
  };

  const totalCost = allSelections.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* LANDING PAGE  */}
      {currentPage === "landing" && (
        <LandingPage onGetStarted={() => setCurrentPage("venue")} />
      )}

      {currentPage === "venue" && (
        <ProductSelectionPage
          onNavigate={setCurrentPage}
          onAddSelections={handleAddSelections}
          selections={allSelections}
          onShowDetails={() => setShowModal(true)}
        />
      )}
      {currentPage === "addons" && (
        <AddOnsPage
          onNavigate={setCurrentPage}
          onAddSelections={handleAddSelections}
          selections={allSelections}
          onShowDetails={() => setShowModal(true)}
        />
      )}
      {currentPage === "meals" && (
        <MealsPage
          onNavigate={setCurrentPage}
          onAddSelections={handleAddSelections}
          selections={allSelections}
          onShowDetails={() => setShowModal(true)}
        />
      )}

      {showModal && (
        <ShowDetailsModal
          selections={allSelections}
          totalCost={totalCost}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
