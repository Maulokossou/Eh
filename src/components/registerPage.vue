<template>
    <div>
        <span>Nom d'utilisateur</span>
        <div class="input__parent">
            <input type="text" name="" id="" placeholder="example123" v-model="userData.username">
        </div>
    </div>
    <div>
        <span>E-mail</span>
        <div class="input__parent">
            <input type="email" name="" id="" placeholder="user@example.com" v-model="userData.email">
        </div>
    </div>
    <div>
        <span>Mot de passe</span>
        <div class="input__parent">
            <input type="password" name="" id="" v-model="userData.password">
        </div>
    </div>
    <div>
        <span>Confirmation mot de passe</span>
        <div class="input__parent">
            <input type="password" name="" id="" v-model="userData.confirmPassword">
        </div>
    </div>
    <p class="error" >{{ errorText }}</p>
    <button class="connected" @click="createUser">S'inscrire</button>
</template>
<script lang="ts" setup>
import '@/assets/styleMainPage.css'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia';
import { validateEmail } from '@/function/REgexEmail'
import { validateUsername } from '@/function/REgexUsername'
import { validatePwd } from '@/function/REgexPassword'
import { supabase } from "@/lib/supabase";
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
const router = useRouter()
const { users } = storeToRefs(useUserStore())
const { addUser } = useUserStore()
const userData = ref({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
})


const nameUse=useLocalStorage('nameUse',{})

const errorText = ref('')
const login=useLocalStorage('login',{})
const createUser = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: userData.value.email,
            password: userData.value.password,
        })
         if(error){
            errorText.value=error.message
            login.value=false
        }else{
            router.replace('/editor',)   
            login.value=true
            nameUse.value=userData.value.email.split('@')[0]
        }
}

</script>
