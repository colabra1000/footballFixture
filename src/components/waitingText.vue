<template>
  <div>
        <div v-if="loaded" class="text-muted text-center">
            
            {{text}}

        </div>


      
  </div>
</template>

<script>
export default {
    props:{
        loaded:{
            type:Boolean,
            required:true,
            default:false,
        },
        text:{
            type:String,
            required:true,
        }
    },
}
</script>

<style>

</style>