<script>
import { fade } from 'svelte/transition';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
export let show = false;
</script>
<style>
.about-bubble {
  position: absolute;
  top: calc(var(--vh, 1vh) * 50);
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  min-width: 15rem;
  max-width: 66rem;
  width: 86%;
  border: 1px solid #999;
  box-sizing: border-box;
  max-height: calc(var(--vh, 1vh) * 100 - 2rem);
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.25), 0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 10000;
  padding: 1rem 1rem 0;
}
h2 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 100;
  margin: 0;
}
p {
  margin: 1rem 0 0 0;
}
.close {
  color: rgb(0,100,200);
  padding: 1rem;
  text-align: center;
  margin: 0;
}
</style>
{#if show}
<div class="about-bubble" transition:fade={{duration: 200}}>
  <h2>About Flash Deck</h2>
  <p>
  FlashDeck is a simple app to display flash cards for kids.
  It is designed to be used on a mobile device with an adult (or older child) present.
  </p>
  <p>There are several decks built in which you can use or modify as you see fit.
  The lists of sight words are based on the Bermuda primary school curriculum.
  You can duplicate, edit or delete the decks from this screen, as well as add new ones.</p>
  <p>
    You can use these flash cards in whatever way works for you, but there is functionality
    to mark cards as correct while you go through the deck, then you have to option to return
    to the beginning of the deck, optionally removing the correct cards. This allows you to
    focus on those cards which your child may not know as well. Correct cards are reset automatically
    when exiting a deck.
  </p>
  <p>Created by Colin Bate.</p>
  <div class="close" on:click={() => dispatch('close')}>Close</div>
</div>
{/if}