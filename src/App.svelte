<script>
import DeckList from './DeckList.svelte';
import DeckDisplay from './DeckDisplay.svelte';
import { builtIn } from './decks';
export let update;

update.then(avail => {
  if (avail && window) {
    setTimeout(() => {
      const reload = window.location.hostname === 'localhost' ? true : confirm('New Update Available! Reload?');
      if (reload) {
        window.location.reload();
      }
    }, 1);
  }
});

let currentDeck;
let mode = 'open';

function open({detail}) {
  currentDeck = detail;
  mode = 'open';
}

function edit({detail}) {
  currentDeck = detail;
  mode = 'edit';
}

function leaveDeck() {
  currentDeck = null;
}
</script>

<main>
{#if currentDeck}
  <DeckDisplay deck={currentDeck} on:leave={leaveDeck}/>
{:else}
  <DeckList decks={builtIn} on:open={open} on:edit={edit}/>
{/if}
</main>

<style>
  main {
    margin: 0 auto;
  }
</style>