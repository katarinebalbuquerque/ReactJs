import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import { apiURL } from './../../api/Api';
import axios from 'axios';
import Banner from './../../../assets/banner.jpg';
import Button from "../../templates/button/Button";
import Input from "../../templates/input/Input";

const Atualizar = () => {
    const [data, setData] = useState({
        nome: '',
        quantidade: '',
        preco: '',
        imagem: ''
    });
    const [imagem, setImagem] = useState(null);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [preco, setPreco] = useState(0);
    const [mensagem, setMensagem] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        const produtoId = Number(id);

        axios.get(`${apiURL}/produtos/${produtoId}`)
            .then(res => setData(res.data[0]))
            .catch(err => {
                console.error(err);
                setMensagem("Produto não encontrado!");
            });
    }, [id])

    const atualizarData = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', imagem);
        formData.append('nome', nome || data.nome);
        formData.append('quantidade', parseInt(quantidade || data.quantidade));
        formData.append('preco', parseFloat(preco || data.preco));

        try {
            const res = await axios.put(`${apiURL}/produtos/${parseInt(id)}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMensagem("Atualizado com sucesso!");
            navigate('/');
        } catch (err) {
            setMensagem("Erro ao atualizar produto!");
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

                <h2>Atualizar Produto</h2>
                <div className="linha"></div>
                <br />
                <form onSubmit={atualizarData}>                    

                    <Input text="Imagem" htmlFor="image" type="file" name="image" onChange={(e) => setImagem(e.target.files[0])}/><br /><br />

                    <Input text="Nome" htmlFor="nome" type="text" name="nome" defaultValue={data.nome} placeholder="Nome do produto" onChange={(e) => setNome(e.target.value)}/><br /><br />    
                   
                    <Input text="Quantidade" htmlFor="quantidade" type="text" name="quantidade" defaultValue={data.quantidade} placeholder="0" onChange={(e) => setQuantidade(e.target.value)}/><br /><br />

                    <Input text="Preço" htmlFor="preco" type="text" name="preco" defaultValue={data.preco} placeholder="0.00" onChange={(e) => setPreco(e.target.value)}/><br /><br />

                    <Button text="Cancelar" type="button" action={()=>navigate(`/detalhes/${id}`)}/>
                    <Button text="Atualizar" type="submit"/>                    
                </form>
                {mensagem && <p>{mensagem}</p>}
                <br />
            </section>
            <Footer />
        </>
    )
}

export default Atualizar;