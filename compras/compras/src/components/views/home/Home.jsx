import { useEffect, useState } from "react";
import Footer from "../../templates/footer/Footer";
import Header from "../../templates/header/Header";
import { apiURL } from './../../api/Api';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Banner from './../../../assets/banner.jpg';

const Home = () => {
  const [data, setData] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiURL}/produtos`)
      .then(res => {
        if (res.data.length === 0) {
          setMensagem("Nenhum produto encontrado!");
        } else {
          setData(res.data);
        }
      })
      .catch(err => {
        setMensagem("Erro ao carregar os produtos!");
      });
  }, []);

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
        <h2>Lista de Produtos</h2>
        <div className="linha"></div>
        <br />

        <button onClick={() => navigate('/cadastrar')}>Novo Produto</button>

        <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Nome do Produto</th>
              <th>Imagem</th>              
            </tr>
          </thead>
          <tbody>
            {mensagem ? (
              <tr>
                <td colSpan="4">{mensagem}</td>
              </tr>
            ) : (
              data.map(produto => (
                <tr key={produto.id}>
                  <td>{new Date(produto.data).toLocaleDateString("pt-BR")}</td>
                  <td><Link to={`/detalhes/${produto.id}`}>{produto.nome}</Link></td>
                  <td>
                    {produto.imagem ? (
                      <img height="35" src={`${apiURL}/upload/products/${produto.imagem}`} alt={produto.nome} />
                    ) : (
                      <span>Sem imagem</span>
                    )}
                  </td>                  
                </tr>
              ))
            )}
          </tbody>
        </table>
        <br />
      </section>
      <Footer />
    </>
  );
};

export default Home;