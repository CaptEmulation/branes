var React = require('react');
var ReactCountdownClock = require('react-countdown-clock');

var CircularGuage = React.createClass({
	propTypes: {
		precentage: React.PropTypes.number
	},
	render: function () {
		
		return (
			<div className="chart">
				<ReactCountdownClock 
					transitionMs={5000}
					startingPercentage={this.props.percentage}
					color="#000"
					alpha={0.9}
					size={170}
					//onComplete={myCallback}
					//onProgress={this.updatePercent.bind(this)}
				/>
			</div>
		);
	}
});

module.exports = CircularGuage;