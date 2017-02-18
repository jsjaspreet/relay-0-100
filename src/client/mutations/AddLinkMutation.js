import Relay from 'react-relay'

// Add Link Mutation - (Range Add) https://facebook.github.io/relay/docs/guides-mutations.html#range-add
class AddLinkMutation extends Relay.Mutation {
  // Specify which mutation we are executing
  getMutation() {
    return Relay.QL`
    mutation  { AddLink }
    `
  }

  // Specify variables passed to the mutation (These are coming from the constructor wherever this mutation is used)
  getVariables() {
    return {
      link: this.props.link,
      linkTitle: this.props.linkTitle
    }
  }

  // Write a 'fat query' (one that represents every field in your data model that
  // could change as a result of this mutation)
  // In this case, we want to update the linkConnection as well as the link itself that is returned
  getFatQuery() {
    return Relay.QL`
    fragment on AddLinkPayload {
      link,
      store { linkConnection }
    }
    `
  }

  // Read the docs and figure out the special key-value pairs to use in the object here
  // https://facebook.github.io/relay/docs/guides-mutations.html#range-add
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'linkConnection',
      edgeName: 'link',
      rangeBehaviors: {
        '': 'append'
      }
    }]
  }

}

export default AddLinkMutation
