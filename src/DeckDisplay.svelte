<script>
import { tick, createEventDispatcher, onMount } from 'svelte';
import { Swipe, SwipeItem } from "./swipe";
import { get, set } from './storage';
import Card from './Card.svelte';
import EndOfDeck from './EndOfDeck.svelte';
export let deck;
let swiper;
let card;
let cards = deck.cards;
let remaining = cards;
let shuffled = false;
let score = 0;
const dispatch = createEventDispatcher();
const CARD_KEY = 'CARD';

$: correct = cards[card] && cards[card].correct;
$: {
  if (card != null) {
    set(CARD_KEY, card);
  }
}

onMount(() => {
  const savedCard = get(CARD_KEY);
  if (savedCard != null) {
    card = savedCard;
    swiper.goTo(card);
  }
});

function goPrev() {
  swiper.prevItem();
}

function goNext() {
  swiper.nextItem();
}
function handle(ev) {
  console.log(ev);
}

function toggleCorrect() {
  if (cards && cards[card]) {
    cards[card].correct = !cards[card].correct;
    score += cards[card].correct ? 1 : -1;
  }
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
    cards = shuffle(remaining);
    shuffled = true;
  } else {
    cards = remaining;
    shuffled = false;
  }
}

async function restart(ev) {
  if (ev.detail && ev.detail.trim) {
    console.log('trim');
    remaining = cards.filter(c => !c.correct);
    cards = remaining;
    await tick();
    swiper.reset();
    return;
  }
  swiper.goTo(0);
}

async function reset() {
  remaining = deck.cards;
  cards = shuffled ? shuffle(remaining) : remaining;
  cards.forEach(c => c.correct = false);
  score = 0;
  await tick();
  swiper.reset();
}

function backOut() {
  set(CARD_KEY, null);
  dispatch('leave');
}
</script>
<style>
.deckdisplay {
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}

.nav, .shuffle, .mark-correct, .back-out {
  position: absolute;
  z-index: 1000;
  width: 20vmin;
  height: 20vmin;
  text-align: center;
  line-height: 20vmin;
  cursor: pointer;
}

.controls {
  z-index: 900;
  border-top: 1px solid #999;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  height: 20vmin;
  background: rgba(0, 0, 0, 0.3);
}

.shuffle {
  left: 40vmin;
  padding: 4vmin;
  box-sizing: border-box;
}

@media (orientation: landscape) {
  .shuffle {
    left: 50%;
    transform: translateX(-50%);
  }
}

.mark-correct {
  padding: 4vmin;
  box-sizing: border-box;
  right: 20vmin;
}

.shuffle.shuffled,
.mark-correct.correct {
  color: hsl(120, 100%, 30%);
}

.nav::before {
	border-style: solid;
	border-width: 1vmin 1vmin 0 0;
	content: '';
	display: block;
	height: 8vmin;
	left: 50%;
	position: absolute;
  top: 50%;
  transform-origin: center;
	width: 8vmin;
}

.nav.next::before {
	transform: translate(-68%, -50%) rotate(45deg) ;
}

.nav.prev::before {
	transform: translate(-32%, -50%) rotate(-135deg);
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

.back-out {
  width: 16vmin;
  height: 16vmin;
  padding: 2vmin 2vmin 2vmin 1.5vmin;
  box-sizing: border-box;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  -webkit-border-bottom-right-radius: 3vmin;
  -moz-border-radius-bottomright: 3vmin;
  border-bottom-right-radius: 3vmin;
}
</style>
<div class="controls">
  {#if card > 0}<div class="nav prev" on:click={goPrev}></div>{/if}
  {#if card < (cards.length)}
    <div class="mark-correct" class:correct on:click={toggleCorrect}>
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
    </div>
    <div class="nav next" on:click={goNext}></div>
  {/if}
  <div class="shuffle" class:shuffled on:click={toggleShuffle}>
    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="random" class="svg-inline--fa fa-random fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 400l-79.2 72.9c-15.1 15.1-41.8 4.4-41.8-17v-40h-31c-3.3 0-6.5-1.4-8.8-3.9l-89.8-97.2 38.1-41.3 79.8 86.3H384v-48c0-21.4 26.7-32.1 41.8-17l79.2 71c9.3 9.6 9.3 24.8 0 34.2zM12 152h91.8l79.8 86.3 38.1-41.3-89.8-97.2c-2.3-2.5-5.5-3.9-8.8-3.9H12c-6.6 0-12 5.4-12 12v32c0 6.7 5.4 12.1 12 12.1zm493-41.9l-79.2-71C410.7 24 384 34.7 384 56v40h-31c-3.3 0-6.5 1.4-8.8 3.9L103.8 360H12c-6.6 0-12 5.4-12 12v32c0 6.6 5.4 12 12 12h111c3.3 0 6.5-1.4 8.8-3.9L372.2 152H384v48c0 21.4 26.7 32.1 41.8 17l79.2-73c9.3-9.4 9.3-24.6 0-33.9z"></path></svg>
  </div>
</div>
<div class="back-out" on:click={backOut}>
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path d="M352 217.1c0-8.8-7.2-16-16-16H192v-93.9c0-7.1-8.6-10.7-13.6-5.7L36.8 244.6c-6.3 6.3-6.3 16.4 0 22.7l141.6 143.1c5 5 13.6 1.5 13.6-5.7v-93.9h144c8.8 0 16-7.2 16-16v-77.7m32 0v77.7c0 26.5-21.5 48-48 48H224v61.9c0 35.5-43 53.5-68.2 28.3L14.1 290c-18.8-18.8-18.8-49.2 0-68L155.8 78.9c25.1-25.1 68.2-7.3 68.2 28.3v61.9h112c26.5 0 48 21.6 48 48zM512 112v288c0 26.5-21.5 48-48 48H332c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h132c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H332c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h132c26.5 0 48 21.5 48 48z" fill-rule="nonzero"/></svg>
</div>
<div class="deckdisplay">
<Swipe bind:this={swiper} bind:active_item={card}>
{#each cards as card}
<SwipeItem>
  <Card {card} />
</SwipeItem>
{/each}
<SwipeItem>
  <EndOfDeck on:restart={restart} on:reset={reset} total={deck.cards.length} {score} />
</SwipeItem>
</Swipe>
</div>
