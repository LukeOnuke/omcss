<script setup>
    const props = defineProps({
        name:{
            type: String,
            required: true
        },
        uuid:{
            type: String,
            required: true
        }
    });
</script>

<template>
  <article class="player-container">
      <h1 class="player-h1">{{name}}</h1>
      <img :src="'https://crafatar.com/renders/body/' + uuid" :alt="'Minecraft skin of player ' + name">
  </article>
</template>

<style>
.player-h1{
    text-align: center;
}

.player-container{
    max-width: 150px;
    display: flex;
    flex-direction: column;
}
</style>