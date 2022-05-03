<script setup>
    import { toRefs } from 'vue';
    const props = defineProps({
        text: String
    });

    const { text } = toRefs(props);

    function copy(){
        navigator.clipboard.writeText(text.value);
    }
</script>

<template>
    <p>{{text}} <font-awesome-icon class="highlight-text" :icon="['far', 'copy']" v-on:click="copy()"/></p>
</template>