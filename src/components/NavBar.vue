<script setup>
import NavElement from './NavElement.vue';
import NavElement1 from './NavElement.vue';
import AddressInput from './AddressInput.vue';
import Badge from './Badge.vue';

</script>

<template>
    <nav class="flex flex-row flex-space navbar">
        <NavElement href="/"><img src="/logo.svg" alt="Open Minecraft Server Status Logo" class="width-height-navbar-char mr-0-5rem"><b class="nav-none">OMCSS</b> <Badge class="nav-none">Beta</Badge></NavElement>
        <AddressInput></AddressInput>
        <button class="burger-container"><div class="flex flex-column burger"><span></span><span></span><span></span></div></button>
        <section class="flex flex-row flex-gap nav-collapsable">
            <NavElement href="https://github.com/LukeOnuke/omcss">GitHub</NavElement>
            <NavElement href="https://github.com/LukeOnuke/omcss/blob/main/README.md">Docs</NavElement>
            <NavElement href="https://github.com/LukeOnuke">Creator</NavElement>
        </section>
        
    </nav>
</template>

<style>
@import url(@/assets/base.css);

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .nav-collapsable{
    display: none !important;
  }

  .burger-container{display: block !important;}
}

@media only screen and (max-width: 650px) {
  .nav-none{
    display: none !important;
  }
}

.navbar{
    padding: 0.5vw;
    margin: 0px;
    max-width: 100%;
    width: 99%;
}

.width-height-navbar-char {
    width: 1.2rem;
    height: 1.2rem;
}

.burger-container{
    display: none;
}
.burger > span{
    background-color: var(--secondary-bg);
    width: 1.5rem;
    height: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
}

.burger:first-child{
    margin-top: 0.2rem;
}
</style>