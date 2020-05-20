<script>
import DeckList from './DeckList.svelte';
import DeckDisplay from './DeckDisplay.svelte';
import DeckEdit from './DeckEdit.svelte';
import { get, set } from './storage';
import { builtIn } from './decks';
export let update;

const ALL_DECKS = 'ALL_DECKS';
let allDecks = get(ALL_DECKS) || builtIn;

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

function save() {
  set(ALL_DECKS, allDecks);
}

function open({detail}) {
  currentDeck = detail;
  mode = 'open';
}

function edit({detail}) {
  currentDeck = detail;
  mode = 'edit';
}

function remove({detail}) {
  allDecks.splice(detail, 1);
  allDecks = allDecks;
  save();
}

function deepCopy(deck) {
  const clone = {
    name: deck.name,
    cards: deck.cards.map(c => ({...c}))
  };
  return clone;
}

function clone({detail}) {
  allDecks.splice(detail, 0, deepCopy(allDecks[detail]));
  allDecks = allDecks;
  save();
}

function leaveDeck({detail}) {
  currentDeck = null;
  if (detail) {
    save();
  }
}
</script>

<main>
{#if currentDeck && mode === 'open'}
  <DeckDisplay deck={currentDeck} on:leave={leaveDeck}/>
{:else if currentDeck && mode === 'edit'}
  <DeckEdit deck={currentDeck} on:leave={leaveDeck} />
{:else}
  <DeckList decks={allDecks} on:open={open} on:edit={edit} on:clone={clone} on:remove={remove} />
  <p class="version">v1.4.0</p>
{/if}
</main>

<style>
  main {
    margin: 0 auto;
  }
  .version {
    position: absolute;
    top: 0;
    right: 1rem;
  }
</style>