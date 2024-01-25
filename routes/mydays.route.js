const {Router} = require('express')
const router = Router()
const mysql = require('mysql')

const config = require('config')

router.post('/gettables', async (req, res) => {
    try {
        const connection = mysql.createConnection({
            host: config.get('host'),
            user: config.get('user'),
            password: config.get('password'),
            database: config.get('database'),
        });

        await connection.connect((err) => {
            if (err) {
                connection.end();
                return res.status(500).json({ message: err.message });
            }

            connection.query(`SHOW TABLES from ${config.get('database')}`, function (err, rows, fields) {
                if (err) {
                    connection.end();
                    return res.status(400).json({ message: err.message });
                }
                if (!rows[0]) {
                    connection.end();
                    return res.status(500).json({ message: 'Table is empty', error: 1 });
                }
                connection.end();
                return res.status(200).json(rows.map(obj => Object.values(obj)[0]))
            })
        })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});
router.post('/getselect', async (req, res) => {
    try {
        const {table} = req.body

        const connection = mysql.createConnection({
            host: config.get('host'),
            user: config.get('user'),
            password: config.get('password'),
            database: config.get('database'),
        });
        await connection.connect((err) => {
            if (err) {
                connection.end();
                return res.status(500).json({ message: err.message });
            }
            console.log(table)
            connection.query(`SELECT * FROM \`${table}\``, function (err, rows, fields) {
                if (err) {
                    console.log(err)
                    connection.end();
                    return res.status(400).json({ message: err.message });
                }
                if (!rows[0]) {
                    console.log('Empty .....')
                    connection.end();
                    return res.status(500).json({ message: 'Table is empty', error: 1 });
                }
                connection.end();

                let header = []
                let types = []

                fields.map((field,index) => {
                    header[index] = field.name
                    types[index] = mapMySQLtoPostgreSQL(field.type)
                    if(field.name === 'id') types[index] = types[index] + ', primaryKey:true, autoIncrement:true'
                });
                console.log(rows)
                const req = rows.map(obj => Object.values(obj))
                return res.status(200).json({req,header,types})
            })
        })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});
function mapMySQLtoPostgreSQL(mysqlType) {
    switch (mysqlType) {
        case 1: // TINYINT
        case 2: // SMALLINT
        case 9: // MEDIUMINT
        case 3: // INT
        case 8: // BIGINT
            return 'DataTypes.INTEGER';
        case 4: // FLOAT
        case 5: // DOUBLE
            return 'DataTypes.FLOAT';
        case 246: // DECIMAL
        case 247: // ENUM
        case 248: // SET
            return 'DataTypes.STRING';
        case 253: // VARCHAR
        case 254: // CHAR
        case 252: // TEXT
            return `DataTypes.STRING`;
        case 7: // TIMESTAMP
        case 12: // DATETIME
            return 'DataTypes.DATE';
        case 10: // DATE
            return 'DataTypes.DATE';
        case 11: // TIME
            return 'DataTypes.TIME';
        case 249: // TINYBLOB
        case 250: // MEDIUMBLOB
        case 251: // LONGBLOB
            return 'DataTypes.STRING';
        case 15: // BOOLEAN
            return 'DataTypes.BOOLEAN';
        default:
            return 'DataTypes.STRING';
    }
}
module.exports = router