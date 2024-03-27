const mysql = require('mysql2');

const config = {
    host: 'telefonicadbinstance.c2qo5xihjn4g.us-west-2.rds.amazonaws.com',
    user: 'root',
    database: 'telefonica',
    password: 'S1c3.T3l3f0n1c4.MYSQL',
    port: 3306
};

const db_mysql = mysql.createConnection(config);

db_mysql.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('BDD Conected!');
});

exports.db_mysql = db_mysql;


