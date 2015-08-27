var React = require('react');

var TimelinePost = React.createClass({
	propTypes: {
		name: React.PropTypes.string,
		title: React.PropTypes.string,
		timeFrame: React.PropTypes.string,
		summary: React.PropTypes.string
	},
	render: function () {
		return (
			<div className="timeline-post">											
				<div className="timeline-post-content-holder">
					<div className="timeline-post-icon"></div>
					<div className="timeline-post-title">
						<h4>{this.props.name}</h4>
					</div>
					<div className="timeline-post-subtitle">
						<p><span>{this.props.title} </span><span className="timeline-duration">{this.props.timeFrame}</span></p>
					</div>
					<div className="timeline-post-content">
						<p>{this.props.summary}</p>
					</div>
				</div>							
			</div>
		);
	}
});


var Experience = React.createClass({

  propTypes: {
  	experiences: React.PropTypes.array,
	educations: React.PropTypes.array
  },
  
  getDefaultProps: function () {
  	return {
	  experiences: [],
	  educations: []
	};
  },

  /**
   * @return {object}
   */
  render: function() {
    
	var leftXp = [], rightXp = [];;
	this.props.experiences.forEach(function (xp, index) {
		var left = (index % 2);
		(left ? leftXp : rightXp).push(
			<TimelinePost name={xp.name} title={xp.title} timeFrame={xp.timeFrame} summary={xp.summary} />
		);
	});
	
	var leftEdu = [], rightEdu = [];;
	this.props.educations.forEach(function (edu, index) {
		var left = (index % 2);
		(left ? leftEdu : rightEdu).push(
			<TimelinePost name={edu.name} title={edu.diploma} timeFrame={edu.timeFrame} summary={edu.summary} />
		);
	});
	
    return (
      <section id="resume" className="section">
		<div className="container">
	
			<div className="section-title">
				<h2>My resume</h2>
				<span className="border"></span>
			</div>
			
			<div className="row">
				<div className="col-md-12">
					<div className="timeline">
	
						<div className="timeline-category exp-category">
							<a className="large bt-timeline">Experience</a>
							<div className="timeline-category-icon">
								<div className="iconspace"><i className="fa-folder-open"></i></div>
							</div>
						</div>
						<div className="col-md-6 timeline-post-left">
							{leftXp}									
						</div>
						<div className="col-md-6 timeline-post-right">
							{rightXp}
						</div>
	
					
						<div className="timeline-category edu-cagegory">
							<a className="large bt-timeline">Education</a>
							<div className="timeline-category-icon">
								<div className="iconspace"><i className="fa-book"></i></div>
							</div>
						</div>
						<div className="col-md-6 timeline-post-left">
							{leftEdu}									
						</div>
						<div className="col-md-6 timeline-post-right">
							{rightEdu}
						</div>
					
						<div className="timeline-end-icon"><span> <i className="fa-bookmark"></i></span></div>
					</div>
				</div>
	
			</div>
		</div>					
	</section>
    );
  }

});

module.exports = Experience;