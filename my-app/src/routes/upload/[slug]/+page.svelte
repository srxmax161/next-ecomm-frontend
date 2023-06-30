<script>
    export let data;
    import { goto } from '$app/navigation';

    function goToHomePage(){
        goto ('/')
    }

</script>

<div class="bg-gradient-to-r from-lena-uniform via-lena-iris to-lena-uniform pb-44">
    <div class="container px-6 py-10 mx-auto flex justify-center items-center">
        <div class="mt-8 lg:-mx-6 lg:flex lg:items-center bg-lena-hair rounded-2xl">
             <img class="card mt-5 ml-2 w-2/5 mr-10 mb-5 shadow-2xl shadow-lena-uniform" src={data.image.url} alt="">

                <div class="lg:w-2/3 lg:mt-0 lg:mx-6 ">
                     <p class="text-xl font-extrabold text-lena-uniform uppercase">{data.image.title}</p>
                     <p class="mt-3 text-xl text-justify font text-lena-uniform">{data.image.description}</p>

                    <div class="flex items-center mt-6">
                     <button on:click={goToHomePage} class="btn btn-primary hover:btn-accent">Back</button>
                    </div>
                    <p class="pt-3 text-lena-uniform text-lg italic">Due to technical difficulties please go back and purchase from the main page.</p>
                </div>
         </div>
    </div>
</div>

<style>
    @font-face {
        font-family: 'Gelasio';
        font-style: normal;
        font-weight: 400;
        src: local('Gelasio Regular'), local('Gelasio-Regular'), url(https://fonts.gstatic.com/s/gelasio/v1/cIf9MaFfvUQxTTqS9C6hYQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    p {
        font-family: Gelasio
    }
</style>