import MainLayout from "@/src/components/layouts/main-layout";
import AboutPage from "@/src/components/templates/_about";

function Page() {
  return <MainLayout main={<AboutPage />} />;
}
export default Page;
