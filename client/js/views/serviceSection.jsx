var React = require('react');

var Service = React.createClass({
	propTypes: {
		icon: React.PropTypes.string,
		title: React.PropTypes.string,
		summary: React.PropTypes.string
	},
	render: function () {
	
		return (
			<div className="service-box">
				<span className={"service-icon " + this.props.icon}></span>
				<div className="service-content">
					<h3>{this.props.title}</h3>
					<p>{this.props.summary}</p>
				</div>
			</div>
		);
	}
});

var Services = React.createClass({
  propTypes: {
    services: React.PropTypes.array
  },
  
  getDefaultProps: function () {
  	return {
	  services: []
	};
  },

  /**
   * @return {object}
   */
  render: function() {

	var leftColumn = [], rightColumn = [], half = this.props.services.length / 2;
	this.props.services.forEach(function (service, index) {
		var left = index < half;
		(left ? leftColumn : rightColumn).push(
			<Service icon={service.icon} title={service.title} summary={service.summary} />
		);
	});
  	
    return (
      <section id="service" className="section">
		<div className="container">

			<div className="section-title">
				<h2>My Services</h2>
				<span className="border"></span>
			</div>	

			<div className="row">
				
				<div className="col-md-6 left-service">
					{leftColumn}
				</div>	

				<div className="col-md-6 right-service">
					{rightColumn}
				</div>
			</div>
		</div>
	  </section>
    );
  }

});

module.exports = Services;