import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'


import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import MainView from "@/views/MainView.vue"
import WelcomeView from "@/views/WelcomeView.vue"
import PlayerView from "@/views/PlayerView.vue"

import { subscribe } from '@/reporting.js';

const app = createApp(App)

library.add(fas, far, fab)
app.component('font-awesome-icon', FontAwesomeIcon)

export const store = createStore({
    state: {
        adress: "",
        port: 8080
    },
    mutations: {
        changeAdress(state, adress) {
            state.adress = adress;
        }
    },
    getters: {
        getAdress() {
            return state.adress;
        }
    }
});
app.use(store);

const routes = [
    { path: '/status/:apiPath/', component: MainView, props: true },
    { path: '/status/:apiPath/:port', component: MainView, props: true },
    { path: '/player/:idType/:id', component: PlayerView, props: true },
    {
        path: "/",
        component: WelcomeView,
        strict: true,
        sensitive: true,
        children: [

        ]
    }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});


// 5. Mount the root instance.
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

subscribe(function(e) {
    console.log(e);
});

app.mount('#app')