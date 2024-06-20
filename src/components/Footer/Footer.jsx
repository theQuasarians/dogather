import logoFooter from"../../assets/footerAssets/footerLogo.svg"
import "./Footer.css"

export default function Footer() {
    return(
        <footer className="footer">
            <nav className="footer--logoContainer">
                <img src={logoFooter} alt="logo-dogather" className="footer--logo"></img>
                <span className="logo-name">dogather</span>
            </nav>

                <nav className="footer--link">
                    <h3 className="footer--link__title">Product</h3>
                    <ul>
                        <li> <a href="#">Docs </a> </li>
                        <li> <a href="#">What's new </a> </li>
                    </ul>
                </nav>

                <nav className="footer--link">
                    <h3 className="footer--link__title">Build</h3>
                    <ul>
                        <li> <a href="#">Templates </a> </li>
                        <li> <a href="#">API docs</a> </li>
                        <li> <a href="#">Guides & tutorials</a> </li>
                        <li> <a href="#">Become an affiliate</a> </li>
                    </ul>
                </nav>
          
          
                <nav className="footer--link">
                    <h3 className="footer--link__title">Get started</h3>
                    <ul>
                        <li> <a href="#">Sign up </a> </li>
                        <li> <a href="#">Log in </a> </li>
                    </ul>
                </nav>

                <nav className="footer--link">
                    <h3 className="footer--link__title">Resources</h3>
                    <ul>
                        <li> <a href="#">About us </a> </li>
                        <li> <a href="#">Email us </a> </li>
                        <li> <a href="#">Terms & privacy</a> </li>
                    </ul>
                </nav>
          

        </footer>
    )
}