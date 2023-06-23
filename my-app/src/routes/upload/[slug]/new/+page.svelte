<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { getTokenFromLocalStorage } from '../../../../utils/auth.js';
    import { uploadMedia } from '../src/utils/s3-uploader.js'
  
    function afterUpload(){
      goto('/')
    }

    async function uploadImage(evt) {
      evt.preventDefault();
      formErrors = {};
      const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
      const token = getTokenFromLocalStorage();

      const imageData = {
        title: evt.target['title'].value,
        description : evt.target['description'].value,
        price: evt.target['price'].value,
        url: fileUrl,
      }

      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload',{
        method: 'POST',
        mode : 'cors',
        headers:{
          'Content-Type': 'application/json',
          Authorization : `Bearer ${token}`
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
  
  <h1 class="text-2xl text-center font-bold">Upload Image</h1>
  <div class="flex justify-center items-center">
    <form on:submit|preventDefault={uploadImage} class="w-1/3">
      <div class="form-control w-full mt-2">
        <input type="file" name="file" />
        {#if 'file' in formErrors}
        <label class="label" for="file">
          <span class="label-text-alt text-red-500">{formErrors['file']}</span>
        </label>
         {/if}
    </div>
    <div class="form-control w-full mb-3">
      <label class="label" for="title">
        <span class="label-text">Title</span>
      </label>
      <input type="text" name="title" placeholder="Title" class="input input-bordered w-full" required />
      {#if 'title' in formErrors}
      <label class="label" for="title">
        <span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
      </label>
      {/if}
    </div>
    
    <div class="form-control w-full mb3">
      <label class="label" for="description">
        <span class="label-text">Description</span>
      </label>
      <textarea name="description" placeholder="Description of image" class="textarea textarea-bordered w-full"></textarea>
      {#if 'description' in formErrors}
      <label class="label" for="description">
        <span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
      </label>
      {/if}
    </div>

    <div class="form-control w-full mb-3">
      <label class="label" for="price">
        <span class="label-text">Price</span>
      </label>
      <input type="text" name="price" placeholder="1000.00" class="input input-bordered w-full" required />
      {#if 'price' in formErrors}
      <label class="label" for="price">
        <span class="label-text-alt text-red-500">{formErrors['price'].message}</span>
      </label>
      {/if}
    </div>
  

    
    <div class="form-control w-full mt-4">
      <button class="btn btn-md">Upload</button>
    </div>
  </form>