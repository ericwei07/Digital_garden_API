
async function test() {
    const { Sequelize } = require('sequelize');
    const sequelize = new Sequelize('digital_garden', 'root', 'chrd5', {
        host: 'localhost',
        dialect: 'mysql',
        port: 6306,
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
test()