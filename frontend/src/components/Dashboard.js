import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";


const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not logged in");

      try {
        const { data } = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: token },
        });
        setCards(data);
      } catch {
        alert("User not logged in");
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {cards.map((card) => (
        <div key={card.id} className="card" onClick={() => navigate(`/map/${card.id}`)}>
          {card.name}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
