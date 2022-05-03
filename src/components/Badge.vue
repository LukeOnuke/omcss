<template>
    <span class="badge"><slot></slot></span>
</template>

<style>
@import url("@/assets/base.css");
.badge {
    color: var(--text);
    background-color: var(--secondary-bg);
    border-radius: 0.5rem;
    padding: 0.1rem;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
}
</style>