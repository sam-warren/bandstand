import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

// Mock data for featured artists
const featuredArtists = [
  {
    id: "artist1",
    name: "Luna Ray",
    genre: "Electronic",
    image: "https://placehold.co/400x400/png",
  },
  {
    id: "artist2",
    name: "The Midnight Echo",
    genre: "Alternative Rock",
    image: "https://placehold.co/400x400/png",
  },
  {
    id: "artist3",
    name: "Jazz Collective",
    genre: "Jazz Fusion",
    image: "https://placehold.co/400x400/png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1920x1080/png"
            alt="Hero background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Bandstand
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Your platform for discovering and connecting with independent
            musicians. Experience music in its purest form.
          </p>
          <Button size="lg" asChild>
            <Link href="/featured">Discover Artists</Link>
          </Button>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Artists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtists.map((artist) => (
              <Link href={`/${artist.id}`} key={artist.id}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-32 w-32 mb-4">
                        <AvatarImage src={artist.image} alt={artist.name} />
                        <AvatarFallback>{artist.name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold mb-2">
                        {artist.name}
                      </h3>
                      <p className="text-muted-foreground">{artist.genre}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Share Your Music?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of independent artists and reach new audiences.
            Start your journey with Bandstand today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/login">Join as an Artist</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
