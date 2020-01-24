<template>
  <div v-if="errorBlur.status" class="errorMessage d-flex justify-content-center align-items-center">
                
            <b-card >

                <div class="d-flex h-100 flex-column">
                    
                    <div class="h-100">
                        {{errorBlur.message}}
                    </div>

                    <div>
                        <div class="d-flex justify-content-between">
                            <b-button variant="outline-primary" @click="handleOk"> OK </b-button>
                            <b-button variant="success" @click="handleReload"> RELOAD </b-button>
                            <div></div>
                        </div>
                    </div>

                </div>
                
            </b-card>

        </div>
</template>

<script>
export default {
    props:{
        errorBlur:{
            required:true,
            type:Object,
        }
    },

    methods: {
        handleOk(){
            this.$store.commit('setErrorBlur', {
                status:false,
                message: ''
            })
            this.$store.commit('setPageLoaded', true)
        },

        handleReload(){
            this.$router.go()
            this.$store.commit('setErrorBlur', {
                status:false,
                message: ''
            })
        }
    },

    data(){
        return{

        }
    }
}
</script>

<style>
    .errorMessage{
      z-index: 2000;
      background:none;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%
  }

  .errorMessage > .card{
      width: 45%;
      height: 30%;

  }


</style>