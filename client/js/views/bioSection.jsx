var React = require('react');

var capitalize = function(string){
   return string.charAt(0).toUpperCase()+string.slice(1);
};


var Header = React.createClass({

  getDefaultProps: function () {
      return {
        contacts: [],
        bio: {},
        interests: []
      };
  },

  /**
   * @return {object}
   */
  render: function() {
    var infoTitles = ["Name"], infoDetails = [this.props.bio.name];
    
    this.props.contacts.forEach(function (contact) {
      infoTitles.push(<p>{capitalize(contact.method)}</p>);
      infoDetails.push(<p>{contact.address}</p>);
    });
    
    var interests = this.props.interests.map(function (interest) {
      return (
        <li>
          <p><i className={interest.icon}></i><br/><span>{interest.title}</span></p>
        </li>
      );
    });
      
    return (
      <section id="bio" className="section about">
        <div className="container">
          <div className="section-title">
            <h2>About Me</h2>
            <span className="border"/>
            <p>
              <span>
                {this.props.bio.primary}
              </span>
            </p>
            <p>
              {this.props.bio.tagline}
            </p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <img src="img/avatar.png" alt="avatar" className="img-responsive"/>
            </div>

            <div className="col-md-4">
              <div className="about-info">
                <div className="info-title">
                  {infoTitles}
                </div>
                <div className="info-details">
                  {infoDetails}
                </div>					
                {/*
                <p className="about-signature">{this.props.bio.name}</p>
                <a href="#" className="mt-button large btn"><i className="fa-download"></i><span>Download Resume</span></a>
                */}
              </div>
            </div>
          <div className="col-md-4">
            <div className="about-extra">
              <h4>HOBBIES &amp; INTERESTS</h4>
              <div className="about-extra-icon-style2">
                <ul>
                  {interests}											
                </ul>
              </div>
            </div>				
          </div>
        </div>
      </div>
	  </section>
    );
  }

});

module.exports = Header;