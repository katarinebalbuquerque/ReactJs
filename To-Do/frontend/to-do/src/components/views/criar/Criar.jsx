import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../templates/button/Button";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import axios from "axios";

const CriarTarefa = () => {

    const [tarefa, setTarefa] = useState({nome: ''});    
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    function criar(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/tarefas/", {
            nome: tarefa.nome
        })
        .then(resp => navigate("/"))
        .catch(err => {
            console.log(err);
            setErro("Ocorreu algum erro!");
        })
    }

    return (
        <>
            <Header>
                <h4>Criar Tarefa</h4>
            </Header>
            <form className="form">
                <h3 className="erro">{erro!="" ? erro : ""}</h3>
                <input onChange={e => setTarefa({nome: e.target.value})} placeholder="Informe o nome da tarefa..." type="text" name="nome" maxLength="18" autoComplete="off"/>
                <section className="buttons">
                    <Button action={() => navigate("/")} texto="Cancelar"/>                    
                    <Button action={(e)=> criar(e)} tipo="submit" texto="Salvar"/>
                </section>
            </form>
            <Footer />
        </>
    )
}

export default CriarTarefa;