//usar o express parar criar e configurar meu servidor
const express = require("express");
const server = express();

const db = require('./db');

//configurar arquivos estátitos(css, scripts, imagens)
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

//configuração do nunjucks
const nunjucks = require("nunjucks");

nunjucks.configure("views", {
    express: server,
    noCache: true
});

//Criar rota e capturar requisição do servidor
server.get("/", function(req, res){
    
    db.all("Select * From ideas", function(erro, rows){
        if(erro) return console.log(erro);

        const revesedIdeas = [...rows].reverse();
        let lastIdeas = [];

        for(let idea of revesedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea);
            }
        }

        return res.render("index.html", {ideas : lastIdeas});
    });
});

server.get("/ideias", function(req, res){

    db.all("Select * From ideas", function(erro, rows){
        if(erro) return console.log(erro);

        const revesedIdeas = [...rows].reverse();
        return res.render("ideias.html", {ideas: revesedIdeas});
    });
});

server.post("/", function(req, res){
   
    const queryInsert = `
        Insert Into Ideas(image, title, category, description, link) 
        Values(?,?,?,?,?);
    `;

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(queryInsert, values, function(erro){
        if(erro){
            console.log(erro);
            return res.send("Erro ao salvar dados no banco!");
        }

        return res.redirect("/ideias");
    });
});

//iniciar servidor
server.listen(3000);