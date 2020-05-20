<script>
  import { fade } from 'svelte/transition'; 
  import ConfirmButton from './ConfirmButton.svelte';
  export let confirmText = 'Click again to confirm.';
  export let iconUrl = '';
</script>
<style>
  button {
    background-color: #fff;
    border: 0;
    border-radius: 0.25rem;
    cursor: pointer;
    position: relative;
    margin: 0;
    background-repeat: no-repeat;
    width: 2rem;
    background-size: 1.5rem;
    background-position: center;
  }
  .inner {
    position: relative;
    left: 9999px;
  }
  .confirming {
    background-color: hsla(345, 100%, 93%, 0.9);
  }
  .wrap {
    position: relative;
    display: inline-block;
  }
  .helper {
    position: absolute;
    text-align: center;
    z-index: 100;
    opacity: 1;
    background-color: hsla(50, 100%, 50%, 1);
    color: #333;
    right: 120%;
    top: 50%;
    border: 0;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    width: 10rem;
    padding: 0.25rem;
    box-sizing: border-box;
    transform: translateY(-50%);
  }
  .nib {
    position: absolute;
    z-index: 100;
    opacity: 1;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.5rem 0 0.5rem 0.5rem;
    border-color: transparent transparent transparent hsla(50, 100%, 50%, 1);
    top: 50%;
    right: -0.5rem;
    transform: translate(-30%, -50%);
  }
</style>
<ConfirmButton let:handleClick let:handleIn let:handleOut let:ready let:confirming on:confirm>
  <span class="wrap">
    <button class:confirming type="button" style="background-image: url('{iconUrl}');" on:click={() => {handleClick(); handleOut();}}>
      <span class="inner"><slot>Confirm</slot></span>
    </button>
    {#if ready}
    <span class="helper" transition:fade={{duration: 175}}>
      <span class="nib"></span>
      {confirmText}
    </span>
    {/if}
  </span>
</ConfirmButton>