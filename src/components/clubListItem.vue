<template>
    <div class="d-flex justify-content-between ml-3 text-dark">
        <div class="d-flex justify-content-start align-items-center">
           
            <img :src="item.crestUrl" class="crestImage mr-3" alt="c">

            <h4>
                {{item.shortName}}
            </h4>
            
        </div>
        <small>
            {{item.venue}}
        </small>
    </div>
</template>

<script>
export default {
    props:{
        item: {
            required:true,
            type:Object,
        }
    },

    data(){
        return{
            name: this.item.shortName,
            id: this.item.id,
        }
    }

}
</script>

<style lang="scss" scoped>
    .crestImage{
        height: 2.6em;
        widows: 2.6em;
    }
</style>