import React, { Component } from 'react'
import { FlatButton } from 'material-ui'

import Loading from '/imports/ui/components/Loading'
import CardComponent from '/imports/ui/components/CardComponent'

class UserCard extends Component {
  render() {
    if (this.props.loading) {
      return <Loading/>
    } else {
      let user = this.props.user
      let skills = user.skills.map((skill) => {
        return skill.name
      }).join(', ')

      let body = {
        leftColumn: [{
          label: 'About',
          content: user.summary
        }],
        rightColumn: {
          label: 'Skills',
          content: skills
        }
      }
      return (
          <CardComponent
              key={user.name}  //FIXME: hacky for now - actually get user._id
              imageUrl={user.avatar.original}
              name={`${user.firstName} ${user.lastName}`}
              title={user.tagline}
              subtitle={user.companyName}
              body={body}
              cardType="user"
              cardButtons={VolunteerButtons}
          />
      )
    }
  }
}

export default UserCard

class VolunteerButtons extends Component {
  render() {
    return (


        <div style={styles.buttonContainer}>
          <FlatButton
              label="RECOMMEND"
              labelStyle={styles.button.label}
              style={styles.button.style}
              fullWidth={true}
              backgroundColor={styles.button.backgroundColor}
          />
          <FlatButton
              label="BOOKMARK"
              labelStyle={styles.button.label}
              style={styles.button.style}
              fullWidth={true}
              backgroundColor={styles.button.backgroundColor}
          />
        </div>
    )
  }
}

const styles = {
  button: {
    backgroundColor: '#0277bd',

    label: {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '500',
    },

    style: {
      height: '32px',
      lineHeight: 1
    }
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  }
}