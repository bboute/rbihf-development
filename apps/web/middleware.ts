import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/news(.*)",
  "/(.*)", // Static pages like 'our-philosophy', 'tryout-info'
]);

const isPortalRoute = createRouteMatcher(["/portal(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isPortalRoute(req)) {
    await auth.protect();
  } else if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
