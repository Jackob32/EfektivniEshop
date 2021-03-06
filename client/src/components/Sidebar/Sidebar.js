import React, {Component} from 'react';
import {Link} from 'react-router-dom'


class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

/*
<li className="nav-item">
<Link to={'/dashboard'} className="nav-link" activeClassName="active">
 <i className="icon-speedometer" />
Přehled
</Link>
</li>

*/
  render() {
    return (

      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-title">
              Informace
            </li>

            <li className="nav-item">
                <Link to={'/statistics'} className="nav-link" activeclassname="active">
                <i className="fa fa-bar-chart fa-lg"/>
                Statistiky
              </Link>
            </li>
            <li className="nav-title">
              Prodej
            </li>
            <li className="nav-item">
                <Link to={'/orders/'} className="nav-link" activeclassname="active">
                <i className="fa fa-credit-card fa-lg"/>
                Objednávky
              </Link>


            </li>
            <li className="nav-item">
                <Link to={'/products/'} className="nav-link" activeclassname="active">
                <i className="icon-basket"/>
                Produkty
              </Link>
            </li>
            <li className="nav-item">
                <Link to={'/users/'} className="nav-link" activeclassname="active">
                <i className="fa fa-users fa-lg"/>
                Zákazníci
              </Link>
            </li>
            <li className="nav-title">
              Obchod
            </li>

            <li className={this.activeRoute("/settings")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i
                  className="fa fa-wrench"/> Nastavení</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                    <Link to={'/settings/info'} className="nav-link" activeclassname="active"><i
                        className="fa fa-gear "/>Informace</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/settings/general'} className="nav-link" activeclassname="active"><i
                      className="fa fa-gear "/> Obecné</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/settings/props'} className="nav-link" activeclassname="active"><i
                        className="fa fa-gear"/>
                    Parametry</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/settings/categories'} className="nav-link" activeclassname="active"><i
                      className="fa fa-gear "/> Kategorie</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/settings/transports'} className="nav-link" activeclassname="active"><i
                      className="fa fa-gear "/> Dopravci</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/settings/paymenttypes'} className="nav-link" activeclassname="active"><i
                      className="fa fa-gear "/> Platební metody</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/settings/statetypes'} className="nav-link" activeclassname="active"><i
                      className="fa fa-gear "/> Stavy Objednávek</Link>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;

/*

<li className={this.activeRoute("/components")}>
 <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-puzzle" /> Components</a>
  <ul className="nav-dropdown-items">
    <li className="nav-item">
 <Link to={'/components/buttons'} className="nav-link" activeClassName="active"><i className="icon-puzzle" /> Buttons</Link>
    </li>
    <li className="nav-item">
 <Link to={'/components/social-buttons'} className="nav-link" activeClassName="active"><i className="icon-puzzle" /> Social Buttons</Link>
    </li>
    <li className="nav-item">
 <Link to={'/components/cards'} className="nav-link" activeClassName="active"><i className="icon-puzzle" /> Cards</Link>
    </li>
    <li className="nav-item">
 <Link to={'/components/forms'} className="nav-link" activeClassName="active"><i className="icon-puzzle" /> Forms</Link>
    </li>
    <li className="nav-item">
 <Link to={'/components/modals'} className="nav-link" activeClassName="active"><i className="icon-puzzle" /> Modals</Link>
    </li>
    <li className="nav-item">
 <Link to={'/components/switches'} className="nav-link" activeClassName="active"><i className="icon-puzzle" /> Switches</Link>
    </li>
    <li className="nav-item">
 <Link to={'/components/tables'} className="nav-link" activeClassName="active"><i className="icon-puzzle" /> Tables</Link>
    </li>
    <li className="nav-item">
 <Link to={'/components/tabs'} className="nav-link" activeClassName="active"><i className="icon-puzzle" /> Tabs</Link>
    </li>
  </ul>
</li>
<li className={this.activeRoute("/icons")}>
 <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star" /> Icons</a>
    <ul className="nav-dropdown-items">
    <li className="nav-item">
 <Link to={'/icons/font-awesome'} className="nav-link" activeClassName="active"><i className="icon-star" /> Font Awesome</Link>
</li>
<li className="nav-item">
 <Link to={'/icons/simple-line-icons'} className="nav-link" activeClassName="active"><i className="icon-star" /> Simple Line Icons</Link>
</li>
</ul>
</li>
<li className="nav-item">
 <Link to={'/widgets'} className="nav-link" activeClassName="active"><i className="icon-calculator" /> Widgets <span className="badge badge-info">NEW</span></Link>
    </li>
    <li className="nav-item">
 <Link to={'/charts'} className="nav-link" activeClassName="active"><i className="icon-pie-chart" /> Charts</Link>
    </li>
    <li className="divider"></li>
    <li className="nav-title">
    Extras
    </li>
    <li className="nav-item nav-dropdown">
 <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star" /> Pages</a>
    <ul className="nav-dropdown-items">
    <li className="nav-item">
 <Link to={'/pages/login'} className="nav-link" activeClassName="active"><i className="icon-star" /> Login</Link>
    </li>
    <li className="nav-item">
 <Link to={'/pages/register'} className="nav-link" activeClassName="active"><i className="icon-star" /> Register</Link>
    </li>
    <li className="nav-item">
 <Link to={'/pages/404'} className="nav-link" activeClassName="active"><i className="icon-star" /> Error 404</Link>
</li>
<li className="nav-item">
 <Link to={'/pages/500'} className="nav-link" activeClassName="active"><i className="icon-star" /> Error 500</Link>
</li>
</ul>
 </li>


 <Link to={'/orders/new'} className="float-right nav-link-button">

 <span style={{colour:"red"}}>+</span>

 </Link>

 */