import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { Positions } from '/imports/api/Positions'
import { Organizations } from "/imports/api/Organizations/index"

import RecommendButton from './RecommendButton'

class RecommendButtonContainer extends Component {

  render() {
    return <RecommendButton { ...this.props } />
  }

}

RecommendButtonContainer.propTypes = {

}

const mapStateToProps = ({ user }) => ({ currentUser: user.currentUser })

export default connect(mapStateToProps)(createContainer(props => {
  const currentUser = !_.get(props, 'currentUser._id') ? {} : props.currentUser
  let isOrgAdmin = false
  let positions = []

  if (_.isEmpty(currentUser)) return {loading: false, currentUser: props.currentUser, isOrgAdmin, positions}

  const orgSubscription = Meteor.subscribe('Organizations.thatUserAdmins', currentUser._id)
  if (!orgSubscription.ready()) return {loading: true, currentUser: {}, isOrgAdmin, positions}
  const orgs = Organizations.find({admins: currentUser._id}).fetch()
  let positionIds = []
  if (!orgs) {
    isOrgAdmin = false
  } else {
    isOrgAdmin = true
    for (let org of orgs) {
      positionIds = positions.concat(org.positions)
    }
  }

  if (positionIds.length > 0) {
    const positionQuery = {_id: {$in: positionIds}}
    const positionSubscription = Meteor.subscribe('Positions.get', positionQuery)
    if (!positionSubscription.ready()) return {loading: true, currentUser, isOrgAdmin, positions}

    const positionsFull = Positions.find(positionQuery).fetch()
    const volunteerBeingRecommendedId = props.volunteer._id

    // Format Position Array for Drop Down Menu
    for (let position of positionsFull) {
      // Can only recommend user if they have not already been recommended for that position
      const canRecommendPosition = !_.get(position, 'recommendations') ? true : position.recommendations.find(r => {
        return r.userId !== volunteerBeingRecommendedId;
      });
      if (canRecommendPosition) {
        positions.push({id: position._id, name: position.name})
      }
    }
  }

  return {loading: false, currentUser, isOrgAdmin, positions}
}, RecommendButtonContainer))