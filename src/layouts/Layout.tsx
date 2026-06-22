import { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { AppStatusContext } from '../store/contexts';
import { CircleLoader } from 'react-spinners';

function Layout() {
  const appStatus = useContext(AppStatusContext);
  const { isLoading, error } = appStatus;

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <CircleLoader />
        </div>
      ) : error ? (
        <div className="flex flex-1 items-center justify-center">
          <p>Something went wrong. Please refresh.</p>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default Layout;
