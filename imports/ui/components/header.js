import './header.html';
import * as VideoPlayer from '../../utils/videoPlayer.js';

import { Playlists } from '../../api/playlists/playlists.js';
Template.Header.onCreated(function headerOnCreated() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    menuOpen: false,
    userMenuOpen: false,
  });

});


Template.Header.events({
  'click .vp-play-all'(){
    VideoPlayer.playAll(this._id)
  }
})





/*
Template.Header.helpers({
  playlist() {
    const instance = Template.instance();
    const playlistId = instance.getPlaylistId();
    console.log("pl._id: "+playlistId)
    const pl = Playlists.findOne(playlistId) ? [playlistId] : [];
    console.log("pl.name: "+pl.name)
    return Playlists.findOne(playlistId) ? [playlistId] : [];
  }
})
*/