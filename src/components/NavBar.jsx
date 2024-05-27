import "./navbar.css";

function NavBar() {

  /* Array that has the page buttons */
  const pageButtonsText = ["about us", "features", "contact"];

 /* Function that returns the buttons */
  function PageButtons(element) {
    return (
      <button>
        <p>{element}</p>
        <img src="../src/assets/Vector.svg" alt="" />
      </button>
    );
  }

  return (
    <>
    {/* External part of the navbar */}
      <div className="outer-navbar">
        {/* Inner part of the navbar */}
        <div className="inner-navbar">
          {/* Content of the navbar */}
          <div className="content">
            <div className="logo">
              <img src="../src/assets/SVG.svg" alt="" /> <p>dogather</p>
            </div>
            {/* Buttons get created thanks to array prototype.map */}
            <div className="page-buttons-style">
              {pageButtonsText.map((element) => PageButtons(element))}
            </div>
            {/* Right content of the navbar (Login and Register buttons) */}
            <div className="right-content">
              <div className="login">
                <button>
                  <p>login</p>
                  <img src="../src/assets/Vector.svg" alt="" />
                </button>
              </div>
              <button className="register-button">register</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
