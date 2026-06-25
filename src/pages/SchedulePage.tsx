import { useContext } from 'react';
import { AppStatusContext } from '../store/contexts';
import ScheduleTable from '../components/ScheduleTable';

function SchedulePage() {
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading schedule: {error}</div>;

  return (
    <main className="bg-gray-50 min-h-screen p-4">
      <h1 className="sr-only">Schedule Page</h1>
      <ScheduleTable />
    </main>
  );
}

export default SchedulePage;
