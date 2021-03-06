import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

import { Playlists } from '../../api/playlists/playlists.js';
import { Videos } from '../../api/videos/videos.js';

import { listRenderHold } from '../launch-screen.js';
import './playlists-show-page.html';

// Components used inside the template
import './app-not-found.js';
import '../components/playlists-show.js';
import '../components/header.js'
import '../components/footer.js'

Template.Playlists_show_page.onCreated(function playlistsShowPageOnCreated() {
  this.getPlaylistId = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('videos.inPlaylist', { playlistId: this.getPlaylistId() });
  });

});

Template.Playlists_show_page.onRendered(function playlistsShowPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      listRenderHold.release();
    }
  });
});

Template.Playlists_show_page.helpers({
  videoPlaying(){
    return videoPlaying
  },
  playlistIdArray() {
    const instance = Template.instance();
    const playlistId = instance.getPlaylistId();
    return Playlists.findOne(playlistId) ? [playlistId] : [];
  },
  playlistArgs(playlistId) {
    const instance = Template.instance();
    // By finding the list with only the `_id` field set, we don't create a dependency on the
    // `list.incompleteCount`, and avoid re-rendering the todos when it changes
    const playlist = Playlists.findOne(playlistId, { fields: { _id: true, items: true } });
    const videos = playlist && playlist.videos();
    return {
      videosReady: instance.subscriptionsReady(),
      // We pass `list` (which contains the full list, with all fields, as a function
      // because we want to control reactivity. When you check a todo item, the
      // `list.incompleteCount` changes. If we didn't do this the entire list would
      // re-render whenever you checked an item. By isolating the reactiviy on the list
      // to the area that cares about it, we stop it from happening.
      playlist() {
        return Playlists.findOne(playlistId);
      },
      videos,
    };
  },
  playlist(){
    const instance = Template.instance();
    const playlistId = instance.getPlaylistId();
    //return Playlists.findOne(playlistId) 
    return Playlists.findOne(playlistId) 

  }
})
/*
Template.Lists_show_page.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  listIdArray() {
    const instance = Template.instance();
    const listId = instance.getListId();
    return Lists.findOne(listId) ? [listId] : [];
  },
  listArgs(listId) {
    const instance = Template.instance();
    // By finding the list with only the `_id` field set, we don't create a dependency on the
    // `list.incompleteCount`, and avoid re-rendering the todos when it changes
    const list = Lists.findOne(listId, { fields: { _id: true } });
    const todos = list && list.todos();
    return {
      todosReady: instance.subscriptionsReady(),
      // We pass `list` (which contains the full list, with all fields, as a function
      // because we want to control reactivity. When you check a todo item, the
      // `list.incompleteCount` changes. If we didn't do this the entire list would
      // re-render whenever you checked an item. By isolating the reactiviy on the list
      // to the area that cares about it, we stop it from happening.
      list() {
        return Lists.findOne(listId);
      },
      todos,
    };
  },
});
*/