module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username : {
            type : DataTypes.STRING
        },
        email : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        },
        refresh_token : {
            type : DataTypes.STRING
        }
    })

    return user;
}