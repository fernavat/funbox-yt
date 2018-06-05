import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import swal from 'sweetalert2';
import './keypad.html';

Template.Keypad.onCreated(function () {
  this.asteriscs = new ReactiveVar('');
  this.password = new ReactiveVar('');
})

Template.Keypad.helpers({
  asteriscs() {
    return Template.instance().asteriscs.get();
  }
})

Template.Keypad.events({
  'click .button-keypad'(event, template) {
    const asteriscs = template.asteriscs.get() + '*'
    const password = template.password.get() + event.target.innerHTML
    template.asteriscs.set(asteriscs)
    template.password.set(password)
    if (asteriscs.length > 3 && !loginAdmin(password)) {
      template.asteriscs.set('')
      template.password.set('')
    }
  },
  'click .button-keypad-back'(event, template) {
    const asteriscs = template.asteriscs.get()
    const password = template.password.get()
    if (asteriscs.length > 0) {
      template.asteriscs.set(asteriscs.slice(0, -1))
      template.password.set(password.slice(0, -1))
    }
  },
  'click .button-keypad-enter'(event, template){
    if (!loginAdmin(template.password.get())) {
      template.asteriscs.set('')
      template.password.set('')
    }
  }
})

const loginAdmin = (password) => {
  Meteor.loginWithPassword('admin', password, function (error) {
    if (error) {
      swal({
        //position: 'top-end',
        type: 'error',
        text: 'Contraseña inválida.',
        title: 'Error',
        //showConfirmButton: false,
        //timer: 2500
      })
      return false
    }
    else {
      swal({
        position: 'top-end',
        type: 'success',
        text: 'Ya puedes configurar el sistema.',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 2500
      })
      FlowRouter.go(FlowRouter.lastRoutePath)
      return true
    }
  })
}

