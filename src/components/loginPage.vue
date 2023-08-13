<template>
    <div>
        <span>E-mail</span>
        <div class="input__parent">
            <input type="text" name="" id="" placeholder="example123" v-model="connectUserData.email">
        </div>
    </div>
    <div>
        <span>Mot de passe</span>
        <div class="input__parent">
            <input type="password" name="" id="" v-model="connectUserData.password">
        </div>
    </div>
    <p class="error" >{{ errorTextConnexion }}</p>
    <button class="connected" @click="connected">Connexion</button>
</template>
<script lang="ts" setup>
import '@/assets/styleMainPage.css'
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/users'
import { useRouter } from 'vue-router'
import { supabase } from "@/lib/supabase";
import { useLocalStorage } from '@vueuse/core';
const router = useRouter()
const { users } = storeToRefs(useUserStore())
const connectUserData = ref({
    email: '',
    password: ''
})
const login=useLocalStorage('login',{})
const nameUse=useLocalStorage('nameUse',{})


const errorTextConnexion = ref('')
async function connected() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: connectUserData.value.email,
            password: connectUserData.value.password,
        })
        if(error){
            errorTextConnexion.value=error.message
            login.value=false
        }else{
            router.replace('/editor',)
            login.value=true
            nameUse.value=connectUserData.value.email.split('@')[0]

        }  
}

window.addEventListener('load', ()=>{
    login.value=false
})
</script>
