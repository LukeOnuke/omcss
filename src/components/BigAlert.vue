<template>
    <article class="ba-main">
        <div class="red-banner"></div>
        <section class="ba-content">
            <slot></slot>
        </section>
    </article>
</template>

<style>

.red-banner{
    background: red;
    width: 100%;
    height: 1rem;
}

.ba-main{
    background: var(--medium-bg);
    border-radius: 0.5rem;
}

.ba-content{
    padding: 1rem;
}
</style>