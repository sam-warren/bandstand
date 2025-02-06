import { ArtistProfile } from "@/components/artist/artist-profile"

interface ArtistPageProps {
    params: {
        artistId: string;
    }
}

export default function ArtistPage({ params }: ArtistPageProps) {
    // This is a mock of what would typically come from an API
    const mockArtistData = {
        name: "Sample Artist",
        bio: "This talented musician has been creating innovative sounds since their debut. Blending elements of electronic, jazz, and classical music, they've carved out a unique niche in the contemporary music scene. Their work has been featured in major festivals around the world and they continue to push the boundaries of modern music production.",
        profileImage: "https://placehold.co/400x400/png",
        mainImage: "https://placehold.co/1200x600/png",
    };

    return (
        <main className="min-h-screen bg-background">
            <ArtistProfile 
                {...mockArtistData}
            />
        </main>
    )
}
