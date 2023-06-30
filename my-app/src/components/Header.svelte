<script>
	import { logOut, isLogged } from "../utils/auth.js";
    import { goto } from '$app/navigation';
    import "../../src/app.css";
    
    function uploadImage(){
        goto ('/upload/new')
        }
    
    function goToHomePage(){
        goto ('/')
    }

    function goToSignUp(){
        goto ('/sign-up')
    }

    function goToLogIn(){
        goto ('/login')
    }

</script>

    <nav class="flex justify-between pt-5 pb-5 px-3 bg-lena-hair">
        <div>
            <button class="btn bg-lena-uniform text-lena-hair" on:click={goToHomePage}>WaifuVerse</button>
        </div>
        <div>
            {#if $isLogged == false}
            <div>
                </div>
                <button class="btn bg-lena-uniform text-lena-hair" on:click={goToSignUp}>Sign Up</button>
                <button class="btn bg-lena-uniform text-lena-hair" on:click={goToLogIn}>Log In</button>
            {:else}
            <button class="btn bg-lena-uniform text-lena-hair" on:click={uploadImage}>Upload</button>
            <button class="btn bg-lena-uniform text-lena-hair" on:click={logOut}>Log Out</button>
            {/if}
        </div>
    </nav>
