var React = require('react');
var Parallax = require('react-parallax');

var Milestone = React.createClass({
	
	render: function () {
	
		return (
			<div className="col-xs-6 col-sm-6 col-md-3 single">
				<div className="total-numbers" data-perc="1300">
					<div className="iconspace"><i className={"cicon " + this.props.icon}></i></div>									
					<span className="sum">{this.props.total}</span>
						{this.props.title}
				</div>	
			</div>
		);
	}
});


var Milestones = React.createClass({
  propTypes: {
  	milestones: React.PropTypes.array
  },

  getDefaultProps: function () {
  	return {
	  milestones: []
	};
  },
  
  /**
   * @return {object}
   */
  render: function() {

  	var milestones = this.props.milestones.map(function (milestone) {
	  return (
	  	<Milestone icon={milestone.icon} total={milestone.total} title={milestone.title} />
	  );
	});
    return (
	 
		<Parallax bgImage="../img/parallax_code.png" strength={300} fullWidth={true} className="parallax">
			<div className="parallax"> 
			   <div className="container">
				 <div className="title">
				    <h1>Milestones Achieved</h1>
				  </div>
						
				  <div className="row count">
					{milestones}
				  </div>
				</div>	 
     	    </div>	
		</Parallax>
    );
  }

});

module.exports = Milestones;






	