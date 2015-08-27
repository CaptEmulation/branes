var React = require('react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1>Resume</h1>
      </header>
    );
  }

});

module.exports = Header;