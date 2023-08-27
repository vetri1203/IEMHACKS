import "./Style/Naavbar2.css";

const Nav2 = () => {
  return (
    <>
      <div className="main">
        <div className="nav2Container">
          {/* <img src="../images/Facebook-logo.png" alt=""  />
           */}

          <nav cla>
            <img
              className="nav2_logo"
              src={require("../images/joblogo.jpeg")}
              alt="Register"
            />
            <div className="rigth">
              <div className="navbar">
                <a href="#home">Home</a>
                <a href="#news">News</a>
                <div className="dropdown">
                  <button className="dropbtn">
                    Reference
                    <i className="fa fa-caret-down"></i>
                  </button>
                  <div className="dropdown-content">
                    <a href="/login">Blog</a>
                    <a href="/login">Tutorial</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Nav2;
