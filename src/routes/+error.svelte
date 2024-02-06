<script lang="ts">
    import { page } from "$app/stores";
  
    let message = $page.error?.description;
  
    if (!message) {
      switch ($page.status) {
        case 404: {
          message =
            "Looks like you hit a block in your adventure, but don't worry, we've got plenty of datapacks to help you break through. Unfortunately, this page isn't one of them";
          break;
        }
  
        case 401: {
          message =
            "You are logged out, please log back in to enjoy all the luxuries we supply";
          break;
        }
  
        case 403: {
          message =
            "Forbidden fruit! This page is tempting, but unfortunately, it's off-limits for now. Don't worry, we have plenty of other juicy datapacks for you to enjoy!";
          break;
        }
  
        case 500: {
          message =
            "A creeper exploded in our server room, but our Redstone engineers are on the case fixing it, try again in a few minutes.";
          break;
        }
  
        default: {
          message =
            "We haven't coded a message for this error yet! If you think we should, reach out to us, or, if you're a dev, make a pull request.";
        }
      }
    }
  </script>
  
  <svelte:head>
    <title>{$page.error?.message} | Datapack Hub</title>
  </svelte:head>
  
  <main>
    <h1>LOL there was an error</h1>
  </main>