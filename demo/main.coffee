$   = require 'jquery'
Vue = require 'vue'
App = require './app.vue'

$(document).ready () -> 
    window.vm = new Vue
        el: '#app'
        render: (createElement) -> createElement App