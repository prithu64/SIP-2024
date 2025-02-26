"use client"
import {CldImage} from 'next-cloudinary';

const About = ({pageRef, width}) => {
  // console.log("ref",pageRef)

  return (
    <div ref={pageRef} className="w-full relative h-screen text-lg">
      <div className="absolute bottom-0 left-[calc(50%_-_782px)] [filter:blur(100px)] rounded-[50%] bg-lightcyan w-[400px] h-[637.7px] [transform:_rotate(-29.5deg)] [transform-origin:0_0] -z-10" />
      <div className="w-full h-[100px] flex flex-col items-center justify-center">
        <div className="font-semibold text-xl md:text-4xl">About Us</div>
        <div className="bg-darkturquoise-200 w-20 md:w-24 rounded-full h-1 md:h-1.5" />
      </div>
      <div className="flex md:flex-row flex-col w-full h-[calc(100vh-100px)]">
        <div className="flex flex-col md:justify-center md:flex-1 md:pl-20 px-10 md:px-0">
          <div className="text-lg md:text-21xl uppercase font-extrabold text-wrap text-center md:text-start">
            <p className="m-0">
              <span>{`It's not a faith in `}</span>
              <span className="text-darkturquoise-300">technology</span>
              <span className="text-black">{` It's faith in `}</span>
              <span className="text-darkturquoise-300">people</span>
            </p>
          </div>
          <div className="text-dimgray font-inter text-xs md:text-sm mt-5 md:mt-3 text-center md:text-start">
            Welcome to our portal dedicated to exploring the impact of screen
            time on language development in Indian children aged 2-5 years. We
            are a team of{' '}
            <span className="font-semibold text-black">Summer internship</span>{' '}
            students from{' '}
            <span className="font-semibold text-black">Tezpur University</span>,
            passionate about understanding and visualizing the intricate
            relationship between early childhood screen exposure and language
            acquisition. Our project aims to provide an interactive platform
            where users can delve into comprehensive survey data through various
            chart formats. By presenting this information visually, we hope to
            offer valuable insights and contribute to informed discussions on
            this critical aspect of child development. Join us in our journey to
            uncover the nuances of screen time effects and support the growth of
            healthy, communicative children.
          </div>
        </div>
        <div className="relative md:w-[40%] w-full h-full">
          <div className="absolute top-[8%] md:top-[15%] right-[10%] bg-lightturquoise md:w-[347px] w-[200px] h-[220px] md:h-[421px]" />
          <CldImage
            className="absolute top-[20%] md:top-[25%] right-[30%] w-[200px] h-[220px] md:w-[347px] md:h-[421px] object-cover"
            src="/assets/about.jpg"
            alt='about'
            width={width < 768? 200:347}
            height={width < 768? 220:420}
            crop={{
              type: 'auto',
              source: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
