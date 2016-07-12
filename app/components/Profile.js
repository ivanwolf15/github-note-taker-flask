var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var helpers = require('../utils/helpers');

var Profile = React.createClass({

  getInitialState: function(){
    return {
      notes: ["Falta actualizar las notas"],
      bio: {},
      repos: []
    }
  },
  componentDidMount: function(){
    this.init(this.props.params.username);
  },
  componentWillReceiveProps: function(nextProps){
    this.init(nextProps.params.username)
  },
  init: function(username){
    helpers.getGithubInfo(username)
      .then(function(data){
        this.setState({
          bio: data.bio,
          repos: data.repos
        })
      }.bind(this));
    helpers.getNotes(username)
      .then(function(data){
        this.setState({
          notes: data.notes
        })
      }.bind(this));
  },
  handleAddNote: function(newNote){
    var username = this.props.params.username;
    helpers.addNote(username, newNote)
      .then(function(data){
        this.setState({
          notes: data.notes
        })
      }.bind(this));
  },
  render: function(){
    return(
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes
            username={this.props.params.username}
            notes={this.state.notes}
            addNote={this.handleAddNote}
          />
        </div>
      </div>
    )
  }
});

module.exports = Profile;
