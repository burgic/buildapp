export default (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      workflowData: {
        type: DataTypes.JSON,
      },
      // Add other fields as needed
    });
  
    return Client;
  };
  