import React, { useState } from 'react';

const LoansMortgages = () => {
  const [loans, setLoans] = useState([]);
  
  const handleAddLoan = (loan) => {
    setLoans([...loans, loan]);
  };

  return (
    <div className="loans-mortgages">
      <h2>Loans & Mortgages</h2>
      <button onClick={() => handleAddLoan({})}>+ Add a Loan or Mortgage</button>
      {loans.map((loan, index) => (
        <div key={index} className="loan-entry">
          {/* Render loan information here */}
        </div>
      ))}
      <button className="save-button">Save & Continue</button>
    </div>
  );
};

export default LoansMortgages;
