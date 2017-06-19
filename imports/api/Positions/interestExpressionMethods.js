import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { Positions } from './index';
import { Users } from '/imports/api/Users'

Meteor.methods({

  // Allows the current user to express interest in a given position 
  'Positions.expressInterest'(positionId, opts) {
    check(positionId, String);
    check(opts, Match.Optional(Object));
    check(opts.userId, Match.Optional(String));
    if (!opts) opts = {};
    if (this.connection) opts.userId = this.userId;
    const callingUser = Users.findOne({ _id: opts.userId });
    if (!callingUser) throw Meteor.Error(404, 'calling user not found');
    const position = Positions.findOne({ _id: positionId });
    if (!position) throw Meteor.Error(404, 'position not found');
    
    // Remove their previous expression of interest
    Positions.update(
      { _id: position._id },
      {
        $pull: {
          applicants: {
            userId: opts.userId,
          }
        }
      }
    );
    
    // Add in a new one.
    Positions.update(
      { _id: position._id },
      {
        $push: {
          applicants: {
            userId: opts.userId,
            note: opts.note,
            at: new Date(),
          },
        },
      }
    );
    
  },

  // Allows the current user to remove their interest in a given position.
  'Positions.removeInterest'(positionId, opts) {
    check(positionId, String);
    check(opts, Match.Optional(Object));
    check(opts.userId, Match.Optional(String));
    if (!opts) opts = {};
    if (this.connection) opts.userId = this.userId;
    const callingUser = Users.findOne({ _id: opts.userId });
    if (!callingUser) throw Meteor.Error(404, 'calling user not found');
    const position = Positions.findOne({ _id: positionId });
    if (!position) throw Meteor.Error(404, 'position not found');
    Positions.update(
      { _id: position._id },
      {
        $pull: {
          applicants: {
            userId: opts.userId,
          }
        }
      }
    );
  }

});