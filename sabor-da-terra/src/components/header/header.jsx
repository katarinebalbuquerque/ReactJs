import { Link } from "react-router-dom";

const Header = ({children}) => {
    return (
        <header>
            <div className="container">
                <section id="logo">
                    <Link to="/">
                        <img width="200" src="http://localhost:5173/images/logo.png" alt="Logo" />
                    </Link>                    
                </section>
                <nav id="navbar">
                    {children}                    
                </nav>
            </div>
        </header>
    )
}

export default Header;