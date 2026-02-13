export type ReactionType = "LIKE" | "DISLIKE" | "LOVE" | "WOW";

export const reactionIcons: Record<ReactionType, string> = {
  LIKE: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-blue-500">
      <path d="M2 12v10h4v-10H2zm20-1c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 2 7.59 7.59C7.21 7.97 7 8.45 7 8.96V19c0 1.1.9 2 2 2h7c.82 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.48.14-.73v-1z"/>
    </svg>
  `,
  DISLIKE: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-blue-500">
      <path d="M2 12v10h4v-10H2zm20-1c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 2 7.59 7.59C7.21 7.97 7 8.45 7 8.96V19c0 1.1.9 2 2 2h7c.82 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.48.14-.73v-1z" transform="rotate(180 12 12)"/>
    </svg>
  `,
  LOVE: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5 text-pink-400">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-4.35-9-9c-1.5-3.25 1-7 5-7s5.5 3.75 5.5 3.75S17.5 5 22 12c1 1.8-1 9-10 9z"/>
    </svg>
  `,
  WOW: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-yellow-400">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
      <circle cx="16" cy="10" r="1" fill="currentColor"/>
      <circle cx="8" cy="10" r="1" fill="currentColor"/>
      <path d="M12 16c-1 0-1.5.5-1.5 1h3c0-.5-.5-1-1.5-1z" fill="currentColor"/>
    </svg>
  `,
};
