<script setup>
import { subscribe, Severity } from '@/reporting.js';
import { ref } from "vue";

let information = ref([]);
subscribe(function (e){
    information.value.push(e);
    if(information.value.length > 3) information.value.pop();

    if(e.severity == Severity.fatal) return;

    setTimeout(() => {
        information.value.splice(information.value.indexOf(e), 1);
    }, 10000);
});
</script>

<template>
    <div class="information-container flex flex-column flex-center">
        <section v-for="i in information" :key="i.time" :class="`information ` + i.severity">
            <h1><font-awesome-icon :icon="['fas', i.severity == Severity.fatal ?  'circle-xmark' : i.severity == Severity.warn ? 'triangle-exclamation' : 'circle-info']" /> {{i.header}}</h1>
            <hr>
            <!--circle-info triangle-exclamation circle-xmark-->
            <p>{{i.body}} | <b><i>{{i.severity}}</i></b> | <a v-if="i.severity == Severity.fatal" href="/">Return to home</a></p>
        </section>
    </div>
</template>

<style>
@import url(@/assets/base.css);

.information-container{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100vw;
    padding: none 2rem none 2rem;
}

.information{
    border-radius: 0.2rem;
    border-width: 1px;
    border-style: solid;
    border-color: var(--info-color);
    background-color: var(--info-bg);
    padding: 0.5rem 1rem 0.5rem 1rem;
    color: var(--info-color);
    margin-bottom: 2rem;
}

.information > hr{
    border-color: var(--info-color);
}

.information.warn{
    --info-color: hsl(51, 80%, 50%);
    --info-bg: hsl(51, 80%, 10%);
}

.information.info{
    --info-color: hsl(207, 80%, 50%);
    --info-bg: hsl(207, 80%, 10%);
}

.information.fatal{
    --info-color: hsl(351, 80%, 50%);
    --info-bg: hsl(351, 80%, 10%);
}
</style>