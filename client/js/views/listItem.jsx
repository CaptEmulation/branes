var React = require('react');
var cn = require('classnames');

var Item = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  render: function() {
    var classes = cn('item');

    return (
      <li
        className={classes}
        >
        <label>
          {this.props.text}
        </label>
      </li>
    );
  }

});

module.exports = Item;