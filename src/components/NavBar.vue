<script setup>
import NavElement from './NavElement.vue';
import NavElement1 from './NavElement.vue';
import AddressInput from './AddressInput.vue';
import Badge from './Badge.vue';

import { onMounted, ref } from 'vue';

let navbar = ref(null);
let sidebar = ref(null);

onMounted(()=>{
  window.matchMedia("(max-width: 768px)").addEventListener("change", (e)=>{
    const sl = sidebar.value;
    if(!e.matches){
      sl.classList.add("nav-collapsable");

      sl.classList.remove("topbar");
    }
  })
});

function burgerClick(){
  const sl = sidebar.value;
  console.log(sl.classList);
  if(sl.classList.contains("nav-collapsable")){
    sl.classList.remove("nav-collapsable");

    sl.classList.add("topbar", "acrylic");
  }else{
    sl.classList.add("nav-collapsable");

    sl.classList.remove("topbar", "acrylic");
  }
   console.log( navbar.value.offsetHeight);
  sl.style.top = navbar.value.offsetHeight + "px";
}
</script>

<template>
    <nav class="flex flex-row flex-space navbar acrylic" ref="navbar">
        <NavElement href="/"><img src="/logo.svg" alt="Open Minecraft Server Status Logo" class="width-height-navbar-char mr-0-5rem"><b class="nav-none">OMCSS</b> <Badge class="nav-none">Beta</Badge></NavElement>
        <AddressInput></AddressInput>
        <button @click="burgerClick()" class="burger-container"><div class="flex flex-column burger"><span></span><span></span><span></span></div></button>
        <section class="flex flex-row flex-gap nav-collapsable" ref="sidebar">
            <NavElement href="/data/0/">Data</NavElement>
            <NavElement href="https://github.com/LukeOnuke/omcss/blob/main/README.md">Docs</NavElement>
            <NavElement href="https://github.com/LukeOnuke/omcss">GitHub</NavElement>
            <NavElement href="https://github.com/LukeOnuke">Creator</NavElement>
        </section>
        
    </nav>
</template>

<style>


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
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;
    
    padding: 0.5vw;
    margin: 0px;
    max-width: 100%;
    width: 99%;
    background-color: rgba(3, 4, 5, 0.5);
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

.topbar{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 7rem;
  flex-direction: column !important;
  justify-content: center;
  background-color: inherit;
  border-bottom-color: var(--highlight);
  border-bottom-style: solid;
  border-bottom-width: 2px;
  background-color: rgba(3, 4, 5, 0.7);
  padding: 1rem;
  z-index: 1;
}
</style>