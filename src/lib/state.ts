import { writable } from "svelte/store";
import { DEFAULT_SESSIONS, sg } from "./consts";
import { type Session } from "./types";


export let scramble = writable<string>(sg.get(1)[0].scramble_string); // Scramble text
export let sessions = writable<Session[]>(DEFAULT_SESSIONS);
export let chosenSession = writable<number>(0); // Index of chosen session inside of "sessions"
export let timerOption = writable<number>(0); // 0 = none, 1 = +2, 2 = DNF
