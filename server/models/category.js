'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    type: DataTypes.STRING
  }, { tableName: "categories", timestamps: false });
  Category.associate = function(models) {
    Category.hasMany(models.Expense, {
      foreignKey: "category_id"
    });
  };
  return Category;
};