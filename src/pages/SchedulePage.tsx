import React, { useContext } from 'react';
import { AppStatusContext } from '../store/contexts';
import ScheduleTable from '../components/ScheduleTable';

function SchedulePage() {
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading schedule: {error}</div>;

  return (
    <div id="page-container" className="bg-gray-100 min-h-screen p-4">
      <ScheduleTable />
    </div>
  );
}

export default SchedulePage;
