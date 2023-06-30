<script>
  import { paginate, DarkPaginationNav } from 'svelte-paginate';
  import { imageCheckout } from '../utils/auth.js';

  export let data;

  let images = data.images;
  let currentPage = 1;
  let pageSize = 3;
  $: paginationData = paginate({ items: images, pageSize, currentPage });

</script>

<div class="bg-gradient-to-r from-lena-uniform via-lena-iris to-lena-uniform">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mx-auto pt-10 pb-10" style="width: 1200px;">
    {#each paginationData as image}
      <div class="card hover:transition delay-150 hover:-translate-y-10 shadow-xl shadow-accent hover:shadow-red-500 flex flex-col justify-between">
        <figure style="height: 350px;" class="relative">
          <img src={image.url} alt="" class="w-full object-cover transition-transform duration-300 transform hover:scale-110"  />
        </figure>
        <div class="overflow-hidden card-body flex-grow bg-lena-hair rounded-b-2xl">
          <h2 class="card-title text-2xl text-neutral-900 font-bold mb-2">{image.title}</h2>
          <p class="mb-4 overflow-hidden text-lena-uniform text-justify w-auto h-24">{image.description}</p>
          <p class="text-lena-uniform text-2xl font-bold pb">${image.price} USD</p>
          <div class="card-actions items-end justify-end">
            <a href="/upload/{image.id}">
              <button class="btn btn-primary hover:animate-pulse hover:btn-accent">View</button>
            <button on:click={imageCheckout} data-price={image.price} data-title={image.title} for="openBuyImage" class="btn btn-secondary gap-2 rounded-xl ">Buy Now</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<DarkPaginationNav
  totalItems={images.length}
  pageSize={pageSize}
  currentPage={currentPage}
  limit={1}
  showStepOptions={true}
  on:setPage={(e) => currentPage = e.detail.page}
/>

