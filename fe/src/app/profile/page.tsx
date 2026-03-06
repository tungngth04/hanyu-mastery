import MainLayout from "@/src/components/layouts/main-layout";
import ProfilePage from "@/src/components/templates/_profile";

function Page() {
  return <MainLayout main={<ProfilePage />} />;
}
export default Page;
