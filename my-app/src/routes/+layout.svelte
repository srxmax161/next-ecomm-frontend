<script>
    import "../app.css"
    import Header from "../components/Header.svelte";
</script>

<Header /> 
<style>
    .background {
      background-image: linear-gradient(to right, #161654 , #46315a , #161654)
    }
  </style>
  
  <div class="background">
</div>
<slot />