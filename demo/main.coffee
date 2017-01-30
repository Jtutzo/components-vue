common     = require 'common'
util       = common.util
$          = require 'jquery'
_          = require 'underscore'
Vue        = require 'vue'
components = require '../src'

Vue.component 'modal', components.modal
Vue.component 'edit-text', components.editText
Vue.component 'edit-select', components.editSelect

$(document).ready () -> 

    window.vm = new Vue 
        el: '#app',
        data:
            nom: "Jérémy"
            etatNom: 'clean'
            styleNom:
                div: 'form-group row'
                label: 'col-form-label col-md-2'
                control: 'col-form-label col-md-10'
                input: 'form-control'
            
            showModal: false
            
            selected: {id:1, label: 'foo'}
            options: [{id:1, label: 'foo'}, {id:2, label: 'bar'}, {id:3, label: 'baz'}]
            etatChoix: 'clean'
            styleSelect: 
                div: 'form-group row'
                label: 'col-form-label col-md-2'
                control: 'col-form-label col-md-10'
                select: ''
        
        methods:
            validNom: () -> true
            validChoix: () -> true