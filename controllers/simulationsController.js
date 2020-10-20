
const Table = require('../models/Table')

module.exports.createTables = (req, res) => {

    const cities = ['Douala', 'Yaounde', 'Garoua', 'Bafoussam', 'Bertoua', 'Ebolowa']
    const mises = [25 , 50 , 100 , 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000, 100000]
    const modes = ['cashgame', 'expresso', 'tournament']
    const formats = [
        {name: 'Face à Face', maxPlayers: 2 },
        {name: 'Petits Goals', maxPlayers: 3 },
        {name: 'Moyen Format', maxPlayers: 4 },
        {name: 'Large Format', maxPlayers: 6 }
    ]
   const createdTables = []
   const Errors = []
 try {

    let creation =  mises.forEach(mise=> {
        let subName = ''
        let Name = ''
        if (mise < 900) { 
            subName = 'Poor'
         } else if (mise < 10000) {
             subName = 'Medium'
         } else {
             subName = 'VIP'
         }
 
         for (let i = 0 ; i< cities.length ; i++) {
             subName += `-${cities[i]}`
 
 
              formats.forEach(format => {
                 modes.forEach(mode => {
 
                     let table = new Table({
                         name: subName ,
                         mode: mode,
                         format: format,
                         buyIn: mise
                     })
 
                     try { 
                         let savedTable = table.save()
                         createdTables.push(savedTable._id)
                         
 
                     }catch (err) {
                         Errors.push(err)
                     }
                     
                 });
                  
              });
         }
        
    })

    if (creation) {
        res.status(200).send(createdTables)
        }

 } catch(err) {
    res.status(400).send(Errors)
 }
 

        
}

module.exports.updateTables = (req, res) => {
    res.send('Tables update')
}