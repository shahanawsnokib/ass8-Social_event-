import Banner from "@/components/ui/Benner/page";
import EventsPage from "@/components/ui/events/page";

export default function Home() {
  return (
    <>
      <Banner />
      <EventsPage limit={15} />
    </>
  );
}
