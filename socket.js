const Table =require('./models/Table')
const User = require('./models/User')

module.exports.updateLobby = async ()=>{
    const random = Math.floor(Math.random() * 100)
    const rand = (number) =>  {
        return Math.floor(Math.random() * Math.floor(number))
    }

     // simulation

    try {

         // Fermer des tables et peupler les tables
     for await (const table of Table.find().limit(15).skip(random).populate('variante')) {
        
        
        User.findOne().then( async (user)=> {
            if(rand(2) < 1 ) { table.isOpened = false}
            if (table.currentPlayers.length < table.variante.maxPlayers){
                table.currentPlayers.push(user._id)
               //console.log(user)
               
            }
             await table.save()
        })
        
       
        //.then(item => console.log(`${item._id} and ${item.isOpened}`));
      }


    }catch(err){
        console.log(err)
    }
     
    

    //
    let tables = await Table.find({isOpened:false}).skip(random).limit(24).populate('variante')

   // .where()
    //.limit(10)
   // .sort('-_id')
   // console.log(tables)
    return tables
}