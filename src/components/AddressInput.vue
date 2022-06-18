<script setup>
import {store} from "@/main"
import { ref, onMounted } from 'vue'
import { router } from "@/main";
let inputText = ref('');
function clickedQuerry(){
    let adress = inputText.value.replace("/", "-");
    store.commit('changeAdress', adress);
    router.push(`/status/${adress}/`);
}
</script>

<template>
    <section class="addressinput">
        <input placeholder="adress" v-model="inputText" @keyup.enter="clickedQuerry()">
        <button @click="clickedQuerry()">Querry</button>
    </section>
</template>

<style>
@import '@/assets/base.css';
.addressinput{
    border-radius: 0.2rem;
    border-style: solid;
    border-width: 2px;
    border-color: var(--border);
}

.addressinput > input{
    border-right-width: 0px !important;
    margin-right: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
}

.addressinput > button{
    border-left-width: 0px !important;
    margin-left: 0px !important;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
}
</style>