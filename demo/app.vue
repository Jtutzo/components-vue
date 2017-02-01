<template>
    <div id="demo">
        <div id="demo-text">
            <p>Text: {{ text }}</p>
            <v-text id="text" label="Text" v-model="text" :etat="etatText" required="true" @blur="validText" @focus="etatText='clean'"></v-text>
        </div>

        <div id="demo-date">
            <p>Date: {{ date }}</p>    
            <v-date id="date" label="Date" v-model="date" :etat="etatDate" required="true" @blur="validDate" @focus="etatDate='clean'"></v-date>
        </div>

        <div id="demo-select">
            <p>Select: {{ select }}</p>
            <v-select id="select" label="Select" :options="options" v-model="select" :etat="etatSelect" required="true" @blur="validSelect" @focus="etatSelect='clean'" :multiple="multipleSelect"></v-select>
        </div>

        <div id="demo-modal">
            <p>Show: {{ showModal }}</p>
            <button @click="showModal = true">Open Modal</button>
            <v-modal :show.sync="showModal" @close="showModal = false"></v-modal>
        </div>
    </div>  
</template>

<script>

    var common     = require('common');
    var util       = common.util;
    var $          = require('jquery');
    var _          = require('underscore');
    var Vue        = require('vue');
    var components = require('./../src');
    
    Vue.component('v-text', components.text);
    Vue.component('v-date', components.date);
    Vue.component('v-select', components.select);
    Vue.component('v-modal', components.modal);

    module.exports = {
        
        data: function() {
            return {
                text: 'text',
                etatText: 'clean',
                date: new Date(),
                etatDate: 'clean',
                select: 'foo',
                options: ['foo', 'bar', 'baz'],
                multipleSelect: false,
                etatSelect: 'clean',
                showModal: false   
            }
        },
        
        methods: {
            validText: function() {
                console.log(this.text);
            },
            validDate: function() {
                console.log(this.date);
            },
            validSelect: function() {
                console.log(this.select);
            },
            clear: function() {
                this.text = null;
                this.date = null;
                this.select = null;
            }
        }
    }
    
</script>

<style></style>