import Link from 'next/link';

const Query = () => {
  return (
    <div className="w-full h-full py-10 px-5 md:px-0">
      <div className="max-w-4xl grid grid-cols-1 gap-5 rounded-lg mx-auto">
        <Link href="/query1" className="no-underline text-black">
          <div className="bg-slate-300 p-3 rounded-lg">
            <div className="text-lg font-semibold">Query 1:</div>
            <div className="w-full h-[1px] text-sm bg-slate-600 my-2" />
            <div>
              Graphical representation of weekdays screentime percentage(%) of
              children on different electronic devices.
            </div>
          </div>
        </Link>
        <Link href="/query2" className="no-underline text-black">
          <div className="bg-slate-300 p-3 rounded-lg">
            <div className="text-lg font-semibold">Query 2:</div>
            <div className="w-full h-[1px] text-sm bg-slate-600 my-2" />
            <div>
              Graphical representation of weekends screentime percentage(%) of
              children on different electronic devices.
            </div>
          </div>
        </Link>
        <Link href="/query3" className="no-underline text-black">
          <div className="bg-slate-300 p-3 rounded-lg">
            <div className="text-lg font-semibold">Query 3:</div>
            <div className="w-full h-[1px] text-sm bg-slate-600 my-2" />
            <div>
              Graphical representation of weekends screentime purpose
              percentage(%) of children.
            </div>
          </div>
        </Link>
        <Link href="/query4" className="no-underline text-black">
          <div className="bg-slate-300 p-3 rounded-lg">
            <div className="text-lg font-semibold">Query 4:</div>
            <div className="w-full h-[1px] text-sm bg-slate-600 my-2" />
            <div>
              Graphical representation of weekdays screentime purpose
              percentage(%) of children.
            </div>
          </div>
        </Link>
        <Link href="/query5" className="no-underline text-black">
          <div className="bg-slate-300 p-3 rounded-lg">
            <div className="text-lg font-semibold">Query 5:</div>
            <div className="w-full h-[1px] text-sm bg-slate-600 my-2" />
            <div>
              Graphical representation of screen time percentage(%) of different
              programs watched by children.
            </div>
          </div>
        </Link>
        <Link href="/query6" className="no-underline text-black">
          <div className="bg-slate-300 p-3 rounded-lg">
            <div className="text-lg font-semibold">Query 6:</div>
            <div className="w-full h-[1px] text-sm bg-slate-600 my-2" />
            <div>
              Graphical representation of screen time percentage(%) of different
              programs watched by female children in joint and nuclear family.
            </div>
          </div>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default Query;
