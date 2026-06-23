import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="grid grid-cols-1 min-h-11/12 md:grid-cols-[auto_auto] bg-white gap-4 justify-center items-center p-10">
      <div>
        <div className="text-6xl text-gray-900 tracking-tight font-semibold pb-4 ">
          Page Not Found...
        </div>
        <div className="flex gap-2 pt-2 text-xl text-gray-900 ">
          Kingsley will escort you back:
          <Link
            to={'/'}
            className="text-xl text-blue-300 hover:text-blue-600 underline"
          >
            Home
          </Link>
        </div>
      </div>
      <img
        alt="golden retriever kingsley wearing Blue Jays baseball cap"
        className="size-100 rounded-2xl"
        src="src/assets/imgs/dPMMCb_GR_iM-cCO_FtCgw.webp"
      />
    </div>
  );
}

export default NotFoundPage;
