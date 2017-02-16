import React, { Component } from 'react'
import { LinksContainer, LinksRoute } from '../components/links'
import CreateLinkForm from '../components/createLinkForm'
import Relay from 'react-relay'

// React Router stuff going on here, looking more like config
class App extends Component {
  render() {
    return (
      <div>
        <CreateLinkForm/>
        <Relay.RootContainer
          Component={LinksContainer}
          route={new LinksRoute()}
        />
      </div>
    )
  }
}

export default App