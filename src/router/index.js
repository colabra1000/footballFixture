import Router from 'vue-router'
import Vue from 'vue'

import DefaultContainer from '../containers/DefaultContainer'
import TablePage from '../views/TablePage'
import ResultFixturePage from '../views/ResultFixturePage'
import ScorerPage from '../views/ScorerPage'
import HomePage from '../views/HomePage'
Vue.use(Router)


function configRoutes(){
    return[

        {
            path: '/',
            name: 'football',
            component: DefaultContainer,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: HomePage,
                    props: true,
                },
                {
                    path: 'table',
                    name: 'table',
                    component: TablePage,
                },
                {
                    path: 'resultsFixtures',
                    name: 'ResultFixtures',
                    component: ResultFixturePage,
                },
                {
                    path: 'scorers',
                    name: 'socrers',
                    component: ScorerPage,
                }
            ]
        }
    ]
}

export default new Router({
    routes: configRoutes()
})