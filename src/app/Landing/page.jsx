"use client"

import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import {useState} from 'react';
import {FaArrowRight} from 'react-icons/fa';
import {FcSurvey} from 'react-icons/fc';
import {GiHamburgerMenu} from 'react-icons/gi';
import {IoClose} from 'react-icons/io5';

const Landing = ({pageRef, scrollToPage, width}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="relative w-full h-screen font-jaldi overflow-hidden">
      <img
        className="absolute bottom-0 left-0 h-[calc(35vh)] -z-10"
        alt="background"
        src="/rectangle-37.svg"
      />
      <div className="-z-10 absolute top-[100px] right-0 [filter:blur(60px)] [background:linear-gradient(180deg,_rgba(9,_225,_255,_0.1),_rgba(255,_255,_255,_0.1))] w-[50px] md:w-[200px] h-[457.9px] md:h-[calc(100vh-30%)] [transform:_rotate(-12deg)] [transform-origin:0_0]" />
      <div className="-z-10 absolute top-0 left-0 right-0 [filter:blur(20px)] [background:linear-gradient(180deg,_rgba(9,_225,_255,_0.1),_rgba(255,_255,_255,_0.1))] h-[315px]" />
      <div className="flex items-center justify-between h-[80px] px-10 md:px-20 z-50 relative md:static">
        <div className='m-0 p-0 w-fit h-full flex items-center justify-center'>
          <CldImage
            src="/assets/tulogo.png"
            alt='logo'
            width="60"
            height="60"
            crop={{
              type: 'auto',
              source: true,
            }}
          />
          <b className="ml-3 md:ml-5 text-lg md:text-xl">Tezpur University <span className='text-lg md:text-xl'>(Dpt. CSE)</span></b>
        </div>
        <div className="hidden md:flex justify-evenly w-[50%]">
          <div
            className="hover:font-semibold text-base cursor-pointer progress-bar block relative"
            onClick={() => scrollToPage(pageRef.about)}>
            About Us
          </div>
          <div
            className="hover:font-semibold text-base cursor-pointer progress-bar block relative"
            onClick={() => scrollToPage(pageRef.members)}>
            Members
          </div>
          <div
            className="hover:font-semibold text-base cursor-pointer progress-bar block relative"
            onClick={() => scrollToPage(pageRef.mentors)}>
            Mentors
          </div>
          <div
            className="hover:font-semibold text-base cursor-pointer progress-bar block relative"
            onClick={() => scrollToPage(pageRef.contact)}>
            Contact Us
          </div>
        </div>
        <div
          className="block md:hidden w-fit cursor-pointer"
          onClick={() => setIsActive(true)}>
          <GiHamburgerMenu size={25} color="black" />
        </div>
        {/* GiHamburgerMenu code */}
        <div
          className={`${
            isActive
              ? 'bg-opacity-40 pointer-events-auto'
              : 'bg-opacity-0 pointer-events-none'
          } fixed top-0 right-0 left-0 h-screen bg-black transition-all duration-500 flex flex-row-reverse`}>
          <div
            className={`w-[50%] h-full bg-white transform duration-300 ${
              isActive ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div
              className="w-full flex justify-end items-center h-[80px] cursor-pointer px-10"
              onClick={() => setIsActive(false)}>
              <IoClose size={25} color="black" />
            </div>
            <div className="mt-10 px-10">
              <ul className="text-base flex flex-col gap-5 list-none w-full">
                <li
                  className="cursor-pointer hover:font-semibold border-b-2 border-black"
                  onClick={() => {
                    setIsActive(false);
                    scrollToPage(pageRef.about);
                  }}>
                  About Us
                </li>
                <li
                  className="cursor-pointer hover:font-semibold"
                  onClick={() => {
                    setIsActive(false);
                    scrollToPage(pageRef.members);
                  }}>
                  Members
                </li>
                <li
                  className="cursor-pointer hover:font-semibold"
                  onClick={() => {
                    setIsActive(false);
                    scrollToPage(pageRef.mentors);
                  }}>
                  Mentors
                </li>
                <li
                  className="cursor-pointer hover:font-semibold"
                  onClick={() => {
                    setIsActive(false);
                    scrollToPage(pageRef.contact);
                  }}>
                  Contact Us
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex h-[calc(100vh-80px)] z-50">
        <div className="flex flex-col justify-center items-center md:flex-1 md:pl-32 px-10 md:px-0">
          <div className="-translate-y-[10%] z-10">
            <i className="text-2xl md:text-4xl font-semibold font-inter text-gray text-wrap">
              “Humanity is acquiring all the right technology for all the wrong
              reasons”
            </i>
            <div className="text-xs md:text-sm font-inter text-slate-700 text-wrap mt-5">
              Welcome to our portal dedicated to exploring the impact of screen
              time on language development in Indian children aged 2-5 years. We
              are a team of summer internship students from Tezpur University,
              passionate about understanding and visualizing the intricate
              relationship between early childhood screen exposure and language
              acquisition.
            </div>
            <div className="w-full flex justify-between items-center">
              <Link href="/query" className="no-underline">
                <button className="btn-progress w-fit mt-5 cursor-pointer border-2 rounded-full px-3 md:px-5 py-3 bg-transparent flex justify-center items-center">
                  <span className="font-semibold mr-2 text-xs md:text-sm">
                    Quick Queries
                  </span>
                  <FaArrowRight size={14} color="black" />
                </button>
              </Link>
              <Link href="/survey" className="no-underline">
                <button className="btn-progress w-fit mt-5 cursor-pointer border-2 rounded-full px-3 md:px-5 py-3 bg-transparent flex justify-center items-center">
                  <span className="font-semibold mr-2 text-xs md:text-sm">
                    Take our survey
                  </span>
                  <FcSurvey size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative md:flex w-[40%] justify-center items-center hidden">
          <img className="w-[80%]" alt="polygon" src="/polygon-1.svg" />
          <CldImage
            className="absolute"
            src="/assets/hero-img.png"
            alt='logo'
            width={width <1024? 300 : 400}
            height={width <1024? 300 : 400}
            style={{objectFit: "contain"}}
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

export default Landing;
