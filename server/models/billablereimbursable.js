'use strict';
module.exports = (sequelize, DataTypes) => {
  var BillableReimbursable = sequelize.define('BillableReimbursable', {
    type: DataTypes.STRING
  }, {tablename:"billableReimbursable", timestamps: false});
  BillableReimbursable.associate = function(models) {
    BillableReimbursable.hasMany(models.Expense, {
      foreignKey: "billableReimbursable_id"
    });
  };
  return BillableReimbursable;
};