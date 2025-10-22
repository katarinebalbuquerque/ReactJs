import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../templates/button/Button";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import axios from "axios";
import "./Remover.css";

const RemoverTarefa = () => {

    const {id} = useParams("id");
    const [data, setData] = useState([]);
    const [setTarefa] = useState({id: '',nome: ''});
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/tarefas/"+ id)
            .then(resp => setData(resp.data))
            .catch(err => {
                console.log(err)
                setErro("Ocorreu algum erro!")
            })
    },[]);

    function remover(event) {
        event.preventDefault();
        axios.delete("http://localhost:3001/tarefas/"+ id)
        .then(resp => navigate("/"))
        .catch(err => {
            console.log(err);
            setErro("Ocorreu algum erro!");
        })
    }

    return(
        <>
            <Header>
                <h4>Remover Tarefa</h4>
            </Header>
            <form className="form">
                <h3 className="erro">{erro!="" ? erro : ""}</h3>
                <input onChange={e => setTarefa({id: e.target.value})} defaultValue={data.id} type="text" name="id" disabled/>
                <input onChange={e => setTarefa({nome: e.target.value})} defaultValue={data.nome} type="text" name="nome" disabled/>
                <section className="buttons">
                    <Button action={() => navigate("/")} tipo="submit" texto="Cancelar"/>
                    <Button action={(e)=> remover(e)} id="btn-remover" tipo="submit" texto="Excluir"/>
                </section>
            </form>
            <Footer />
        </>
    )
}

export default RemoverTarefa;