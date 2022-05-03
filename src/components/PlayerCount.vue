<script setup>
    import {toRefs} from "vue"
    const props = defineProps({
        players: Object
    });

    const { players } = toRefs(props);
</script>

<template>
    <p>{{players.online}} / {{players.max}}</p>
</template>