<template>
    <theFooter>
        <div>
            <!-- footer -->
            <a href="#">Nutak City</a>
            <span class="ml-1">&copy; 2019 abdulienLabs.</span>
        </div>

        <div class="ml-auto">
            <span class="mr-1">Powered by</span>
            <a href="#">SadEngine</a>
        </div>
    </theFooter>
</template>

<script>
    import{ Footer as TheFooter} from '@coreui/vue'
export default {
    name: 'DefaultFooter',
    components: {
        TheFooter
    },
}
</script>
