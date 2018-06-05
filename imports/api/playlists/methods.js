import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Playlists } from './playlists.js';
/*
export const insertPlaylist = new ValidatedMethod({
  name: 'Playlists.methods.insert',
  validate: new SimpleSchema({
    title: { type: String },
    director: { type: String },
    releaseYear: { type: Number },
    actors: { type: [Object] },
    'actors.$.name': { type: String },
  }).validator(),
  run(movie) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to add a new movie!');
    }

    Movies.insert(movie);
  },
});*/