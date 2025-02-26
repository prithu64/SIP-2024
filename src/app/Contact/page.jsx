"use client"

import {CldImage} from 'next-cloudinary';
import {useState} from 'react';

const Contact = ({pageRef, width}) => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validateForm = () => {
    // console.log('form', formData);
    let errors = {};

    const fieldsToValidate = [
      {key: 'name', options: []},
      {key: 'email', options: []},
      {key: 'number', options: []},
      {key: 'message', options: []},
    ];
    fieldsToValidate.forEach(field => {
      if (!formData[field.key]) {
        errors[field.key] = true;
      }
    });
    // console.log('errorsform', errors);

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitData = () => {

    fetch('https://sip2024-backend.onrender.com/api/contact/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://interntezu.netlify.app',
        'Access-Control-Allow-Credentials': 'true',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not OK');
        return res.json();
      })
      .then(data => {
        if (data) {
          console.log('success');
          setIsSubmit(true);
        }
      })
      .catch(err => console.log('Error', err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      // console.log('form submitted');
      submitData();
    }
  };

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div ref={pageRef} className="w-full h-screen relative">
      <div className="absolute bottom-0 left-[calc(50%_+_170.95px)] [filter:blur(500px)] rounded-[50%] bg-lightcyan w-[439.3px] h-[716.3px] [transform:_rotate(-37.3deg)] [transform-origin:0_0] -z-10" />
      <div className="absolute bottom-0 left-[calc(50%_-_954.35px)] [filter:blur(500px)] rounded-[50%] bg-lightcyan w-[403.3px] h-[544.7px] [transform:_rotate(-63.1deg)] [transform-origin:0_0] -z-10" />
      <div className="w-full h-[100px] flex flex-col items-center justify-center">
        <div className="font-semibold text-2xl md:text-4xl">Contact Us</div>
        <div className="bg-darkturquoise-200 w-20 md:w-24 rounded-full h-1 md:h-1.5" />
      </div>
      <div className="w-full h-[calc(100vh-160px)] flex">
        {!isSubmit && (
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="font-inder mb-5 md:mb-10 text-lg md:text-3xl">
              ONLINE INQUIRY
            </div>
            <form
              className="w-[60%] md:w-[40%] flex-shrink-0"
              onSubmit={handleSubmit}>
              <div className="flex flex-col w-full gap-5">
                <div>
                  <input
                    className={`bg-slate-200 p-2 w-full rounded-md text-base placeholder:text-sm indent-2 font-inder ${
                      formErrors.name ? 'border border-red-500' : 'border-none'
                    }`}
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                  {formErrors.name && (
                    <span className="text-xs text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <input
                    className={`bg-slate-200 p-2 w-full rounded-md text-base placeholder:text-sm indent-2 font-inder ${
                      formErrors.email ? 'border border-red-500' : 'border-none'
                    }`}
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  {formErrors.email && (
                    <span className="text-xs text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <input
                    className={`bg-slate-200 p-2 w-full rounded-md text-base placeholder:text-sm indent-2 font-inder ${
                      formErrors.number
                        ? 'border border-red-500'
                        : 'border-none'
                    }`}
                    type="number"
                    name="number"
                    value={formData?.number}
                    onChange={handleChange}
                    placeholder="Number"
                  />
                  {formErrors.number && (
                    <span className="text-xs text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    className={`bg-slate-200 p-2 w-full rounded-md text-base placeholder:text-sm indent-2 font-inder ${
                      formErrors.message
                        ? 'border border-red-500'
                        : 'border-none'
                    }`}
                    name="message"
                    value={formData?.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={4}
                  />
                  {formErrors.message && (
                    <span className="text-xs text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="w-full mt-3">
                  <button className="w-full border-none bg-darkturquoise-300 text-white text-lg font-inder cursor-pointer hover:bg-darkturquoise-400 py-3 rounded-full">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        {isSubmit && (
          <div className='flex-1 flex flex-col justify-center items-center'>
            <div className="flex flex-col items-center">
              <div>
                <CldImage
                  src="/assets/checked.png"
                  alt="logo"
                  width="100"
                  height="100"
                />
              </div>
              <h1 className="p-0 text-lg md:text-xl font-semibold mt-5">
                Thank You!
              </h1>
              <p className="mt-2 p-0 text-xs md:text-sm">
                Your query will be solved soon.
              </p>
            </div>
          </div>
        )}
        <div className="hidden md:flex w-[40%] items-center">
          <CldImage
            className="w-full object-cover mix-blend-multiply"
            src="/assets/contact-img.jpg"
            alt='contact'
            width={width < 768 ? 200 : width < 1024 ? 400 : 350}
            height={width < 768 ? 200 : width < 1024 ? 400 : 350}
            style={{objectFit: 'contain'}}
            crop={{
              type: 'auto',
              source: true,
            }}
          />
        </div>
      </div>
      <div className="bg-darkturquoise-500 w-full h-[60px] flex justify-center items-center">
        <div className="font-medium font-inter text-xs md:text-sm">
          2024 Summer Internship, Tezpur University
        </div>
      </div>
    </div>
  );
};

export default Contact;
