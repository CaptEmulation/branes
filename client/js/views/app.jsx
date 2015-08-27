//var Footer = require('./footer.jsx');
var ListHeader = require('./listHeader.jsx');
var List = require('./list.jsx');
var StickyMenu = require('./stickyMenu.jsx');
var BioSection = require('./bioSection.jsx');
var ExperienceSection = require('./experienceSection.jsx');
var MilestoneSection = require('./milestoneSection.jsx');
var ServiceSection = require('./serviceSection.jsx');
var SkillSection = require('./skillSection.jsx');
var React = require('react');
var resumeStore = require('../stores/resume');
var Reflux = require('reflux');
window.$ = window.jQuery = require('jquery')
require('bootstrap');

var App = React.createClass({
    mixins: [Reflux.connect(resumeStore,"items")],
    getInitialState: function() {
        return {
            items: {}
        };
    },

    componentDidMount: function() {
        
    },
    componentWillUnmount: function() {
        
    },

  /**
   * @return {object}
   */
   /*<StickyMenu navs={["Home", "Contact", "Bio", "Experience", "Skills", "References"]}/>*/

  render: function() {
    return (
      <div>
        <BioSection bio={this.state.items.bio} contacts={this.state.items.contacts} interests={this.state.items.interests}/>
        <ExperienceSection experiences={this.state.items.experiences} educations={this.state.items.educations}/>
        <MilestoneSection milestones={this.state.items.milestones}/>
        <ServiceSection services={this.state.items.services}/>
        <SkillSection skills={this.state.items.skills}/>
      </div>
    );
  }

});


module.exports = App;
