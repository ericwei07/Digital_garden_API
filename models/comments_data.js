module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'comments_data',
        {
            comment_id: {
                type: DataTypes.INTEGER,
                field: 'comment_id',
                autoIncrement: true,
                primaryKey: true
            },
            article_id: {
                type: DataTypes.INTEGER,
                field: 'article_id',
            },
            author_id: {
                type: DataTypes.INTEGER,
                field: 'author_id',
            },
            content: {
                type: DataTypes.STRING,
                field: 'content',
            },
            create_date: {
                type: DataTypes.BIGINT,
                field: 'create_date',
            },
            edit_date: {
                type: DataTypes.BIGINT,
                field: 'edit_date',
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    )
}