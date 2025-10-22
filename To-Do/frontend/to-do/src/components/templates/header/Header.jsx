import Logo from "./../../../assets/logo.png";
import "./Header.css";

const Header = ({children}) => {
    return(
        <header className="header">
            <img src={Logo} alt="Logo" />
            {children}
        </header>
    )
}

export default Header;