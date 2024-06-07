import React, { useEffect, useState } from 'react';
import { Logo, Navitem, DarkModeToggle } from "./Components";
import { navLinks } from "./components";
import { useNavigate } from 'react-router-dom';

export default function Nav({ className, img, name, setSection }) {
    const navigate = useNavigate();
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const mode = localStorage.getItem('mode');
        if (mode && mode === 'dark') {
            setDarkMode(true);
            document.body.classList.add('dark');
        }
    }, []);

    const handleDarkModeToggle = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            if (newMode) {
                document.body.classList.add('dark');
                localStorage.setItem('mode', 'dark');
            } else {
                document.body.classList.remove('dark');
                localStorage.setItem('mode', 'light');
            }
            return newMode;
        });
    };

    return (
        <nav className={className}>
            <Logo img={img} name={name} />
            <div className="menu-items">
                <ul className="nav-links">
                    {navLinks.map(item => (
                        <Navitem
                            key={item.name}
                            className={item.className}
                            name={item.name}
                            onClick={() => {
                                setSection(item.sectionValue);
                            }}
                        />))}
                </ul>
                <ul className="logout-mode">
                    <Navitem className="uil uil-signout" name="Logout" onClick={() => {
                        window.localStorage.removeItem("name");
                        window.localStorage.removeItem("token");
                        window.localStorage.removeItem("email");
                        navigate('/login');
                    }} />
                    <li className="mode" onClick={handleDarkModeToggle}>
                        <DarkModeToggle mode={isDarkMode} />
                    </li>
                </ul>
            </div>
        </nav>
    );
}
