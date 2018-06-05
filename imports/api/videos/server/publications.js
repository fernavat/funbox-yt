/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Videos } from '../videos.js';
import { Playlists } from '../../playlists/playlists.js';

Meteor.publish('videos', function videos() {
  //const { playlistId } = params;
  //console.log(playlistId)
  return Videos.find()
})



Meteor.publishComposite('videos.inPlaylist', function videosInPlaylist(params) {

  new SimpleSchema({
    playlistId: { type: String },
  }).validate(params);

  const { playlistId } = params;
  const userId = this.userId;

  return {
    find() {
      const query = {
        _id: playlistId,
        $or: [{ userId: { $exists: false } }, { userId }],
      };

      // We only need the _id field in this query, since it's only
      // used to drive the child queries to get the todos
      const options = {
        fields: { items: 1 },
      };

      return Playlists.find(query, options);
    },

    children: [{
      find(playlist) {
        //return Videos.find({ listId: list._id }, { fields: Todos.publicFields });
        return Videos.find({"_id":{"$in":playlist.items}})


      },
    }],
  };
});