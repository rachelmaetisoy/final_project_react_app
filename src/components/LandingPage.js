import React from "react";
import "./LandingPage.css";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-container">
      <div className="content">
        {/* Left side - App title and button */}
        <div className="left-section">
          <h1>Conference Expense Planner</h1>
          <p>Plan your next major event with us!</p>
          <button onClick={onGetStarted}>Get Started</button>
        </div>

        {/* Right side - Company information */}
        <div className="right-section">
          <h2>Welcome to BudgetEase Solutions</h2>
          <p>
            Your trusted partner in simplifying budget management and financial
            planning. At BudgetEase, we understand the importance of effective
            budget planning and strive to provide intuitive, user-friendly
            solutions to meet the diverse needs of our clients.
          </p>
          <p>
            With a commitment to efficiency and innovation, we empower
            individuals and businesses to take control of their finances and
            achieve their goals with ease.
          </p>
          <p>
            Our mission is to make budgeting effortless and accessible for
            everyone. Whether you're a small business owner, a busy professional,
            or an individual managing personal finances, we offer tailored
            solutions to streamline your process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
