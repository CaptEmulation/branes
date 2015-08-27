var React = require('react');
var classnames = require('classnames');
var CircularGuage = require('./circularGuage.jsx');

var Experience = React.createClass({

  getDefaultProps: function () {
    return {
	  skills: []
	};
  },
  
  /**
   * @return {object}
   */
  render: function() {
  	var skills = [];
	  
	this.props.skills.forEach(function (skill, index) {
	  skills.push(
	    <div className="col-xs-12 col-sm-6 col-md-3 chart-padding">
			<CircularGuage percentage={skill.amount}/>
			<div className="skills-content">
				<h3>{skill.title}</h3>
				<p>{skill.summary}</p>
			</div>
		</div>
	  );
	  
	  skills.push(<div className={
	  	classnames(
		  "clearfix", 
		  "visible-xs-block", 
		  index % 4 === 3 ? "visible-lg-block visible-md-block" : null, 
		  index % 2 === 1 ? "visible-sm-block" : null)
	    }></div>);
	});


    return (
      <section id="skills" className="section">
		<div className="container">

			<div className="section-title">
				<h2>Skill</h2>
				<span className="border"></span>
			</div>



			<div className="row">

				{skills}

			</div>

		</div>
	</section>
    );
  }

});

module.exports = Experience;