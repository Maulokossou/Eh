<template>
    <div class="wrapper">
        <div class="modals">
            <div class="switchBtn">
                <p @click="mode = 'connexion'" :class="{ 'active': mode == 'connexion' }">Connexion</p>
                <p @click="mode = 'inscription'" :class="{ 'active': mode == 'inscription' }">Inscription</p>
            </div>
            <div class="connexion__modal" v-if="mode === 'connexion'">
                <loginPage />
                <p class="compte">J'ai pas encore un compte. <a href="#" @click="mode = 'inscription'">Inscription</a> </p>
            </div>
            <div class="inscription__modal" v-else-if="mode === 'inscription'">
                <registerPage />
                <p class="compte">J'ai déjà un compte. <a href="#" @click="mode = 'connexion'">Connexion</a> </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import loginPage from '@/components/loginPage.vue'
import registerPage from '@/components/registerPage.vue'
const mode = ref('connexion')
import '@/assets/styleMainPage.css'
</script>
