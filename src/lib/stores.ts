import { browser } from "$app/env";
import { writable } from "svelte/store";

export const timerStore = writable((browser && JSON.parse(localStorage.getItem('timerStore'))) || []);
timerStore.subscribe((val) => browser && (localStorage.timerStore = JSON.stringify(val)));