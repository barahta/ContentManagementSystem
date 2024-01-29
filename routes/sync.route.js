const {Router,validationResult} = require('express')
const router = Router()
const mysql = require('mysql')
const md5 = require('md5')
const config = require('config')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const Models = require('../models/models')

router.post('/tnforusers',
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
                connection.query(`SELECT tabel_number, fio, inn FROM t13 WHERE inn = '8617014209' AND tabel_number IN (SELECT tabel_number FROM t13 WHERE inn = '8617014209' GROUP BY tabel_number HAVING COUNT(DISTINCT fio) > 1) ORDER BY tabel_number;`, function (err, rows, fields) {
                    console.log(err)
                    const req = rows.map(obj => Object.values(obj))
                    console.log(req)
                    let header = []
                    fields.map((field,index) => {
                        header[index] = field.name
                    })

                    return res.send({req,header})
                })
            })
        }catch (e) {

        }
    })

router.post('/users',
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
                connection.query(`SELECT * FROM users WHERE full_name IN (SELECT DISTINCT fio FROM t13 WHERE mesyatz = 'январь' AND years = '2024') AND (inn='8617014209' OR inn='')`, function (err,rows,fields){
                    console.log(err)
                    if(err) res.status(400).json({message: err.message})
                    if(!rows[0]) res.status(500).json({message: 'Table is empty',error:1})

                    const req = rows.map(obj => {
                        try {
                            connection.query(`SELECT tabel_number FROM t13 WHERE fio='${obj.full_name}' LIMIT 1`,async function (err,rows,fields){
                                console.log( '!!!!!' + err)
                                console.log(rows)
                                try {
                                    await Models.User.create({
                                        id:obj.id,
                                        tn:rows[0]['tabel_number'],
                                        full_name:obj.full_name,
                                        login:obj.login,
                                        email:obj.email,
                                        password:obj.viewp ? await bcrypt.hash(obj.viewp, 15) : '',
                                        avatar:obj.avatar,
                                        account:obj.account,
                                        inn:'8617014209',
                                        admin:obj.admin,
                                        moderator:obj.moderator,
                                        editcom:obj.editcom,
                                        reg:obj.reg,
                                        checked:obj.checked,
                                        passport:obj.passport,
                                        phone:obj.phone,
                                        phonecompany:obj.phonecompany,
                                        snils:obj.snils,
                                        unit:obj.unit
                                    })
                                }catch (e){
                                    console.log('Ошибка при создании пользователя' + e.message)
                                }
                            })
                        } catch (error) {
                            if (error.name === 'SequelizeUniqueConstraintError') {
                                // Обработка ошибки уникальности: пользователь уже существует
                                console.log('Пользователь с такими данными уже существует')
                            } else {
                                // Другие виды ошибок
                                console.log(error.message);
                            }
                        }
                        return Object.values(obj)
                    })
                    connection.end()
                    res.status(200).json({req})
                })
            })
        }catch (e) {
            res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
        }
    })

router.post('/objects',
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
                connection.query(`SELECT * FROM number_object WHERE inn='8617014209'`,async function (err,rows,fields){
                    console.log(err)
                    if(err) res.status(400).json({message: err.message})
                    if(!rows[0]) res.status(500).json({message: 'Table is empty',error:1})

                    rows.map(async obj => {
                        try{
                            await Models.Objects.create({
                                id:obj.id,
                                shifr:obj.shifr_number,
                                nameobject:obj.shifr_name,
                                inn:obj.inn,
                                ras:obj.ras,
                                ogm_j:obj.ogm_j,
                                dop1:obj.dop1,
                                dop2:obj.dop2,
                                prior:obj.prior
                            })
                        }catch (e){
                            console.log(e.message)
                        }
                    })

                    const req = rows.map(obj => Object.values(obj))
                    connection.end()
                    res.status(200).json({req})
                })
            })
        }catch (e) {
            res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
        }
    })

router.post('/company',
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
                connection.query(`SELECT * FROM company`, function (err,rows,fields){
                    console.log(err)
                    if(err) res.status(400).json({message: err.message})
                    if(!rows[0]) res.status(500).json({message: 'Table is empty',error:1})

                    rows.map(async obj => {
                        try{
                            await Models.Company.create({
                                id:obj.id,
                                inn:obj.inn,
                                namecom:obj.namecom,
                                namecut:obj.namecut,
                                contact:obj.contact,
                                phone:obj.phone,
                                email:obj.email,
                                ogrn:obj.ogrn,
                                status:obj.status,
                                director:obj.director,
                                tabel:obj.tabel,
                                zp:obj.zp,
                                crm:obj.crm,
                                vak:obj.vak,
                                sale:obj.sale,
                                uraddress:obj.uraddress,
                                phonecom:obj.phonecom,
                                phonepri:obj.phonepri,
                                phonehr:obj.phonehr,
                                phonemon:obj.phonemon,
                                fax:obj.fax,
                                factaddress:obj.factaddress,
                                rs:obj.rs,
                                namebank:obj.namebank,
                                kors:obj.kors,
                                bik:obj.bik,
                                emailcom:obj.emailcom,
                                srto_month:obj.srto_month,
                                srto_year:obj.srto_year,
                                srto_branch:obj.srto_branch,
                                vem:obj.vem,
                                periodvem:obj.periodvem,
                                daysvem:obj.daysvem,
                                document:obj.document,
                                oclockday:obj.oclockday,
                                information:obj.information,
                            })
                        }catch (e){
                            res.status(400).send(e.message)
                        }
                    })

                    const req = rows.map(obj => Object.values(obj))
                    connection.end()
                    res.status(200).json({req})
                })
            })
        }catch (e) {
            res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
        }
    })

module.exports = router