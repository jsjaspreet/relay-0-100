import React, { Component } from 'react'
import Relay from 'react-relay'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import AddLinkMutation from '../mutations/AddLinkMutation'

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


class AddLinkForm extends Component {
  constructor(props) {
    super(props)
    this.state = { linkTitle: '', link: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    Relay.Store.update(
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

const AddLinkContainer = Relay.createContainer(AddLinkForm, {
  fragments: {
    store: () => Relay.QL`
    fragment on Store {
      id,
    }
    `
  }
})

export {
  AddLinkRoute,
  AddLinkContainer
}
