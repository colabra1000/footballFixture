<template>
    <b-card header-bg-variant="warning" class="m-bg-transparent">
        <div slot="header"><b>view scores and fixtures</b></div>

            <b-tabs class="shadow">

                <b-tab title="RESULTS" active>
                    <div>
                        <div v-if="!teamFixturesLoaded" class="d-flex justify-content-center">
                            <span class="ring-loader">
                            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </span>
                    </div>

                        <waitingText :loaded="selectedTeamId === ''" :text="'Select a club'"/>

                            <div v-for="item in teamFixtures" :key="item.id">
                                <div v-if="item.status == 'FINISHED'">

                                      <!-- <div class="d-flex justify-content-start mb-2 font-italic m-text-color">
                                            <span>
                                                venue: {{item.venue}}
                                            </span>
                                        </div> -->
                                    <b-row>

                                        <b-col cols="5" class="text-left m-text-large m-text-bold m-text-color">
                                            <div>
                                                {{item.homeTeam.name}}
                                            </div>
                                        </b-col>

                                         <b-col cols="2" class="d-flex justify-content-between text-danger m-text-large m-text-color"> 

                                            <span :class="[item.score.winner == 'HOME_TEAM' ? 'text-primary' : 'text-danger']">{{item.score.fullTime.homeTeam}}</span> -
                                            <span :class="[item.score.winner == 'AWAY_TEAM' ? 'text-primary' : 'text-danger']">{{item.score.fullTime.awayTeam}}</span>
        
                                        </b-col>

                                        <b-col cols="5" class="text-right m-text-large m-text-bold m-text-color">
                                            <div>
                                                {{item.awayTeam.name}}
                                            </div>
                                        </b-col>
                                    </b-row>
  
                                    <div class="d-flex justify-content-around mt-2 mb-4">
                                        <div class="text-danger">
                                            matchDay {{item.matchday}}
                                        </div>

                                        <div class="text-warning">
                                            {{getWeekDay(new Date(item.utcDate).getDay())}}
                                        </div>
                                        <strong class="text-primary font-italic">
                                            {{new Date(item.utcDate).toLocaleDateString()}}
                                        </strong>
                                    </div>
                                
                                    <hr>

                                </div>
                            </div>
                        </div>
                    </b-tab>


                    <b-tab title="FIXTURES">
                        
                        <div>
                            <div v-if="!teamFixturesLoaded" class="d-flex justify-content-center">
                                 <span class="ring-loader">
                                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </span>
                            </div>

                            <waitingText :loaded="selectedTeamId === ''" :text="'Select a club'"/>

                            <div v-for="item in teamFixtures" :key="item.id">
                                <div v-if="item.status != 'FINISHED'">

                                    <!-- <div class="d-flex justify-content-start mb-2 font-italic m-text-color">
                                        <span>
                                            venue: {{item.venue}}
                                        </span>
                                    </div> -->

                                    <b-row>
                                        <b-col cols="5" class="text-left m-text-large m-text-bold m-text-color">
                                            <div>
                                                {{item.homeTeam.name}}
                                            </div>
                                        </b-col>

                                        <b-col cols="2" class="text-center text-danger m-text-large"> Vs </b-col>

                                        <b-col cols="5" class="text-right m-text-large m-text-bold m-text-color">
                                            <div>
                                                {{item.awayTeam.name}}
                                            </div>
                                        </b-col>
                                    </b-row>

                                    
                                    <div class="d-flex justify-content-around mt-2 mb-4">
                                        <div class="text-danger">
                                            matchDay {{item.matchday}}
                                        </div>

                                        <div class="text-warning">
                                            {{getWeekDay(new Date(item.utcDate).getDay())}}
                                        </div>
                                        <strong class="text-primary font-italic">
                                            {{new Date(item.utcDate).toLocaleDateString()}}
                                        </strong>
                                    </div>
                                
                                    <hr>

                                </div>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
            </b-card>
</template>

<script>
import waitingText from './waitingText'
import weekDay from '../_weekday'
export default {

    components:{
        waitingText,
    },

    props:{
        selectedTeamId:{
            required:true,
        },

        teamList:{
            required:true,
            type:Array,
        }
    },

   

    data(){
        return {    

            mTeamList:[],

            teamFixtures:[],

            // selectedTeamId : '',

            teamShortName: [],

            TeamStadium: [],

            mSelectedTeamId: '',
        }
    },

    watch:{
        competition(){
            this.mSelectedTeamId = ''
            this.mTeamList = []
            this.teamFixtures = []
            this.$forceUpdate
        },

        selectedTeamId(id){

            if(this.mSelectedTeamId == id || id === ''){
                return
            }

            this.getFixturesForTeam(id)
            this.mSelectedTeamId = id
            this.mTeamList = this.teamList
            
        }
    },

    computed:{
       

        teamFixturesLoaded(){
            return this.$store.state.teamFixturesLoaded
        },

        competition(){
            return this.$store.state.competition.id
        }

    },

    methods:{

        getTeamShortName(id){
            var item = this.mTeamList.find((item) => item.id == id)
            if(item)
                return item.shortName
            
        },

        getTeamStadium(id){
            var item = this.mTeamList.find((item) => item.id == id)
            if(item)
                return item.venue
     
        },

       getWeekDay(index){
           return weekDay.items[index].name
       },

       

        getFixturesForTeam(id){  

            this.$store.commit('setTeamFixturesLoaded', false)
            this.teamFixtures = []
           
            this.$store.dispatch('getFixturesForTeam', id).then(result => {
                this.$store.commit('setTeamFixturesLoaded', true)
                this.teamFixtures = result                      
                                
                this.$forceUpdate
            })

            
        }
    }
}
</script>

<style>
    .lds-ring {
    width: 30px;
    height: 30px;
  }

  .lds-ring div {
    width: 30px;
    height: 30px;
    border-color: rgb(235, 232, 81) transparent transparent transparent;
    
  }

</style>