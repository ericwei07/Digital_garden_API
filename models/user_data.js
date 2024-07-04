module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user_data',
        {
            user_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'user_id',
            },
            name: {
                type: DataTypes.STRING,
                field: 'name',
                unique: true,
            },
            email: {
                type: DataTypes.STRING(127),
                field: 'email',
                unique: true,
            },
            password: {
                type: DataTypes.STRING(128),
                field: 'password',
            },
            profile_picture: {
                type: DataTypes.STRING,
                field: 'profile_picture',
            },
            date_joined: {
                type: DataTypes.BIGINT,
                field: 'date_joined',
            },
            salt: {
                type: DataTypes.STRING,
                field: 'salt',
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    )
}