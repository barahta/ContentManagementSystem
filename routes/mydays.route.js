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

module.exports = router