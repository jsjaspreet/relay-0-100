import Relay from 'react-relay'

class DeleteLinkMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { DeleteLink }`
  }

  getVariables() {
    return {
      id: this.props.id
    }
  }

  getFatQuery() {
    return Relay.QL`
    fragment on DeleteLinkPayload {
      link,
      store { linkConnection }
    }
    `
  }

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
