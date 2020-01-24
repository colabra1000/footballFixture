<template>
    <b-col v-if="pageLoaded" cols="12" md="8" class="container">
        <b-card class="card-body-nopad">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Higest goal scorers </strong>
            </div>
            <div>
              <b-list-group flush>
                <b-list-group-item v-for="item in scorers" :key="item.player.id">

                  <div class="d-flex justify-content-between align-items-center">
                      <div class="mb-1 m-text-verylarge">{{ item.player.name }}</div>
                      <div class="text-primary m-text-verylarge">{{item.numberOfGoals}}</div>
                  </div>

                  <div>
                    {{item.team.name}}
                  </div>
                      
                  <div class="text-danger">{{item.player.position}}</div>
                </b-list-group-item>
              </b-list-group>
            </div>
          </b-card>
    </b-col>
</template>

<script>
export default {

  data(){
    return{
      scorers : [],
    }
  },

  computed:{
      pageLoaded(){
        return this.$store.state.pageLoaded
      }
  },

    created() {
       this.initializePage()
    },

    watch:{
      $route(){
        this.initializePage()
      },
    },

    methods:{
      initializePage(){
         this.$store.dispatch('getScorers').then((result) => {
            this.scorers = result
            this.$store.commit('setPageLoaded', true)
        })
      }
    }
}
</script>

<style scoped>
  .card-body-nopad .card-body{
    padding: 0;
  }

</style>

