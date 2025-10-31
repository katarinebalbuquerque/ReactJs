import { useState } from "react";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import { apiURL } from "./../../api/Api";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Banner from './../../../assets/banner.jpg';

const Cadastrar = () => {
    const [imagem, setImagem] = useState(null);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [preco, setPreco] = useState(0);
    const [mensagem, setMensagem] = useState('');

    const navigate = useNavigate();

    const insertData = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', imagem);
        formData.append('nome', nome);
        formData.append('quantidade', parseInt(quantidade));
        formData.append('preco', parseFloat(preco));

        try {
            const res = await axios.post(`${apiURL}/produtos`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMensagem("Salvo com sucesso!");
            navigate('/');

        } catch (err) {
            setMensagem("Erro ao salvar produto!");
        }
    }

    return (
        <>
            <Header>
                <img
                    width="240"
                    src={Banner}
                    alt="Banner"
                />
            </Header>
            <section className="content">

                <h2>Novo Produto</h2>
                <div className="linha"></div>
                <br />
                <form onSubmit={insertData}>
                    <label htmlFor="image">Imagem</label><br />
                    <input required type="file" name="image" onChange={(e) => setImagem(e.target.files[0])} /><br /><br />

                    <label htmlFor="nome">Nome</label><br />
                    <input required type="text" name="nome" placeholder="Nome do produto" onChange={(e) => setNome(e.target.value)} /><br /><br />

                    <label htmlFor="quantidade">Quantidade</label><br />
                    <input required type="number" name="quantidade" placeholder="0" onChange={(e) => setQuantidade(e.target.value)} /><br /><br />

                    <label htmlFor="preco">Preço</label><br />
                    <input required type="text" name="preco" placeholder="0.00" onChange={(e) => setPreco(e.target.value)} /><br /><br />

                    <button type="button" onClick={() => navigate('/')}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </form>

                {mensagem && <p>{mensagem}</p>}
                <br />
            </section>

            <Footer />
        </>
    );
};

export default Cadastrar;
