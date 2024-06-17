import { useEffect, useState } from "react";
import "./NavBar.css";

function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  /* Array that has the page links */
  const pageLinks = [
    {
      name: "about us",
      id: 1,
    },
    { name: "features", id: 2 },
    {
      name: "contact",
      id: 3,
    },
  ];

  const loginLink = {
    name: "login",
    id: 4,
  };

  /* Function that returns the links */
  function PageButtons(element) {
    return (
      <>
        <a
          key={element.id}
          id={`${element.name.replace(" ", "-")}-link`}
          href={`/${element.name.replace(" ", "")}`}
        >
          {element.name}
          <img src="../src/assets/ArrowLink.svg" alt="ArrowLink" />
        </a>
      </>
    );
  }

  return (
    <>
      {/* External part of the navbar */}
      <div className="wrapper">
        {/* Content of the navbar */}
        <div className="logo">
          <a href="./">
            <img src="../src/assets/Logo.svg" alt="Logo" />
            dogather
          </a>
        </div>
        {/* Buttons get created thanks to array prototype.map */}

        <div className="pages-links">
          {pageLinks.map((element) => (
            <PageButtons name={element.name} key={element.id} />
          ))}
        </div>

        <div className="register-login">
          <a
            key={loginLink.id}
            id={`${loginLink.name}-link`}
            href={`/${loginLink.name.replace(" ", "")}`}
          >
            {loginLink.name}
            <img src="../src/assets/ArrowLink.svg" alt="ArrowLink" />
          </a>
          <div className="register-btn">
            <button>register</button>
          </div>
        </div>
        <div className="hamburger-menu">
          <button onClick={() => setToggleMenu(!toggleMenu)}>
            <img
              src={
                toggleMenu
                  ? "../src/assets/HamburgerMenu.svg"
                  : "../src/assets/toggleMenuArrows.svg"
              }
              alt=""
            />
          </button>
        </div>
      </div>
        <div className="hamburger-menu-wrapper">
          <div className="pages-links">
           {pageLinks.map((element) => (
            <PageButtons name={element.name} key={element.id} />
          ))}
          </div>
          <div className="register-login">
          <a
            key={loginLink.id}
            id={`${loginLink.name}-link`}
            href={`/${loginLink.name.replace(" ", "")}`}
          >
            {loginLink.name}
            <img src="../src/assets/ArrowLink.svg" alt="ArrowLink" />
          </a>
          <div className="register-btn">
            <button>register</button>
          </div>
        </div>
        </div>
    </>
  );
}

export default NavBar;
