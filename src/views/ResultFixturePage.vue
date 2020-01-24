<template>
    <div v-if="pageLoaded">
            
            <div>
                <b-col cols="12" md=8 class="container">

                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                        <a class="page-link" href="#" @click="getMatchDayMatches(--matchDay)" tabindex="-1"><small>PREV WEEK</small></a>
                        </li>
                        <li class="page-item h3 mx-3 text-primary">WEEK {{matchDay}}</li>

                        <li class="page-item">
                        <a class="page-link" href="#" @click="getMatchDayMatches(++matchDay)" ><small>NEXT WEEK</small></a>
                        </li>
                    </ul>
                </nav>
                        <b-card no-body class="my-5" v-for="item in matchArray" :key="item.id">
                            <div slot="header" class="d-flex flex-column align-items-center">

                                <div class="m-text-large">
                                    {{getWeekday(new Date(item.arr[0].utcDate).getDay())}}
                                </div>

                                <strong class="text-italic text-danger">
                                    {{new Date(item.arr[0].utcDate).toLocaleDateString()}}
                                </strong>
                            
                            </div>

                            <b-list-group>

                                <div flush v-for="item0 in item.arr" :key="item0.id">

                                    <b-list-group-item>

                                        <div class="d-flex justify-content-between">
                                            
                                           


                                            <b-col cols="4" class="m-text-large text-primary text-left m-text-bold">
                                                 <router-link class="m-link" :to="{name: 'home', params: { teamId : item0.homeTeamId }}">{{item0.homeTeamName}}</router-link>
                                            
                                            </b-col>
                                            
                                            <b-col cols="4" class="d-flex flex-column align-items-center">
                                                <div class="mb-3 m-text-large m-text-bold" v-if="item0.status === 'SCHEDULED' || item0.status === 'POSTPONED'">
                                                    <div> vs </div>
                                                </div>

                                                <div v-else class="d-flex justify-content-around w-100 m-text-large mb-3 text-center">
                                                    <strong>{{item0.score.fullTime.homeTeam}}</strong> <strong> - </strong> <strong>{{item0.score.fullTime.awayTeam}}</strong>
                                                </div>

                                                <div class="text-danger text-center" v-if="item0.status === 'IN_PLAY'">
                                                    ON-GOING
                                                </div>

                                                <div class="text-center text-success" v-else-if="item0.status === 'FINISHED'">
                                                    FULL-TIME
                                                </div>

                                                <div class="text-danger" v-else>
                                                    {{new Date(item0.utcDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}}
                                                </div>
                                               
                                            </b-col>
                                            
                                             <b-col cols="4" class="m-text-large text-primary text-left m-text-bold">
                                                 <router-link class="m-link" :to="{name: 'home', params: { teamId : item0.awayTeamId }}">{{item0.awayTeamName}}</router-link>
                                            </b-col>
                                        </div>
                                    </b-list-group-item>
                                </div>
                            </b-list-group>
                        
                    </b-card>
                </b-col>
            </div>
       
            
    </div>
</template>

<script>
    import weekday from '../_weekday'
export default {


    data(){
        return{

            currentItem: '',

            matches: [],

            matchDay: 14,

            matchesFor: [
               
            ],

            matchGroup: '',

            matchArray:[],

            

            teamList: [],
        }
    },

    computed:{
       pageLoaded(){
           return this.$store.state.pageLoaded
       }
        
    },


    methods:{

        getTeamShortName(id){
            var item = this.teamList.find((item) => item.id == id)
            if(item)
                return item.shortName
        },

         getTeamsList(){     

            this.$store.dispatch('getTeamsForCompetition').then(result => {
                this.teamList = result
            }).catch(()=>{
                
            })
    
        },

        checkGroup(item){
            if(item.group != this.matchGroup){
                this.matchGroup = item.group
                return true
            }

            return false
        },

        getMatchTime(item){
           
            if(item.status === "FINISHED"){
                return "full-time"
            }else{
                return new Date(item.utcDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

            }
        },

        setMatchDay(value){
            this.matchDay = value
        },

        getWeekday(index){
            return weekday.items[index].name
        },

        partitionMatches(){
            
            var firstVal = new Date(this.matchesFor[0].utcDate).getDay()
            var counter = 0
            this.matchArray[counter] = {id:counter+5, arr:[]}
            this.matchesFor.forEach(item => {
                if (new Date(item.utcDate).getDay() == firstVal){
                    this.matchArray[counter].arr.push({
                        id: item.id,
                        utcDate: item.utcDate,
                        status: item.status,
                        matchDay: item.matchDay,
                        score: item.score,
                        homeTeamName : this.getTeamShortName(item.homeTeam.id),
                        awayTeamName : this.getTeamShortName(item.awayTeam.id),
                        homeTeamId: item.homeTeam.id,
                        awayTeamId: item.awayTeam.id,
                        lastUpdated: item.lastUpdated,
                        refree: item.refree,
                    })
                                     
                }else{
                    counter += 1
                    this.matchArray[counter] = {id: counter+5, arr:[]}
                    this.matchArray[counter].arr.push({
                        
                        id: item.id,
                        utcDate: item.utcDate,
                        status: item.status,
                        matchDay: item.matchDay,
                        score: item.score,
                        homeTeamName : this.getTeamShortName(item.homeTeam.id),
                        awayTeamName : this.getTeamShortName(item.awayTeam.id),
                        lastUpdated: item.lastUpdated,
                        refree: item.refree,
                    
                    })
                    firstVal = new Date(item.utcDate).getDay()
                }
            }) 

        },

       getMatchesFor(value){

            this.matchesFor = this.matches.filter((item) => {
               return item.matchday == value  
            })
        
        },

        getMatchDayMatches(value){
            this.getMatchesFor(value)
            this.partitionMatches()
            this.$forceUpdate()
        },

        initializePage(){
            this.getTeamsList()

            this.$store.dispatch('getFixtures').then(result => {
                this.matches = result
            
                this.$store.dispatch('getCurrentMatchDay').then(result => {
                    this.matchDay = result
                    this.getMatchDayMatches(result)
                    this.$store.commit('setPageLoaded', true)
                })
            })
        }
    },

    created(){

        this.initializePage()
    },

    watch:{
        $route(){
            this.initializePage()
        }
        
    }
}
</script>