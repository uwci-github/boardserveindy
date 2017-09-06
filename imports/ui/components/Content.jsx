import React, { Component } from 'react'

class Content extends Component {
  render() {
    return (
      <div style={styles.content}>
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  content: {
    width: '80%',
    maxWidth: 1440,
    margin: 'auto',
    padding: '24px'
  },
}

export default Content