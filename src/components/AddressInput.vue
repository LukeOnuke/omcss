<script setup>
import {store} from "@/main"
import { ref, onMounted } from 'vue'
import { router } from "@/main";
let inputText = ref('');
function clickedQuerry(){
    store.commit('changeAdress', inputText.value);
    router.push(`/status/${adress}/`);
}
</script>

<template>
    <section>
        <input placeholder="adress:port" v-model="inputText">
        <button @click="clickedQuerry()">Querry</button>
    </section>
</template>