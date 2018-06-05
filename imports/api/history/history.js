
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//import { Factory } from 'meteor/dburles:factory';
//import { TAPi18n } from 'meteor/tap:i18n';

import { Videos } from '../videos/videos.js';

class HistoryCollection extends Mongo.Collection {
  /*
    update(video, callback) {
        const v = {}
        v._id = video._id
        v.playedAt = new Date()

        super.update({ _id: video._id }, v, { upsert: true })

        //if (super.findOne(ourDoc.videoId)) const result = super.update(ourDoc.videoId, )
        //else const result = super.insert(ourDoc, callback);
    }
*/
}

export const History = new HistoryCollection('history');

History.schema = new SimpleSchema({
    _id: { type: String },
    playedAt: { type: Date },
    //name: { type: String },
    //items: { type: [String] },
    //createdAt: {
    //  type: Date,
    //  denyUpdate: true,
    //},
    //updatedAt: { type: Date },
    //userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
    //itemsCount: { type: Number }
});

History.attachSchema(History.schema);


History.helpers({
    video() {
        return Videos.findOne(this._id)
    },

})