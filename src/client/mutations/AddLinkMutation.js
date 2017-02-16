import Relay from 'react-relay'

class AddLinkMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
    mutation  { AddLink }
    `
  }

  getVariables() {
    return {
      link: this.props.link,
      linkTitle: this.props.linkTitle
    }
  }

  getFatQuery() {
    return Relay.QL`
    fragment on AddLinkPayload {
      link,
      store { linkConnection }
    }
    `
  }

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
