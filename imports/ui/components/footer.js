import { FlowRouter } from 'meteor/kadira:flow-router';
import './footer.html';

import swal from 'sweetalert2';

import * as VideoPlayer from '../../utils/videoPlayer.js';

Template.Footer.helpers({
  videoTitle() {
    //return "titulo eaea"
    const videoPlaying = Session.get('videoPlaying')
    if (videoPlaying) return videoPlaying.title
    else return "Nada tocando"
  }
})

Template.Footer.events({
  'click .title-page'() {
    const videoPlaying = Session.get('videoPlaying')
    if (videoPlaying) FlowRouter.go('/playing')
    /*
      swal({
        title: "Tocando ahora",
        imageUrl: videoPlaying.thumbM,
        text: videoPlaying.title,
        confirmButtonText: '<i class="fas fa-heart"></i> Favoritos',
        showCancelButton: true,
        cancelButtonText: '<i class="fas fa-pause"></i> Pausa'
      }).then((result) => {
        if (result.value) {
          swal({
            position: 'top-end',
            type: 'success',
            text: 'El video se agregó a favoritos.',
            title: 'Favoritos!',
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
            text: 'El video se pauso',
            title: 'Pausado!',
            showConfirmButton: false,
            timer: 2500
          })
        }
      })*/
      
  },
  'click .vp-next'() {
    VideoPlayer.next()
  }
})