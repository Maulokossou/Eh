<template>
    <div>
        <header>
            <div class="header_container">
                <div class="header__menu__left">
                    <div class="header__logo">
                        <img src="/src/assets/img/logo.png" alt="">
                    </div>
                    <p>NoteBook</p>
                </div>
                <div class="header__menu__right">
                    <div>
                        <AddIcon @click="mode = 'open'" />
                    </div>
                    <div>
                        <div class="bar__menu__right">
                            <p class="author" v-if="nowUser">{{ nowUser.email.split('@')[0] }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="bar__menu__logout">
                            <p class="author" @click="signout">Déconnexion</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main>

            <div class="container">
                <div class="main_container">
                    <h1>My NoteBook</h1>
                    <div class="noteText">

                        <div class="noteTextPost" v-for="element in documents">
                            <DeleteIcon @click="deletee" />
                            <div class="secondPost" @click="selectId(element)">
                                <p class="first-child" >
                                {{ element.content.slice(0, 70) +'...'}}
                            </p>
                            <p class="second-child">{{ element.date?.split('T')[0] }}</p>
                            <p class="idUser">{{ element.id }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <div class="modalPlus" :class="{ active: mode === 'open', close: mode === 'close' }">
        <div class="checkIcon">
            <CheckIcon @click="mode = 'close'" />
        </div>
        <Tiptap></Tiptap>
    </div>
    <div class="modalPlus" :class="{ active: modeModal === 'open', close: modeModal === 'close' }">
        <div class="checkIcon" @click="fermer">
            <CheckIcon @click="modeModal = 'close'" />
        </div>
        <Tiptap2></Tiptap2>
    </div>
</template>

<script lang="ts" setup>

import { useLocalStorage } from "@vueuse/core";
import CheckIcon from "../components/CheckIcon.vue";
import AddIcon from '../components/AddIcon.vue'
import Tiptap from '@/components/Tiptap.vue'
import Tiptap2 from '@/components/Tiptap2.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/users'
import { useRouter } from 'vue-router'
const router = useRouter()
const { users } = storeToRefs(useUserStore())
const { initialise, initialiseUser } = useUserStore()
const { nowUser } = storeToRefs(useUserStore())
import { supabase } from "@/lib/supabase";

import { useDocumentStore } from '@/stores/documents'
const { addUser } = useDocumentStore()
const { documents } = storeToRefs(useDocumentStore())
const { initialises } = useDocumentStore()

/* window.addEventListener('load', ()=>{
    let nameUse = document.querySelector('.author')
if(nameUse){
    let newName=nameUse.textContent
    console.log('sese',newName);
    
}
}) */
const nameUse=useLocalStorage('nameUse',{})
    console.log('dhsqgf',nameUse.value);
onMounted(() => {
    initialiseUser()
    initialises(nameUse.value)
})

console.log('je suis doculent', documents);


async function signout() {
    const login=useLocalStorage('login',{})
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.log(error);
        
    } else {
        router.replace('/')
        login.value=false
    }
}


const mode = ref('close')
const modeModal = ref('close')
type Document = {
  id?: number;
  content: string;
  username: string;
  date?:string
}; 
const selectedId=useLocalStorage('selectedId',{})
const selectId=(element:Document)=>{
selectedId.value=element.id
modeModal.value = 'open'


const modalPlus=document.querySelector('.modalPlus')
const etat=useLocalStorage('etat', {})
    etat.value=true
location.reload() 
}

async function fermer() {
    const etat=useLocalStorage('etat', {})
    etat.value=false
}


const getEtat=useLocalStorage('etat', {})
window.addEventListener('load', ()=>{
if(getEtat.value===true){
    modeModal.value = 'open'
}else{
    modeModal.value = 'close'
}


})





import DeleteIcon from '@/components/DeleteIcon.vue';
const { deleteDoc } = useDocumentStore()
async function deletee() {
    setTimeout(() => {
        let noteTextPost = document.querySelectorAll('.noteTextPost')
        console.log(noteTextPost);
        if (noteTextPost) {
            noteTextPost.forEach(item => {
                item.addEventListener('click', () => {
                    let idUser = item.querySelector('.idUser')

                    if (idUser) {
                        let idUserElement = idUser.textContent
                        if (idUserElement) {
                            localStorage.setItem('myId', idUserElement)
                            console.log(idUserElement);

                        }
                    }
                })

            })
        }
    }, 1000)
    const myId = ref()
    myId.value = JSON.parse(localStorage.getItem('myId') ?? " ")
    const contentMax = ref()
    contentMax.value = documents.value.find(post => post.id == myId.value)
    console.log('celine', contentMax.value.content);
    await deleteDoc(contentMax.value.content, myId.value)
    location.reload()
}

</script>


<style scoped>
header {
    position: fixed;
    width: 100%;
    background-color: white;
    z-index: 100;
}

.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.193);
    padding: 20px 0;
}

.header__logo {
    width: 100px;
    height: 40px;
}

.header__menu__left {
    margin-left: 30px;
    display: flex;
    align-items: center;
}

.header__menu__left p {
    font-size: 20px;
    font-weight: 600;
}

.header__logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


.bar__menu__right .author,
.bar__menu__logout .author {
    padding: 10px 15px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.088);
    border-radius: 20px;
}

.bar__menu__right .author {
    padding: 10px 15px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.088);
    border-radius: 20px;
}

.bar__menu__logout .author {
    background-color: rgb(255, 187, 0);
    font-weight: bold;
}

.header__menu__right {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 50px;
}

main {
    background-color: #f7f7f7;
    min-height: 100vh;
}

.main_container {
    margin-bottom: 50px;
}

.main_container h1 {
    text-align: center;
    margin-bottom: 30px;
    margin-top: 80px;
}

.noteText {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
    row-gap: 45px;
    margin-left: 30px;
}

.secondPost{
    display: flex;
    flex-direction: column ;
    height: 100%;
    gap: 50px;
}

.noteTextPost:hover {
    box-shadow: 3px 3px 1px 1px rgba(0, 0, 0, 0.159);
}

.noteTextPost {
    background-color: #ffc107;
    width: 250px;
    padding: 15px;
    height: 250px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-top: 30px
}

.noteText>:nth-child(4n+1) {
    background-color: #fd7e14;
}

.noteText>:nth-child(4n+2) {
    background-color: #dc3545;
}

.noteText>:nth-child(4n+1) {
    background-color: #28a745;
}

.noteText>:nth-child(4n) {
    background-color: #17a2b8;
}


.modalPlus {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.177);
    visibility: hidden;
}

.modalPlus.active {
    visibility: visible;
}

.modalPlus.close {
    visibility: hidden;
}



.checkIcon {
    position: absolute;
    top: 20px;
    left: 75rem;
    z-index: 1000;
    color: white;
}

.checkIcon svg {
    background-color: red;
    border-radius: 50%;
    width: 50px;
    height: 50px;
}

.idUser {
    display: none;
}





p {
    font-size: 18px;
}

.first-child {
    line-height: 30px;
    max-width: 250px;
    height: 150px;
    word-break: break-all;
}

.second-child {
    font-size: 14px;
    font-weight: bold;
}

.noteTextPost svg {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style> 