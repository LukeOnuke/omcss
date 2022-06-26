<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import InformationDisplay from './components/InformationDisplay.vue';
</script>

<template>
    <NavBar>

    </NavBar>
    
    <router-view></router-view>
    <InformationDisplay></InformationDisplay>
    <Footer></Footer>
</template>

<style>
@import '@/assets/base.css';
</style>
