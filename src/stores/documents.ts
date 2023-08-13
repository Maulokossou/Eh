import { defineStore } from "pinia";
import {computed, ref } from "vue";
import { supabase } from "@/lib/supabase";

 type Document = {
  id?: number;
  content: string;
  username: string;
  date?:string
}; 
export const useDocumentStore = defineStore("document", () => {
  const documents = ref<Document[]>([]);
  

  async function initialises(username:string) {
    const { data, error } = await supabase
      .from("document")
      .select("id,content,username,date").match({ username });
    if (data) {
        documents.value = data;
    }
  }

  
 async function initialiseDoc(id:Number, content:string){
    const { data, error } = await supabase
    .from('document')
    .upsert({ id, content})
    .select('*')
  } 

  async function  deleteDoc( content:string,id:Number) {
  const { data, error } = await supabase
  .from('document')
  .delete()
  .match({ id, content })
  }



  async function  addUser(document:Document) {
    const {data, error } = await supabase
      .from("document")
      .insert(document).select("id,content,username,date");

      if (data) {
        documents.value.push(data[0]);
      }
  }
  return { documents, initialises, addUser, initialiseDoc, deleteDoc};
});
