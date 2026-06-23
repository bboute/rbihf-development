import type { JSX } from "react"
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getPageBySlug } from "@/lib/sanityClient";
import { portableTextComponents } from "@/lib/portableTextComponents";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function StaticPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold">{page.title}</h1>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <PortableText
                value={page.body}
                components={portableTextComponents}
              />
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
