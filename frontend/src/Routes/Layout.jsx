import Sidebar from "../Components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="ml-64">
        <div className="px-10 sm:px-6 lg:px-8">
          <div>{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
