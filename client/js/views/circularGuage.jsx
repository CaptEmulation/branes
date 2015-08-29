var React = require('react');
var ReactCountdownClock = require('react-countdown-clock');

var CircularGuage = React.createClass({

	propTypes: {
		halt: React.PropTypes.bool,
		precentage: React.PropTypes.number
	},
	getInitialState: function () {
		return {
		    visible: false
		};
	},

	render: function () {
		
		return (
			<div className="chart">
				<ReactCountdownClock 
					transitionMs={2000}
					targetPercentage={this.props.percentage}
					color="#000"
					alpha={0.9}
					size={170}
					animated={true}
					//onComplete={myCallback}
					//onProgress={this.updatePercent.bind(this)}
				/>
			</div>
		);
	}
});

module.exports = CircularGuage;