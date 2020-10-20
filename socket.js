const Table =require('./models/Table')

module.exports.updateLobby = async ()=>{
    let tables = await Table.find()
   // console.log(tables)
    return tables
}