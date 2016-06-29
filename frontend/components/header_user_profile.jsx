const React = require('react');

const HeaderUserProfile = React.createClass({
  render(){
    return(
      <ul className="nav">
        <button onClick={this.props.handleLogout} className="auth">
          Log Out
        </button>

        <li className="auth">
          Hi, {this.props.currentUser.email}!
        </li>
      </ul>
    );
  }
});

module.exports = HeaderUserProfile;
