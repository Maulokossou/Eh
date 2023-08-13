import { defineStore } from "pinia";
import {computed, ref } from "vue";
import { supabase } from "@/lib/supabase";

 type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
  confirmPassword:string;
}; 
export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const nowUser = ref()

  async function initialise() {
    const { data, error } = await supabase
      .from("users")
      .select("id,username,email,password,confirmPassword");
    if (data) {
      users.value = data;
    }
  }

  async function initialiseUser(){
    const {data}=await supabase.auth.getSession()
    if(data.session){
      nowUser.value=data.session?.user
    }
  }

  async function  addUser(user:User) {
    const {data, error } = await supabase
      .from("users")
      .insert(user).select("username,email,password,confirmPassword");

      if (data) {
        users.value.push(data[0]);
      }
  }
  
  return { users, initialise, addUser, initialiseUser, nowUser};
});
