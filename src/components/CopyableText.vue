<script setup>
    import { toRefs } from 'vue';
    import { report, Severity } from '../reporting';
    const props = defineProps({
        text:{
            type: String,
            required: true
        },
        codeblock:{
            type: String,
            required: false
        }
    });

    const { text, codeblock } = toRefs(props);

    function copy(){
        navigator.clipboard.writeText(text.value).then(() => {
            report("Copied text successfully!", "Text placed in clipboard.", Severity.info);
        }).catch(e => {
            report("Couldnt copy text!", e, Severity.warn);
        });
    }
</script>

<template>
    <p>
        <pre v-if="codeblock"><code v-html="text"></code></pre> 
        <span v-else>{{text}}</span> 

        <font-awesome-icon class="highlight-text ml-1rem" :icon="['far', 'copy']" v-on:click="copy()"/>
    </p>
</template>