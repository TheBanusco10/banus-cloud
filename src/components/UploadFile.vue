<template>
    <section id="uploadFile">
        <p>Upload your file</p>
        <input @change="uploadFile" type="file" multiple>
    </section>

</template>

<script>

import { useStore } from 'vuex';

export default {
    name: 'UploadFile',

    setup() {

        const store = useStore();

        const getUserFiles = () => store.dispatch('getUserFiles');

        const uploadFile = async (evt) => {
            const files = [...evt.target.files];

            if (!files.length) return;

            const formData = new FormData();

            files.forEach(el => {
                formData.append('files', el);
            });


            const res = await fetch('http://localhost:3000/api/file', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            evt.target.value = [];

            getUserFiles();
        }

        return {
            uploadFile
        }

    },
}
</script>

<style lang="scss" scoped>

    #uploadFile {
        flex-basis: 30%;
    }

</style>