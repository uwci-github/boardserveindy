import React, {Component} from 'react'

class PositionDetails extends Component {
  constructor(props) {
    super(props)
  }

  // TODO: add helper call to get list of skills

  render() {
    return (
      <div style={styles.descriptionContainer}>
        <div style={styles.labelContainer}>
          <span style={styles.label}>Position Category | </span>
          <span style={styles.content}>{this.props.position.positionType}</span>
        </div>
        <div style={styles.labelContainer}>
          <span style={styles.label}>Time Commitment | </span>
          <span style={styles.content}>{this.props.position.timeCommitment}</span>
        </div>
        <div style={styles.labelContainer}>
          <span style={styles.label}>Monetary Commitment | </span>
          <span style={styles.content}>{this.props.position.monetaryCommitment}</span>
        </div>
        <div style={styles.labelContainer}>
          <span style={styles.label}>Skills needed | </span>
          <span style={styles.content}>{this.props.position.skills.join(', ')}</span>
        </div>
      </div>
    )
  }
}

const styles = {
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    fontSize: '14px',
  },

  content: {
    fontSize: '14px',
    fontWeight: 'bold',
  },

  labelContainer: {
    padding: '8px 0'
  }
}

export default PositionDetails