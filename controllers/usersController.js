const User = require('../models/User')
const {registerValidator, loginValidator} = require('../validators/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')

module.exports.userRegister = async (req, res)=>{
   
       if (!req.body.email) return  res.status(400).send('Email manquant')

    // Joi validation
    let schema =  Joi.object({
        name: Joi.string().required().min(3),
        firstname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')), // 1 majuscule, 1 minuscule, 1 chiffre, 8 caracteres mini
        role: Joi.string().required().valid('player','controller','moderator','admin'),
        createdAt: Joi.date()
    })

    let valid = schema.validate(req.body)

   //let valid = await registerValidator(req.body)
   if (valid.error) return res.status(400).send(`${valid.error.details[0].message}`)

   // check if email exist in database
   let emailVerif = await User.findOne({email:req.body.email})
   if (emailVerif) return res.status(400).send(`The email ${req.body.email} already exist in database`)

   // password hash
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(req.body.password, salt)

 
    let user = new User ({
        name: req.body.name ,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        firstname: req.body.firstname
    })

    try {
        const savedUser = await  user.save()
        res.status(200).send({user: user._id })

    } catch(err){ console.log(err) }

}

module.exports.userLogin = async (req, res)=>{
    // if(!req.body.email || !req.body.password) return res.status(400).send('Please enter email and password')
    let schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

      // using Joi validator
   let {value, error} = await schema.validate(req.body)
   if (error) return res.status(400).send(`${error.details[0].message}`)

   // check if email exists
   let user = await User.findOne({email: req.body.email})
   if (!user) return res.status(400).send('User does not exist for that email')
   

   // check password
   let passwordVerif = await bcrypt.compare(req.body.password, user.password)
   if (!passwordVerif) return res.status(400).send('Wrong password')

   let token = await jwt.sign({_id:user._id, role: user.role}, process.env.TOKEN_SECRET,{expiresIn: process.env.TOKEN_LOGIN_DURATION})
   res.status(200).header('auth-token,token').send(`vous etes connectés avec le token ${token}`)

  
}

module.exports.userView = async (req, res)=>{
    if(!req.params) return res.status(400).send('There is an error in your request')
    
    let user = await User.findOne({_id: req.params.id})
    if(!user) return res.status(400).send('There is no user available')

    return res.status(200).send(`The user is ${user}`)
    
}

module.exports.userModify = async (req, res) =>{
    if(!req.params || !req.body ) return res.status(400).send('There is an error in your request')

    let user = await User.findOneAndUpdate({_id: req.params.id}, req.body)
    if(!user) return res.status(400).send('There is no user available')

    return res.status(200).send(`The user is ${user}`)
}

module.exports.userList = async (req,res) =>{
    try {
        let user = await User.find()
        return res.status(200).send(user)

    } catch(err) {
        return res.status(400).send(err)
    }
   
}