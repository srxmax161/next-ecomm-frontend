import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';

export const isLogged = writable(false);

const emptyAuth = {
    "accessToken": ""
}

isLogged.subscribe(value => {
  console.log('Store value:', value);
});

export function logOut() {
    localStorage.setItem("auth", JSON.stringify(emptyAuth));
    isLogged.set(false);
    return true;  
}

export function getUserID() {
    const auth = localStorage.getItem("auth");
    if (auth) {
        return JSON.parse(auth)['userId'];
    }
    return null;
}

export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth");
  if (auth) {
      return JSON.parse(auth)['accessToken'];
  }
  return null;
}

export async function isLoggedIn() {
    if (!(getTokenFromLocalStorage())) {
      isLogged.set(false)
    }
    else
    isLogged.set(true)
  }

export async function authenticateUser(email, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/auth',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );
  const res = await resp.json();
  if (resp.status === 200) {
    localStorage.setItem("auth", JSON.stringify({
        'accessToken': res.accessToken

    }));
    isLogged.set(true);
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

export async function imageCheckout(evt){
  evt.preventDefault()

  const price = evt.target.dataset.price;
  const title = evt.target.dataset.title;
  const url = evt.target.dataset.url;

  const imageData = {
    title: title,
    price: price,
    image: url,
  }

  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/checkout',{
    method: 'POST',
    mode : 'cors',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(imageData)
  });
  if (resp.status == 200){
    const res = await resp.json()
    window.location.replace(res)
  } else {
    alert('Failed to checkout')
  }
}