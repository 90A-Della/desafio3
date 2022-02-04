'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Compra.belongsTo(models.Cliente, {foreignKey:'ClienteId', as: 'cliente'});
     Compra.belongsToMany(models.Servico, {foreignKey:'Produto', through: 'ItemCompra', as: 'compraprod'});
     Compra.hasMany(models.ItemPedido, {foreignkey: 'CompraId', as: 'item_compras'});
    }
  };
  Compra.init({
    data: DataTypes.DATEONLY,
    ClienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};