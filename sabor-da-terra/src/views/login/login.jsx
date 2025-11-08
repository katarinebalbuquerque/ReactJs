import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useDispatch } from "react-redux";
import {logarUser} from "../../redux/user/actions";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const hadleLogarClick = () => {
        dispatch(logarUser({name: name, email: email}));
        navigate("/");       
    }

    return (
        <>
            <Header>
                <Link to="/"><h4>Home</h4></Link>
            </Header>
            <section id="login">
                <div className="container">
                    <article id="content">
                        <h2>Login</h2>
                        <hr />
                        <label htmlFor="name">Nome:</label>
                        <input required onChange={e=>setName(e.target.value)} type="text" name="name" autoComplete="off"/>
                        
                        <label htmlFor="email">E-mail:</label>
                        <input required onChange={e=>setEmail(e.target.value)} type="email" name="email" autoComplete="off"/>
                        
                        <button type="button" onClick={hadleLogarClick}>Entrar</button>
                    </article>                    
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default Login;