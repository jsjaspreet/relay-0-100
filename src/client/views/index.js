import React, { Component } from 'react'
import { LinksContainer, LinksRoute } from '../components/links'
import { AddLinkRoute, AddLinkContainer }from '../components/addLinkForm'
import Relay from 'react-relay'

// normally React Router stuff would be going on here
class App extends Component {
  render() {
    return (
      <div>
        <Relay.RootContainer
          Component={AddLinkContainer}
          route={new AddLinkRoute()}
        />
        <Relay.RootContainer
          Component={LinksContainer}
          route={new LinksRoute()}
        />
      </div>
    )
  }
}

export default App