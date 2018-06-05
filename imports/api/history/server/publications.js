/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { History } from '../history.js';


Meteor.publish('history', function () {
    return History.find({}, { sort: { playedAt: -1 }, limit: 50 })
})
