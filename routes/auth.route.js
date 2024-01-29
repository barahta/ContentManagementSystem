const Router = require('express')
const Models = require('../models/models')
const router = new Router()

router.post('/auth',async (req,res) => {
    try{
        const {login,password} = req.body

        const candidate = await Models.User.findOne({
            where:{
                login:login,
            }
        }).then((user) => {
            if(user){
                if (user.password === password){
                    return res.status(200).send({token:'token'})
                }else{
                    return res.send({message:'Password is wrong...'})
                }
            }else{
                return res.send({message:'User do not exist...'})
            }
        }).catch((e) => {
            return res.send({message:e.message})
        })
        console.log(candidate)
    }catch (e){
        console.log(e.message)
        res.send({message:'Server error before try for auth fetch.....'})
    }
})

module.exports = router