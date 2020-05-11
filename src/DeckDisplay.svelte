<script>
import { Swipe, SwipeItem } from "svelte-swipe";
import Card from './Card.svelte';
export let deck;
let swiper;
let card;

function goPrev() {
  swiper.prevItem();
}

function goNext() {
  swiper.nextItem();
}

</script>
<style>
.deckdisplay {
  width: 100%;
  height: 100vh;
}

.nav {
  position: absolute;
  bottom: 1rem;
  z-index: 1000;
  width: 25vmin;
  height: 25vmin;
  border-radius: 9999px;
  text-align: center;
  line-height: 25vmin;
  background: rgba(0, 0, 0, 0.2);
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
{#if card < (deck.cards.length - 1)}<div class="nav next" on:click={goNext}></div>{/if}
<div class="deckdisplay">
<Swipe autoplay={false} showIndicators={false} bind:this={swiper} bind:active_item={card} defaultIndex={false}>
{#each deck.cards as card}
<SwipeItem>
  <Card {card} />
</SwipeItem>
{/each}
</Swipe>
</div>
