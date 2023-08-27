import "./Style/Naavbar2.css";

const Nav2 = () => {
  return (
    <>
      <div className="main">
        <div className="nav2Container">
          {/* <img src="../images/Facebook-logo.png" alt=""  />
           */}
           <img
              className="nav2_logo"
              src={require("../images/joblogo.jpeg")}
              alt="Register"
            />
            {/* <span className="logo_name">Aluminoid</span> */}

          <nav className="nav2">
            
            <div className="rigth">
              <div className="navbar">
                <a href="/home">Fund</a>
                <a href="/home">Job</a>
                <div className="dropdown">
                  <button className="dropbtn">
                    Reference
                    <i className="fa fa-caret-down"></i>
                  </button>
                  <div className="dropdown-content">
                    <a href="/blog">Blog</a>
                    <a href="/blog">Tutorial</a>  
                  </div>
                  
                </div>
                <img className="userlogo"
              src={require("../images/download.png")}
              alt="Register"
            />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Nav2;
