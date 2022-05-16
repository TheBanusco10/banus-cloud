<template>
    <section id="userFiles">
        <h2>Your files</h2>

        <section v-if="Object.keys(userFiles).length !== 0" id="files">
            <div class="file" v-for="(file, index) in userFiles" :key="index">
                <img class="icon" v-if="file.type !== 'image'" src="../assets/icons/text-icon.svg" :alt="file.name">
                <img class="image-preview" v-else :src="`http://localhost:3000/${file.name}`" :alt="file.name">
                <p class="name">
                    {{ file.name.substring(UUID_LENGTH) }}
                </p>
                <p class="size">
                    {{ bytesToSize(file.sizeInBytes) }}
                </p>
                <div class="actions">
                    <a :href="'http://localhost:3000/'+file.name" :target="file.type === 'image' ? '_blank' : '_self' " download>Download</a>
                    <button @click="removeFile(file.name, index)">Delete</button>
                </div>    
            </div>
        </section>

        <section v-else>
            <p>You don't have files uploaded</p>
        </section>
    </section>
</template>

<script>

import { computed, onMounted } from 'vue';
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

        onMounted( () => {
            getUserFiles();
        });

        return {
            userFiles: computed(() => store.getters.getUserFiles),
            UUID_LENGTH: 37,

            getUserFiles,
            removeFile: (filename, index) => store.dispatch('removeFile', {filename, index}),

            bytesToSize
        }
    },
}
</script>

<style lang="scss" scoped>

    @import '../scss/variables';

    #userFiles {

        flex-basis: 59%;

        border-right: 2px solid $border-color;

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
                border-bottom-color: $border-color;
                border-radius: 4px;
    
                &:hover {
                    box-shadow: 0 5px 10px rgba(0,0,0,.1);
                    border: 2px solid $border-color;
    
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
    }

</style>