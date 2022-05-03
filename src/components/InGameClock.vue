<script setup>
    import {onMounted, onUnmounted, ref, toRefs} from "vue"
    import { militaryTime } from "@/utill"
    let timer;
    const props = defineProps({
        time: Number
    });

    const { time } = toRefs(props);
    console.log(time.value);
    let timeCurrent = ref(0);
    timeCurrent.value = time.value;

    function interval(){
        timeCurrent.value = (timeCurrent.value + 1) % 24001;
    }


    onMounted(() => {
        timer = setInterval(interval, 16);
    });

    onUnmounted(() => {
        clearInterval(timer);
    });
</script>

<template>
    <p>{{militaryTime(parseInt((Math.round(timeCurrent / 16.666666)) / 60))}} : {{ militaryTime((Math.round(timeCurrent / 16.666666) % 60))}} ({{timeCurrent}})</p>
</template>