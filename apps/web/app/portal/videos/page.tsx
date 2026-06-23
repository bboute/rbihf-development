import type { JSX } from "react"
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function PortalVideosPage(): Promise<JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Get user role from Supabase
  const { data: userRole, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error || !userRole || userRole.role !== "coach") {
    redirect("/portal");
  }

  // TODO: Fetch videos from Sanity CMS based on skills
  // This would connect to video content associated with fundamental skills

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Coaching Videos</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Access exclusive video content for certified coaches to accompany the
        fundamental skills training.
      </p>

      <div className="text-center py-12 bg-muted rounded-lg">
        <p className="text-muted-foreground mb-4">
          Video content will be available here for certified coaches.
        </p>
        <p className="text-sm text-muted-foreground">
          Videos will be organized by skill categories and linked to the public
          fundamental skills pages.
        </p>
        <div className="mt-6">
          <Link
            href="/portal"
            className="text-primary hover:underline font-medium"
          >
            ← Back to Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
