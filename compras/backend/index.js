require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
const fs = require('fs');

const uploadImage = require('./middlewares/uploadimage');

const app = express();
app.use(express.json());

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers","Content-Type");
    app.use(cors());
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/total", async (request, response) => {
    const results = await db.selecionarTotalProdutos();
    response.status(200).json(results);
});

app.get("/produtos", async (request, response) => {
    const results = await db.selecionarProdutos();
    response.status(200).json(results);    
});

app.get("/produtos/:id", async (request, response) => {
    const id = parseInt(request.params.id);    
    const results = await db.selecionarProduto(id);
    response.status(200).json(results);
});

app.post("/produtos", uploadImage.single('image'), async (request, response) => {
    if (!request.file) {
        response.status(400).json({
            erro: true,
            messagem: "Erro: Upload não realizado com sucesso!"
        });
    }
    else {
        const imagem = request.file.filename;
        const produto = request.body;
        await db.inserirProduto(produto, imagem);

        response.status(201).json({
            erro: false,
            messagem: "Salvo com sucesso!"
        });
    }
});

app.put("/produtos/:id", uploadImage.single('image'), async (request, response) => {
    const id = parseInt(request.params.id);

    if (!request.file) {
        response.status(400).json({
            erro: true,
            messagem: "Erro: Upload não realizado com sucesso!"
        });
    }
    else {
        const imagem = request.file.filename;
        const produto = request.body;

        const [produtoAntigo] = await db.selecionarProduto(id);

        if (produtoAntigo && produtoAntigo.imagem) {
            const caminhoAntigo = path.join(__dirname, "public", "upload","products", produtoAntigo.imagem);

            // Verifica se o arquivo existe e remove
            if (fs.existsSync(caminhoAntigo)) {
                fs.unlinkSync(caminhoAntigo);
                console.log("Imagem antiga removida:", caminhoAntigo);
            }
        }

        await db.atualizarProduto(id, produto, imagem);

        response.status(200).json({
            erro: false,
            messagem: "Atualizado com sucesso!"
        });
    }
});

app.delete("/produtos/:id", async (request, response) => {
    const id = parseInt(request.params.id);

    const [produtoAntigo] = await db.selecionarProduto(id);

        if (produtoAntigo && produtoAntigo.imagem) {
            const caminhoAntigo = path.join(__dirname, "public", "upload","products", produtoAntigo.imagem);

            // Verifica se o arquivo existe e remove
            if (fs.existsSync(caminhoAntigo)) {
                fs.unlinkSync(caminhoAntigo);
                console.log("Imagem antiga removida:", caminhoAntigo);
            }
        }

    await db.excluirProduto(id);

    response.status(204).json({
        mensagem: "Excluído com sucesso!"
    });
});

app.listen(process.env.PORT, () => {
    console.log("Conectado com o servidor!");
});
