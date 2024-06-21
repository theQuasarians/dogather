import { useState } from "react";
import "./NavBar.css";

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
  ];

  /* Variables that contain login and register links */
  const loginLink = {
    name: "login",
    id: 4,
  };

  const registerLink = {
    name: "register",
    id: 5,
  };

  /* Remove content if browser width goes beyond mobile */
  window.addEventListener('resize',() => {
    if(document.body.clientWidth >= '770') {
      setToggleMobileMenu(false)
    } 
  })

  /* Component that returns the links */
  function PageButtons(element) {
    
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

  /* Component that returns the Register and Login links */
  function RegisterLoginContent(content) {
    return(
      <>
      {/* This will return the version that was passed as props to the component */}
         <div className="register-login">
          <a
            key={loginLink.id}
            id={`${loginLink.name}-link`}
            href={`/${loginLink.name.replace(" ", "")}`}
          >
            {loginLink.name}
            <img src="../src/assets/navbarAssets/arrowLink.svg" alt="ArrowLink" />
            <img src={`../src/assets/navbarAssets/${loginLink.name}.svg`} alt="mobileIcon" />
          </a>
        {content.type == 'mobile' ?
           <a
           key={registerLink.id}
           id={`${registerLink.name}-link`}
           href={`/${registerLink.name.replace(" ", "")}`}
         >
           {registerLink.name}
         <img  src="../src/assets/navbarAssets/ArrowLink.svg" alt="arrowLink" />
         <img  src={`../src/assets/navbarAssets/${registerLink.name}.svg`} alt="mobileIcon" />
         </a>
          :
          <div className="register-btn">
            <button>register</button>
          </div>
      
      }
        </div>
      </>
    )
  }


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
            <PageButtons name={element.name} key={element.id} />
          ))}
        </div>
        {/* Component gets called passing type='desktop' as props, so it will show the 
        respective links in the desktop version */}
        <RegisterLoginContent type='desktop'/>
        {/* Content of the mobile menu */}
        <div className="mobile-menu">
          <button onClick={() => setToggleMobileMenu(!toggleMobileMenu)}>
            <img
              src={
                toggleMobileMenu
                  ? "../src/assets/navbarAssets/toggleMobileMenuArrows.svg"
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
            <PageButtons name={element.name} key={element.id} />
          ))}
          </div>
             {/* Component gets called passing type='desktop' as props, so it will show the 
               respective links in the mobile version */}
          <RegisterLoginContent type='mobile'/>
        </div>
    </>
  );
}

export default NavBar;
