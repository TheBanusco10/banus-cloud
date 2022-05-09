<template>
    <h2>Those are your files</h2>
    <button @click="getFiles">Get files</button>

    <section id="files">
        <div class="file" v-for="(file, index) in yourFiles" :key="index">
            <img :src="'http://localhost:3000/'+file" :alt="file">
            <a :href="'http://localhost:3000/'+file" target="_blank" download>Download</a>
            <button @click="removeFile(file, index)">Delete</button>
        </div>
    </section>
</template>

<script>

import { onMounted, ref } from 'vue';

export default {
    name: 'Files',

    setup() {
        const yourFiles = ref([]);

        const getFiles = async () => {
            const res = await fetch('http://localhost:3000/api/file');
            const data = await res.json();

            yourFiles.value = data.files;
        }

        const removeFile = async (filename, index) => {
            const res = await fetch(`http://localhost:3000/api/file/${filename}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (res.status !== 200) {
                console.log(data.message);
                return;
            }

            yourFiles.value.splice(index, 1);

            console.log(data);
        }

        onMounted( () => {
            getFiles();
        });

        return {
            yourFiles,

            getFiles,
            removeFile
        }
    },
}
</script>

<style lang="scss" scoped>
    img {
        width: 400px;
    }
</style>