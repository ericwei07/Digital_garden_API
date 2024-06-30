module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'garden_data', {
            writer: {
                type: DataTypes.INTEGER,
                field: 'writer',
            },
            content: {
                type: DataTypes.TEXT,
                field: 'content',
            },
            date_publish: {
                type: DataTypes.BIGINT,
                field: 'date_publish',
            },
            date_edit: {
                type: DataTypes.BIGINT,
                field: 'date_edit',
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    )
}