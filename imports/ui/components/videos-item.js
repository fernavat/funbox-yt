import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//import { $ } from 'meteor/jquery';
//import { _ } from 'meteor/underscore';

import * as VideoPlayer from '../../utils/videoPlayer.js';


import swal from 'sweetalert2';
import './videos-item.html';
import { Videos } from '../../api/videos/videos.js';


Template.Videos_item.onCreated(function () {
  /*
  this.addToQueue = (video) => {
    const Queue = new Mongo.Collection('queue', {connection: null})
    video.position=Queue.find().count()+1
    Queue.insert(video)
    //console.log(Queue.find().fetch())
  };
  */
})

Template.Videos_item.events({
  'click .add'(event, instance) {
    swal({
      title: 'Agregar Video',
      imageUrl: this.video.thumbM,
      showCancelButton: true,
      text: this.video.title,
      confirmButtonText: 'Agregar a la lista',
      cancelButtonText: 'Tocar enseguida',
    }).then((result) => {
      if (result.value) {
        //instance.addToQueue(this.video)
        VideoPlayer.queue(this.video)
        swal({
          position: 'top-end',
          type: 'success',
          text: 'El video se agregó a la lista de reproducción.',
          title: 'Agregado!',
          showConfirmButton: false,
          timer: 2500
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        VideoPlayer.playNext(this.video)
        swal({
          position: 'top-end',
          type: 'success',
          text: 'El video será reproducido enseguida',
          title: 'Agregado!',
          showConfirmButton: false,
          timer: 2500
        })
      }
    })

  },
  'click .button-cancel'(){
    alert('favoritos')
  },
  'click .play'(event) {
    VideoPlayer.play(this.video)
    /*
    var videoPlayer = document.getElementById('videoPlayer')
    videoPlayer.src = '/video/' + this.video._id
    videoPlayer.play()
    Session.set('videoPlaying', this.video)
   */ 

    swal({
      position: 'top-end',
      text: this.video.title,
      title: 'Reproduciendo!',
      showConfirmButton: false,
      timer: 2500
    })
    /*
    swal({
      title: 'Agregar Video',
      imageUrl: this.video.thumbM,
      text: this.video.title,
      showCancelButton: true,
      confirmButtonText: 'Agregar a la lista',
      cancelButtonText: 'Tocar enseguida',
    }).then((result) => {
      if (result.value) {
        swal({
          position: 'top-end',
          type: 'success',
          text: 'El video se agregó a la lista de reproducción.',
          title: 'Agregado!',
          showConfirmButton: false,
          timer: 2500
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal({
          position: 'top-end',
          type: 'success',
          text: 'El video será reproducido enseguida',
          title: 'Agregado!',
          showConfirmButton: false,
          timer: 2500
        })
      }
    })*/
  }
})
/*

  position: 'top-end',
  type: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500


import {
  setCheckedStatus,
  updateText,
  remove,
} from '../../api/todos/methods.js';

import { displayError } from '../lib/errors.js';

Template.Todos_item.onCreated(function todosItemOnCreated() {
  this.autorun(() => {
    new SimpleSchema({
      todo: { type: Todos._helpers },
      editing: { type: Boolean, optional: true },
      onEditingChange: { type: Function },
    }).validate(Template.currentData());
  });
});

Template.Todos_item.helpers({
  checkedClass(todo) {
    return todo.checked && 'checked';
  },
  editingClass(editing) {
    return editing && 'editing';
  },
});

Template.Todos_item.events({
  'change [type=checkbox]'(event) {
    const checked = $(event.target).is(':checked');

    setCheckedStatus.call({
      todoId: this.todo._id,
      newCheckedStatus: checked,
    });
  },

  'focus input[type=text]'() {
    this.onEditingChange(true);
  },

  'blur input[type=text]'() {
    if (this.editing) {
      this.onEditingChange(false);
    }
  },

  'keydown input[type=text]'(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  // update the text of the item on keypress but throttle the event to ensure
  // we don't flood the server with updates (handles the event at most once
  // every 300ms)
  'keyup input[type=text]': _.throttle(function todosItemKeyUpInner(event) {
    updateText.call({
      todoId: this.todo._id,
      newText: event.target.value,
    }, displayError);
  }, 300),

  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-delete-item, click .js-delete-item'() {
    remove.call({
      todoId: this.todo._id,
    }, displayError);
  },
});
*/