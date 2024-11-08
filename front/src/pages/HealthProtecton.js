import React, { useState } from 'react';

const HealthProtection = () => {
  const [healthData, setHealthData] = useState({
    healthStatus: '',
    smoker: false,
    longTermCare: false,
    hasWill: false,
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({
      ...healthData,
      [name]: value,
    });
  };

  return (
    <div className="health-protection">
      <h2>Health & Protection</h2>
      <form>
        <label>
          Health Status:
          <select name="healthStatus" value={healthData.healthStatus} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </label>
        <label>
          Are you a smoker?
          <input type="radio" name="smoker" value="Yes" onChange={handleChange} /> Yes
          <input type="radio" name="smoker" value="No" onChange={handleChange} /> No
          <input type="radio" name="smoker" value="E-Cigarettes" onChange={handleChange} /> E-Cigarettes
        </label>
        {/* Include other fields similarly */}
        <button type="submit">Save & Continue</button>
      </form>
    </div>
  );
};

export default HealthProtection;
