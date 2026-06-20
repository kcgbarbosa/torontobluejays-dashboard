import { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { AppStatusContext } from '../store/contexts';
import { RingLoader } from 'react-spinners';

function Layout() {
  const appStatus = useContext(AppStatusContext);
  const { isLoading } = appStatus;

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <RingLoader size={120} />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default Layout;
