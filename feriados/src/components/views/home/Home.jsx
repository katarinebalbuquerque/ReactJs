import { useEffect, useState } from "react";
import Header from "./../../templates/header/Header";
import Footer from "./../../templates/footer/Footer";
import axios from "axios";
import "./Home.css";

const Home = () => {

    const [ano] = useState(new Date().getFullYear());
    const [data, setData] = useState([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
            .then(resp => setData(resp.data))
            .catch(err => {
                console.log(err);
                setErro("Ocorreu algum erro.Tente novamente!");
            })
    },[]);

    return (
        <>
            <Header />
            <section className="content">
                {
                    erro != "" ? <h3>{erro}</h3> : ""
                }
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Feriado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((feriado, index) => (
                                <tr key={index}>
                                    <td>{feriado.date}</td>
                                    <td>{feriado.name}</td>
                                </tr>
                            ))}                               
                    </tbody>
                </table>
            </section>
            <Footer />
        </>
    )
}

export default Home;