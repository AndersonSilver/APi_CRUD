const express = require("express");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

let banco = ['dolar','real','peso','euro'];

app.use((req,res,next)=>{
    console.log(`URL CHAMADA: ${req.url}`);

    return next();
})

function checkDinheiro(req,res,next){
    if(!req.body.name){
        res.status(400).json({erro: "Nome da moeda obrigatória!!"});
    }

    return next();
}

function checkIndexDinheiro(req,res,next){
    
    const dinheiro = banco[req.params.index];
    
    if(!dinheiro){
        res.status(400).json({erro:"Usuario nao existe"});
    }

    req.dinheiro = dinheiro;

    return next();
}

app.get("/dinheiro",(req,res) =>{
    res.json(banco);
})

app.get("/dinheiro/:index",checkIndexDinheiro, (req,res)=>{

    if(isNaN(index)){
        res.statusCode = 400;
    }else{
        res.statusCode = 200;
        return res.json(req.dinheiro);

    }
})

app.post("/dinheiro",checkDinheiro, (req, res)=>{
    let {nome} = req.body;

    banco.push(nome);

    res.json("Dinheiro adicionado com sucesso");
})

app.delete('/dinheiro/:index',checkIndexDinheiro, (req, res) => {
    const index = req.params;
    banco.splice(index,1);
    return res.send();
})

app.put('/dinheiro/:index',checkDinheiro, checkIndexDinheiro,(req, res) => {
    const { index } = req.params;
    const { nome } = req.body;

    banco[index] = nome;
    return res.json("CONCLUIDO");
})

app.listen(3300, err =>{
    if(err){
        console.log("Erro ao abrir o servidor")
    }else{
        console.log("Servidor aberto com sucesso http://localhost:3300");
    }
})