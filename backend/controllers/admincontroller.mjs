import db from '../models/index.mjs';

// Dashboard controller
export const dashboard = async (req, res) => {
    try {
      // Fetch user count and recent activities
      const userCount = await db.User.count();
      const recentActivities = await db.Activity.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']]
      });
  
      // Structure the dashboard data to include the fetched information
      const dashboardData = {
        status: 'success',
        message: 'Welcome to the admin dashboard',
        timestamp: new Date().toISOString(),
        user: req.user ? {
          id: req.user.id,
          email: req.user.email,
          displayName: req.user.displayName
        } : null,
        userCount,          // Adding user count to the response
        recentActivities    // Adding recent activities to the response
      };
  
      // Send the final response
      res.json(dashboardData);
  
    } catch (error) {
      console.error('Dashboard Error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Error fetching dashboard data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };

// Invite client controller
export const inviteClient = async (req, res) => {
  const { email } = req.body;
  try {
    // Add your invite client logic here
    res.json({ 
      status: 'success',
      message: `Invitation sent to ${email}` 
    });
  } catch (error) {
    console.error('Invite Error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Error sending invitation',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};