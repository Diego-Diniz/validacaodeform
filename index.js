const express = require('express');
const session = require('express-session');
const flash = require("express-flash");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser"); //  mandar mensagem de erro
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());
app.use(cookieParser("saiohdiasojd"));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUnitialized: true,
    cookie: {maxAge: 60000}
}));

app.use(flash());

app.get("/", (req, res) => {

    var emailError = req.flash("emailError");
    var pontosError = req.flash("pontosError");
    var nomeError = req.flash("nomeError");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;


    res.render("index" , {emailError, pontosError, nomeError, email: req.flash("email"), nome: req.flash("nome"), ponto: req.flash("ponto")});
});


app.post("/form", (req, res)=>{
    const {email, nome, ponto} = req.body;
    var emailError;
    var pontosError;
    var nomeError;

    if(email == undefined || email == ""){
        emailError = "O email não pode ser vazio";
    }
    if(ponto == undefined || ponto < 20){
        pontosError = "Você não pode ter menos de 20 pontos";
    }
    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio";
    }
    if( nome.length < 4){
        nomeError = "O nome é muito pequeno";
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash("emailError", emailError);
        req.flash("pontosError", pontosError);
        req.flash("nomeError", nomeError);

        req.flash("email", email);
        req.flash("nome", nome);
        req.flash("ponto", ponto);

        res.redirect("/");
    }else{
        res.send("Show de bola esse form");
    }
});


app.listen(5678, (req, res) => {
    console.log("Servidor rodando!")
});