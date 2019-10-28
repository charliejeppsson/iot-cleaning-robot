'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Executions', {
    commands: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    result: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    duration: {
      allowNull: false,
      type: DataTypes.DECIMAL(7, 6)
    }
  }, {});
};
