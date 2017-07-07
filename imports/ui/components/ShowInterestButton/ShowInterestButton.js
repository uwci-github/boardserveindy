import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { FlatButton, RaisedButton, Popover} from 'material-ui'
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'
import Loading from '/imports/ui/components/Loading'

class ShowInterestButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      note: ''
    };
  }

  handleOpenDropDown(event) {

    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });

  }

  handleRequestClose() {
    this.setState({
      open: false,
      note: ''
    })
  }

  handleNoteChange(event) {
    this.setState({note: event.target.value})
  }

  handleExpressInterest() {
    console.log('express interest')
    console.log(this.state)
    console.log(this.props)
    const positionId = this.props.position._id

    if (Meteor.user()) {
      const opts = {userId: Meteor.userId(), note: this.state.note};
      Meteor.call('Positions.expressInterest', positionId, opts,
          (err, res) => {
            if (err) {
              alert(err)
            } else {
              console.log('express interest worked!')
            }
          })
    } else {
      console.log('no user logged in!')
    }
    console.log('express interest clicked with positionId: ' + positionId);
  }

  render() {
    if (this.props.loading) {
      return <Loading/>
    } else {

    let label = <div style={styles.label}>
      <span style={styles.label.content}>SHOW INTEREST</span>
      <DropDownArrow style={{...styles.label.content, ...styles.label.icon}}/>
    </div>

    return (
        <div>
          <FlatButton
              children={label}
              style={styles.button.style}
              fullWidth={true}
              backgroundColor={styles.button.backgroundColor}
              onTouchTap={this.handleOpenDropDown.bind(this)}
          />
          <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.handleRequestClose.bind(this)}
          >
            <div style={styles.dropDown}>
              <textarea style={styles.dropDown.note} type="text" value={this.state.note}
                        onChange={this.handleNoteChange.bind(this)}/>
              <div style={styles.dropDown.helperText}>You can choose to send a note later in
                <span style={styles.dropDown.boldHelperText}> My Activity</span>
              </div>
              <div style={styles.dropDown.buttonContainer}>
                <RaisedButton
                    label="SHOW INTEREST"
                    labelStyle={styles.dropDown.button.label}
                    style={styles.dropDown.button}
                    onTouchTap={this.handleExpressInterest.bind(this)}
                />
                <RaisedButton
                    label="CANCEL"
                    labelStyle={styles.dropDown.button.label}
                    style={styles.dropDown.button}
                    onTouchTap={this.handleRequestClose.bind(this)}
                />
              </div>
            </div>
          </Popover>
        </div>
    )
  }
  }
}

ShowInterestButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  position: PropTypes.object.isRequired,
}

export default ShowInterestButton

const styles = {
  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    content: {
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: '500',
    },

    icon: {
      margin: '0 0 0 8px',
      fontSize: '20px',
      height: '20px',
      width: '20px',
    }
  },

  button: {
    backgroundColor: '#0277bd',

    style: {
      width: '100%',
      height: '32px',
      lineHeight: '1.5'
    }
  },

  dropDown: {
    width: '300px',
    height: '160px',
    backgroundColor: '#0277bd',
    padding: '16px',

    note: {
      resize: 'none',
      width: 'calc(100% - 16px)',
      height: '72px',
      padding: '8px',
      border: '0',
    },

    helperText: {
      color: '#ffffff',
      fontSize: '12px',
      margin: '0 0 16px 0',
    },

    boldHelperText: {
      fontWeight: 'bold',
    },

    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },

    button: {
      margin: '0 0 0 16px',
      height: '24px',

      label: {
        color: '#0277bd',
        lineHeight: '24px',
        fontSize: '12px',
        fontWeight: '500',
        textAlign: 'center'
      }
    }
  }
}
