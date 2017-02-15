import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import App from './views'

ReactDOM.render(
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>, document.getElementById('app')
)

