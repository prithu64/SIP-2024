"use client"
import { CldImage } from 'next-cloudinary';

const Mentors = ({pageRef}) => {

  return (
    <div
      ref={pageRef}
      className="w-full h-screen flex flex-row-reverse relative">
      <div className="absolute top-0 left-[50px] [filter:blur(500px)] rounded-[50%] bg-lightcyan w-[439.3px] h-[716.3px] [transform:_rotate(-5.4deg)] [transform-origin:0_0] -z-10" />
      <div className="w-full h-full px-10 py-5">
        <div className="w-full h-[100px] flex flex-col items-center">
          <h1 className="m-0 p-0 text-3xl font-bold">Our Mentor</h1>
          <p className="mt-3 p-0 text-sm text-slate-600">
            Get to know the face behind our support and guidance
          </p>
        </div>
        <div className="w-full h-[calc(100vh-140px)]">
          <div className="w-full flex justify-center">
            <div className="w-fit">
              <div className="w-[200px] h-[220px]">
                <CldImage
                      src='/mentor/mentor.jpg'
                      alt="mentor"
                      width='200'
                      height='200'
                      style={{objectFit: 'cover'}}
                      crop={{
                        type: 'auto',
                        source: true,
                      }}
                    />
              </div>
            </div>
          </div>
          <h4 className="m-0 p-0 my-5 text-base md:text-lg font-bold text-center">Dr. Siddhartha S. Satapathy</h4>
          <div className="w-full flex flex-col items-center">
            <ul className="text-xs ml-5 list-none">
              <li className="my-1">MTech (IT), Tezpur University, 2006.</li>
              <li className="my-1">PhD, Tezpur University, January 2014.</li>
            </ul>
            <h3 className="text-sm font-medium mt-3">Academic career:</h3>
            <ul className="text-xs ml-5 list-none text-center">
              <li className="my-1">
                JDA Software India Pvt. Ltd, Hyderabad (August 2006 to September
                2007).
              </li>
              <li>Teradata, Hyderabad (September 2007 to December 2007).</li>
            </ul>
            <h3 className="text-sm font-medium mt-3">Academic career:</h3>
            <ul className="text-xs ml-5 list-none text-center">
              <li className="my-1">
                Asst. Professor, Department of Computer Science & Engineering,
                Tezpur University (10th December 2007 to 25th August 2014).
              </li>
              <li className="my-1">
                Assoc. Professor, Department of Computer Science & Engineering,
                Tezpur University (Since 26th August 2014).
              </li>
              <li className="my-1">
                Visiting Lecturer, University of Bath, UK (September 2014 to
                September 2015).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
