import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export const Sidebar = () => {


    return (
        <aside className="sidebar">

            <div className="logo">
                <img src={logo} alt="logo"></img>
            </div>

            <div className="sidebar-content">
                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <ul className="nav-list">
                            <li>
                                <Link to="/dashboard/home">
                                    <i className="fas fa-home"></i>
                                    <p>Inicio</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        </aside>
    )

}