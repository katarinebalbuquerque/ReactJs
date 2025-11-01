import { useEffect, useState } from "react";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import { apiURL } from './../../api/Api';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../templates/button/Button";

const Detalhar = () => {
  const [data, setData] = useState({
    nome: '',
    quantidade: '',
    preco: '',
    imagem: ''
  });
  const [mensagem, setMensagem] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {    
    if (!id) return;

    const produtoId = Number(id);

    axios.get(`${apiURL}/produtos/${produtoId}`)
      .then(res => setData(res.data[0]))
      .catch(err => {
        setMensagem("Produto não encontrado!");
      });
  }, [id]);

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
        <h2>Detalhes do Produto</h2>
        <div className="linha"></div>
        <br />

        <form>
          <br />
          <h3><strong>{data.nome}</strong></h3><br/>
                   
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
          <Button text="Voltar" type="button" action={() => navigate('/')}/>
          <Button text="Atualizar" type="button" action={() => navigate(`/atualizar/${id}`)}/>
          <Button text="Excluir" type="button" action={() => navigate(`/excluir/${id}`)}/>          
        </form>

        {mensagem && <p>{mensagem}</p>}
        <br />
      </section>
      <Footer />
    </>
  );
};

export default Detalhar;