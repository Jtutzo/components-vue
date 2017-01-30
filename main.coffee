common     = require 'common'
util       = common.util
$          = require 'jquery'
_          = require 'underscore'
Vue        = require 'vue'
components = require './src'

Vue.component 'modal-bootstrap', components.modalBootstrap
Vue.component 'modal', components.modal
Vue.component 'edit-text', components.editText
Vue.component 'edit-select', components.editSelect

$(document).ready () -> 

    window.vm = new Vue 
        el: '#app',
        data:
            nom: "Jérémy"
            etatNom: 'clean'
            showModal: false
            showModalBootstrap: false
            selected: null
            options: ['foo','bar','baz']
        methods:
            validNom: () -> true