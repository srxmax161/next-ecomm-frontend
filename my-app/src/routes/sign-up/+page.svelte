<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'; 
    import { authenticateUser } from '../../utils/auth.js'
    import { isLogged } from '../../utils/auth.js';
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';

    let formErrors = {};
    
    onMount(() => {
        checkAuthAndRedirect();
    });
    
    function checkAuthAndRedirect() {
        isLogged.subscribe(loggedIn => {
            if (loggedIn) {
                goto('/');
            }
        });
    }


    async function createUser(evt){
        evt.preventDefault()
        
        if (evt.target['password'].value != evt.target['password-confirmation'].value){
            formErrors['password'] = { message: 'Password does not match'};
            return;
        }
        
        const userData = {
            name:evt.target['name'].value,
            email:evt.target['email'].value,
            password:evt.target['password'].value,
        };
        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (resp.status == 200){
            const res = await authenticateUser(userData.email, userData.password);

            if(res.success) {
                postSignUp();
            } else {
                throw 'Sign up success but authentication failed'
            }
        } else {
            const res = await resp.json();
            formErrors = res.data;
        }
    }

  </script>
  
  <div class="bg-gradient-to-r from-lena-uniform via-lena-iris to-lena-uniform pb-10">
  <h1 class="text-center text-4xl font-bold pt-10 text-lena-hair">SIGN UP</h1>
  <div class="text-center">
      <a class="link-hover italic text-xs text-lena-hair" href="/login">Already have an account? Click here to login instead.</a>
  </div>
  <div class="flex justify-center items-center mt-8">
      <form on:submit={createUser} class="w-1/3">
        <div class="form-control w-full">
            <label class="label" for="name">
                <span class="label-text text-lena-hair">Name</span>
            </label>
            <input type="name" name="name" placeholder="Name" class="input input-bordered w-full bg-lena-hair placeholder-lena-uniform text-lena-uniform" required />
            {#if 'name' in formErrors}
            <label class="label" for="name">
                <span class="label-text-alt text-red-500">{formErrors['name'].message}</span>
            </label>
            {/if}
        </div>   
  
          <div class="form-control w-full">
              <label class="label" for="email">
                  <span class="label-text text-lena-hair">Email</span>
              </label>
              <input type="email" name="email" placeholder="example@example.com" class="input input-bordered w-full bg-lena-hair placeholder-lena-uniform text-lena-uniform" required />
              {#if 'email' in formErrors}
              <label class="label" for="email">
                  <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text text-lena-hair">Password</span>
              </label>
              <input type="password" name="password" class="bg-lena-hair input input-bordered w-full text-lena-uniform" required />
              {#if 'password' in formErrors}
              <label class="label" for="password">
                  <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text text-lena-hair">Confirm Password</span>
              </label>
              <input type="password" name="password-confirmation" placeholder="" class="bg-lena-hair input input-bordered w-full text-lena-uniform" required />
              {#if 'password' in formErrors}
              <label class="label" for="password">
                  <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full mt-4 mb-16">
              <button class="btn btn-primary btn-md">Create an Account</button>
          </div>
      </form>
  </div>
</div>