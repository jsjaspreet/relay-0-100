import React, { Component } from 'react'
import Relay from 'react-relay'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Popover from 'material-ui/Popover'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import DeleteLinkMutation from '../mutations/DeleteLinkMutation'
import moment from 'moment'

function getDateFromCreatedAt(createdAt) {
  return createdAt ? moment(new Date(createdAt)).utcOffset(8).format('llll') : null
}

class Link extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.state = { open: false, link: '', linkTitle: '' }
  }

  handleDelete() {
    this.props.relay.commitUpdate(
      new DeleteLinkMutation({
        id: this.props.id,
        store: this.props.store
      })
    )
  }

  handleUpdate() {
    this.setState({ linkTitle: '', link: '' })
    this.handleRequestClose()
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { createdAt, link, linkTitle } = this.props.link
    return (
      <TableRow>
        <TableRowColumn>
          {getDateFromCreatedAt(createdAt)}
        </TableRowColumn>
        <TableRowColumn>
          <a href={link}>{linkTitle}</a>
        </TableRowColumn>
        <TableRowColumn>
          <RaisedButton secondary label="Delete" onClick={this.handleDelete}/>
        </TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            onTouchTap={this.handleTouchTap}
            label="Update"
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <div style={{ display: "flex", flexDirection: "column", margin: 5, alignItems: "center" }}>
              <TextField hintText="Link"
                         value={this.state.link}
                         onChange={(event, link) => this.setState({ link })}/>
              <TextField hintText="Link Title"
                         onChange={(event, linkTitle) => this.setState({ linkTitle })}
                         value={this.state.linkTitle}/>
              <RaisedButton onClick={this.handleUpdate} style={{ width: 50 }} label="Submit"/>
            </div>
          </Popover>
        </TableRowColumn>
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
