

var mysql = require('mysql')


var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database: 'testdbnode'
})

con.connect(err=>{
    if(err)throw err;
    console.log('Db connected')
 var sql = "select * from chats"
    con.query(sql, (err,result,fields   )=> {
        if(err) throw err;
        console.log(result)
    })
})

// exports.modules = con