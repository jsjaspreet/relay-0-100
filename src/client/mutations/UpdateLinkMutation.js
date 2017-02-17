import Relay from 'react-relay'

class UpdateLinkMutation extends Relay.Mutation {
  static fragments = {
    link: () => Relay.QL`
      fragment on linkConnectionEdge {
        node  {
          id
        }
      }
    `
  }

  getMutation() {
    return Relay.QL`mutation { UpdateLink }`
  }

  getVariables() {
    return {
      id: this.props.id,
      link: this.props.link,
      linkTitle: this.props.linkTitle
    }
  }

  getFatQuery() {
    return Relay.QL`
    fragment on UpdateLinkPayload {
      link 
      store { linkConnection }
    }
    `
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { link: this.props.id }
    }]
  }

}

export default UpdateLinkMutation
