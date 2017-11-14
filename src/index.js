import ReactDOM from 'react-dom';
import React, {Component} from 'react';

class Home extends Component {
  state = {
    data: []
  };

  // Render
  render() {
    return (
      <h1 style={}>hi guys</h1>
    );
  }
}

window.onload = () => {
  ReactDOM.render(React.createElement(Home), document.getElementById('root'));
}
