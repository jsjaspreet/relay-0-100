import Relay from 'react-relay'

// Delete Link Mutation - (Node Delete) https://facebook.github.io/relay/docs/guides-mutations.html#node-delete
class DeleteLinkMutation extends Relay.Mutation {
  // Specify Mutation
  getMutation() {
    return Relay.QL`mutation { DeleteLink }`
  }

  // Specify variables passed to the mutation (These are coming from the constructor wherever this mutation is used)
  getVariables() {
    return {
      id: this.props.id
    }
  }

  // Write a 'fat query' (one that represents every field in your data model that
  // could change as a result of this mutation)
  // In this case, we want to update the linkConnection as well as the link itself that is returned
  getFatQuery() {
    return Relay.QL`
    fragment on DeleteLinkPayload {
      link,
      store { linkConnection }
    }
    `
  }

  // Read the docs and figure out the special key-value pairs to use in the object here
  // https://facebook.github.io/relay/docs/guides-mutations.html#node-delete
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'linkConnection',
      deletedIDFieldName: 'deletedLinkId'
    }]
  }

}

export default DeleteLinkMutation
