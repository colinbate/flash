<script>
import { createEventDispatcher } from 'svelte';
export let decks;

const dispatch = createEventDispatcher();

</script>
<style>
.load-area {
  border: 1px solid #999;
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - 2rem);
  border-radius: 0.5rem;
  background-color: #fff;
  margin: 1rem;
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.25), 0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.deck {
  margin: 0;
  border-bottom: 1px solid #999;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.deckname {
  padding: 1rem;
  flex-grow: 1;
}
.cancel {
  color: rgb(0,100,200);
  padding: 1rem;
  text-align: center;
  margin: 0;
}
</style>
<div class="load-area">

{#each decks as deck}
  <div class="deck">
    <a href class="deckname" on:click|preventDefault={() => dispatch('choose', deck)}>{deck.name}</a>
  </div>
{/each}
<p class="cancel" on:click={() => dispatch('leave')}>Cancel</p>
</div>