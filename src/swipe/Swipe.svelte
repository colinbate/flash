<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import SwipeItem from './SwipeItem.svelte';

  export let transitionDuration = 200;
  export let swipeDistance = 0.85;
  export let active_item = 0; //readonly
  export let itemlist = [];

  $: overshoot = 1 - swipeDistance - 0.02; 
  $: {
    itemlist.length && setRender();
  }

  let activeIndicator = 0;
  let renderIndicator = 0;
  let items = 0;
  let availableWidth = 0;

  let buffer = 2;
  let renderlist = itemlist.slice(Math.max(0, activeIndicator - buffer), Math.min(itemlist.length, activeIndicator + buffer + 1));

  let elems;
  let diff = 0;

  let swipeWrapper;
  let swipeHandler;

  const touchingTpl = `
    -webkit-transition-duration: 0s;
    transition-duration: 0s;
    -webkit-transform: translate3d({{val}}px, 0, 0);
    -ms-transform: translate3d({{val}}px, 0, 0);`;
  const non_touchingTpl = `
    -webkit-transition-duration: ${transitionDuration}ms;
    transition-duration: ${transitionDuration}ms;
    -webkit-transform: translate3d({{val}}px, 0, 0);
    -ms-transform: translate3d({{val}}px, 0, 0);`;
  const TOKEN = '{{val}}';
  let touching = false;
  let x = 0;

  async function setRender() {
    renderlist = itemlist.slice(Math.max(0, activeIndicator - buffer), Math.min(itemlist.length, activeIndicator + buffer + 1));
    renderIndicator = Math.min(activeIndicator, buffer);
    await tick();
    update();
  }

  function update() {
    elems = swipeWrapper.querySelectorAll('.swipeable-item');
    items = elems.length;
    availableWidth = swipeWrapper.querySelector('.swipeable-items').offsetWidth;
    for (let i = 0; i < items; i++) {
      elems[i].style.transform = 'translate3d(' + (availableWidth * (i - renderIndicator)) + 'px, 0, 0)';
    }
  }

  function init() {
    update();
  }

  export function reset() {
    activeIndicator = 0;
    active_item = 0;
    setRender();
  }

  onMount(() => {
    init();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', update);
    }
  });

  onDestroy(()=>{
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', update);
    }
  })

  function moveHandler(e) {
    if (touching) {
      e.stopImmediatePropagation();
      e.stopPropagation();

      let max = availableWidth;
      const dragBuf = availableWidth * overshoot;
      const minDrag = -renderIndicator * availableWidth - dragBuf;
      const maxDrag = (renderlist.length - renderIndicator - 1) * availableWidth + dragBuf;

      let _x = e.touches ? e.touches[0].pageX : e.pageX;
      let _diff = x - _x;
      if (_diff <= maxDrag && _diff >= minDrag) {
        for (let i = 0; i < items; i++) {
          let _value = (max * (i - renderIndicator)) - _diff;
          elems[i].style.cssText = touchingTpl.replace(TOKEN, _value).replace(TOKEN, _value);
        }
        diff = _diff;
      }
    }
  }

  function transitionHandler(ev) {
    setRender();
    ev.target.removeEventListener('transitionend', transitionHandler);
  }

  function endHandler(e) {
    e && e.stopImmediatePropagation();
    e && e.stopPropagation();
    e && e.preventDefault();

    let max = availableWidth;
    let offset;

    touching = false;
    x = null;

    let d_max = (diff / max);
    let target = diff > 0 ? Math.ceil(d_max) : Math.floor(d_max);
    if (Math.abs(target - d_max) < swipeDistance) {
      offset = target;
    } else {
      offset = target + (diff > 0 ? -1 : 1);
    }

    activeIndicator += offset;
    elems[renderIndicator].addEventListener('transitionend', transitionHandler);
    renderIndicator += offset;
    for (let i = 0; i < items; i++) {
      let _value = (max * (i - renderIndicator));
      elems[i].style.cssText = non_touchingTpl.replace(TOKEN, _value).replace(TOKEN, _value);
    }
    active_item = activeIndicator;
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', endHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', endHandler);
    }
  }

  function moveStart(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();

    let max = availableWidth;

    touching = true;
    x = e.touches ? e.touches[0].pageX : e.pageX;
    diff = 0;
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', endHandler);
      window.addEventListener('touchmove', moveHandler);
      window.addEventListener('touchend', endHandler);
    }
  }

  async function setItem(ind) {
    activeIndicator = ind;
    active_item = ind;
    return setRender();
  }

  export function goTo(step) {
    let item = Math.max(0, Math.min(step, itemlist.length));
    setItem(item);
  }
  export function prevItem() {
    if (activeIndicator > 0) {
      diff = 0 - availableWidth;
      endHandler();
    }
  }

  export function nextItem() {
    if (activeIndicator < itemlist.length - 1) {
      diff = availableWidth;
      endHandler();
    }
  }
</script>

<style>
.swipe-panel {
  position: relative;
  height: var(--sv-swipe-panel-height, 100%);
  width: var(--sv-swipe-panel-width, inherit);
}
.swipe-item-wrapper{
  overflow: hidden;
  position: relative;
  height: inherit;
  z-index: var(--sv-swipe-panel-wrapper-index, 2);
  pointer-events: none;
}

.swipeable-items,
.swipeable-slot-wrapper {
  position: relative;
  width: inherit;
  height: inherit;
}

.swipe-handler {
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0);
}
</style>
<div class="swipe-panel">
  <div class="swipe-item-wrapper" bind:this={swipeWrapper}>
    <div class="swipeable-items">
      <div class="swipeable-slot-wrapper">
        {#each renderlist as item, ii (item.id)}
          <SwipeItem>
            <slot {item} />
          </SwipeItem>
        {/each}
      </div>
    </div>
  </div>
  <div class="swipe-handler" bind:this={swipeHandler} on:touchstart={moveStart} on:mousedown={moveStart}></div>
</div>
