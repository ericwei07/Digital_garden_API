module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user_links',
        {
            user_id: {
                type: DataTypes.INTEGER,
                field: 'user_id',
            },
            linked_user_id: {
                type: DataTypes.INTEGER,
                field: 'linked_user_id',
            },
            id: {
                type: DataTypes.INTEGER,
                field: 'id',
                autoIncrement: true,
                primaryKey: true
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    )
}