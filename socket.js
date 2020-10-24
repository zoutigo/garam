const { populate } = require('./models/Table')
const Table =require('./models/Table')
const User = require('./models/User')
const Variante = require('./models/Variante')

module.exports.updateLobby = async ()=>{
  

    const countTables = await Table.estimatedDocumentCount()
    const countUsers = await User.estimatedDocumentCount()

    const rand = (number) =>  {
        return Math.floor(Math.random() * Math.floor(number))
    }

     // simulation

     // opening and closing tables
     //rules : 
     //full tables stay opened
     // 2 incompletes tables per buyIn
     const mode = 'cashgame'
     const formats = [
         {name: 'Face à Face', maxPlayers: 2 },
        {name: 'Petits Goals', maxPlayers: 3 },
        {name: 'Moyen Format', maxPlayers: 4 },
        {name: 'Large Format', maxPlayers: 6 }
    ]
     const mises = [25 , 50 , 100 , 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000, 100000]
     const queries = []

     for (let i=0 ; i<mises.length ; i++){
         queries.push({
             mode: mode,
             buyIn: mises[i]
         })
     }
            
            for (let i=0 ; i< queries.length ; i++){
             
                await Variante.find()
                .then((variants) => {
                       for  (let j =0 ; j< variants.length; j++){

                                Table.find(queries[i]).populate('variante')
                               .where('variante').equals(variants[j]._id)
                               .then(docs=> {
                                             
                                if (docs.length >= 6 ) {

                                    for (let j=6 ; j< docs.length; j++){

                                        docs[j].isOpened = false

                                        docs[j].save()
                                    }
                                }else  {
                                    let size = 5 - docs.length

                                    for(let k = 0 ; k< size ; k++){

                                        docs[k].isOpened = true

                                        docs[k].save()
                                    }
                                }


                                
            } )
                    }
                })
                
        
     }


    try {

         // Fermer des tables et peupler les tables
     for await (const table of Table.find().limit(15).skip(rand(countTables)).populate('variante').populate({
         path: 'currentPlayers',
         populate: {
             path:'player',
             model: 'User'
         }
     })) {
        if(rand(2) < 1 ) { table.isOpened = true}
        let playersNumber = table.currentPlayers.length

        //
        
        User.findOne().skip(rand(countUsers)).then( async (user)=> {
           
           // console.log(user.stack)
            
            if ((playersNumber < table.variante.maxPlayers) && (user.stack > (5*table.buyIn))){
                
               //Remove stack to the new player
                user.stack -= 5*table.buyIn
               
               // console.log(user._id)
                // transfert the stack on the table stack of the player               
                let newTablePlayer = {player: user._id, wallet: 5*table.buyIn}
                table.currentPlayers.push(newTablePlayer)
               // console.log(newTablePlayer)

               //Reduire le stack du joueur et le donner à un joueur de la table
               await user.save()
            }else {
                try{
                         // remove one player if random
                if (playersNumber > 0 && rand(2)>0) {

                    let playerToRemove = table.currentPlayers[playersNumber]
                   await  User.findOne({_id: playerToRemove.player._id}).then((player) =>{
                       player.stack += playerToRemove.wallet
                       player.save()
                   })

                   currentPlayers.splice(currentPlayers.length, 1)
                }

                }catch(err){
                    console.log(err)
                }
               
            }
            
        })
        
        await table.save()
        // .then((tab)=>{
        //     console.log(tab.currentPlayers.length)
        // }
        // )
     
      }


    }catch(err){
        console.log(err)
    }
     

    //
    const preparedTables = await Table.find({isOpened:true})
    .skip(rand(countTables))
    .limit(24).populate('variante')
    .populate({
        path:'currentPlayers',
        populate: {
            path:'player',
            model: 'User'
        }
    })

 

    return preparedTables
}