import Vue from 'vue'
import VueForm from 'vue-form'

const options = {
    validators: {
        'sin-espacios': function (value) {
            return !value.includes(' ')
        }
    }
}

Vue.use(VueForm, options)