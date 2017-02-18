import React, { Component } from 'react'
import Relay from 'react-relay'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import AddLinkMutation from '../mutations/AddLinkMutation'

// Component for adding an entry is divorced from rest of app, so we create its own Relay Route
// (Relay Route is necessary so we can get the store id)
class AddLinkRoute extends Relay.Route {
  static routeName = 'AddLinks'
  static queries = {
    store: (Component) => Relay.QL`
                query MainQuery {
                  store { 
                    ${Component.getFragment('store')}
                  }
                } `
  }
}

// Regular old form component, using component state and controlled sub-components to handle user input
// Only twist is in handleSubmit, where we are initiating a Relay transaction through a Mutation object
// This is very analogous to dispatching a redux action
class AddLinkForm extends Component {
  constructor(props) {
    super(props)
    this.state = { linkTitle: '', link: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Call mutations with Relay.Store.commitUpdate
  // There is also applyUpdate, which allows more control on when to actually commit a transaction
  // See https://facebook.github.io/relay/docs/api-reference-relay-store.html
  handleSubmit() {
    Relay.Store.commitUpdate(
      new AddLinkMutation({
        link: this.state.link,
        linkTitle: this.state.linkTitle,
        store: this.props.store
      })
    )
    this.setState({ linkTitle: '', link: '' })
  }


  render() {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 50,
        marginTop: 30
      }}>
        <TextField
          hintText="Link Title"
          onChange={(event, linkTitle) => this.setState({ linkTitle })}
          value={this.state.linkTitle}
        /><br />
        <TextField
          hintText="Link"
          onChange={(event, link) => this.setState({ link })}
          value={this.state.link}
        /><br />
        <RaisedButton primary label="Create Link" onClick={this.handleSubmit}/>
      </div>
    )
  }
}

// Create a higher order component by wrapping design-only component with Relay.createContainer
// and specifying the data requirement in a regular GraphQL template string
const AddLinkContainer = Relay.createContainer(AddLinkForm, {
  fragments: {
    store: () => Relay.QL`
    fragment on Store {
      id,
    }
    `
  }
})

// Export route and container for Root Container component construction by a parent component
// https://facebook.github.io/relay/docs/guides-root-container.html#content
export {
  AddLinkRoute,
  AddLinkContainer
}
