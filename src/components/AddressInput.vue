<script setup>
import {store} from "@/main"
import { ref, onMounted } from 'vue'
import { router } from "@/main";
let inputText = ref('');
function clickedQuerry(){
    let adress;
    let port = 8080;
    let textArr = inputText.value.split(':');
    console.log(textArr);
    adress = textArr[0];
    if (textArr.length > 0) {port = textArr[1]} else { port = 8080}
    store.commit('changeAdress', {adress: adress, port: port});
    router.push(`/status/${adress}/${port}`);
}
</script>

<template>
    <section>
        <input placeholder="adress:port" v-model="inputText">
        <button @click="clickedQuerry()">Querry</button>
    </section>
</template>