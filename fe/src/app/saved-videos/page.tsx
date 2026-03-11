import MainLayout from "@/src/components/layouts/main-layout";
import SavedVideoPage from "@/src/components/templates/_saved-videos";

function Page() {
  return <MainLayout main={<SavedVideoPage />} />;
}
export default Page;
