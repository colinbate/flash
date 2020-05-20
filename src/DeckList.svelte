<script>
import { createEventDispatcher } from 'svelte';
import Confirm from './confirm';
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
  margin: 1rem 0 0 0;
}
.tag {
  position: relative;
  top: -0.5rem;
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
  display: flex;
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
  border: 0px solid hsla(15, 100%, 50%, 1);
  border-radius: 0.25rem;
  background: #fff;
  color: hsla(15, 100%, 50%, 1);
  margin: 0;
  background-repeat: no-repeat;
  width: 2rem;
  background-size: 1.5rem;
  background-position: center;
  cursor: pointer;
}
button > span {
  left: 9999px;
  position: relative;
}
button.clone {
  background-image: url('/icons/clone.svg');
}
button.edit {
  background-image: url('/icons/edit.svg');
}
</style>
<div class="deck-list">
  <h1>Flash Deck</h1>
  <p class="tag">Quick, easy flash cards for kids.</p>

  {#each decks as deck, index}
    <div class="deck">
      <a href class="deckname" on:click|preventDefault={() => dispatch('open', deck)}>{deck.name}</a>
      <div class="controls">
        <button type="button" on:click={() => dispatch('clone', index)} class="clone"><span>clone</span></button>
        <button type="button" on:click={() => dispatch('edit', deck)} class="edit"><span>edit</span></button>
        <Confirm on:confirm={() => dispatch('remove', index)} iconUrl="/icons/trash.svg">Delete</Confirm>
      </div>
    </div>
  {:else}
    <p class="none">No decks, why not create one</p>
  {/each}
  <div class="button-area">
    <button type="button">New Deck</button>
  </div>
</div>