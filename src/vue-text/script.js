var _    = require('underscore');
var util = require('common').util
var conf = require('./../conf');

var countId   = 0;
    
module.exports = {
        
    /**
    * Propriétés
    */
    props: {
        id: {
            type: String,
            default: function() {
                return id_vue_text + "-" + countId++;
            }
        },
        wrapperClass: String,
        widthLabel: conf.width_label,
        widthControl: conf.width_control,
        required: {
            type: [Boolean, String],
            default: false
        },
        maxLength: Number,
        type: {
            type: String,
            default: conf.type_vue_text[0],
            validator: function(value) {
                return _.contains(conf.type_vue_text, value);
            }
        },
        min: Number,
        max: Number,
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
        }
    },
        
    /**
    * Data
    */
    data: function() {
        return {
            showLabel: util.isNotNullOrUndefined(this.label),
            labelData: (util.isNotNullOrUndefined(this.label) && this.required)?this.label + " *":this.label,
            etatDiv: conf.etat_class[this.etat],
        }
    },
        
    /**
    * Méthodes
    */
    methods: {
        blur: function() {
            this.$emit("blur");
        },
        focus: function() {
            this.$emit("focus");
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