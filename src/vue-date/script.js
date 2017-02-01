var vue        = require('vue');
var datePicker = require('vuejs-datepicker');
var _          = require('underscore');
var dateUtil   = require('common').dateUtil;
var util       = require('common').util;
var conf       = require('./../conf');
    
vue.component('datepicker', datePicker);

var countId = 0;

module.exports = {
        
    /**
    * Propriétés
    */
    props: {
        id: {
            type: String,
            default: function() {
                return conf.id_vue_date + "-" + countId++;
            }
        },
        wrapperClass: String,
        widthLabel: conf.width_label,
        widthControl: conf.width_control,
        required: {
            type: [Boolean, String],
            default: false
        },
        label: String,
        placeholder: String,
        value: {
            required: true
        },
        show: {
            Boolean,
            default: true
        },
        enable: Boolean,
        etat: {
            type: String,
            default: conf.etat[0],
            validator: function(value) {
                return _.contains(conf.etat, value);
            }
        },
        lang: String,
        format: String,
    },
        
    /**
    * Data
    */
    data: function() {
        return {
            showLabel: util.isNotNullOrUndefined(this.label),
            labelData: (util.isNotNullOrUndefined(this.label) && this.required)?this.label + " *":this.label,
            etatDiv: conf.etat_class[this.etat],
            mondayFirst: true
        }
    },
        
    /**
    * Méthodes
    */
    methods: {
        focus: function() {
            this.$emit(conf.events.focus);
        },
        selected: function(value) {
            this.$emit(conf.events.input, value);
            this.$emit(conf.events.blur);
        }
    },
        
    /**
    * Watch
    */
    watch: {
        etat: function(value) {
            this.etatDiv = conf.etat_class[value];
        }
    }
}