import { Playlists } from '../api/playlists/playlists.js'
import { Videos } from '../api/videos/videos.js'
//import { History } from '../api/history/history.js'


import {
  insert,
} from '../api/history/methods.js';

export const toHistory = () => {
  const video = Session.get('videoPlaying')
  Session.set('toHistory', true)
  insert.call({ videoId: video._id });
}

export const play = (video) => {
  const videoPlaying = Session.get('videoPlaying')
  if(videoPlaying){
    const history = Session.get('localHistory')
    const index = history.items.findIndex(i => i._id === videoPlaying._id)
    if (index != -1) history.items.splice(index, 1)
    history.items.unshift(videoPlaying)
    Session.set('localHistory', history)
  }
  const vp = document.getElementById('videoPlayer')
  vp.src = '/video/' + video._id
  vp.play()
  Session.set('paused', false)
  Session.set('toHistory', false)
  Session.set('videoPlaying', video)
  Session.set('selectedItem', video._id)
  Session.set('duration', 0)
}

export const queue = (video) => {
  let queue = Session.get('localQueue')
  if (!queue.items.some(v => v._id === video._id))
    queue.items.push(video)
  Session.set('localQueue', queue)
}

export const playNext = (video) => {
  let queue = Session.get('localQueue')
  let index = queue.items.findIndex(i => i._id === video._id)
  if (index != -1) queue.items.splice(index, 1)
  queue.items.unshift(video)
  Session.set('localQueue', queue)
}

export const pause = () => {
  const vp = document.getElementById('videoPlayer')
  if (vp.paused) {
    vp.play()
    Session.set('paused', false)
  }
  else {
    vp.pause()
    Session.set('paused', true)
  }
}

export const previous = () => {
  const vp = document.getElementById('videoPlayer')
  
  if (Session.equals('toHistory', true)) {
    vp.currentTime = 0
    Session.set('toHistory',false)
  }
  else {
    const history = Session.get('localHistory')
    const video = history.items.shift()
    if (video) {
      const videoPlaying = Session.get('videoPlaying')
      const queue = Session.get('localQueue')
      const index = queue.items.findIndex(i => i._id === videoPlaying._id)
      if (index != -1) queue.items.splice(index, 1)
      queue.items.unshift(videoPlaying)
      Session.set('localQueue', queue)
      play(video)
      Session.set('localHistory', history)
    }
    else {
      //init()
    }
  }
}

const init = () => {
  const videoPlaying = Session.get('videoPlaying')
  if(videoPlaying){
    const history = Session.get('localHistory')
    const index = history.items.findIndex(i => i._id === videoPlaying._id)
    if (index != -1) history.items.splice(index, 1)
    history.items.unshift(videoPlaying)
    Session.set('localHistory', history)
  }
  const vp = document.getElementById('videoPlayer')
  Session.set('selectedItem', '')
  Session.set('videoPlaying', null)
  Session.set('paused', false)
  Session.set('toHistory', false)
  Session.set('duration', 0)
  vp.removeAttribute('src');
  vp.load()
}

export const next = () => {
  let queue = Session.get('localQueue')
  let video = queue.items.shift()
  if (video) {
    play(video)
    Session.set('localQueue', queue)
  }
  else {
    init()
  }
}

export const playAll = (playlistId) => {
  const playlist = Playlists.findOne(playlistId, { fields: { _id: true, items: true } });
  const videos = playlist && playlist.videos();
  Session.set('localQueue', { name: 'Lista de Reproduccion', items: videos })
  next()
}

export const shuffle = () => {
  let array = Session.get('localQueue').items
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  Session.set('localQueue', { name: 'Lista de Reproduccion', items: array })
}