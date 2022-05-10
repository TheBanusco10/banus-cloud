<template>
    <h2>Those are your files</h2>
    <button @click="getUserFiles">Get files</button>

    <section id="files">
        <div class="file" v-for="(file, index) in userFiles" :key="index">
            <img class="icon" v-if="file.type !== 'image'" src="../assets/icons/text-icon.svg" :alt="file.name">
            <img class="image-preview" v-else :src="`http://localhost:3000/${file.name}`" :alt="file.name">
            <p class="name">
                {{ file.name }}
            </p>
            <p class="size">
                {{ bytesToSize(file.sizeInBytes) }}
            </p>
            <div class="actions">
                <a :href="'http://localhost:3000/'+file.name" :target="file.type === 'image' ? '_blank' : '_self' " download>Download</a>
                <button @click="removeFile(file, index)">Delete</button>
            </div>    
        </div>
    </section>
</template>

<script>

import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'Files',

    setup() {

        const store = useStore();

        const bytesToSize = (bytes, decimals = 2) => {
            if (bytes === 0) return '0 Bytes';

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        
            const i = Math.floor(Math.log(bytes) / Math.log(k));
        
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }

        const getUserFiles = (() => store.dispatch('getUserFiles'));

        // TODO removeFile in vuex
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
            getUserFiles();
        });

        return {
            userFiles: computed(() => store.getters.getUserFiles),

            getUserFiles,
            removeFile,

            bytesToSize
        }
    },
}
</script>

<style lang="scss" scoped>
    #files {

        margin-top: 2rem;

        display: flex;
        flex-wrap: wrap;

        justify-content: center;

        gap: 1rem;

        .file {

            max-width: 200px;
            min-width: 200px;

            padding: 20px;

            transition: all .3s;

            border: 2px solid transparent;
            border-radius: 4px;

            &:hover {
                box-shadow: 0px 5px 10px rgba(0,0,0,.1);
                border: 2px solid cadetblue;
            }

            .size {
                color: gray;
                font-size: 13px;
            }

            .icon {
                width: 70px;
            }

            .image-preview {
                width: 100%;
            }

            .actions {
                a {
                    padding-right: 1rem;
                }
            }
        }
    }
</style>