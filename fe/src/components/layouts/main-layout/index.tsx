import Header from "../../organisms/header";
import SideBar from "../../organisms/sideBar";

const MainLayout = ({ main }: { main: React.ReactNode }) => {
  return (
    <>
      <div>
        <main className="flex-1 lg:ml-64">
          <Header />
          <div className="p-6 slide-up delay-100">{main}</div>
        </main>
        <SideBar />
      </div>
    </>
  );
};
export default MainLayout;
