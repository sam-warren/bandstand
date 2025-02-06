"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, User2, Video, Music } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ArtistProfileProps {
  name: string;
  bio?: string;
  profileImage?: string;
  mainImage?: string;
  youtubeVideoId?: string;
}

// Responsive wrapper for iframes
function ResponsiveIframe({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ paddingTop: "56.25%" }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

interface SpotifyTrackProps {
  trackId: string;
}

function SpotifyTrack({ trackId }: SpotifyTrackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!hasError) {
        setIsLoading(false);
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [retryCount, hasError]);

  const handleLoad = () => {
    console.log(`Track ${trackId} loaded successfully`);
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    console.log(`Error loading track ${trackId}`);
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
  };

  return (
    <div className="relative min-h-[80px]">
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-[80px] rounded-md" />
      )}
      <iframe
        key={`${trackId}-${retryCount}`}
        src={`https://open.spotify.com/embed/track/${trackId}?theme=0`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
      {hasError && (
        <div className="absolute inset-0 w-full h-[80px] rounded-md bg-muted flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p>Failed to load track</p>
            <button
              onClick={handleRetry}
              className="text-sm text-primary hover:underline mt-1"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const FEATURED_TRACKS = [
  "4cOdK2wGLETKBW3PvgPWqT",
  "0HUTL8i4y4MiGCPId7M7wb",
  "5PjdY0CKGZdEuoNab3yDmX",
];

export function ArtistProfile({
  name,
  bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  profileImage = "https://placehold.co/400",
  mainImage = "https://placehold.co/1200x600",
  youtubeVideoId = "dQw4w9WgXcQ",
}: ArtistProfileProps) {
  return (
    <div className="min-h-screen flex items-start justify-center p-4 md:p-6">
      <Tabs defaultValue="picture" className="flex items-start gap-6">
        <div className="w-[800px]">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-6 border-b">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-primary">
                <AvatarImage src={profileImage} alt={name} />
                <AvatarFallback className="text-xl">{name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
                <p className="text-muted-foreground">Artist Profile</p>
              </div>
            </CardHeader>
            <CardContent className="p-6 min-h-[500px]">
              <TabsContent value="picture" className="m-0 h-full">
                <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src={mainImage}
                    alt={`${name}'s banner image`}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                    priority
                  />
                </div>
              </TabsContent>

              <TabsContent value="bio" className="m-0 space-y-4 h-full">
                <h2 className="text-2xl font-semibold">About</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {bio}
                </p>
              </TabsContent>

              <TabsContent value="video" className="m-0 space-y-4 h-full">
                <h2 className="text-2xl font-semibold">Latest Video</h2>
                <ResponsiveIframe>
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0 rounded-lg"
                  />
                </ResponsiveIframe>
              </TabsContent>

              <TabsContent value="songs" className="m-0 space-y-4 h-full">
                <h2 className="text-2xl font-semibold">Featured Tracks</h2>
                <div className="grid gap-4">
                  {FEATURED_TRACKS.map((trackId) => (
                    <SpotifyTrack key={trackId} trackId={trackId} />
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>

        <TabsList className="flex flex-col h-fit bg-muted p-2 rounded-lg space-y-2 w-[120px] sticky top-4">
          <TabsTrigger 
            value="picture" 
            className="flex items-center gap-2 justify-start w-full"
          >
            <ImageIcon className="h-4 w-4" />
            <span>Picture</span>
          </TabsTrigger>
          <TabsTrigger 
            value="bio" 
            className="flex items-center gap-2 justify-start w-full"
          >
            <User2 className="h-4 w-4" />
            <span>Bio</span>
          </TabsTrigger>
          <TabsTrigger 
            value="video" 
            className="flex items-center gap-2 justify-start w-full"
          >
            <Video className="h-4 w-4" />
            <span>Video</span>
          </TabsTrigger>
          <TabsTrigger 
            value="songs" 
            className="flex items-center gap-2 justify-start w-full"
          >
            <Music className="h-4 w-4" />
            <span>Songs</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
