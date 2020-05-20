<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

let confirming = false;
let ready = false;
let mouseouttimer = undefined;
let readytimer = undefined;
	
function handleClick() {
	if (!confirming) {
		confirming = true;
		setTimeout(() => ready = true, 250);
	} else if (ready) {
		confirming = false;
		ready = false;
		dispatch('confirm');
	}
}
function handleOut() {
	if (mouseouttimer) {
		clearTimeout(mouseouttimer);
	}
	mouseouttimer = setTimeout(() => {
		confirming = false;
		ready = false;
	}, 2500);
}
	
function handleIn() {
	if (mouseouttimer) {
		clearTimeout(mouseouttimer);
	}
}
</script>
<slot {handleClick} {handleIn} {handleOut} {confirming} {ready}></slot>