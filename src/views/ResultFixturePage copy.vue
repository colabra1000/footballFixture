<template>
    <div v-if="pageLoaded">
     
        <b-card>
           
            <div>
                <b-col cols="12" md=8 class="container-fluid">

                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                        <a class="page-link" href="#" @click="getMatchDayMatches(--matchDay)" tabindex="-1"><small>PREV WEEK</small></a>
                        </li>
                        <li class="page-item h3 mx-3">WEEK {{matchDay}}</li>

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

                                    <b-list-group-item v-if="checkGroup(item0)">
                                        {{item0.group}}
                                    </b-list-group-item>


                                    <b-list-group-item>
        
                                    <!-- {{currentItem = item0}} -->

                                        <div class="d-flex justify-content-between">
                                            <b-col cols="4" class="container-fluid">{{item0.homeTeam.name}}</b-col>
                                                <b-col cols="4" class="d-flex flex-column align-items-center">
                                                    <div>
                                                        {{vsOrResult(item0)}}
                                                    </div>
                                                    <div>
                                                        {{getMatchTime(item0)}}
                                                    </div>
                                                </b-col>
                                            <b-col cols="4" class="container-fluid">{{item0.awayTeam.name}}</b-col>
                                        </div>
                                    </b-list-group-item>
                                </div>
                            </b-list-group>
                        
                    </b-card>
                </b-col>
            </div>
        </b-card>
            
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

            finishedMatches: [],

            unFinishedMatches: [],
        }
    },

    computed:{
       pageLoaded(){
           return this.$store.state.pageLoaded
       }
        
    },

    methods:{

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

        vsOrResult(item){
            if (item.status === "SCHEDULED" || item.status === "POSTPONED"){
                return "Vs"
            }else{
                return ''+item.score.fullTime.homeTeam + ' - ' + item.score.fullTime.awayTeam
            }

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
                    this.matchArray[counter].arr.push(item)
                }else{
                    counter += 1
                    this.matchArray[counter] = {id: counter+5, arr:[]}
                    this.matchArray[counter].arr.push(item)
                    firstVal = new Date(item.utcDate).getDay()
                }
            }) 

            

        },

       getMatchesFor(value){

          

            this.matchesFor = this.matches.filter((item) => {
                
               return item.matchday == value  
            })

            // this.finishedMatches = this.matchesFor.filter((item) => item.status === 'FINISHED')
            // this.unFinishedMatches = this.matchesFor.filter((item) => item.status !== 'FINISHED')
        
        },

        getMatchDayMatches(value){
            this.getMatchesFor(value)
            this.partitionMatches()
            this.$forceUpdate()
        }
    },

    created(){
        this.$store.dispatch('getFixtures').then(result => {
            this.matches = result
           
            this.$store.dispatch('getCurrentMatchDay').then(result => {
                this.matchDay = result
                this.getMatchDayMatches(result)
                this.$store.commit('setPageLoaded', true)
            })
        })
    },
}
</script>

