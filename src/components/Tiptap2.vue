<template>
  <div class="modal">

    <div v-if="editor" class="btn">
      <div @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        I
      </div>

      <div @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
        U
      </div>
      <div @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        B
      </div>
      <button @click=" addText">Modifier</button>
    </div>

    <editor-content  :editor="editor" />
  </div>
</template>
  
<script lang="ts" setup>
import { useDocumentStore } from '@/stores/documents'
const { documents } = storeToRefs(useDocumentStore())
const { initialises } = useDocumentStore()
import { ref, onMounted, watch } from 'vue'
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'

import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from "@tiptap/extension-collaboration-cursor"
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/users'
import { useLocalStorage } from '@vueuse/core'
const {initialiseDoc}=useDocumentStore()
const { initialiseUser } = useUserStore()
const { nowUser } = storeToRefs(useUserStore())
const ydoc = new Y.Doc()
const provider = new WebrtcProvider("tiptap-test", ydoc)
const contentMax = ref()
const editor = ref()

const selectedId=useLocalStorage('selectedId',null)




onMounted(async () => {
  await initialises('etheocledk')
  /*  watch(()=>useLocalStorage('selectedId',{}),
  (newId)=>{
    selectedId.value=newId
  }
)  */
  contentMax.value = documents.value.find(post => post.id == selectedId.value)
   await initialiseUser() 
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: ydoc
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: nowUser.value.email.split('@')[0],
          color: '#f783ac',
        },
      }),

    ],
    content: contentMax.value.content,
  })
})

async function addText(){
  if(selectedId.value){
    await initialiseDoc(selectedId.value, editor.value.getText({ blockSeparator: "\n\n" }))
  }
  
}


// nowUser.value.email.split('@')[0]
</script> 
<style scoped>
.modal {
  background-color: #ffc107;
  height: 100vh;
  width: 1000px;
  padding: 0 40px;
  padding-top: 30px;
}
</style>

 

  