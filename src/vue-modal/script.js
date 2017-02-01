var conf       = require('./../conf');

var countId = 0;

module.exports = {
    props: {
        id: {
            type: String,
            default: function() {
                return conf.id_vue_modal + "-" + countId++;
            }
        },
        wrapperClass: String,
        show: [Boolean, String]
    },
    methods: {
        close: function() {
            this.$emit("close");
        }
    }
}