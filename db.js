const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./ws.db");

db.serialize(function(){

    const sqlCreateTable = `
        Create Table If Not Exists Ideas(
            id Integer Primary Key Autoincrement,
            image Text,
            title Text,
            category Text,
            description Text,
            link Text
        );`;

    db.run(sqlCreateTable);

    // const queryInsert = `
    //     Insert Into Ideas(image, title, category, description, link) 
    //     Values(?,?,?,?,?);
    // `;

    // const values = [
    //     "/img/2729007.svg",
    //     "Meditação",
    //     "Mentalidade",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo neque, laudantium quisquam ut earum reprehenderit.",
    //     "#"
    // ]

    // db.run(queryInsert, values, function(erro){
    //      if(erro) return console.log(erro);

    //      console.log(this);
    // });

    // db.run("Delete From ideas Where id = ?", [1], function(erro){
    //     if(erro) return console.log(erro);

    //     console.log(this);
    // });

    // db.all("Select * From ideas", function(erro, rows){
    //     if(erro) return console.log(erro);

    //     console.log(rows);
    // });
});

module.exports = db;