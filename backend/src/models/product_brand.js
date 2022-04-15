"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Product_Brand extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Product_Brand.hasMany(Model.User, { as: "comments" });
            Product_Brand.belongsTo(models.User, {
                foreignKey: "userId",
                as: "userData"
            });
        }
    }

    Product_Brand.init(
        {
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            active: DataTypes.INTEGER,
            imageId: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
            userId: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "Product_Brand",
            freezeTableName: true
        }
    );
    return Product_Brand;
};
