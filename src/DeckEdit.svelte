<script>
import { createEventDispatcher, onMount } from 'svelte';
export let deck;

const dispatch = createEventDispatcher();

let cardContent;
let deckName;
onMount(() => {
  deckName = deck.name;
  cardContent = deck.cards.map(c => c.front).join('\n');
});

function save() {
  deck.name = deckName;
  deck.cards = cardContent.split('\n').filter(x => !!x).map(line => ({front: line}));
  dispatch('leave', true);
}
</script>
<style>
.edit-area {
  border: 1px solid #999;
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - 2rem);
  border-radius: 0.5rem;
  background-color: #fff;
  margin: 1rem;
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.25), 0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
}
textarea {
  flex-grow: 1;
  margin: 0;
  border: 0;
}

button {
  border: 1px solid hsla(15, 100%, 50%, 1);
  border-radius: 0.25rem;
  background: #fff;
  color: hsla(15, 100%, 50%, 1);
  margin: 0 0.5rem 0 0;
}
.controls {
  padding: 0.5rem;
}
.deck-name {
  padding: 0.5rem;
  font-size: 1.25rem;
}
.cancel {
  color: rgb(0,100,200);
}
</style>
<div class="edit-area">
  <div class="deck-name" contenteditable="true" bind:textContent={deckName}></div>
  <textarea bind:value={cardContent}></textarea>
  <div class="controls">
    <button type="button" on:click={save}>Save</button>
    <span class="cancel" on:click={() => dispatch('leave')}>Cancel</span>
  </div>
</div>
