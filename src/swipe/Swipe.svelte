<script>
  import { onMount, onDestroy } from 'svelte';

  export let transitionDuration = 200;
  export let swipeDistance = 0.2;
  export let active_item = 0; //readonly

  let activeIndicator = 0;
  let indicators;
  let items = 0;
  let availableWidth = 0;
  let topClearence = 0;

  let elems;
  let diff = 0;

  let swipeWrapper;
  let swipeHandler;

  let min = 0;
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
  let posX = 0;
  let swipingLeft = false;
  let x = 0;

  function update() {
    swipeHandler.style.top = topClearence + 'px';
    availableWidth = swipeWrapper.querySelector('.swipeable-items').offsetWidth;
    for (let i = 0; i < items; i++) {
      elems[i].style.transform = 'translate3d(' + (availableWidth * i) + 'px, 0, 0)';
    }
    changeItem(active_item);
  }

  function init() {
    elems = swipeWrapper.querySelectorAll('.swipeable-item');
    items = elems.length;
    update();
  }

  export function reset() {
    elems = swipeWrapper.querySelectorAll('.swipeable-item');
    items = elems.length;
    activeIndicator = 0;
    active_item = 0;
    update();
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

      let _x = e.touches ? e.touches[0].pageX : e.pageX;
      swipingLeft = _x < x;
      let _diff = swipingLeft ? (x - _x) + posX : posX - (_x - x);
      if (_diff <= (max * (items - 1)) && _diff >= min) {
        for (let i = 0; i < items; i++) {
          let _value = (max * i) - _diff;
          elems[i].style.cssText = touchingTpl.replace(TOKEN, _value).replace(TOKEN, _value);
        }
        diff = _diff;
      }
    }
  }

  function endHandler(e) {
    e && e.stopImmediatePropagation();
    e && e.stopPropagation();
    e && e.preventDefault();

    let max = availableWidth;
    let original = activeIndicator;

    touching = false;
    x = null;

    let d_max = (diff / max);
    let target = swipingLeft ? Math.ceil(d_max) : Math.floor(d_max);
    if (Math.abs(original - d_max) > swipeDistance) {
      diff = target * max;
    } else {
      diff = original * max;
    }

    posX = diff;
    activeIndicator = (diff / max);
    for (let i = 0; i < items; i++) {
      let _value = (max * i) - posX;
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
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', endHandler);
      window.addEventListener('touchmove', moveHandler);
      window.addEventListener('touchend', endHandler);
    }
  }

  function changeItem(item) {
    let max = availableWidth;
    diff = max * item;
    endHandler();
  }

  export function goTo(step) {
    let item = Math.max(0, Math.min(step, items - 1));
    changeItem(item)
  }
  export function prevItem() {
    let step = activeIndicator - 1;
    goTo(step)
  }

  export function nextItem() {
    let step = activeIndicator + 1;
    goTo(step)
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
  top: 40px;
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
        <slot />
      </div>
    </div>
  </div>
  <div class="swipe-handler" bind:this={swipeHandler} on:touchstart={moveStart} on:mousedown={moveStart}></div>
</div>
