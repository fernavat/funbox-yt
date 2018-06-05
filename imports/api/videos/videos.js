import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { TAPi18n } from 'meteor/tap:i18n';


class VideosCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    ourDoc.song = ourDoc.song || ""
    ourDoc.artist = ourDoc.artist || ""
    try {
      const result = super.insert(ourDoc, callback);
      return result;
    }
    catch (error) {
      switch (error.code) {
        case 11000: //duplicated video
          super.update({ _id: doc._id }, { $inc: { playlistCount: 1 }, song: ourDoc.song, artist: ourDoc.artist })
          return doc._id
          break
        default:
          console.log("default")
          return false;
      }

    }
  }
  /*
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    incompleteCountDenormalizer.afterUpdateTodo(selector, modifier);
    return result;
  }
  remove(selector) {
    const todos = this.find(selector).fetch();
    const result = super.remove(selector);
    incompleteCountDenormalizer.afterRemoveTodos(todos);
    return result;
  }
  */
}

export const Videos = new VideosCollection('videos');

Videos.schema = new SimpleSchema({
  _id: { type: String },
  title: { type: String },
  thumbS: { type: String },
  thumbM: { type: String },
  song: { type: String, defaultValue: "" },
  artist: { type: String, defaultValue: "" },
  downloaded: { type: Boolean, defaultValue: false },
  playedCount: { type: Number, defaultValue: 0 },
  playlistCount: { type: Number, defaultValue: 0 },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  lastPlayedAt: { type: Date, defaultValue: new Date(0) },


});

Videos.attachSchema(Videos.schema);
/*
// Deny all client-side updates since we will be using methods to manage this collection
Videos.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Factory.define('video', Videos, {});

Videos.helpers({

});
*/