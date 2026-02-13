import { defineMiddleware } from "astro/middleware";
import { getUserId } from "../lib/auth";

export const onRequest = defineMiddleware((context, next) => {
  const { pathname, origin } = context.url;

  const validRoutes = [
    "/", 
    "/#service",
    "/#gallery",
    "/#about",
    "/#contact",
    "/gallery",
    "/user",
    "/services",
    "/404"
  ];

  const isValidRoute = validRoutes.some((route) => pathname === route || pathname.startsWith(route));

  if (!isValidRoute) {
    return Response.redirect(`${origin}/404`, 302);
  }

  const protectedRoutes = ["/services", "/gallery", "/user"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected) {
    const userId = getUserId(context.cookies);

    if (!userId) {
      return Response.redirect(`${origin}/?loginRequired=1`, 302);
    }
  }

  return next();
});
