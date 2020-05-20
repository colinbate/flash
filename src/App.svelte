<script>
import DeckList from './DeckList.svelte';
import DeckDisplay from './DeckDisplay.svelte';
import DeckEdit from './DeckEdit.svelte';
import DeckLoad from './DeckLoad.svelte';
import { get, set } from './storage';
import { builtIn } from './decks';
export let update;

const ALL_DECKS = 'ALL_DECKS';
let allDecks = get(ALL_DECKS) || builtIn.map(d => deepCopy(d));

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

function newDeck() {
  const emptyDeck = {
    name: 'Untitled Deck',
    cards: []
  }
  mode = 'edit';
  allDecks.push(emptyDeck);
  allDecks = allDecks;
  currentDeck = emptyDeck;
}

function leaveDeck({detail}) {
  currentDeck = null;
  mode = 'open';
  if (detail) {
    save();
  }
}

function loadDeck() {
  mode = 'load';
}

function chooseDeck({detail}) {
  mode = 'open';
  currentDeck = null;
  allDecks.push(deepCopy(detail));
  allDecks = allDecks;
}
</script>

<main>
{#if mode === 'load'}
  <DeckLoad decks={builtIn} on:choose={chooseDeck} on:leave={leaveDeck} />
{:else if currentDeck && mode === 'open'}
  <DeckDisplay deck={currentDeck} on:leave={leaveDeck}/>
{:else if currentDeck && mode === 'edit'}
  <DeckEdit deck={currentDeck} on:leave={leaveDeck} />
{:else}
  <DeckList decks={allDecks} on:open={open} on:edit={edit} on:clone={clone} on:remove={remove} on:new={newDeck} on:load={loadDeck} />
  <p class="version">v1.5.1</p>
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