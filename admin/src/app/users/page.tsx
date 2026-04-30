import MainLayout from "@/src/components/layouts/main-layout";
import UsersManagement from "@/src/components/templates/_user";

function Page() {
  return <MainLayout main={<UsersManagement />} />;
}

export default Page;
