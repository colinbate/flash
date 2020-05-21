<script>
import BigText from './BigText.svelte';
export let card;
export let correct;
</script>
<style>
.card {
  border: 1px solid #999;
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - 2rem);
  border-radius: 0.5rem;
  background-color: #fff;
  margin: 1rem;
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.25), 0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
}

.card.correct {
  color: green;
}

.inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 20vmin);
  font-variant-ligatures: none;
  font-family: Cavolini, "Comic Sans", "Comic Sans MS", "Chalkboard SE", Chalkboard, "TSCu_Comic", "Arial Rounded", "Arial Rounded MT", sans-serif;
}
</style>
<div class="card" class:correct={correct || card.correct}>
  <div class="inner">
    <BigText word={card.front} />
  </div>
</div>