<script setup>
import { ref, onMounted, toRefs, watch } from 'vue';
import { router } from '../main';
const props = defineProps({
    page:{
        type: Number,
        required: true
    },
    maxPage:{
        type: Number,
        required: true
    }
});

const {page: page, maxPage: maxPage} = toRefs(props);

let current = ref(0);

watch(current, async (newCurrent, oldCurrent) => {
    if(newCurrent > maxPage.value) current.value = maxPage.value;
    if(newCurrent < 0) current.value = 0;
});

onMounted(e => {
    current.value = page.value;
    console.log(current.value, page.value);
});

function goToCurrent(){
    router.push(`/data/${current.value}/`);
}

</script>

<template>
    <div class="flex flex-row flex-center">
        <div :class="`flex flex-row  ${current != 0 ? '' : 'disabled-link'}`">
            <router-link to="/data/0">0</router-link>

            <router-link :to="`/data/${Math.max(0, current - 1)}`" class="mx-1rem"><font-awesome-icon :icon="['fas', 'chevron-left']"/></router-link>
        </div>
        <input input type="text" placeholder="1" v-model="current" @keyup.enter="goToCurrent()" class="pagenation-center"/>
        <div :class="`flex flex-row  ${current != maxPage ? '' : 'disabled-link'}`">
            <router-link :to="`/data/${Math.min(maxPage, current + 1)}`" class="mx-1rem"><font-awesome-icon :icon="['fas', 'chevron-right']"/></router-link>

            <router-link :to="`/data/${maxPage}`">{{maxPage}}</router-link>
        </div>
    </div>
    
</template>

<style>

.pagenation-center{
    font-size: 2rem !important;
    width: 6rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 0.2rem;
    text-align: center;
}
</style>