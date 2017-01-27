common     = require 'common'
util       = common.util
$          = require 'jquery'
_          = require 'underscore'
Vue        = require 'vue'
components = require './src'
vueSelect  = require 'vue-select'

Vue.component 'v-select', vueSelect.VueSelect
Vue.component 'modal-bootstrap', components.modalBootstrap
Vue.component 'modal', components.modal
Vue.component 'edit-text', components.editText

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