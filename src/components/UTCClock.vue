<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { militaryTime } from "@/utill"
let time = ref(new Date());
let timer;

function interval(){
    time.value = new Date();
}

onMounted(() => {
    timer = setInterval(interval, 10000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
    <p>{{militaryTime(time.getUTCHours())}}:{{militaryTime(time.getUTCMinutes())}} UTC</p>
</template>