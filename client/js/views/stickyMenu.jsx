var React = require('react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    var navs = []; 
    for (var key in this.props.navs) {
      navs.push(<li><a href={"#" + this.props.navs[key]} className="collapse-menu">{this.props.navs[key]}</a> </li>);
    }
  
    return (
      <div id="stick-wrapper" className="sticky-wrapper">
        <div className="main-menu-container">
          <nav id="main-menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <a href="#" className="header-logo">
                  <img src="img/logo.png"/>
                </a>
              </div>
              <div className="collapse navbar-collapse" id="top-navbar-collapse">
                <ul className="nav navbar-nav" id="navs">
                  {navs}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div> 
    );
  }

});

module.exports = Header;