'use client';

import {useEffect, useRef, useState} from 'react';
import Landing from './Landing/page';
import About from './About/page';
import Members from './Members/page';
import Mentors from './Mentors/page';
import Contact from './Contact/page';

export default function Home() {
  const [width, setWidth] = useState(0);

  const pageRef = {
    about: useRef(null),
    members: useRef(null),
    mentors: useRef(null),
    contact: useRef(null),
  };

  const scrollToPage = pageRef => {
    pageRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => setWidth(window.innerWidth), []);

  return (
    <>
      <div className="overflow-hidden">
        <Landing pageRef={pageRef} scrollToPage={scrollToPage} width={width} />
        <About pageRef={pageRef.about} width={width} />
        <Members pageRef={pageRef.members} width={width} />
        <Mentors pageRef={pageRef.mentors} width={width} />
        <Contact pageRef={pageRef.contact} width={width} />
      </div>
    </>
  );
}
