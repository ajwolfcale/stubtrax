'use strict';
module.exports = (sequelize, DataTypes) => {
  var Expense = sequelize.define('Expense', {
    merchant: DataTypes.STRING,
    date: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    writeoff: DataTypes.BOOLEAN,
    receipt: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {});
  Expense.associate = function(models) {
    Expense.belongsTo(models.User, {
      foreignKey: "user_id"
    });
  };
  return Expense;
};