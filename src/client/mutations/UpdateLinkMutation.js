import Relay from 'react-relay'

// Update Link Mutation - (Fields Change) https://facebook.github.io/relay/docs/guides-mutations.html#fields-change
class UpdateLinkMutation extends Relay.Mutation {
  // Can statically declare hard fragment requirements on Mutation too,
  // in this case we need to definitely know which linkConnectionEdge is being updated and so we declare it as
  // dependency This isn't declared in the Add/Delete mutation since the GraphQL Schema was designed differently for
  // those two response payloads
  static fragments = {
    link: () => Relay.QL`
      fragment on linkConnectionEdge {
        node  {
          id
        }
      }
    `
  }

  // Specify Mutation
  getMutation() {
    return Relay.QL`mutation { UpdateLink }`
  }

  // Specify variables passed to the mutation (These are coming from the constructor wherever this mutation is used)
  getVariables() {
    return {
      id: this.props.id,
      link: this.props.link,
      linkTitle: this.props.linkTitle
    }
  }

  // Write a 'fat query' (one that represents every field in your data model that
  // could change as a result of this mutation)
  // In this case, we want to update the linkConnection as well as the link itself that is returned
  getFatQuery() {
    return Relay.QL`
    fragment on UpdateLinkPayload {
      link 
      store { linkConnection }
    }
    `
  }

  // Read the docs and figure out the special key-value pairs to use in the object here
  // https://facebook.github.io/relay/docs/guides-mutations.html#fields-change
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { link: this.props.id }
    }]
  }

}

export default UpdateLinkMutation
