
const Table = require('../models/Table')
const User = require('../models/User')
const Variante = require('../models/Variante')
const bcrypt = require('bcrypt')

module.exports.createTables =  async (req, res) => {

    const cities = ['Douala', 'Yaounde', 'Garoua', 'Bafoussam', 'Bertoua', 'Ebolowa']
    const mises = [25 , 50 , 100 , 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000, 100000]
    const modes = ['cashgame', 'expresso', 'tournament']
    const formats = [
        {name: 'Face à Face', maxPlayers: 2 },
        {name: 'Petits Goals', maxPlayers: 3 },
        {name: 'Moyen Format', maxPlayers: 4 },
        {name: 'Large Format', maxPlayers: 6 }
    ]

    const tables = []
    const createdTables = []

  try {
       
    for (let i = 0 ; i<cities.length ; i++){
        
        for (let j =0 ; j < mises.length ; j++){

            for (let k=0; k< formats.length; k++){

                for (let l = 0; l<modes.length; l++){
                    
                    for (let m =0 ; m <1 ; m++){

                        for await (const variant of Variante.find()) {
                          
                            let table = new Table({
                                name: `${cities[i]}-${m+1}`,
                                buyIn: mises[j],
                                format: formats[k],
                                mode : modes[l],
                                variante : variant._id
                            })
                     
                             let newtable = await table.save(item => createdTables.push(item))
                                                      
                           }

                }

                }
                              
            }

        }
            
    }
    

    return res.status(200).send(createdTables)

    }catch(err){
       return res.status(400).send(err)
    }
   
        
}


module.exports.deleteTables =  async (req, res ) => {

    try {
            let clear = await Table.remove()
            res.status(200).send(clear)

    } catch (err){
          res.sen(err)
    }


}

module.exports.updateTables = (req, res) => {
    res.send('Tables update')
}

module.exports.createUsers = async (req, res) => {

    const names = [ 'Paul', 'Pierre', 'Jacques', 'Marie', 'Emile', 'Robert', 'Geremy', 'Robben', 'Jean', 'Pierre','Stephane']
    const roles = ['player','controller','moderator']
    const date = new Date()
    const password = 'Valery54'
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        for(let i=0 ; i<names.length ; i++){
            for (let j=0 ; j< roles.length ; j++){
                for (let k=0 ; k<10; k++){
                    let user = new User ({
                        name: `${names[i]}-${[k]}`,
                        email: `${names[i]}@yahoo.fr`,
                        password: hashedPassword ,
                        role: roles[j],
                        stack: 10000
                    })
                    user.save()
                }
            }
        }
        res.status(200).send('Les utilisateurs ont été créés')
    }catch(err){
        res.status(400).send(err)
    }

}

module.exports.deleteUsers = async (req, res) => {
    try {
        let clear = await User.remove()
        res.status(200).send(clear)

} catch (err){
      res.status(400).send(err)
}

}


module.exports.createVariante = async (req, res) => {

    

    try {
        let variante = new Variante({
            name: req.body.name,
            maxPlayers: req.body.maxPlayers
        })

        let savedVariante = await variante.save()

        res.status(200).send(savedVariante._id)

    }catch(err){
        res.status(400).send('Variante non crée')
    }
}