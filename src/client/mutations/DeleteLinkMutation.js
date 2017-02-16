//import Relay from 'react-relay'
//
//class DeleteLinkMutation extends Relay.Mutation {
//  getMutation() {
//    return Relay.QL`
//    mutation  { DeleteLink }
//    `
//  }
//
//  getVariables() {
//    return {
//      linkTitle: this.props.linkTitle
//    }
//  }
//
//  getFatQuery() {
//    return Relay.QL`
//    fragment on DeleteLinkPayload {
//      link,
//      store { linkConnection }
//    }
//    `
//  }
//
//  getConfigs() {
//    return [{
//      type: 'NODE_DELETE',
//      parentName: 'store',
//      parentID: this.props.store.id,
//      connectionName: 'linkConnection',
//      deletedIDFieldName: 'cursor'
//    }]
//
//
//  }
//
//}
//
//export default AddLinkMutation
