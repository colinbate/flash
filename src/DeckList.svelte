<script>
import About from './About.svelte';
import { createEventDispatcher } from 'svelte';
import Confirm from './confirm';
export let decks = [];
let showAbout = false;
const dispatch = createEventDispatcher();
</script>
<style>
.deck-list {
  padding: 1rem;
}
h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 2.5rem;
  font-weight: 100;
  margin: 1rem 0 0 0;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

@media (min-width: 375px) {
  h1 {
    font-size: 3rem;
  }
}

.info {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
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

button {
  border: 0px solid hsla(15, 100%, 50%, 1);
  border-radius: 0.25rem;
  background: #fff;
  color: hsla(15, 100%, 50%, 1);
  margin: 0;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;
  background-size: 1.5rem;
  background-position: center;
  cursor: pointer;
}

button.normal {
  border-width: 1px;
  width: auto;
  margin-right: 0.25rem;
}

button.clone {
  background-image: url('/icons/clone.svg');
}
button.edit {
  background-image: url('/icons/edit.svg');
}
.none {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 1rem 0;
  color: #999;
}
</style>
<div class="deck-list">
  <h1>
    <div class="title">Flash Deck</div>
    <div class="info" on:click={() => showAbout = true}>
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
    </div>
  </h1>
  <p class="tag">Quick, easy flash cards for kids.</p>
  <About show={showAbout} on:close={() => showAbout = false}/>
  
  {#each decks as deck, index}
    <div class="deck">
      <a href class="deckname" on:click|preventDefault={() => dispatch('open', deck)}>{deck.name}</a>
      <div class="controls">
        <button type="button" on:click={() => dispatch('clone', index)} class="clone"><span class="sr-only">clone</span></button>
        <button type="button" on:click={() => dispatch('edit', deck)} class="edit"><span class="sr-only">edit</span></button>
        <Confirm on:confirm={() => dispatch('remove', index)} iconUrl="/icons/trash.svg">Delete</Confirm>
      </div>
    </div>
  {:else}
    <p class="none">No decks, why not create one?</p>
  {/each}
  <div class="button-area">
    <button type="button" class="normal" on:click={() => dispatch('new')}>New Deck</button>
    <button type="button" class="normal" on:click={() => dispatch('load')}>Load Built In Deck</button>
  </div>
</div>