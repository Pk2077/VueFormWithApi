<template>
    <NewForm />
</template>

<script>
    import NewForm from './components/NewForm.vue'

    export default {
        name: 'App',
        components: {
            NewForm
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
    }
</style>
