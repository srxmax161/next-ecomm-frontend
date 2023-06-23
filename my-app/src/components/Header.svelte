<script>
	import { logOut, loggedIn } from "../utils/auth";

</script>

<nav class="flex justify-between mt-5 px-3">
    <div>
        <button class="btn">
            <a href="/">NEXT Academy Bootcamp Project - P2P EComm Full-Stack</a>
        </button>
    </div>
    <div>
        {#if $loggedIn == false}
        <div>
            </div>
            <button class= "btn">
                <a href='/sign-up'>Sign Up</a>
            </button>
            <button class="btn">
				<a href="/login">Log In</a>
			</button>
        {:else}
        <button class="btn">
            <a href="">Pictures</a>
        </button>
        <button class="btn" on:click={logOut}>Log Out</button>
        {/if}
        </div>
</nav>