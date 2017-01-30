<template>
    <div :class="[style.classDiv, etatDiv]" :id="id" v-show="show">
        <label :class="style.classLabel" v-show="showLabel">{{labelData}}</label>
        <div :class="style.classControl">
            <select :class="style.classSelect" :data-placeholder="placeholder" :multiple="multiple">
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
    
    var defaultId = "edit-text";
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
                        classDiv: 'form-group row',
                        classLabel: 'col-form-label',
                        classControl: 'col-form-label',
                        classSelect: '' 
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
            /**value: {
                required: true
            },*/
            show: {
                type: Boolean,
                default: true
            },
            enable: Boolean,
            etat: {
                type: String,
                default: "clean",
                validator: function(value) {
                    return _.contains(["clean", "error", "success"], value);
                }
            },
            multiple: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array,
                default: null
            }
        },
        
        /**
        * Data
        */
        data: function() {
            return {
                showLabel: util.isNotNullOrUndefined(this.label),
                labelData: (util.isNotNullOrUndefined(this.label) && this.required)?this.label + " *":this.label,
                etatDiv: (this.etat === 'success'?hasSuccessClass:(this.etat === 'error'?hasErrorClass:''))
            }
        },
        
        mounted: function() {
            var vm = this;
            $(this.$el).find("select").chosen({
                inherit_select_classes: true,
                width: '100%',
                allow_single_deselect: true
            });
            if (this.options) {
                this.updateOptions(this.options);
            }
            
        },
        
        watch: {
            // whenever question changes, this function will run
            options: function (values) {
                this.updateOptions(values);
            }
        },
        
        methods: {
            updateOptions: function(values) {
                var select$ = $(this.$el).find("select");
                select$.empty();
                select$.append($("<option/>", {value: ""}));
                _.each(values, function(el, index) {
                    select$.append($("<option/>", {
                        value: index+1,
                        text: el
                    }));
                });
                select$.trigger("chosen:updated");
            }
        }
        
    }
    
</script>

<!--<style src="../../node_modules/chosen-js/chosen.css"></style>-->
<style src="./style-bootstraps.css"></style>