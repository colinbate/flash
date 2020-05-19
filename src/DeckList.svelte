<script>
import { createEventDispatcher } from 'svelte';
export let decks = [];

const dispatch = createEventDispatcher();
</script>
<style>
.deck-list {
  padding: 1rem;
}
h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 3rem;
  font-weight: 100;
  margin-top: 1rem;
}

.deck {
  margin: 0 -1rem;
  border-top: 1px solid #999;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.deckname {
  padding: 1rem;
  flex-grow: 1;
}

.controls {
  padding-right: 1rem;
  display: none;
}

.button-area {
  border-top: 1px solid #999;
  padding: 1rem;
  margin: 0 -1rem;
}

.button-area button {
  display: none;
}

button {
  border: 1px solid hsla(15, 100%, 50%, 1);
  border-radius: 0.25rem;
  background: #fff;
  color: hsla(15, 100%, 50%, 1);
  margin: 0;
}
</style>
<div class="deck-list">
  <h1>Flash Deck</h1>
  <p>The quickest, easiest flash cards for yourself or your kids.</p>

  {#each decks as deck}
    <div class="deck">
      <a href class="deckname" on:click|preventDefault={() => dispatch('open', deck)}>{deck.name}</a>
      <div class="controls">
        <button type="button">edit</button>
      </div>
    </div>
  {:else}
    <p class="none">No decks, why not create one</p>
  {/each}
  <div class="button-area">
    <button type="button">New Deck</button>
  </div>
  <p>Version 1.3.0</p>
</div>