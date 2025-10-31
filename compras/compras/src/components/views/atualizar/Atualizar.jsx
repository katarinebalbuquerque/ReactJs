import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import { apiURL } from './../../api/Api';
import axios from 'axios';
import Banner from './../../../assets/banner.jpg';

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
                    <label htmlFor="image">Imagem</label><br />
                    <input required type="file" name="image" onChange={(e) => setImagem(e.target.files[0])} /><br /><br />

                    <label htmlFor="nome">Nome</label><br />
                    <input required type="text" name="nome" defaultValue={data.nome} onChange={(e) => setNome(e.target.value)} /><br /><br />

                    <label htmlFor="quantidade">Quantidade</label><br />
                    <input required type="number" name="quantidade" defaultValue={data.quantidade} onChange={(e) => setQuantidade(e.target.value)} /><br /><br />

                    <label htmlFor="preco">Preço</label><br />
                    <input required type="text" name="preco" defaultValue={data.preco} onChange={(e) => setPreco(e.target.value)} /><br /><br />

                    <button onClick={() => navigate(`/detalhes/${id}`)} type="submit">Cancelar</button>
                    <button type="submit">Atualizar</button>
                </form>
                {mensagem && <p>{mensagem}</p>}
                <br />
            </section>
            <Footer />
        </>
    )
}

export default Atualizar;