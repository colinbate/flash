<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let score = 0;
export let total = 0;
</script>
<style>
.menu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
.score {
  font-size: 2rem;
  margin: 1rem;
}
button {
  border: 1px solid hsla(15, 100%, 50%, 1);
  border-radius: 0.25rem;
  background: #fff;
  color: hsla(15, 100%, 50%, 1);
  padding: 1.5rem 2.5rem;
  margin: 1rem;
  pointer-events: fill;
  width: 80vw;
  max-width: 30rem;
}
</style>

<div class="menu-card">
  <div class="score">{score} / {total}</div>
  <button type="button" on:click={() => dispatch('restart', {trim: false})}>Restart</button>
  <button type="button" on:click={() => dispatch('restart', {trim: true})}>Restart without correct</button>
  <button type="button" on:click={() => dispatch('reset')}>Reset deck</button>
</div>