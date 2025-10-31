import { Link } from "react-router-dom";

const Header = ({children}) => {
    return(
        <>  
            <header>
                {children}
                <Link className="link-h1" to="/"><h1>Organize suas compras</h1></Link>
                <h3>Feito com <strong>React Js</strong></h3>                 
            </header>
        </>        
    )
}

export default Header;