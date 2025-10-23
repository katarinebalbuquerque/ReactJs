import { useState } from "react";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import axios from "axios";
import "./Home.css";

const Home = () => {

    const [cep, setCep] = useState("");
    const [erro, setErro] = useState("");
    const [data, setData] = useState({});

    function buscarCEP(event) {
        setErro("");
        setData({});
        event.preventDefault();
        axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
            .then(resp => {
                setData(resp.data);
                setErro("");
            })
            .catch(err => {
                console.log(err);
                setErro("Ocorreu algum erro!");
            })
        setCep("");               
    }

    return (
        <>
            <Header />
            <section className="content">
                <article className="buscar">
                    <input onChange={e => setCep(e.target.value)} autoComplete="off" type="text" name="cep" maxLength="8" placeholder="Informe o CEP..." />
                    <button onClick={e => buscarCEP(e)} type="submit">Buscar</button>
                </article>
                <h3>{erro != "" ? erro : ""}</h3>
                <article className="dados">
                    {
                        Object.keys(data).length > 0 ?
                            <>
                                <p><strong>Logradouro: </strong>{data.street}</p>
                                <p><strong>Bairro: </strong>{data.neighborhood}</p>
                                <p><strong>Cidade: </strong>{data.city} <strong>Estado: </strong>{data.state}</p>
                                <p><strong>CEP: </strong>{data.cep}</p>
                            </>
                            :
                            <p><strong className="msg-erro">Não há dados para a busca!</strong></p>
                    }

                </article>
            </section>
            <Footer />
        </>
    )
}

export default Home;