<template>
    <div>
        <clubListDisplay/>
    </div>
</template>

<script>
import competitions from '../_competitions'
import clubListDisplay from '../components/clubListDisplay'

export default {

    components:{
        clubListDisplay,
    },

    data(){
        return{
            name: ''      
        }
    },

    mounted(){
        
         if(this.$route.query.name){
            competitions.items.forEach(item => {
                if(item.name == this.$route.query.name){
                    this.$store.commit('setCompetitionValue', item)
                    return
                }
            })
        }
    },

    watch:{
        $route(){
            
        }         
    }
   
}
</script>