import MainLayout from "@/src/components/layouts/main-layout";
import VocabularyPage from "@/src/components/templates/_vocabulary";

function Page() {
  return <MainLayout main={<VocabularyPage />} />;
}
export default Page;
