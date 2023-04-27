<script>
    export let title;
    export let imageSrc;
    export let description;
    import { isAuthenticated } from "../../auth";
  </script>
  
  {#if $isAuthenticated}
    <div>
      <h1>{title}</h1>
      <img src={imageSrc} alt={title} />
      <p>{description}</p>
    </div>
  {:else}
    <p>Please log in to see this page</p>
  {/if}

  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
    .image {
      width: 100%;
      max-width: 600px;
      margin-bottom: 1rem;
    }
  </style>
  
  <div class="container">
    <h1>{title}</h1>
    <img class="image" src={imageSrc} alt={title} />
    <p>{description}</p>
  </div>