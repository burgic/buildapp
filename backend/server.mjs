import app from './app.mjs';
import db from './models/index.mjs';


const PORT = process.env.PORT || 5000;

// Sync database and start server
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
