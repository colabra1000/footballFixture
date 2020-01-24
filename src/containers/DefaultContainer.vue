<template>
    <div class="app">
        <DefaultHeader/>
        <ErrorPrompt :errorBlur="errorBlur"/>        
        <div class="app-body" :class="{ 'm-blur' : errorBlur.status}">
            
            <!-- Side bar -->
            <div class="appSideBar">
                <AppSidebar fixed>
                    <SidebarHeader/>
                    <SidebarForm/>
                    <SidebarNav :navItems="nav"></SidebarNav>
                    <SidebarFooter/>
                    <SidebarMinimizer/>                
                </AppSidebar>
            </div>
                <!-- end of side bar -->

            <main class="main">

                <div class="container-fluid mt-5">
                    <b-card class="text-center text-warning display-4" bg-variant="danger">
                        <div>
                            <h1>
                                {{competition.name}}
                                
                                <!-- ring loader -->
                                <span class="ring-loader" v-if="!pageLoaded">
                                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </span>
                            </h1>
                        </div>
                    </b-card>
                    <router-view></router-view>
                </div>

            </main>
        
        </div>
        <DefaultFooter/>

    </div>
</template>

<script>
import DefaultHeader from './DefaultHeader.vue'
import { Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav } from '@coreui/vue'
import DefaultFooter from './DefaultFooter'
import nav from '../_nav'
import ErrorPrompt from '../components/errorPromp'
import competitions from '../_competitions'
// import {EventBus} from '../main'

export default {

    name: 'DefaultContainer',

    components: {
        DefaultHeader,
        AppSidebar,
        SidebarFooter,
        SidebarForm,
        SidebarHeader,
        SidebarNav,
        SidebarMinimizer,
        DefaultFooter,
        ErrorPrompt,
    },

    data(){
        return{
            nav: nav.items,
        }
    },

    watch:{
        $route(to){
            
        

            if(to.query.name){
                competitions.items.forEach(item => {
                    if(item.name == to.query.name){
                        this.$store.commit('setCompetitionValue', item)
                        return
                    }
                })
            }   

            this.$store.commit('setPageLoaded', false)
            this.$store.commit('setErrorBlur', {
                status:false,
                message:''
            })

        // this.$forceUpdate 

            
        }
    },

    computed: {

        errorBlur(){
            return this.$store.state.errorBlur;
        },

        name () {
            return this.$route.name
        },

        list () {
            return this.$route.matched.filter((route) => route.name || route.meta.label )
        },

        competition(){
            return this.$store.state.competition;
        },

        pageLoaded(){
            return this.$store.state.pageLoaded;
        }
    }
    
}
</script>

<style lang='scss' scoped>


.appSideBar nav {
    margin-top: 3.3em;
}


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

    .app{
        background: url('/img/wallpaper/img-1.jpg') no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        background-size: cover;
        -o-background-size: cover;
    }
</style>

