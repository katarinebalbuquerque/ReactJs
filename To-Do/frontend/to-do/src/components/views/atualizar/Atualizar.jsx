import { useNavigate, useParams } from "react-router-dom";
import Button from "../../templates/button/Button";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const AtualizarTarefa = () => {

    const {id} = useParams("id");
    const [data, setData] = useState([]);
    const [tarefa, setTarefa] = useState({id: '',nome: ''});
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

    function atualizar(event) {
        event.preventDefault();
        axios.put("http://localhost:3001/tarefas/"+ id, {
            id: tarefa.id,
            nome: tarefa.nome
        })
        .then(resp => navigate("/"))
        .catch(err => {
            console.log(err);
            setErro("Ocorreu algum erro!");
        })
    }

    return(
        <>
            <Header>
                <h4>Atualizar Tarefa</h4>
            </Header>
            <form className="form">
                <h3 className="erro">{erro!="" ? erro : ""}</h3>
                <input onChange={e => setTarefa({id: e.target.value})} defaultValue={data.id} type="text" name="id" disabled/>
                <input onChange={e => setTarefa({nome: e.target.value})} defaultValue={data.nome} type="text" name="nome" maxLength="18" autoComplete="off"/>
                <section className="buttons">
                    <Button action={() => navigate("/")} texto="Cancelar"/>
                    <Button action={(e)=> atualizar(e)} tipo="submit" texto="Atualizar"/>
                </section>
            </form>
            <Footer />
        </>
    )
}

export default AtualizarTarefa;