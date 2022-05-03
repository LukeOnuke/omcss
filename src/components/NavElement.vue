<script setup>
    const props = defineProps({
        href:{
            type: String,
            required: true
        },
    });
</script>

<template>
    <a :href="href" class="navelement"><slot></slot></a>    
</template>

<style>
.navelement{
    font-size: 1.5rem;
}
</style>