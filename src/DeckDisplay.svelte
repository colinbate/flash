<script>
import { Swipe, SwipeItem } from "svelte-swipe";
import Card from './Card.svelte';
export let deck;
let swiper;
let card;
let cards = deck.cards;
let shuffled = false;

function goPrev() {
  swiper.prevItem();
}

function goNext() {
  swiper.nextItem();
}
function handle(ev) {
  console.log(ev);
}

function shuffle(original) {
  const array = [...original];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function toggleShuffle() {
  if (!shuffled) {
    cards = shuffle(deck.cards);
    shuffled = true;
  } else {
    cards = deck.cards;
    shuffled = false;
  }
}
</script>
<style>
.deckdisplay {
  width: 100%;
  height: 100vh;
}

.nav, .shuffle {
  position: absolute;
  bottom: 1rem;
  z-index: 1000;
  width: 25vmin;
  height: 25vmin;
  border-radius: 9999px;
  text-align: center;
  line-height: 25vmin;
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.shuffle {
  left: 50%;
  transform: translateX(-50%);
  padding: 5vmin;
  box-sizing: border-box;
}

.shuffle.shuffled {
  color: hsl(120, 100%, 41%);
}

.nav::before {
	border-style: solid;
	border-width: 1vmin 1vmin 0 0;
	content: '';
	display: block;
	height: 10vmin;
	left: 50%;
	position: absolute;
  top: 50%;
  transform-origin: center;
	width: 10vmin;
}

.nav.next::before {
	transform: translate(-68%, -50%) rotate(45deg) ;
}

.nav.prev::before {
	transform: translate(-32%, -50%) rotate(-135deg);
}

.prev {
  left: 1rem;
}

.next {
  right: 1rem;
}
</style>
{#if card > 0}<div class="nav prev" on:click={goPrev}></div>{/if}
{#if card < (cards.length - 1)}<div class="nav next" on:click={goNext}></div>{/if}
<div class="shuffle" class:shuffled on:click={toggleShuffle}>
<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="random" class="svg-inline--fa fa-random fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 400l-79.2 72.9c-15.1 15.1-41.8 4.4-41.8-17v-40h-31c-3.3 0-6.5-1.4-8.8-3.9l-89.8-97.2 38.1-41.3 79.8 86.3H384v-48c0-21.4 26.7-32.1 41.8-17l79.2 71c9.3 9.6 9.3 24.8 0 34.2zM12 152h91.8l79.8 86.3 38.1-41.3-89.8-97.2c-2.3-2.5-5.5-3.9-8.8-3.9H12c-6.6 0-12 5.4-12 12v32c0 6.7 5.4 12.1 12 12.1zm493-41.9l-79.2-71C410.7 24 384 34.7 384 56v40h-31c-3.3 0-6.5 1.4-8.8 3.9L103.8 360H12c-6.6 0-12 5.4-12 12v32c0 6.6 5.4 12 12 12h111c3.3 0 6.5-1.4 8.8-3.9L372.2 152H384v48c0 21.4 26.7 32.1 41.8 17l79.2-73c9.3-9.4 9.3-24.6 0-33.9z"></path></svg>
</div>
<div class="deckdisplay">
<Swipe autoplay={false} showIndicators={false} bind:this={swiper} bind:active_item={card} defaultIndex={false}>
{#each cards as card}
<SwipeItem>
  <Card {card} />
</SwipeItem>
{/each}
</Swipe>
</div>
