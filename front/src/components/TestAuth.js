import React, { useState } from 'react';
import { getToken, testDashboard } from '../services/apiTest';

const TestAuth = () => {
  const [status, setStatus] = useState('idle');
  const [token, setToken] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  const runTest = async () => {
    setStatus('testing');
    setError(null);
    
    try {
      // Get token
      setStatus('getting token');
      const newToken = await getToken();
      setToken(newToken);
      
      // Test dashboard
      setStatus('accessing dashboard');
      const dashboard = await testDashboard(newToken);
      setDashboardData(dashboard);
      
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="p-4">
      <h2>API Auth Test</h2>
      <button 
        onClick={runTest}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Run Test
      </button>
      
      <div className="mt-4">
        <p>Status: {status}</p>
        {error && <p className="text-red-500">Error: {error}</p>}
        
        {token && (
          <div className="mt-2">
            <h3>Token:</h3>
            <pre className="bg-gray-100 p-2 rounded">
              {token.substring(0, 50)}...
            </pre>
          </div>
        )}
        
        {dashboardData && (
          <div className="mt-2">
            <h3>Dashboard Data:</h3>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(dashboardData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAuth;