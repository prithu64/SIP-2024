import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentPage, updateData} from '../../../redux/features/dataSlice';

const Step2 = ({currentPage}) => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(data);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    console.log('form',formData)
    let errors = {};

    const fieldsToValidate = [
      { key: 'weekdays', options: ['tv', 'smartphone', 'laptop', 'tablet'] },
      { key: 'weekends', options: ['tv', 'smartphone', 'laptop', 'tablet'] },
      { key: 'weekdaysScreenPurpose', options: ['education', 'entertainment', 'playingGames', 'socialConnect', 'meals', 'beforeBed', 'engaging'] },
      { key: 'weekendsScreenPurpose', options: ['education', 'entertainment', 'playingGames', 'socialConnect', 'meals', 'beforeBed', 'engaging'] },
      { key: 'eatBetterWithScreen', options: [] },
      { key: 'caretakerScreenTime', options: [] },
      { key: 'programsWatched', options: ['animatedCartoons', 'nonAnimatedCartoons', 'movieAnimated', 'movieNonAnimated', 'songs', 'rhymes', 'knowledge', 'spiritual', 'serials'] },
      { key: 'preferedInput', options: [] },
      { key: 'speechAndLangSkills', options: [] },
      { key: 'outdoorActivity', options: [] },
    ];
  
    fieldsToValidate.forEach(field => {
      if (!formData[field.key]) {
        if(field.options.length !== 0){
          errors[field.key] = {};
          field.options.forEach(option => {
            errors[field.key][option] = true;
          })
        }else{
          errors[field.key] = true;
        }
      } else {
        field.options.forEach(option => {
          if (!formData[field.key][option]) {
            if (!errors[field.key]) {
              errors[field.key] = {};
            }
            errors[field.key][option] = true;
          }
        });
      }
    });
  
    console.log('errorsform',errors)
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = e => {
    const {name, value} = e.target;
    if (name.includes('_')) {
      // console.log('here');
      const [parentKey, childKey] = name.split('_');
      setFormData(prevFormData => ({
        ...prevFormData,
        [parentKey]: {
          ...prevFormData[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const isValid = validateForm();
    const submitBtn = e.nativeEvent.submitter;
    // console.log(submitBtn);
    if (submitBtn.value === 'previous') {
      dispatch(setCurrentPage(currentPage - 1));
    } else if (submitBtn.value === 'next') {
      if(isValid){
        dispatch(updateData(formData));
        dispatch(setCurrentPage(currentPage + 1));
      }else{
        console.log("Form invalid")
      }
    }
  };
  return (
    <div className="w-full bg-slate-200 py-10">
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg">
      <h1 className="underline text-center mb-5 mt-0 text-2xl md:text-3xl">
        Screen-time survey questions (Weekdays and Weekends)
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label className="block text-gray-700">
              27. During Weekdays, time spent by Child in viewing electronic
              devices (time is per day):
              <span className="text-xs text-red-500 ml-1">*</span>
            </label>
            {formErrors.weekdays && <span className='text-xs text-red-500'>This field is required</span>}
            <div className="pl-5">
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-3">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdays_tv">
                  TV viewing hours per day by the child:
                </label>
                <select
                  name="weekdays_tv"
                  onChange={handleChange}
                  value={formData?.weekdays?.tv}
                  className={`flex-1 p-2 border ${formErrors.weekdays?.tv?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdays_smartphone">
                  Smartphone use by the child:
                </label>
                <select
                  name="weekdays_smartphone"
                  value={formData?.weekdays?.smartphone}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdays?.tv?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdays_laptop">
                  Laptop use by the child:
                </label>
                <select
                  name="weekdays_laptop"
                  value={formData?.weekdays?.laptop}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdays?.tv?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdays_tablet">
                  Tablet use by the child:
                </label>
                <select
                  name="weekdays_tablet"
                  value={formData?.weekdays?.tablet}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdays?.tv?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">
              28. During Weekends, time spent by Child in viewing electronic
              devices (time is per day):
              <span className="text-xs text-red-500 ml-1">*</span>
            </label>
            {formErrors.weekends && <span className='text-xs text-red-500'>This field is required</span>}
            <div className="pl-5">
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-3">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekends_tv">
                  TV viewing hours per day by the child:
                </label>
                <select
                  name="weekends_tv"
                  value={formData?.weekends?.tv}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekends?.tv?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekends_smartphone">
                  Smartphone use by the child:
                </label>
                <select
                  name="weekends_smartphone"
                  value={formData?.weekends?.smartphone}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekends?.smartphone?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekends_laptop">
                  Laptop use by the child:
                </label>
                <select
                  name="weekends_laptop"
                  value={formData?.weekends?.laptop}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekends?.laptop?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekends_tablet">
                  Tablet use by the child:
                </label>
                <select
                  name="weekends_tablet"
                  value={formData?.weekends?.tablet}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekends?.tablet?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">
              29. Purpose of Screen hours spend by the Child during Weekdays
              (time is per day):
              <span className="text-xs text-red-500 ml-1">*</span>
            </label>
            {formErrors.weekdaysScreenPurpose && <span className='text-xs text-red-500'>This field is required</span>}
            <div className="pl-5">
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-3">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdaysScreenPurpose_education">
                  For education:
                </label>
                <select
                  name="weekdaysScreenPurpose_education"
                  value={formData?.weekdaysScreenPurpose?.education}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdaysScreenPurpose?.education?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdaysScreenPurpose_entertainment">
                  For entertainment:
                </label>
                <select
                  name="weekdaysScreenPurpose_entertainment"
                  value={formData?.weekdaysScreenPurpose?.entertainment}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdaysScreenPurpose?.entertainment?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdaysScreenPurpose_playingGames">
                  For playing games:
                </label>
                <select
                  name="weekdaysScreenPurpose_playingGames"
                  value={formData?.weekdaysScreenPurpose?.playingGames}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdaysScreenPurpose?.playingGames?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdaysScreenPurpose_socialConnect">
                  For social connect by the child (video calls):
                </label>
                <select
                  name="weekdaysScreenPurpose_socialConnect"
                  value={formData?.weekdaysScreenPurpose?.socialConnect}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdaysScreenPurpose?.socialConnect?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdaysScreenPurpose_meals">
                  During meals by the child:
                </label>
                <select
                  name="weekdaysScreenPurpose_meals"
                  value={formData?.weekdaysScreenPurpose?.meals}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdaysScreenPurpose?.meals?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdaysScreenPurpose_beforeBed">
                  Just before bed time by the child:
                </label>
                <select
                  name="weekdaysScreenPurpose_beforeBed"
                  value={formData?.weekdaysScreenPurpose?.beforeBed}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdaysScreenPurpose?.beforeBed?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekdaysScreenPurpose_engaging">
                  For engaging the child (when you are busy):
                </label>
                <select
                  name="weekdaysScreenPurpose_engaging"
                  value={formData?.weekdaysScreenPurpose?.engaging}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekdaysScreenPurpose?.engaging?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">
              30. Purpose of Screen hours spend by the Child during Weekends
              (time is per day):
              <span className="text-xs text-red-500 ml-1">*</span>
            </label>
            {formErrors.weekendsScreenPurpose && <span className='text-xs text-red-500'>This field is required</span>}
            <div className="pl-5">
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-3">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekendsScreenPurpose_education">
                  For education:
                </label>
                <select
                  name="weekendsScreenPurpose_education"
                  value={formData?.weekendsScreenPurpose?.education}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekendsScreenPurpose?.education?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekendsScreenPurpose_entertainment">
                  For entertainment:
                </label>
                <select
                  name="weekendsScreenPurpose_entertainment"
                  value={formData?.weekendsScreenPurpose?.entertainment}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekendsScreenPurpose?.entertainment?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekendsScreenPurpose_playingGames">
                  For playing games:
                </label>
                <select
                  name="weekendsScreenPurpose_playingGames"
                  value={formData?.weekendsScreenPurpose?.playingGames}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekendsScreenPurpose?.playingGames?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekendsScreenPurpose_socialConnect">
                  For social connect by the child (video calls):
                </label>
                <select
                  name="weekendsScreenPurpose_socialConnect"
                  value={formData?.weekendsScreenPurpose?.socialConnect}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekendsScreenPurpose?.socialConnect?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekendsScreenPurpose_meals">
                  During meals by the child:
                </label>
                <select
                  name="weekendsScreenPurpose_meals"
                  value={formData?.weekendsScreenPurpose?.meals}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekendsScreenPurpose?.meals?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekendsScreenPurpose_beforeBed">
                  Just before bed time by the child:
                </label>
                <select
                  name="weekendsScreenPurpose_beforeBed"
                  value={formData?.weekendsScreenPurpose?.beforeBed}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekendsScreenPurpose?.beforeBed?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
                <label className="mr-5 w-full md:flex-1 text-xs lg:text-sm" htmlFor="weekendsScreenPurpose_engaging">
                  For engaging the child (when you are busy):
                </label>
                <select
                  name="weekendsScreenPurpose_engaging"
                  value={formData?.weekendsScreenPurpose?.engaging}
                  onChange={handleChange}
                  className={`flex-1 p-2 border ${formErrors.weekendsScreenPurpose?.engaging?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                  <option value="">Select</option>
                  <option value="no-device">
                    No electronic device at home
                  </option>
                  <option value="0h">Zero hour</option>
                  <option value="<2h">{'<'}2 hours</option>
                  <option value="2-4h">2 to 4 hours</option>
                  <option value="4-6h">4 to 6 hours</option>
                  <option value="6-8h">6 to 8 hours</option>
                  <option value=">8h">More than 8 hours</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">
              31. Do you think children will eat better only if you feed them
              while watching the screen?
              <span className="text-xs text-red-500 ml-1">*</span>
            </label>
            <select
              name="eatBetterWithScreen"
              value={formData?.eatBetterWithScreen}
              onChange={handleChange}
              className={`w-full p-2 border ${formErrors.eatBetterWithScreen?'border-red-500':'border-gray-300'} rounded mt-1`}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="not-sure">Not sure</option>
            </select>
            {formErrors.eatBetterWithScreen && <span className='text-xs text-red-500'>This field is required</span>}
          </div>
          <div>
            <label className="block text-gray-700">
              32. Average Screen time of the Primary caretaker of the Child
              (time is per day):
              <span className="text-xs text-red-500 ml-1">*</span>
            </label>
            <select
              name="caretakerScreenTime"
              value={formData?.caretakerScreenTime}
              onChange={handleChange}
              className={`w-full p-2 border ${formErrors.caretakerScreenTime?'border-red-500':'border-gray-300'} rounded mt-1`}>
              <option value="">Select</option>
              <option value="0">No screen time exposure</option>
              <option value="<2h">{'<'}2 hours</option>
              <option value="2-4h">2-4 hours</option>
              <option value="4-6h">4-6 hours</option>
              <option value="6-8h">6-8 hours</option>
              <option value=">8h">More than 8 hours</option>
            </select>
            {formErrors.caretakerScreenTime && <span className='text-xs text-red-500'>This field is required</span>}
          </div>
        </div>
        <div className="mt-5">
          <label className="block text-gray-700">
            33. What does the Child watch among following programs per day
            during his or her screen time?(Specify hours of watching)
            <span className="text-xs text-red-500 ml-1">*</span>
          </label>
          {formErrors.programsWatched && <span className='text-xs text-red-500'>This field is required</span>}
          <div className="pl-5">
            <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-3">
              <label className="mr-5 flex-1 text-sm" htmlFor="programsWatched_animatedCartoons">
                Animated cartoons:
              </label>
              <select
                name="programsWatched_animatedCartoons"
                value={formData?.programsWatched?.animatedCartoons}
                onChange={handleChange}
                className={`flex-1 p-2 border ${formErrors.programsWatched?.animatedCartoons?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                <option value="">Select</option>
                <option value="0h">0 hour</option>
                <option value="<2h">{'<'}2 hours</option>
                <option value="2-4h">2 to 4 hours</option>
                <option value="4-6h">4 to 6 hours</option>
                <option value="6-8h">6 to 8 hours</option>
                <option value=">8h">More than 8 hours</option>
              </select>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
              <label className="mr-5 flex-1 text-sm" htmlFor="programsWatched_nonAnimatedCartoons">
                Non - Animated cartoons:
              </label>
              <select
                name="programsWatched_nonAnimatedCartoons"
                value={formData?.programsWatched?.nonAnimatedCartoons}
                onChange={handleChange}
                className={`flex-1 p-2 border ${formErrors.programsWatched?.nonAnimatedCartoons?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                <option value="">Select</option>
                <option value="0h">0 hour</option>
                <option value="<2h">{'<'}2 hours</option>
                <option value="2-4h">2 to 4 hours</option>
                <option value="4-6h">4 to 6 hours</option>
                <option value="6-8h">6 to 8 hours</option>
                <option value=">8h">More than 8 hours</option>
              </select>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
              <label className="mr-5 flex-1 text-sm" htmlFor="programsWatched_movieAnimated">
                Movie (Animated):
              </label>
              <select
                name="programsWatched_movieAnimated"
                value={formData?.programsWatched?.movieAnimated}
                onChange={handleChange}
                className={`flex-1 p-2 border ${formErrors.programsWatched?.movieAnimated?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                <option value="">Select</option>
                <option value="0h">0 hour</option>
                <option value="<2h">{'<'}2 hours</option>
                <option value="2-4h">2 to 4 hours</option>
                <option value="4-6h">4 to 6 hours</option>
                <option value="6-8h">6 to 8 hours</option>
                <option value=">8h">More than 8 hours</option>
              </select>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
              <label className="mr-5 flex-1 text-sm" htmlFor="programsWatched_movieNonAnimated">
                Movie (Non-animated):
              </label>
              <select
                name="programsWatched_movieNonAnimated"
                value={formData?.programsWatched?.movieNonAnimated}
                onChange={handleChange}
                className={`flex-1 p-2 border ${formErrors.programsWatched?.movieNonAnimated?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                <option value="">Select</option>
                <option value="0h">0 hour</option>
                <option value="<2h">{'<'}2 hours</option>
                <option value="2-4h">2 to 4 hours</option>
                <option value="4-6h">4 to 6 hours</option>
                <option value="6-8h">6 to 8 hours</option>
                <option value=">8h">More than 8 hours</option>
              </select>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
              <label className="mr-5 flex-1 text-sm" htmlFor="programsWatched_songs">
                Songs:
              </label>
              <select
                name="programsWatched_songs"
                value={formData?.programsWatched?.songs}
                onChange={handleChange}
                className={`flex-1 p-2 border ${formErrors.programsWatched?.songs?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                <option value="">Select</option>
                <option value="0h">0 hour</option>
                <option value="<2h">{'<'}2 hours</option>
                <option value="2-4h">2 to 4 hours</option>
                <option value="4-6h">4 to 6 hours</option>
                <option value="6-8h">6 to 8 hours</option>
                <option value=">8h">More than 8 hours</option>
              </select>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
              <label className="mr-5 flex-1 text-sm" htmlFor="programsWatched_rhymes">
                Rhymes:
              </label>
              <select
                name="programsWatched_rhymes"
                value={formData?.programsWatched?.rhymes}
                onChange={handleChange}
                className={`flex-1 p-2 border ${formErrors.programsWatched?.rhymes?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                <option value="">Select</option>
                <option value="0h">0 hour</option>
                <option value="<2h">{'<'}2 hours</option>
                <option value="2-4h">2 to 4 hours</option>
                <option value="4-6h">4 to 6 hours</option>
                <option value="6-8h">6 to 8 hours</option>
                <option value=">8h">More than 8 hours</option>
              </select>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
              <label className="mr-5 flex-1 text-sm" htmlFor="programsWatched_knowledge">
                Knowledge based (News / web series / any more):
              </label>
              <select
                name="programsWatched_knowledge"
                value={formData?.programsWatched?.knowledge}
                onChange={handleChange}
                className={`flex-1 p-2 border ${formErrors.programsWatched?.knowledge?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                <option value="">Select</option>
                <option value="0h">0 hour</option>
                <option value="<2h">{'<'}2 hours</option>
                <option value="2-4h">2 to 4 hours</option>
                <option value="4-6h">4 to 6 hours</option>
                <option value="6-8h">6 to 8 hours</option>
                <option value=">8h">More than 8 hours</option>
              </select>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
              <label className="mr-5 flex-1 text-sm" htmlFor="programsWatched_spiritual">
                Spiritual (bhajan):
              </label>
              <select
                name="programsWatched_spiritual"
                value={formData?.programsWatched?.spiritual}
                onChange={handleChange}
                className={`flex-1 p-2 border ${formErrors.programsWatched?.spiritual?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                <option value="">Select</option>
                <option value="0h">0 hour</option>
                <option value="<2h">{'<'}2 hours</option>
                <option value="2-4h">2 to 4 hours</option>
                <option value="4-6h">4 to 6 hours</option>
                <option value="6-8h">6 to 8 hours</option>
                <option value=">8h">More than 8 hours</option>
              </select>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-center md:items-center mt-2">
              <label className="mr-5 flex-1 text-sm" htmlFor="programsWatched_serials">
                Serials:
              </label>
              <select
                name="programsWatched_serials"
                value={formData?.programsWatched?.serials}
                onChange={handleChange}
                className={`flex-1 p-2 border ${formErrors.programsWatched?.serials?'border-red-500':'border-gray-300'} rounded mt-1 md:mt-0`}>
                <option value="">Select</option>
                <option value="0h">0 hour</option>
                <option value="<2h">{'<'}2 hours</option>
                <option value="2-4h">2 to 4 hours</option>
                <option value="4-6h">4 to 6 hours</option>
                <option value="6-8h">6 to 8 hours</option>
                <option value=">8h">More than 8 hours</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-5">
          <div>
            <label className="block text-gray-700">
              34. If Child watches any other program, please specify:<span className="text-xs font-light text-slate-500 ml-1">(Optional)</span>
            </label>
            <input
              type="text"
              name="otherPrograms"
              value={formData?.otherPrograms || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">
              35. While attending to the screen your Child prefers which from of
              input:<span className="text-xs text-red-500 ml-1">*</span>
            </label>
            <select
              name="preferedInput"
              value={formData?.preferedInput}
              onChange={handleChange}
              className={`w-full p-2 border ${formErrors.preferedInput?'border-red-500':'border-gray-300'} rounded mt-1`}>
              <option value="">Select</option>
              <option value="both">Both auditory and visual input</option>
              <option value="visual">Only visual input</option>
              <option value="auditory">Only auditory input</option>
            </select>
            {formErrors.preferedInput && <span className='text-xs text-red-500'>This field is required</span>}
          </div>
          <div>
            <label className="block text-gray-700">
              36. In comparison to peer group (same age kids), where do you feel
              your Child stand in speech and language skills:
              <span className="text-xs text-red-500 ml-1">*</span>
            </label>
            <select
              name="speechAndLangSkills"
              value={formData?.speechAndLangSkills}
              onChange={handleChange}
              className={`w-full p-2 border ${formErrors.speechAndLangSkills?'border-red-500':'border-gray-300'} rounded mt-1`}>
              <option value="">Select</option>
              <option value="same">At par with peer group</option>
              <option value="better">Better than the peer group</option>
              <option value="poor">Poor than the peer group</option>
            </select>
            {formErrors.speechAndLangSkills && <span className='text-xs text-red-500'>This field is required</span>}
          </div>
          <div>
            <label className="block text-gray-700">
              37. Outdoor physical activity/play of the Child per day:
              <span className="text-xs text-red-500 ml-1">*</span>
            </label>
            <select
              name="outdoorActivity"
              value={formData?.outdoorActivity}
              onChange={handleChange}
              className={`w-full p-2 border ${formErrors.outdoorActivity?'border-red-500':'border-gray-300'} rounded mt-1`}>
              <option value="">Select</option>
              <option value="0h">No physical activity</option>
              <option value="<2h">{'<'}2 hours</option>
              <option value="2-4h">2-4 hours</option>
              <option value="4-6h">4-6 hours</option>
              <option value="6-8h">6-8 hours</option>
              <option value=">8h">More than 8 hours</option>
            </select>
            {formErrors.outdoorActivity && <span className='text-xs text-red-500'>This field is required</span>}
          </div>
        </div>
        <div className="w-full flex mt-10 justify-evenly md:justify-end">
          {currentPage >= 1 && (
            <button
              type="submit"
              name="previous"
              value="previous"
              className="md:mr-10 border-none cursor-pointer py-3 px-8 bg-yellow-600 text-white font-bold rounded-md hover:bg-yellow-700 transition text-lg">
              Previous
            </button>
          )}
          <button
            type="submit"
            name="next"
            value="next"
            className="cursor-pointer border-none py-3 px-8 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition text-lg">
            Next
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Step2;
