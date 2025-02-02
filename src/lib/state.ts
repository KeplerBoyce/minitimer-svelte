import { writable } from "svelte/store";
import { DEFAULT_SESSIONS, sg } from "./consts";
import { type Session } from "./types";


export let scramble = writable(sg.get(1)[0].scramble_string);
export let sessions = writable<Session[]>(DEFAULT_SESSIONS);
export let chosenSession = writable<number>(0);
