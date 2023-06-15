import { writable } from "svelte/store";
export const loggedIn = writable(false)
import { goto } from "$app/navigation";
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'

const emptyAuth ={
    "token": "",
    "userId":""
}

export function logOut(){
    localStorage.setItemI("auth",JSON.stringify(emptyAuth));
    loggedIn.set(false)
    goto('/')
    return true
}

export function getUserId(){
    const auth = localStorage.getItem("auth")
    if (auth){
        return JSON.parse(auth)["userId"]
    }
    return null
}

export function getTokenFromLocalStorage(){
    const auth = localStorage.getItem("auth")
    if (auth) {
        return JSON.parse(auth)["token"]
    }
    return null
}

export async function authenticateUser(username, password) {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/users/auth-with-password',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identity: username,
          password
        })
      }
    );

    const res = await resp.json();

    if (resp.status == 200) {
      localStorage.setItem("auth", JSON.stringify({
        "token": res.token,
        "userId": res.record.id
      }));
      
      loggedIn.set(true)
      
      return {
        success: true,
        res: res
      }
    }
  
    return {
      success: false,
      res: res
    }
}