<script setup>
import {store} from "@/main"
import { ref, onMounted } from 'vue'
import { router } from "@/main";
let inputText = ref('');
function clickedQuerry(){
    let adress = inputText.value.replace("/", "-").toLowerCase();
    router.push(`/status/${adress}/`);
}
</script>

<template>
    <section class="addressinput">
        <input type="text" placeholder="adress" v-model="inputText" class="address-input-bar" @keyup.enter="clickedQuerry()">
        <button @click="clickedQuerry()">Querry</button>
    </section>
</template>

<style>


@media only screen and (max-width: 650px) {
    .address-input-bar{
        width: 9rem;
    }
}

@media only screen and (max-width: 300px) {
    .address-input-bar{
        width: 6rem;
    }
}

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