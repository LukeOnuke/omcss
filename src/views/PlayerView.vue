<script setup>
import { onMounted, toRefs } from 'vue';
import AxiosService from '../services/AxiosService';
const props = defineProps({
    idType:{
      type: String,
      required: true
    },
    id:{
      type: String,
      required: false
    }
});

const {id : id, idType: idType} = toRefs(props);

onMounted((e) => {
    AxiosService.get().then(
        
    );
});
</script>

<template>
    <section class="container pt-3rem">
        <p>{{idType}} - {{id}}</p>
    </section>
    
</template>

<style>
@import url(@/assets/base.css);
</style>