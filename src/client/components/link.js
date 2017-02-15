import React, { Component } from 'react'
import Relay from 'react-relay'
import { TableRow, TableRowColumn } from 'material-ui/Table';
import moment from 'moment'

function getDateFromCreatedAt(createdAt) {
  return createdAt ? moment(new Date(createdAt)).format('llll') : null
}

class Link extends Component {
  render() {
    const { createdAt, link, linkTitle } = this.props.link
    return (
      <TableRow>
        <TableRowColumn>{getDateFromCreatedAt(createdAt)}</TableRowColumn>
        <TableRowColumn><a href={link}>{linkTitle}</a></TableRowColumn>
      </TableRow>
    )
  }
}

export default Relay.createContainer(Link, {
  fragments: {
    link: () => Relay.QL`
      fragment on LinkType {
        id
        link
        linkTitle
        createdAt
      }
    `
  }
})
