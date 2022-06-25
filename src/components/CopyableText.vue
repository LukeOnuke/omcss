<script setup>
    import { toRefs } from 'vue';
    import { report, Severity } from '../reporting';
    const props = defineProps({
        text: String
    });

    const { text } = toRefs(props);

    function copy(){
        navigator.clipboard.writeText(text.value).then(() => {
            report("Copied text successfully!", "Text placed in clipboard.", Severity.info);
        }).catch(e => {
            report("Couldnt copy text!", e, Severity.warn);
        });
    }
</script>

<template>
    <p>{{text}} <font-awesome-icon class="highlight-text" :icon="['far', 'copy']" v-on:click="copy()"/></p>
</template>