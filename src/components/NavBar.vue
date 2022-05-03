<script setup>
import NavElement from './NavElement.vue';
import NavElement1 from './NavElement.vue';
import AddressInput from './AddressInput.vue';

</script>

<template>
    <nav class="flex flex-row flex-space navbar">
        <NavElement href="/"><b>OMCS</b></NavElement>
        <AddressInput></AddressInput>
        <section class="flex flex-row flex-gap">
            <NavElement href="">GitHub</NavElement>
            <NavElement href="">Docs</NavElement>
            <NavElement href="">Creator</NavElement>
        </section>
        
    </nav>
</template>

<style>
.navbar{
    padding: 0.5vw;
    max-width: 100vw;
    width: 99vw;
}
</style>