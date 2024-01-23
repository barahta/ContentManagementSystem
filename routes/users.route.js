//getusers

const {Router,validationResult} = require('express')
const router = Router()
const mysql = require('mysql')
const md5 = require('md5')
const config = require('config')
const jwt = require("jsonwebtoken");

router.post('/getusers',
    async (req,res) => {
        try {
            const connection = mysql.createConnection({
                host: config.get('host'),
                user: config.get('user'),
                password: config.get('password'),
                database: config.get('database'),
            })
            await connection.connect(err => {
                if (err) {
                    connection.end()
                    res.status(500).json({message: err.message})
                }
                connection.query(`SELECT * FROM users`, function (err,rows,fields){
                    if(err) res.status(400).json({message: err.message})
                    if(!rows[0]) res.status(500).json({message: 'Table is empty',error:1})
                    console.log('fields - '+ fields)
                    connection.end()
                    res.status(200).json(rows)
                })
            })
        }catch (e) {
            res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
        }
    })

module.exports = router