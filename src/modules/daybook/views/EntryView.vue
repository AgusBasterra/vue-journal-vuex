<template>
    <template v-if="entry">

    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-3">{{ month }}</span>
            <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
        </div>
        <div>
            <input type="file"
                v-show="false"
                accept="image/png, image/jpeg"
                @change="onSelectedImage"
                ref="imageSelector"
                >
            <button v-if="entry.id"
                class="btn btn-danger mx-2" 
                @click="onDeleteEntry"
            >
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>
            <button class="btn btn-primary"
                @click="onSelectImage"
            >
                Subir Foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>

    <hr>
    <div class="d-flex px-3 flex-column h-75">
        <textarea 
        v-model="entry.text"
        placeholder="¿Que sucedió hoy?"></textarea>
    </div>
    
    <img
        v-if="entry.picture && !localImage" 
        class="img-thumbnail"
        :src="entry.picture" 
        alt="entry-picture"
    />
    <img 
        v-if="localImage" 
        class="img-thumbnail"
        :src="localImage" 
        alt="entry"
    />
    </template>
    <Fab 
        icon="fa-save"
        @on:click="saveEntry"
    />
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from "vuex";
import Swal from 'sweetalert2'

import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage.js"

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },

    data(){
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },

    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry(){

            let entry;

            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntriesById( this.id )
                if ( !entry ) return this.$router.push({name: 'no-entry'})
            }

            this.entry = entry
        },
        async saveEntry() {

            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })
            Swal.showLoading()

            const picture = await uploadImage(this.file)

            this.entry.picture = picture

            if (this.entry.id){
                await this.updateEntry( this.entry )
            }else{
                const newEntryId = await this.createEntry( this.entry )

                this.$router.push({ name: 'entry', params: { id: newEntryId } })
            }

            this.file = null
            Swal.fire('Guardado', 'Entrada registrada con éxito!', 'success')

        },
        async onDeleteEntry() {

            const { isConfirmed } = await Swal.fire({
                title:'¿Está seguro?',
                text:'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if (isConfirmed){
                new Swal({
                    title:'Espere por favor',
                    allowOutsideClick: false
                })

                Swal.showLoading()
                await this.deleteEntry( this.entry.id )
                this.$router.push({ name: 'no-entry' })
                Swal.fire('Eliminado', '', 'success')
            }

        },
        onSelectedImage( event ) {
            const file = event.target.files[0]
            if (!file) {
                this.localImage = null
                this.file = null
                return
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )

        },
        onSelectImage(){
            this.$refs.imageSelector.click()
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntriesById']),
        day(){
            const { day } = getDayMonthYear( this.entry.date )
            return day
        },
        month(){
            const { month } = getDayMonthYear( this.entry.date )
            return month
        },
        yearDay(){
            const { yearDay } = getDayMonthYear( this.entry.date )
            return yearDay
        }
    },
    created() {
        this.loadEntry()
    },
    
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>
<style lang="scss" scoped>
textarea{
    font-size: 20px;
    border:none;
    height: 100%;

    &:focus{
        outline: none;
    }
}
img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>