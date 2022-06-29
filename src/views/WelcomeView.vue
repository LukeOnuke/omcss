<script setup>
import { onMounted } from '@vue/runtime-core';
import Badge from '../components/Badge.vue';

onMounted((a) => {
    document.title = "OMCSS";
});
</script>

<template>
    <div class="hero flex flex-center flex-row bg-secondary-color">
        <section>
            <h1 class="">See what's up!</h1>
            <p>Reliable and precise server information.</p>
        </section>
        <img src="/img/display.png" alt="">
    </div>
    <div class="container">
        <h1>Welcome to OMCSS <Badge>Beta</Badge></h1>
        <p>OMCSS stands for <strong>O</strong>pen <strong>M</strong>inecraft <strong>S</strong>erver <strong>S</strong>tatus. It is designed to use pequlas LittleWeb
        api from the LittleX series of plugins.</p>
        <p>As you can see it is currently in beta, so if you see any bugs <a href="">report em</a>.</p>
        <h2>How to use?</h2>
        <h3>Status</h3>
        <p>Type in your servers api ip (ask your admin if you dont know it) in the input above, or if your server appears on the list click on it.</p>
        <h3>Data</h3>
        <p>Designed for advanced users it allows for a quick data rundown.</p>
        <p>To scroll through the top table use the pagenator controll.</p>
        <h3>Player</h3>
        <p>Not yet implemented.</p>
        
    </div>
</template>