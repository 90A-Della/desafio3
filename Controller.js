const express = require('express');
const cors = require('cors');
const {Sequelize, sequelize} = require('./models');

const models = require('./models');
const {response} = require ('express');
const res = require('express/lib/response');

const app = express();
app.use(cors());
app.use(express.json());

let servico = models.Servico;
let cliente = models.Cliente;
let pedido = models.Pedido;
let itempedido = models.ItemPedido;
let compra = models.Compra;
let produto = models.Produto;
let itemcompra = models.itemCompra;


let port = process.env.PORT || 3001;
app.listen(port, (req, res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});

app.get('/', function (req, res){
    res.send('Olá, mundo!');
});

//inserir 
app.post('/servicos', async (req, res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar."
        });
    });
});
app.post('/cliente', async(req, res)=> {
    await cliente.create (
        req.body
    ).then(cli => {
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso!",
            cli
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Problema de conexão"
        });
    });
});
app.post('/cliente/:id/pedido', async(req, res)=> {
    const ped = {
        dataPedido: req.body.data,
        ClienteId: req.params.id
    };
    if(! await cliente.findByPk(req.params.id)){
       return res.status(400).json({
           error: true,
           message: "Cliente não existente."
       }); 
    };
    await pedido.create(ped)
        .then(pedcli => {
            return res.json({
                error: false,
                message: "pedido inserido com sucesso.",
                pedcli
            });
        }).catch(erro => {
            return res.status(400).json({
                error : true,
                message: "Não foi possivel inserir o pedido."
            });
        });
});
app.post('/itempedidos', async(req,res)=>{
    await itempedido.create(
       req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'Item criado com sucesso!'
        })
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel criar Item.'
        })
    });
});
app.post('/produto', async (req, res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar."
        });
    });
});
app.post('/itemcompra', async(req, res)=>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar."
        });
    });
});
app.post('/cliente/:id/compra', async(req, res)=> {
    const comp = {
        data: req.body.data,
        ClienteId: req.params.id
    };
    if(! await cliente.findByPk(req.params.id)){
       return res.status(400).json({
           error: true,
           message: "Cliente não existente."
       }); 
    };
    await compra.create(comp)
        .then(compcli => {
            return res.json({
                error: false,
                message: "pedido inserido com sucesso.",
                compcli
            });
        }).catch(erro => {
            return res.status(400).json({
                error : true,
                message: "Não foi possivel inserir o pedido."
            });
        });
});


//Listar 
app.get('/listaservicos', async(req, res)=>{
    await servico.findAll({
        //raw:true
        order: [['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos});
    });
});
app.get('/clientes', async(req, res)=>{
    await cliente.findAll()
     .then(cli => {
         return res.json({
             error: false,
             cli
         });
     }).catch( erro => {
         return res.status(400).json({
             error: true,
             message: "Erro conexão"
         });
     });
});
app.get('/pedidos', async(req, res)=>{
    await pedido.findAll({
    }).then(pedidos => {
        return res.json({
            error: false,
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel se conectar."
        });
    });
});
app.get('/listaitempedidos', async(req, res)=>{
    await itempedido.findAll({
        //raw:true
        order: [['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos});
    });
});
app.get('/compras', async(req, res)=>{
    await compra.findAll()
     .then(comp => {
         return res.json({
             error: false,
             comp
         });
     }).catch( erro => {
         return res.status(400).json({
             error: true,
             message: "Erro conexão"
         });
     });
});
app.get('/listaprodutos', async(req, res)=>{
    await produto.findAll({
        //raw:true
        order: [['nome', 'ASC']]
    }).then(function(produto){
        res.json({produto});
    });
});
app.get('/listaitemcompra', async(req, res)=>{
    await itemcompra.findAll({
        //raw:true
        order: [['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos});
    });
});

//Atualizar 
app.put('/atualizarservico', async(req, res)=>{
    await servico.update(req.body,{
        where:{id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"    
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});
app.put('/atualizarcliente', async(req, res)=>{
    await cliente.update(req.body,{
        where:{id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "cliente foi alterado com sucesso!"    
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});
app.put('/pedidos/:id/editaritem', async(req, res) =>{
    const item = {
       quantidade: req.body.quantidade,
       valor: req.body.valor
    };
    if(! await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Pedido não foi encontrado."
        });
    };
    if(! await servico.findByPk(req.body.servicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado'
        });
    };
    await itempedido.update(item, {
        where: sequelize.and({ServicoId: req.body.ServicoId}, {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Pedido foi alterado com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Erro: não foi possivel alteral.'
        });
    });
});
app.put('/atualizarproduto', async(req, res)=>{
    await produto.update(req.body,{
        where:{id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto alterado com sucesso!"    
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});
app.put('/compra/:id/editaritem', async(req, res) =>{
    const item = {
       quantidade: req.body.quantidade,
       valor: req.body.valor
    };
    if(! await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "compra não foi encontrado."
        });
    };
    if(! await Produto.findByPk(req.body.produtoId)){
        return res.status(400).json({
            error: true,
            message: 'Produto não foi encontrado'
        });
    };
    await itemcompra.update(item, {
        where: sequelize.and({ProdutoId: req.body.ProdutoId}, {compraId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Compra atualizada',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Erro: não foi possivel alteral.'
        });
    });
});

// Excluir
app.delete('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel exclusão."
        });
    });
});
app.delete('/excluirpedido/:id', async(req, res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel exclusão."
        });
    });
});
app.delete('/excluirserviço/:id', async(req, res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel exclusão."
        });
    });
});
app.delete('/excluircompra/:id', async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra excluida com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel exclusão."
        });
    });
});
app.delete('/excluirproduto/:id', async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel exclusão."
        });
    });
});


