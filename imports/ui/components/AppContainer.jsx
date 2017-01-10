import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '/imports/ui/components/App'

class AppContainer extends Component {

  render() {
    return (
        <App children={ this.props.children } />
    )
  }

}

export default AppContainer