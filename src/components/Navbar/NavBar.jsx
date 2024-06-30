import { useEffect, useState } from "react";
import "./NavBar.css";

/* fix color on click */

function NavBar() {
  /* React state that will show or hide the mobile menu */
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

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
    {
      name: "login",
      id: 4,
    },
    {
      name: "register",
      id: 5,
    },
  ];

  /* Remove content if browser width goes beyond mobile */
  useEffect(() => {
    window.addEventListener('resize',() => {
      if(document.body.clientWidth >= '770') {
        setToggleMobileMenu(false)
      } 
    })
  }, [])


  return (
    <>
      {/* Navbar Wrapper */}
      <div className="wrapper">
        {/* Content of the navbar */}
        <div className="logo">
          <a href="./">
            <img src="../src/assets/navbarAssets/logo.svg" alt="Logo" />
            dogather
          </a>
        </div>
        {/* Buttons get created thanks to array prototype.map */}
        <div className="pages-links">
          {pageLinks.map((element) => (
            <NavbarLinks name={element.name} key={element.id} />
          ))}
        </div>
        {/* Content of the mobile menu */}
        <div className="mobile-menu">
          <button onClick={() => setToggleMobileMenu(!toggleMobileMenu)}>
            <img
              src={
                toggleMobileMenu
                  ? "../src/assets/navbarAssets/toggleMenuArrows.svg"
                  : "../src/assets/navbarAssets/mobileMenu.svg"
                 
              }
              alt=""
            />
          </button>
        </div>
      </div>
        <div style={{display: toggleMobileMenu ? 'block' : 'none'}} className="mobile-menu-wrapper">
          <div className="pages-links">
           {pageLinks.map((element) => (
            <NavbarLinks name={element.name} key={element.id} />
          ))}
          </div>
        </div>
    </>
  );
}

export default NavBar;


//Component that renders the NavbarLinks
function NavbarLinks(element) {
  return (
    <>
      <a
        key={element.id}
        id={`${element.name.replace(" ", "-")}-link`}
        href={`/${element.name.replace(" ", "")}`}
      >
        {element.name}
        <img src="../src/assets/navbarAssets/arrowLink.svg" alt="arrowLink" />
        <img src={`../src/assets/navbarAssets/${element.name.replace(' ','')}.svg`} alt="mobileIcon" />
      </a>
    </>
  );
}
