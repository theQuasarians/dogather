import { useEffect } from "react";
import "./NavBar.css"


function NavBar() { 

  /* Array that has the page links */
  const pageLinks = 
[{
      name:"about us",
      id:1,
    },
    {name: "features",
      id:2,
    },
    {
      name:'contact',
      id:3},
    {
      name:'login',
      id:4
    }
    ]
    

 /* Function that returns the links */
 function PageButtons(element) {
  return (
    <>
    <a key={element.id} id={`${(element.name).replace(' ', '-')}-link`} href={`/${(element.name).replace(' ','')}`}>
    {element.name}
    <img src="../src/assets/ArrowLink.svg" alt="ArrowLink" />
    </a>
    </>
  );
 }

  return (
    <>
    { /* External part of the navbar */ }
      <div className="wrapper">
          { /* Content of the navbar */ }
            <div className="logo">
               <a href="./">
                <img src="../src/assets/Logo.svg" alt="Logo" />  
                dogather
              </a>
            </div>
            { /* Buttons get created thanks to array prototype.map */ }
            <div className="pages-links">
              {pageLinks.map((element) => <PageButtons name={element.name} key={element.id}/>)}
            </div>
            {/* Register Button */}
            <div className="register-btn">
              <button className="register-button">register</button>
            </div>
              {/*               
              <button className="hamburger-menu">
                <img src="../src/assets/HamburgerMenu.svg" alt="" />
              </button>
              */}
            </div>
    </>
  );
 }

export default NavBar;
