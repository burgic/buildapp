import React, { useState, useEffect } from 'react';
import API from '../services/api';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Testing connection...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Attempting to connect to:', process.env.REACT_APP_API_URL);
        
        const response = await API.get('/admin/dashboard');
        console.log('Response:', response);
        setStatus('Connection successful! Backend is responding.');
      } catch (err) {
        console.error('Connection error details:', {
          message: err.message,
          response: err.response,
          config: err.config
        });
        setError(err.message);
        setStatus('Connection failed - check console for details');
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Backend Connection Test</h2>
      <div>
        <p><strong>Status:</strong> {status}</p>
        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
        <div style={{ marginTop: '20px' }}>
          <p><strong>Environment:</strong></p>
          <pre style={{ background: '#f5f5f5', padding: '10px' }}>
            {`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL || 'Not set'}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest;