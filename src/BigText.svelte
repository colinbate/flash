<script>
import { onMount, onDestroy } from 'svelte';
export let word;

let div;

function setCss(elem, prop, value) {
  if (typeof (prop) === 'string') {
    elem.style[prop] = value;
  } else {
    for (const pp in prop) {
      if (Object.prototype.hasOwnProperty.call(prop, pp)) {
        elem.style[pp] = prop[pp];
      }
    }
  }
}

function px(number) {
  return `${number}px`;
}

const opts = {
  factor: 0.8
};
const MAX_FONT_SIZE = 1000;

function maxText(elem) {
  //hides the element to prevent "flashing"
  setCss(elem, 'visibility', 'hidden');
  setCss(elem, 'width', '100%');
  setCss(elem, 'height', '100%');

  const pWidth = elem.offsetWidth - 32;
  const pHeight = elem.offsetHeight - 32;
  setCss(elem, {
    'width': 'auto',
    'height': 'auto',
    'float': 'left', //the need to set this is very odd, its due to margin-collapsing. See https://developer.mozilla.org/en-US/docs/Web/CSS/margin_collapsing
    'fontSize': px(MAX_FONT_SIZE * opts.factor),
    'lineHeight': '1000px',
  });

  const box = {
    width: elem.offsetWidth,
    height: elem.offsetHeight
  };

  const widthFactor = (pWidth) / box.width;
  const heightFactor = (pHeight) / box.height;
  let lineHeight;

  if (widthFactor < heightFactor) {
    lineHeight = Math.floor(widthFactor * MAX_FONT_SIZE);
  } else if (widthFactor >= heightFactor) {
    lineHeight = Math.floor(heightFactor * MAX_FONT_SIZE);
  }

  const fontSize = lineHeight * opts.factor;

  setCss(elem, {
    'fontSize': px(Math.floor(fontSize)),
    'lineHeight': px(Math.ceil(lineHeight)),
    'marginBottom': '0px',
    'marginRight': '0px',
    'float': 'none'
  });
  //shows the element after the work is done
  setCss(elem, 'visibility', 'visible');
}

function update() {
  maxText(div);
}

onMount(() => {
  update()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', update);
  }
});

onDestroy(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', update);
  }
});

</script>
<style>
.bigtext {
  width: 100%;
  height: 100%;
  padding-bottom: 2rem;
}
</style>
<div class="bigtext" bind:this={div}>{word}</div>