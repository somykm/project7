"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Post.init(
    {
      content: DataTypes.STRING,
      mediaUrl: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      reads: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
