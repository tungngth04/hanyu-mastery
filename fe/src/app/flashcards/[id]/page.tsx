import MainLayout from "@/src/components/layouts/main-layout";
import FlashcardsDetail from "@/src/components/templates/_flashcards/components/_flashcards-detail";

function Page() {
  return <MainLayout main={<FlashcardsDetail />} />;
}
export default Page;
