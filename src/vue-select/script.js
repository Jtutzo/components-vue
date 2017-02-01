var $    = require('jquery');
var _    = require('underscore');
var util = require('common').util
var conf = require('./../conf');
    
require('chosen-js');

var countId   = 0;
    
module.exports = {
        
    /**
    * Propriétés
    */
    props: {
        id: {
            type: String,
            default: function() {
                return conf.id_vue_select + "-" + countId++;
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
        label: String,
        placeholder: {
            type: String,
            default: 'Coucou'
        },
        value: {
            required: true
        },
        show: {
            type: [Boolean, String],
            default: true
        },
        enable: [Boolean, String],
        etat: {
            type: String,
            default: conf.etat[0],
            validator: function(value) {
                return _.contains(conf.etat, value);
            }
        },
        multiple: {
            type: [Boolean, String],
            default: false
        },
        options: {
            type: Array,
            default: null
        },
        reference: {
            type: String,
            default: conf.reference_vue_select
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
            optionsData: this.options
        }
    },
    
    /**
    * Mounted
    */
    mounted: function() {
        var vm = this;
        var select$ = $(this.$el).find("select");
            
        var defaultChosen = conf.chosen;
        defaultChosen.max_shown_results = vm.maxLength;
        select$.chosen(defaultChosen);
            
        select$.on("change", this.changeValue);
            
        select$.on("chosen:showing_dropdown", function() {vm.$emit(conf.events.focus)});
            
        select$.on("chosen:hiding_dropdown", function() {vm.$emit(conf.events.blur)});
            
        if (this.options) {
            this.updateOptions(this.options);
        }
        if (this.value) {
            this.updateValue(this.value)
            this.changeValue();
        }
    },
    
    /**
    * Watch
    */
    watch: {
        options: function(newOptions) {
            this.updateOptions(newOptions);
        },
        value: function(newValue) {
            this.updateValue(newValue);
        },
        etat: function(value) {
            this.etatDiv = conf.etat_class[value];
        }
    },
    
    /**
    * Methods
    */
    methods: {
        updateOptions: function(options) {
            this.optionsData = options
            var select$ = $(this.$el).find("select");
            var value = select$.val();
            select$.empty();
            select$.append($("<option/>", {value: null}));
            var reference = this.reference;
            _.each(options, function(el) {
                select$.append($("<option/>", {
                    value: (util.isObject(el))?el['id']:el,
                    text: (util.isObject(el) && reference)?el[reference]:el
                }));
            });
            select$.trigger("chosen:updated");
            select$.val(value);
            this.changeValue();
        },
        updateValue: function(value) {
            var newValue = null;
            if (util.isArray(value)) {
                newValue = _.map(value, function(el) {
                    return (util.isObject(el))?el['id']:el
                });
            } else if (value) {
                newValue = (util.isObject(value))?value['id']:value
            }
            $(this.$el).find("select").val(newValue);
            $(this.$el).find("select").trigger("chosen:updated");
        },
        changeValue: function() {
            var selections = $(this.$el).find("select").val();
            var newSelections = _.filter(this.optionsData, function(value) {
                if (util.isArray(selections)) {
                    var val = (util.isObject(value))?value['id']:value;
                    return _.contains(selections, (util.isNotNullOrUndefined(val))?val.toString():val);
                } else {
                    return (selections == ((util.isObject(value))?value['id']:value));
                } 
            });
            this.$emit(conf.events.input, this.multiple?newSelections:newSelections[0]);
        }
    }
        
}