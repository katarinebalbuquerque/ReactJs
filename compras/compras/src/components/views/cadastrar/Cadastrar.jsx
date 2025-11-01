import { useState } from "react";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import { apiURL } from "./../../api/Api";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Banner from './../../../assets/banner.jpg';
import Button from "../../templates/button/Button";
import Input from "../../templates/input/Input";

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
                    
                    <Input text="Imagem" htmlFor="image" type="file" name="image" onChange={(e) => setImagem(e.target.files[0])}/><br /><br />

                    <Input text="Nome" htmlFor="nome" type="text" name="nome" placeholder="Nome do produto" onChange={(e) => setNome(e.target.value)}/><br /><br />    
                   
                    <Input text="Quantidade" htmlFor="quantidade" type="text" name="quantidade" placeholder="0" onChange={(e) => setQuantidade(e.target.value)}/><br /><br />

                    <Input text="Preço" htmlFor="preco" type="text" name="preco" placeholder="0.00" onChange={(e) => setPreco(e.target.value)}/><br /><br />

                    <Button text="Cancelar" type="button" action={() => navigate('/')}/>
                    <Button text="Salvar" type="submit"/>                    
                </form>

                {mensagem && <p>{mensagem}</p>}
                <br />
            </section>

            <Footer />
        </>
    );
};

export default Cadastrar;
