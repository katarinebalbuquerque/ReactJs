import Logo from "./../../../assets/logo.png";
import "./Header.css";

const Header = () => {
    return(
        <header className="header">
            <img src={Logo} alt="Logo" />
        </header>
    )
}

export default Header;