<script setup>
import NavElement from './NavElement.vue';
import NavElement1 from './NavElement.vue';
import AddressInput from './AddressInput.vue';
import Badge from './Badge.vue';

</script>

<template>
    <nav class="flex flex-row flex-space navbar">
        <NavElement href="/"><b>OMCSS</b> <Badge>Beta</Badge></NavElement>
        <AddressInput></AddressInput>
        <section class="flex flex-row flex-gap">
            <NavElement href="https://github.com/LukeOnuke/omcss">GitHub</NavElement>
            <NavElement href="https://github.com/LukeOnuke/omcss/blob/main/README.md">Docs</NavElement>
            <NavElement href="https://github.com/LukeOnuke">Creator</NavElement>
        </section>
        
    </nav>
</template>

<style>
.navbar{
    padding: 0.5vw;
    max-width: 99vw;
    width: 99vw;
}
</style>