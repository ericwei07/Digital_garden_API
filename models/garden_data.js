module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'garden_data',
        {
            writer: {
                type: DataTypes.INTEGER,
                field: 'writer',
            },
            content: {
                type: DataTypes.STRING,
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
                type: DataTypes.STRING,
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