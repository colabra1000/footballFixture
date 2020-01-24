import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios

axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "X-Auth-token": '30d8aa28ae5b4a60b541cf3ac0e5b818'
}

Vue.use(Vuex);

export default new Vuex.Store({
    state :{
        competition:{
            name: 'premierLeague',
            id: '2021'
        },
        currentMatchDay: '',
        matches: [],
        teamsId: [],
        pageLoaded: false,
        teamFixturesLoaded: true,
        errorBlur: {
            status:false,
            message: ''   
        }
    },

   
    mutations:{

        setErrorBlur(state, item){
            state.errorBlur.status = item.status
            state.errorBlur.message = item.message
        },

        setPageLoaded(state, loaded){
            state.pageLoaded = loaded
        },

        setTeamFixturesLoaded(state, loaded){
            state.teamFixturesLoaded = loaded
        },

        setCompetitionValue(state, payload){
            state.competition.name = payload.name
            state.competition.id = payload.id
            
        },

        setCurrentMatchDay(state, payload){
            state.currentMatchDay = payload
        },

        setMatches(state, payload){
            state.matches = payload
        },

    },

    actions:{

        getCurrentMatchDay(context){
            if(context.state.currentMatchDay == ''){
                return new Promise((resolve) => {
                    let url = 'https://api.football-data.org/v2/competitions/'+context.state.competition.id+'/standings'
    
                    axios.get(
                        url,
                    ).then((result) => {
                        context.commit('setCurrentMatchDay', result.data.season.currentMatchday)
                        resolve(result.data.season.currentMatchday)
                    }).catch((error)=>{
                        
                        context.commit('setErrorBlur', {
                            status:true,
                            message: error.message   
                        })
                    })
                })
            }else{
                return context.state.currentMatchDay
            }
           
        },
       
        getTable(context){
            return new Promise((resolve) => {
                let url = 'https://api.football-data.org/v2/competitions/'+context.state.competition.id+'/standings'

                axios.get(
                    url,
                ).then((result) => {
                    resolve(result.data.standings[0].table)
                }).catch((error)=>{
                    
                    context.commit('setErrorBlur', {
                        status:true,
                        message: error.message   
                    })
                    
                })
            })
        },
        getScorers(context){
            return new Promise((resolve) => {
                let url = 'https://api.football-data.org/v2/competitions/'+context.state.competition.id+'/scorers'

                axios.get(
                    url,
                ).then((result) => {
                    resolve(result.data.scorers)
                }).catch((error)=>{
                    
                    context.commit('setErrorBlur', {
                        status:true,
                        message: error.message   
                    })
                })
            })
        },
        getFixtures(context){
            
            return new Promise((resolve) => {
                let url = 'https://api.football-data.org/v2/competitions/'+context.state.competition.id+'/matches'

                axios.get(
                    url,
                ).then((result) => {
                    context.commit('setMatches', result.data.matches)
                    resolve(result.data.matches)
                }).catch((error)=>{
                    
                    context.commit('setErrorBlur', {
                        status:true,
                        message: error.message   
                    })
                })
            })
            
        },

        getTeamsForCompetition(context){
            return new Promise((resolve) => {
                let url = "https://api.football-data.org/v2/competitions/"+ context.state.competition.id+"/teams"

                axios.get(
                    url,
                ).then((result) => {
                    //context.commit('setMatches', result.data.matches)
                    resolve(result.data.teams)
                }).catch((error)=>{
                    
                    context.commit('setErrorBlur', {
                        status:true,
                        message: error.message   
                    })
                })
            })
        },


        //get match fixtures for one selected team
        getFixturesForTeam(context, id){

            return new Promise((resolve) => {

                let url = "https://api.football-data.org/v2/teams/"+ id +"/matches"

                axios.get(
                    url,
                ).then((result) => {
                    resolve(result.data.matches)
                }).catch((error)=>{
                    
                    context.commit('setErrorBlur', {
                        status:true,
                        message: error.message   
                    })
                    
                })

            })
           
        }
    },

    getters:{

    }


})