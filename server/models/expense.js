'use strict';
module.exports = (sequelize, DataTypes) => {
  var Expense = sequelize.define('Expense', {
    writeoff: {type: DataTypes.BOOLEAN, defaultValue: false},
    business: {type: DataTypes.BOOLEAN, defaultValue: false},
    merchant: DataTypes.STRING,
    date: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    receipt: DataTypes.STRING,
    notes: DataTypes.STRING
  }, { tableName: "expenses" });
  Expense.associate = function(models) {
    Expense.belongsTo(models.User, {
      foreignKey: "user_id"
    });
    Expense.belongsTo(models.Category, {
      foreignKey: 'category_id'
    });
    Expense.belongsTo(models.BillableReimbursable, {
      foreignKey: "billableReimbursable_id"
    });
  };
  return Expense;
};

