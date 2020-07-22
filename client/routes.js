import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import defaultLayout from './layouts/default.vue'

const home = loadPage('home')

const routes = [
    {path: '/', component: defaultLayout, children: [
        {path: '/', component: home, name: 'home'},
    ]},
]

/**
 * Helper function for loading components
 * @param  {String} templateName    Name of the component to load
 * @return {Function<Promise>}      A Promise, in an function, in an enigma
 */
function loadPage(templateName) {
    return () => import(`./pages/${templateName}.vue`)
}

let options = {
    // Use hashed mode instead of history with electron for simple file based navigation
    // mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        return {x: 0, y: 0}
    },
}

// export default router
export default () => new Router(options)
