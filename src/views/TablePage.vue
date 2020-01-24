<template>
    <div>

        <b-row>
            <b-col cols="12" md="8" class="container-fluid">
                <b-card class="m-bg-transparent">
                    <div slot="header">
                        Priemier League Table
                    </div>

                    <div>
                        
                        <b-table :fields="fields" responsive :items="items" :primary-key="items.id" :hover="true" :small="true" head-variant="dark" foot-row-variant="danger">

                                <template v-slot:cell()="data">
                                    
                                    <div class="text-dark teamSelect" @click="handleTeamSelect(data.item.teamId)">
                                    {{ data.value}}
                                    </div>
                                </template>

                              



                        </b-table>
                        
                    </div>
                </b-card>
            </b-col>

        </b-row>
    </div>
</template>

<script>

export default {

    data(){
        return{
            fields: [
                {key: 'Pos'},
                {key: 'Team'},
                {key: 'Pl'},
                {key: 'w', sortable: true},
                {key: 'd'},
                {key: 'l'},
                {key: 'Gd'},
                {key: 'Pts'},
            ],
            items: [],
            blur: false,
        }
    },

    computed:{

        pageLoaded(){
            return this.$store.state.pageLoaded
        },

        competition(){
            return this.$store.state.competition
        },
        totalRows(){
            return this.items.length
        },
    },

    created() {
       this.getTable()
    },

    watch:{
        $route(){
             this.getTable()
        }
    },

    methods: {

        getTable(){
            this.$store.dispatch('getTable').then((result) => {
            
                this.items = result.map(item => {
                    return {
                        Pos : item.position,
                        Team: item.team.name,
                        Pl: item.playedGames,
                        w: item.won,
                        d: item.draw,
                        l: item.lost,
                        Gd: item.goalDifference,
                        Pts: item.points,
                        teamId: item.team.id
                        
                    }
                })

                this.$store.commit('setPageLoaded', true)

            }).catch(() => {
            
            })
        },

        handleTeamSelect(id){
            this.$router.push({ name: 'home', params:{ teamId: id}})
        }
    }
}
</script>

<style>
    .teamSelect{
        cursor: pointer;
    }
</style>
