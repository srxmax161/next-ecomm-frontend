<script>
    import { authenticateUser} from "../../utils/auth";
	import { isLogged } from "../../utils/auth";
    import { goto } from '$app/navigation'
	import { onMount } from "svelte";

	
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

    async function signIn(evt) {
        evt.preventDefault();

        const result = {
        email: evt.target['email'].value,
        password: evt.target['password'].value, 
        }


        const res = await authenticateUser(result.email, result.password)
        if (res.success) {
            goto('/')
        }
		//else condition for failure to authenticate and displaying info to user
    }
    
    
</script>

<div class="bg-gradient-to-r from-lena-uniform via-lena-iris to-lena-uniform pt-10 pb-72">
<h1 class="font-style text-center text-2xl mt-5 font-bold sm:text-4xl text-lena-hair">LOGIN</h1>
<div class="text-center">
	<a class="link-hover italic text-xs text-lena-hair" href="/sign-up">Don't have an account? Click here to sign up instead.</a>
</div>
<div class="flex justify-center items-center mt-8">
    <form on:submit={signIn} class="w-1/3">
	<div class="form-control w-full">
		<label class="label" for="email">
			<span class="label-text text-xl text-lena-hair">Email</span>
		</label>
		<input
			type="text"
			name="email"
			placeholder="Please insert your email"
			class="bg-lena-hair placeholder-lena-uniform input input-bordered w-full text-lena-uniform"
		/>
	</div>
	<div class="form-control w-full mt-5">
		<label class="label" for="password">
			<span class="label-text text-xl text-lena-hair">Password</span>
		</label>
		<input
			type="password"
			name="password"
			placeholder="Please insert your password"
			class="input input-bordered w-full bg-lena-hair placeholder-lena-uniform text-lena-uniform"
		/>
	</div>
    <div class="form-control w-full mt-4">
		<button class="btn btn-primary text-3xl" href='/'>Log In</button>
	</div>
</form>
</div>
</div>

