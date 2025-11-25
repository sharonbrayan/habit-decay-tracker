import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import './pointscomponent.css';

const PointsComponent = () => {
  const [decayData, setDecayData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect called");

    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/decay-score`,
          { withCredentials: true }
        );

        console.log("response:", data);

        if (data.success) {
          setDecayData(
            data.decay.map(item => ({
              habit: item.name,
              score: item.decayScore
            }))
          );
        }
      } catch (err) {
        console.log("Error fetching decay data:", err);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="points-component">Loading...</div>;

  return (
    <div className="points-component">
      <h2 className="title">Habit Decay Score</h2>

      {decayData.length === 0 ? (
        <p>No habits found.</p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={decayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="habit" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score"  
              isAnimationActive={false} 
              fill="#4CAF50" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PointsComponent;
