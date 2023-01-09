

export const Navbar = ({ selectedTabName }) => {
  return (
    <nav className="navbar navbar-expand-sm nav-bar-custom m-2">
      <div className="container-fluid">

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
      </div>
    </nav>
  );
};

const isActiveTab = (currentTabName, selectedTabName) => {
  return currentTabName === selectedTabName ? " active" : " ";
} 
