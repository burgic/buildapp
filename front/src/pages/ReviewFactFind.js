import React from 'react';

const ReviewFactFind = ({ clientProfile, factFind }) => {
  const [reviewData, setReviewData] = React.useState({ ...factFind });

  const handleUpdate = (field, value) => {
    setReviewData({
      ...reviewData,
      [field]: value,
    });
  };

  return (
    <div className="review-fact-find">
      <h2>Review Client Fact Find</h2>
      <div className="review-section">
        <h3>Current Address</h3>
        <p>Client Profile Value: {clientProfile.address}</p>
        <p>Fact Find Value: {reviewData.address}</p>
        <button onClick={() => handleUpdate('address', factFind.address)}>
          Add to Client Profile
        </button>
      </div>
      {/* Repeat similar structure for each section */}
      <button className="save-final-button">Submit and Save Final Data</button>
    </div>
  );
};

export default ReviewFactFind;
