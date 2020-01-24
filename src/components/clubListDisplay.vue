<template>
    <b-row>
        <b-col cols='12' md='6'>
            <b-card header-bg-variant="danger" class="club-list-card m-bg-transparent">
                <div slot="header"><b>Select club</b></div>
                
                <div>

                    <waitingText :loaded="!pageLoaded" :text="'waiting...'"/>
                  
                    <b-list-group flush>
                        <b-list-group-item class="m-bg-none" v-for='item in teamList' href="#" :class="[ selectedTeamId == item.id ? 'active' : '' ]" :key="item.id" @click="handleTeamSelect(item.id)">
                        
                            <clubListItem :item='item'/>
                        </b-list-group-item>
                    </b-list-group>
                </div>
                
            </b-card>
        </b-col>

        <b-col cols="12" md="6">
            <clubFixturesItem :selectedTeamId="selectedTeamId" :teamList="teamList"/>
        </b-col>
    </b-row>
</template>

<script>

import clubListItem from './clubListItem'
import clubFixturesItem from './clubFixturesItem'
import waitingText from './waitingText'


export default {

    components:{
        clubListItem,
        clubFixturesItem,
        waitingText,
    },


   mounted(){
       this.getTeamsList().then(() => {
           this.handleTeamSelect(this.$route.params.teamId)
       })
   },

    data(){
        return {    

            teamList:[],

            selectedTeamId : '',
        }
    },

      watch:{
        competition(){
            this.teamList = []
            this.$store.commit('setPageLoaded', false)
            this.getTeamsList()
            this.$forceUpdate
        },
    },


    computed:{
        pageLoaded(){
            return this.$store.state.pageLoaded
        },

        competition(){
            return this.$store.state.competition.id
        }
    },

    methods:{

        handleTeamSelect(id){
            if (id){
                this.selectedTeamId = id
            }
        },

        getTeamsList(){
            return new Promise(resolve => {

                this.$store.dispatch('getTeamsForCompetition').then(result => {
                    this.teamList = result
                    this.$store.commit('setPageLoaded', true)
                    resolve()
                    // EventBus.$emit('teamsLoaded')
                })
            })
            
        },
    }

       
}
</script>

<style scoped>

    .lds-ring {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;
  }

  .lds-ring div {
    width: 30px;
    height: 30px;
    border-color: rgb(235, 232, 81) transparent transparent transparent;
    
  }

    .club-list-card .card-body{
        padding: 0;
    }
</style>