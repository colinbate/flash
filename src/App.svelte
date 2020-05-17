<script>
import DeckList from './DeckList.svelte';
import DeckDisplay from './DeckDisplay.svelte';
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

const testDeck = {
  name: 'Sight Words (A)',
  cards: [
    { front: 'a' },
    { front: 'am' },
    { front: 'an' },
    { front: 'and' },
    { front: 'at' },
    { front: 'can' },
    { front: 'come' },
    { front: 'do' },
    { front: 'go' },
    { front: 'he' },
    { front: 'I' },
    { front: 'in' },
    { front: 'is' },
    { front: 'it' },
    { front: 'like' },
    { front: 'me' },
    { front: 'my' },
    { front: 'no' },
    { front: 'see' },
    { front: 'so' },
    { front: 'the' },
    { front: 'to' },
    { front: 'up' },
    { front: 'we' },
    { front: 'you' },
  ]
};

function open({detail}) {
  currentDeck = detail;
  mode = 'open';
}

function edit({detail}) {
  currentDeck = detail;
  mode = 'edit';
}

</script>

<main>
{#if currentDeck}
  <DeckDisplay deck={currentDeck}/>
{:else}
  <DeckList decks={[testDeck]} on:open={open} on:edit={edit}/>
{/if}
</main>

<style>
  main {
    margin: 0 auto;
  }
</style>