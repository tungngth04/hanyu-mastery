import MainLayout from "@/src/components/layouts/main-layout";
import VideoDetail from "@/src/components/templates/_video/components/_video-detail";

function Page() {
  return <MainLayout main={<VideoDetail />} />;
}
export default Page;
