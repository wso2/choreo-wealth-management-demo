

export const Navbar = ({ selectedTabName }) => {
  return (
    <nav className="navbar navbar-expand-sm nav-bar-custom m-2">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <span id="contoso-logo">
            CONTOSO <img src="favicon.svg" alt="Logo" height="24" className="d-inline-block align-text-top"/> CENTRAL
          </span>
          {" "}
        </a>

        {/* section - navbar tabs */}
        <div id="section-left" className="collapse navbar-collapse">
          <ul className="navbar-nav fs-5">
            <li className="nav-item">
              <a className={"nav-link" + isActiveTab("Overview", selectedTabName)} aria-current="page" href="/dashboard">
                Overview
              </a>
            </li>

            <li className="nav-item">
              <a className={"nav-link" + isActiveTab("Banks", selectedTabName)} href="/banks">
                Banks
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Offers
              </a>
            </li>

            <li className="nav-item">
              <a className="font-theme-light nav-link" href="#">
                Investments
              </a>
            </li>
          </ul>
        </div>

        {/* section - user profile content */}
        <div id="section-right">
          <ul className="navbar-nav fs-3">
            <li className="nav-item mx-1">
              <a className="nav-link bi bi-gear" href="#">
              </a>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link bi bi-envelope" href="#"></a>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link bi bi-bell" href="#"></a>
            </li>

            <li className="nav-item dropdown-center mx-1">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-circle"></i>
              </a>
              
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">My Profile</a></li>
                <li><a className="dropdown-item" href="/logout">Logout</a></li>
              </ul>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

const isActiveTab = (currentTabName, selectedTabName) => {
  return currentTabName === selectedTabName ? " active" : " ";
} 
