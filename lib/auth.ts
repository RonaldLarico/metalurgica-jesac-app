// src/lib/auth.ts
import type { AstroCookies } from "astro";

export function getUserId(cookies: AstroCookies): number | null {
  const session = cookies.get("session")?.value;
  if (!session) return null;

  const id = Number(session);
  return isNaN(id) ? null : id;
}

export function requireAuth(cookies: AstroCookies): number {
  const userId = getUserId(cookies);
  if (!userId) {
    throw new Response(null, {
      status: 302,
      headers: { Location: "/login" },
    });
  }
  return userId;
}
