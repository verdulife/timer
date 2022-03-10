import { browser } from "$app/env";
import { writable } from "svelte/store";

export const modeStore = writable((browser && JSON.parse(localStorage.getItem('modeStore'))) || false);
export const timerStore = writable((browser && JSON.parse(localStorage.getItem('timerStore'))) || []);

modeStore.subscribe((val) => browser && (localStorage.modeStore = JSON.stringify(val)));
timerStore.subscribe((val) => browser && (localStorage.timerStore = JSON.stringify(val)));