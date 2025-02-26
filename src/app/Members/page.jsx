"use client"
import {CldImage} from 'next-cloudinary';

const Members = ({pageRef, width}) => {
  const items = [
    {
      name: 'Kalpajeet Dutta',
      desc: 'B.Tech CSE, Kaziranga University (3rd year)',
      img_id: 'members/kalpajeet',
    },
    {
      name: 'Prachurjya Goswami',
      desc: 'B.Tech CSE, Kaziranga University (3rd year)',
      img_id: 'members/prachurjya',
    },
    {
      name: 'Priyanuj Bhowmick',
      desc: 'B.Tech CSE, Kaziranga University (3rd year)',
      img_id: 'members/priyanuj',
    },
    {
      name: 'Sharbanee Kalita',
      desc: 'B.Tech CSE, Kaziranga University (3rd year)',
      img_id: 'members/sharbanee',
    },
    {
      name: 'Moushree Dey',
      desc: 'M.Tech CSE, IIIT-Guwahati (2nd year)',
      img_id: 'members/moushree',
    },
    {
      name: 'Kangkan J Borah',
      desc: 'B.Tech CSE, Kaziranga University (3rd year)',
      img_id: 'members/kangkan',
    },
  ];
  // const api_key = process.env.API_KEY
  // const api_secret = process.env.API_SECRET

  return (
    <div ref={pageRef} className="relative w-full h-screen">
      <div className="absolute bottom-0 -right-20 [filter:blur(500px)] rounded-[50%] bg-lightcyan w-[400px] h-[637.7px] [transform:_rotate(20deg)] [transform-origin:0_0] -z-10" />
      <div className="absolute top-0 left-[50px] [filter:blur(500px)] rounded-[50%] bg-lightcyan w-[439.3px] h-[716.3px] [transform:_rotate(-5.4deg)] [transform-origin:0_0] -z-10" />
      <div className="w-full h-full px-10 py-5">
        <div className="w-full flex flex-col items-center">
          <h1 className="m-0 p-0 text-3xl font-bold">Our Team</h1>
          <p className="mt-2 p-0 text-sm text-slate-600">
            Get to know the faces behind the product
          </p>
        </div>
        <div className="w-full h-[calc(100vh-140px)] grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 mt-5">
          {items.map(({name, desc, img_id}, _i) => {
            return (
              <div
                key={_i}
                className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-fit">
                  <div className="w-[150px] md:w-[220px] h-[150px] md:h-[220px]">
                    <CldImage
                      src={img_id}
                      alt="logo"
                      width={width < 768 ? 150 : 220}
                      height={width < 768 ? 150 : 220}
                      style={{objectFit: 'cover'}}
                      crop={{
                        type: 'auto',
                        source: true,
                      }}
                    />
                  </div>
                  <div className="w-[150px] md:w-[220px] text-center bg-white py-2 px-2">
                    <h4 className="m-0 p-0 text-xs md:text-base font-bold">
                      {name}
                    </h4>
                    <p className="m-0 p-0 text-[10px] md:text-xs font-light mt-1 md:mt-2">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Members;
