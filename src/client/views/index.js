import React, { Component } from 'react'
import { LinksContainer, LinksRoute } from '../components/links'
import Relay from 'react-relay'

// React Router stuff going on here, looking more like config
class App extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={LinksContainer}
        route={new LinksRoute()}
      />
    )
  }
}

export default App