<script>
    import {onMount} from "svelte"
</script>

<style>
    .background {
      background-image: linear-gradient(to right, #161654 , #46315a , #161654)
    }
  </style>
  
  <div class="background">
    <slot></slot>
  </div>