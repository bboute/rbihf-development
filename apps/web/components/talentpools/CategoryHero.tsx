import Image from "next/image";

interface CategoryHeroProps {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}

export function CategoryHero({
  title,
  description,
  imageUrl,
  videoUrl,
}: CategoryHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary via-tertiary to-primary/80 text-white overflow-hidden">
      {/* Background video */}
      {videoUrl && (
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary/60"></div>
        </div>
      )}

      {/* Fallback background image if no video */}
      {!videoUrl && imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/50"></div>
        </div>
      )}

      {/* Ice hockey pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxNSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
