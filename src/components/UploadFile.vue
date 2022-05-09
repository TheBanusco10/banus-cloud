<template>

    <p>Upload your file</p>
    <input @change="uploadFile" type="file" multiple>

    <ul>
        <li v-for="(file, index) in filesUploaded" :key="index">
            <a :href="file.path" download>
                {{ file.name }}
            </a>
        </li>
    </ul>

</template>

<script>

import { ref } from 'vue';

export default {
    name: 'UploadFile',

    setup() {

        const filesUploaded = ref([]);

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

            console.log(data);

            // filesUploaded.value = files;

            // console.log(files);
        }

        return {
            uploadFile,

            filesUploaded
        }

    },
}
</script>