import Banner from "@/components/ui/Benner/page";
import EventsPage from "@/components/ui/events/page";
import {
  CommunityFeatures,
  CommunityGalleryAndNewsletter,
} from "@/components/home/community-sections";

export default function Home() {
  return (
    <>
      <Banner />
      <CommunityFeatures />
      <EventsPage limit={6} />
      <CommunityGalleryAndNewsletter />
    </>
  );
}
