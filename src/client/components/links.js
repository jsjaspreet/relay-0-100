import React, { Component } from 'react'
import Relay from 'react-relay'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.props.store.linkConnection.edges.map((edge) => <Link id={edge.node.id}
                                                                        link={edge.node}
                                                                        store={this.props.store}/>)
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}


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

export {
  LinksContainer,
  LinksRoute
}
