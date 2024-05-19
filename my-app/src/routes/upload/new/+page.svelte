<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<script>
    import { uploadMedia } from '../../../../src/utils/s3-uploader.js'
    import { getTokenFromLocalStorage} from '../../../utils/auth.js'
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { isLogged } from '../../../utils/auth.js';
    import { goto } from '$app/navigation';    
    import { onMount } from 'svelte'
   

    let formErrors = {};
    
    onMount(() => {
      checkAuthAndRedirect();
    });
    
    function checkAuthAndRedirect() {
      isLogged.subscribe(loggedIn => {
        if (!loggedIn) {
          goto('/');
        }
      });
    }

    function afterUpload(){
      goto('/')
    }

    async function uploadImage(evt) {

      const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
      const accessToken = getTokenFromLocalStorage();

      const imageData = {
        title: evt.target['title'].value,
        description : evt.target['description'].value,
        price: evt.target['price'].value,
        url: fileUrl,
        filename: fileName
      }

      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload',{
        method: 'POST',
        mode : 'cors',
        headers:{
          'Content-Type': 'application/json',
          Authorization :`Bearer ${accessToken}`
        },
        body: JSON.stringify(imageData)
      });

      if (resp.status == 200){
        afterUpload();
      } else {
        const res = await resp.json();
        formErrors = res.data;
      }
    }

    
  </script>
  
  <div class="bg-gradient-to-r from-lena-uniform via-lena-iris to-lena-uniform">
  <h1 class="text-2xl text-center font-bold pt-10 pb-5 text-lena-hair">Upload Image</h1>
  <div class="flex justify-center items-center">
    <form on:submit|preventDefault={uploadImage} class="w-1/3">
      <div class="form-control w-full mt-2">
        <input type="file" name="file" />
        <!-- {#if 'file' in formErrors}
        <label class="label" for="file">
          <span class="label-text-alt text-red-500">{formErrors['file']}</span>
        </label>
         {/if} -->
    </div>
    <div class="form-control w-full mb-3 ">
      <label class="label" for="title">
        <span class="label-text text-lena-hair">Title</span>
      </label>
      <input type="text" name="title" placeholder="Title" class="input input-bordered w-full placeholder-lena-uniform bg-lena-hair" required />
      <!-- {#if 'title' in formErrors}
      <label class="label" for="title">
        <span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
      </label>
      {/if} -->
    </div>
    
    <div class="form-control w-full mb3">
      <label class="label" for="description">
        <span class="label-text text-lena-hair">Description</span>
      </label>
      <div name="description" placeholder="Description of image" class="textarea textarea-bordered w-full placeholder-lena-uniform bg-lena-hair"></div>
    </div>

    <div class="form-control w-full mb-3">
      <label class="label" for="price">
        <span class="label-text text-lena-hair">Price</span>
      </label>
      <input type="number" name="price" placeholder="1000.00" class="input input-bordered w-full placeholder-lena-uniform bg-lena-hair" required />
      <!-- {#if 'price' in formErrors}
      <label class="label" for="price">
        <span class="label-text-alt text-red-500">{formErrors['price'].message}</span>
      </label>
      {/if} -->
    </div>

<div class="form-control w-full mb-72">
      <button class="btn btn-primary hover:btn-accent">Upload Image</button>
    </div>
</form>
</div>
</div>