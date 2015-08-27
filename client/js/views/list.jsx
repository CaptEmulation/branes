/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var ListItem = require('./listItem.jsx');

var List = React.createClass({

  propTypes: {
    items: ReactPropTypes.array.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.items).length < 1) {
      return null;
    }

    var items = [];

    for (var key in this.props.items) {
      items.push(<ListItem key={key} event={this.props.items[key]} />);
    }

    return (
      <section id="main">
        <ul id="list">{items}</ul>
      </section>
    );
  }
});

module.exports = List;