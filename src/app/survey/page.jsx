'use client';

import {useSelector} from 'react-redux';
import Step1 from '../components/childInformation';
import Step2 from '../components/screenTimeSurvey';
import Step3 from '../components/parentAwareness';
import {useEffect} from 'react';

const Form = () => {
  const currentPage = useSelector(state => state.currentPage)

  // const currentPage = 2;
  // console.log('currentPage', currentPage);

  const render = currentPage => {
    if (currentPage === 0) return <Step1 currentPage={currentPage} />;
    else if (currentPage === 1) return <Step2 currentPage={currentPage} />;
    else if (currentPage === 2) return <Step3 currentPage={currentPage} />;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return <div>{render(currentPage)}</div>;
};

export default Form;
