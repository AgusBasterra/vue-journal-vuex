<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">15</span>
            <span class="mx-1 fs-3">Julio</span>
            <span class="mx-2 fs-4 fw-light">2021</span>
        </div>
        <div>
            <button class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>
            <button class="btn btn-primary">
                Subir Foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>

    <hr>
    <div class="d-flex px-3 flex-column h-75">
        <textarea placeholder="¿Que sucedió hoy?"></textarea>
    </div>

    <Fab icon="fa-save" />

    <img class="img-thumbnail"
        src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt6a154102ae9e3ce1/615f819fe0d46d30e724fad0/326bedb70e0a6d537c0b7de1fbb324d3f2944b43.jpg" 
        alt="entry-picture"
    />
</template>
<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
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