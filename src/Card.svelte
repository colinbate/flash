<script>
import BigText from './BigText.svelte';
export let card;
</script>
<style>
.card {
  border: 1px solid #999;
  box-sizing: border-box;
  height: calc(100vh - 2rem);
  border-radius: 0.5rem;
  background-color: #fff;
  margin: 1rem;
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.25), 0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 20vmin);
}
</style>
<div class="card">
  <div class="inner">
    <BigText word={card.front} />
  </div>
</div>