import React, { Component } from 'react'
import Relay from 'react-relay'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import Link from './link'

class LinksRoute extends Relay.Route {
  static routeName = 'Links'
  static queries = {
    store: (Component) => Relay.QL`
                query MainQuery {
                  store { 
                    ${Component.getFragment('store')}
                  }
                } `
  }
}

class Links extends Component {
  render() {
    return (
      <div style={{ width: 1024, margin: 'auto' }}>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Created At</TableHeaderColumn>
              <TableHeaderColumn>Link</TableHeaderColumn>
              <TableHeaderColumn> </TableHeaderColumn>
              <TableHeaderColumn> </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              // The store object contains the link connection graph, for which we map over each edge and create
              // a new Link component (Which has also declared its data requirements as a Relay Container)
              // We thread the props link and store down to the Link component to give it access to its data
              // as well as the store itself so it can fulfill mutation capabilities at a Link level for updates
              this.props.store.linkConnection.edges.map(({ node }) => <Link key={node.id}
                                                                            link={node}
                                                                            store={this.props.store}/>)
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

// You MUST provide initial variables if you use variables at all
// In this case we are asking for the first 100 links, you can use this.props.relay.setVariables to change variables
// https://facebook.github.io/relay/docs/guides-containers.html#requesting-different-data
const LinksContainer = Relay.createContainer(Links, {
  initialVariables: {
    limit: 100
  },
  fragments: {
    store: () => Relay.QL`
    fragment on Store {
      id,
      linkConnection(first: $limit) {
        edges {
          node {
            id 
            ${Link.getFragment('link')}
          }
        }
      }
    }
    `
  }
})

// Export route and container for Root Container component construction by a parent component
// https://facebook.github.io/relay/docs/guides-root-container.html#content
export {
  LinksContainer,
  LinksRoute
}
