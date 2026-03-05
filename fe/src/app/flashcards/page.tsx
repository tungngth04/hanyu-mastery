import MainLayout from "@/src/components/layouts/main-layout";
import FlashcardsPage from "@/src/components/templates/_flashcards";

function Page() {
  return <MainLayout main={<FlashcardsPage />} />;
}
export default Page;
