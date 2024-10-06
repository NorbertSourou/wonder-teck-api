const {DataTypes} = require("sequelize");
const {roles} = require("../../config");

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: roles.WALKER
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: true
    }
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("user", UserModel);
    },

    createUser: (user) => {
        return this.model.create(user);
    },

    findUser: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    updateUser: (query, updatedValue) => {
        console.log(query, updatedValue.body)
        return this.model.update(updatedValue.body, {
            where: query,
        });
    },

    findAllUsers: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    deleteUser: (query) => {
        return this.model.destroy({
            where: query
        });
    }
};