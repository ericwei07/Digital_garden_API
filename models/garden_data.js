module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'garden_data',
        {
            writer: {
                type: DataTypes.INTEGER,
                field: 'writer',
            },
            content: {
                type: DataTypes.TEXT('medium'),
                field: 'content',
            },
            date_publish: {
                type: DataTypes.BIGINT,
                field: 'date_publish',
            },
            date_edit: {
                type: DataTypes.BIGINT,
                field: 'date_edit',
            },
            title: {
                type: DataTypes.TEXT,
                field: 'title',
            },
            article_id: {
                type: DataTypes.INTEGER,
                field: 'article_id',
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