<template>
    <div :class="[style.div, etatDiv]" :id="id" v-show="show">
        <label :class="style.label" v-show="showLabel">{{labelData}}</label>
        <div :class="style.control">
            <select :class="style.select" :data-placeholder="placeholder" :multiple="multiple">
                <slot></slot>
            </select>
        </div>
    </div>
    
</template>

<script>
    var $ = require('jquery');
    var _    = require('underscore');
    var util = require('common').util
    
    require('chosen-js');
    
    var defaultId = "edit-select";
    var countId   = 0;
    
    var hasErrorClass   = "text-danger has-error";
    var hasSuccessClass = "text-success has-success";
    
    module.exports = {
        
        /**
        * Propriétés
        */
        props: {
            id: {
                type: String,
                default: function() {
                    return defaultId + "-" + countId++;
                }
            },
            style: {
                type: Object,
                default: function() {
                    return {
                        div: 'form-group row',
                        label: 'col-form-label',
                        control: 'col-form-label',
                        select: '' 
                    }
                }
            },
            required: {
                type: [Boolean, String],
                default: false
            },
            maxLength: Number,
            label: String,
            placeholder: String,
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
                default: "clean",
                validator: function(value) {
                    return _.contains(["clean", "error", "success"], value);
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
                default: 'label'
            }
        },
        
        /**
        * Data
        */
        data: function() {
            return {
                showLabel: util.isNotNullOrUndefined(this.label),
                labelData: (util.isNotNullOrUndefined(this.label) && this.required)?this.label + " *":this.label,
                etatDiv: (this.etat === 'success'?hasSuccessClass:(this.etat === 'error'?hasErrorClass:'')),
                optionsData: this.options
            }
        },
        
        mounted: function() {
            var vm = this;
            var select$ = $(this.$el).find("select");
            
            select$.chosen({
                inherit_select_classes: true,
                width: '100%',
                allow_single_deselect: true,
                max_shown_results: vm.maxLength
            });
            
            select$.on("change", this.changeValue);
            
            select$.on("chosen:showing_dropdown", function() {vm.$emit('focus')});
            
            select$.on("chosen:hiding_dropdown", function() {vm.$emit('blur')});
            
            if (this.options) {
                this.updateOptions(this.options);
            }
            if (this.value) {
                this.updateValue(this.value)
                this.changeValue();
            }
        },
        
        watch: {
            options: function(newOptions) {
                this.updateOptions(newOptions);
            },
            value: function(newValue) {
                this.updateValue(newValue);
            },
            etat: function(value) {
                if (value === 'clean') {
                    this.etatDiv = '';
                } else if (value === 'success') {
                    this.etatDiv = hasSuccessClass;
                } else if (value === 'error') {
                    this.etatDiv = hasErrorClass;
                }
            }
        },
        
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
                this.$emit('input', this.multiple?newSelections:newSelections[0]);
            }
        }
        
    }
    
</script>

<style src="./style.css"></style>