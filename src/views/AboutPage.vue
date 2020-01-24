<template>
    <div class="container fluid">
        <b-card class="m-bg-transparent">
            <div>
                This is an assessment test for front end development
                <strong>Email:</strong> Kpakisnique@gmail.com
            </div>
        </b-card>
    </div>
</template>

<script>
export default {

    created(){
        this.$store.commit('setPageLoaded', true)
    }
}
</script>
    

<style>

</style>