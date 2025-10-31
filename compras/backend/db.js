require('dotenv').config();
const mysql = require('mysql2/promise');
const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selecionarTotalProdutos(){
    const results = await client.query(`SELECT SUM(quantidade * preco) AS total FROM produtos;;`);
    return results[0];
}

async function selecionarProdutos(){
    const results = await client.query("SELECT id,nome,quantidade,preco,data,imagem,(quantidade * preco) AS subtotal FROM produtos ORDER BY id desc;");
    return results[0];
}

async function selecionarProduto(id) {
    const results = await client.query("SELECT id,nome,quantidade,preco,data,imagem,(quantidade * preco) AS subtotal FROM produtos WHERE id=?;", [id]);
    return results[0];
}

async function inserirProduto(produto, imagem) {
    const data = new Date();
    produto.data = data;
    const values = [produto.nome, produto.quantidade, produto.preco, produto.data, imagem];
    await client.query("INSERT INTO produtos (nome,quantidade,preco,data,imagem) VALUES (?,?,?,?,?)", values);
}

async function atualizarProduto(id,produto,imagem) {
    const data = new Date();
    produto.data = data;
    const values = [produto.nome, produto.quantidade, produto.preco, produto.data, imagem, id];
    await client.query("UPDATE produtos SET nome=?,quantidade=?,preco=?,data=?,imagem=? WHERE id=?", values);
}

async function excluirProduto(id) {    
    await client.query("DELETE FROM produtos WHERE id=?", [id]);
}

module.exports = {
    selecionarTotalProdutos,
    selecionarProdutos,
    selecionarProduto,
    inserirProduto,
    atualizarProduto,
    excluirProduto
}