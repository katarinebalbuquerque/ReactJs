import { useEffect, useState } from "react";
import Header from "../../templates/header/Header";
import Footer from "../../templates/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { apiURL } from './../../api/Api';
import axios from 'axios';

const Excluir = () => {

    const [data, setData] = useState({});
    const [mensagem, setMensagem] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    const excluirData = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.delete(`${apiURL}/produtos/${parseInt(id)}`);

            setMensagem("Excluído com sucesso!");
            navigate('/');
        } catch (err) {
            setMensagem("Erro ao excluir produto!");
        }
    }

    useEffect(() => {
        if (!id) return;

        const produtoId = Number(id);

        axios.get(`${apiURL}/produtos/${produtoId}`)
            .then(res => setData(res.data[0]))
            .catch(err => {
                setMensagem("Produto não encontrado!");
            });
    }, [id])

    return (
        <>
            <Header>
                {data.imagem && (
                    <img
                        width="240"
                        src={`${apiURL}/upload/products/${data.imagem}`}
                        alt={data.nome}
                    />
                )}
            </Header>

            <section className="content">
                <h2>Excluir Produto</h2>
                <div className="linha"></div>
                <br />

                <form onSubmit={excluirData}>
                    <h3><strong>{data.nome}</strong></h3><br />
                    <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.quantidade}</td>
                                <td>R$ {data.preco}</td>
                                <td>R$ {data.subtotal}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <h4>Deseja excluir esse produto?</h4><br /><br />

                    <button type="button" onClick={() => navigate(`/detalhes/${id}`)}>Cancelar</button>
                    <button type="submit" id="btn-excluir">Excluir</button>
                </form>

                {mensagem && <p>{mensagem}</p>}
                <br />
            </section>

            <Footer />
        </>
    )
}

export default Excluir;