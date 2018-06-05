
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { TAPi18n } from 'meteor/tap:i18n';

import { Videos } from '../videos/videos.js';

class PlaylistsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    ourDoc.updatedAt = ourDoc.updatedAt || new Date();

    const result = super.insert(ourDoc, callback);
  }

}

export const Playlists = new PlaylistsCollection('playlists');

Playlists.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
  items: { type: [String] },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  updatedAt: { type: Date },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  itemsCount: { type: Number }
});

Playlists.attachSchema(Playlists.schema);


Playlists.helpers({
  videos() {

    const order = this.items

    return Videos.find({}, {
      transform: (doc) => {
        doc.position = order.indexOf(doc._id) + 1
        return doc
      }
    }).fetch().sort((a, b) => a.position - b.position)
/*
    let orderedVideos = new Mongo.Collection(null)


    orderedVideos = Videos.find({}, {
      transform: (doc) => {
        doc.position = order.indexOf(doc._id)
        return doc
      }
    })
    return orderedVideos.fetch()
    
    return orderedVideos.find({}, {
      sort: { position: 1 }
    })
    */
  },

});
