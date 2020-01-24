<template>
<div class="">  

   <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark" navbar-transparent>

        <b-navbar-brand href="#">ALB</b-navbar-brand>
               
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>


            <!-- nav -->

            <b-navbar-nav>
                <b-nav-item class="px-3" :class="[competition.name == 'laLiga' ? 'activeLink' : '']" :to="{path: this.$router.currentRoute.path, query: { name:'laLiga' }}">LIGA BBVA</b-nav-item>
                <b-nav-item class="px-3" :class="[competition.name == 'premierLeague' ? 'activeLink' : '']" :to="{path: this.$router.currentRoute.path, query: { name:'premierLeague' }}">EPL</b-nav-item>
                <b-nav-item class="px-3" :class="[competition.name == 'seriaA' ? 'activeLink' : '']" :to="{path: this.$router.currentRoute.path, query: { name:'seriaA' }}">SERIA-A</b-nav-item>
                <b-nav-item class="px-3" :class="[competition.name == 'ligue1' ? 'activeLink' : '']" :to="{path: this.$router.currentRoute.path, query: { name:'ligue1' }}">LIGUE-1</b-nav-item>
                <b-nav-item class="px-3" :class="[competition.name == 'bundesLiga' ? 'activeLink' : '']" :to="{path: this.$router.currentRoute.path, query: { name:'bundesLiga' }}">BUNDESLIGA</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
  </b-navbar>

    <!-- the app header -->

    <AppHeader class="mt-5 transNav shadow" fixed>
        <SidebarToggler display="md" :defaultOpen='false' class="d-lg-none" mobile/>
        <SidebarToggler display="lg" :defaultOpen='true' class="d-md-down-none"/>
        

        <div class="breadCrumb mr-auto ml-3">
            <Breadcrumb :list="list"/>
        </div>

   
    </AppHeader>

</div>
</template>

<script>

import {Header as AppHeader, SidebarToggler} from '@coreui/vue'
import {Breadcrumb } from '@coreui/vue'

export default {
    name: 'DefaultHeader',
    components: {
        
        AppHeader,
        SidebarToggler,
        Breadcrumb,
    },

     computed: {
        name () {
            return this.$route.name
        },
        list () {
            return this.$route.matched.filter((route) => route.name || route.meta.label )
        }, 
        competition(){
            return this.$store.state.competition
        }
    
    }

}
</script>

<style scoped>

    .transNav{
        opacity: 0.9;
        filter: alpha(opacity = 90);
    }

    .activeLink{
        background-color:darkslategrey;
    
    }

    .activeLink a{
        color:#f86c6b !important;
    }

    .breadCrumb .breadcrumb{
        margin: 0;
        padding: 0;
        border: 0;
      
    }
</style>

