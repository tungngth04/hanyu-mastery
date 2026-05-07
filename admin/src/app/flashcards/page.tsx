import MainLayout from "@/src/components/layouts/main-layout";
import FlashcardManagement from "@/src/components/templates/_flashcard";

function Page() {
  return <MainLayout main={<FlashcardManagement />} />;
}

export default Page;
