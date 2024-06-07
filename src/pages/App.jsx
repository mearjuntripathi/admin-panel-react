import React, { useState, useEffect } from 'react';
import { Preloader, Panel } from "../components/Components";
import Nav from "../components/Nav";
import logo from "../images/logo.png";
import img from "../images/profile.jpg";
import Section from "../components/Section";
import Deshboard from '../components/Deshboard';
import Tests from '../components/Tests';
import Student from '../components/Student';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';


export default function App() {
  const [loading, setLoading] = useState(true);
  const [nav, setNav] = useState("");
  const [section, setSection] = useState(localStorage.getItem('section') || 'deshboard');
  const navigate = useNavigate();

    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  const changeNav = () => {
    setNav(nav === "" ? "close" : "");
  };

  const handleSetSection = (newSection) => {
    setSection(newSection);
    localStorage.setItem('section', newSection);
  };

  const renderSection = () => {
    switch (section) {
      case "deshboard":
        return <Deshboard />;
      case "tests":
        return <Tests />;
      case "student":
        return <Student />;
      case "notification":
        return <Notification />;
      default:
        return <Deshboard />;
    }
  };

  return (
    <>
      {loading ? <Preloader /> : null}
      <>
        <Nav className={nav} img={logo} name="Admin Panel" setSection={handleSetSection} />
        <Section className={`panel ${section}`}>
          <Panel img={img} sidebarToggle={changeNav} />
          {renderSection()}
        </Section>
      </>
    </>
  );
}
