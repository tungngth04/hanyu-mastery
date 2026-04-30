import MainLayout from "@/src/components/layouts/main-layout";
import VideoManagement from "@/src/components/templates/_video";

function Page() {
  return <MainLayout main={<VideoManagement />} />;
}

export default Page;
