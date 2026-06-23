import type { JSX } from "react"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  getGuidesByRole,
  getAnnouncementsByRole,
  getAllPosts,
} from "@/lib/sanityClient";
import AnnouncementsWidget from "@/components/dashboard/AnnouncementsWidget";
import GuidesWidget from "@/components/dashboard/GuidesWidget";
import QuickActionsWidget from "@/components/dashboard/QuickActionsWidget";
import NewsWidget from "@/components/dashboard/NewsWidget";

export default async function CoachDashboardPage(): Promise<JSX.Element> {
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

  // Fetch coach-specific content
  const [guides, announcements, posts] = await Promise.all([
    getGuidesByRole("coach"),
    getAnnouncementsByRole("coach"),
    getAllPosts(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Coach Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to your coach dashboard. This area contains private content
          for coaches including guides, announcements, and rule changes.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActionsWidget />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Announcements Widget */}
        <AnnouncementsWidget announcements={announcements} />

        {/* Guides Widget */}
        <GuidesWidget guides={guides} />

        {/* News Widget */}
        <NewsWidget posts={posts} />
      </div>
    </div>
  );
}
