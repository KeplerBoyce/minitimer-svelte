import { browser } from "$app/environment";
import { derived, writable } from "svelte/store";
import { DEFAULT_SESSIONS, sg } from "./consts";
import { type Session } from "./types";
import { getPbAvgsOfN } from "./helpers";


/* ----- Writable stores (synced with localStorage) ----- */
// Scramble text
export let scramble = writable<string>(browser && localStorage.scramble
  ? localStorage.scramble
  : sg.get(1)[0].scramble_string); 
scramble.subscribe((value: string) => {
  if (!browser) return;
  localStorage.scramble = value;
});

// Array of session objects
export let sessions = writable<Session[]>(browser && localStorage.sessions
  ? JSON.parse(localStorage.sessions)
  : DEFAULT_SESSIONS);
sessions.subscribe((value: Session[]) => {
  if (!browser) return;
  localStorage.sessions = JSON.stringify(value);
});

// Index of chosen session inside of "sessions"
export let chosenSession = writable<number>(browser && localStorage.chosenSession
  ? JSON.parse(localStorage.chosenSession)
  : 0);
chosenSession.subscribe((value: number) => {
  if (!browser) return;
  localStorage.chosenSession = JSON.stringify(value);
});

// Selected timer option: 0 = none, 1 = +2, 2 = DNF
export let timerOption = writable<number>(browser && localStorage.timerOption
  ? JSON.parse(localStorage.timerOption)
  : 0);
timerOption.subscribe((value: number) => {
  if (!browser) return;
  localStorage.timerOption = JSON.stringify(value);
});

// Index of selected solve, undefined if no solve is selected
export let popoverIndex = writable<number | undefined>(undefined);
export let hoveredIndex = writable<number | undefined>(undefined);

/* ----- Derived stores ----- */
export let session = derived([sessions, chosenSession], ([$sessions, $chosenSession]) => {
  return $sessions[$chosenSession];
});

export let pbSingles = derived([sessions, chosenSession], ([$sessions, $chosenSession]) => {
  return getPbAvgsOfN($sessions[$chosenSession].solves, 1);
});

export let pbAo5s = derived([sessions, chosenSession], ([$sessions, $chosenSession]) => {
  return getPbAvgsOfN($sessions[$chosenSession].solves, 5);
});
