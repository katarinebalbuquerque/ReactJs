import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../templates/header/Header";
import Footer from "../../templates/footer/Footer";
import Button from "../../templates/button/Button";
import Editar from "./../../../assets/editar.png";
import Remover from "./../../../assets/remover.png";
import axios from "axios";
import "./Home.css";

const Home = () => {

    const [data, setData] = useState([]);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/tarefas/")
            .then(resp => setData(resp.data))
            .catch(err => {
                console.log(err)
                setErro("Ocorreu algum erro!")
            })
    }, []);

    return (
        <>
            <Header>
                <Button action={() => navigate("/criar")} tipo="submit" texto="Add" />
            </Header>
            <section id="tarefas">
                <h3 className="erro">{erro != "" ? erro : ""}</h3>
                <table>
                    {
                        data.map(tarefa => (
                            <tr>
                                <td>{tarefa.nome}</td>
                                <td>
                                    <Link to={"/atualizar/" + tarefa.id}><img src={Editar} alt="Editar" /></Link>
                                    <Link to={"/remover/" + tarefa.id}><img src={Remover} alt="Excluir" /></Link>
                                </td>
                            </tr>
                        ))
                    }

                </table>
            </section>
            <Footer />
        </>
    )
}

export default Home;