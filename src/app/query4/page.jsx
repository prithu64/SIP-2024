'use client';

import {useState, useEffect} from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import 'chart.js/auto';

const ScreenTimeChartthree = () => {
  const [maleData, setMaleData] = useState(null);
  const [femaleData, setFemaleData] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(0);

  const fetchData = () => {
    fetch('https://sip2024-backend.onrender.com/api/data/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://interntezu.netlify.app',
        'Access-Control-Allow-Credentials': 'true',
      },
      credentials: 'include',
      mode: 'cors',
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not OK');
        return res.json();
      })
      .then(data => {
        setTotalData(processScreenTimeData(data));
        const maleChild = data.filter(child => child.gender === 'male');
        const femaleChild = data.filter(child => child.gender === 'female');
        setFemaleData(processScreenTimeData(femaleChild));
        setMaleData(processScreenTimeData(maleChild));
      })
      .catch(err => {
        console.log('Error', err);
        setError(err);
      });
  };

  const processScreenTimeData = data => {
    const purposes = [
      'education',
      'entertainment',
      'playingGames',
      'socialConnect',
      'meals',
      'beforeBed',
      'engaging',
    ];
    const purposescreenTime = {
      education: 0,
      entertainment: 0,
      playingGames: 0,
      socialConnect: 0,
      meals: 0,
      beforeBed: 0,
      engaging: 0,
    };
    const timeMapping = {
      '0h': 0,
      '<2h': 1,
      '2-4h': 3,
      '4-6h': 5,
      '6-8h': 7,
      '>8h': 9,
    };

    data.forEach(child => {
      purposes.forEach(purpose => {
        const timeCategory = child.weekdaysScreenPurpose[purpose];
        purposescreenTime[purpose] += timeMapping[timeCategory] || 0;
      });
    });

    const totalScreenTime = Object.values(purposescreenTime).reduce(
      (acc, cur) => acc + cur,
      0,
    );
    const screenTimePercentages = {
      education: (purposescreenTime.education / totalScreenTime) * 100,
      entertainment: (purposescreenTime.entertainment / totalScreenTime) * 100,
      playingGames: (purposescreenTime.playingGames / totalScreenTime) * 100,
      socialConnect: (purposescreenTime.socialConnect / totalScreenTime) * 100,
      meals: (purposescreenTime.meals / totalScreenTime) * 100,
      beforeBed: (purposescreenTime.beforeBed / totalScreenTime) * 100,
      engaging: (purposescreenTime.engaging / totalScreenTime) * 100,
    };

    return screenTimePercentages;
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    fetchData();
  }, []);

  if (error) return <p>skill issue womp womp</p>;
  if (!maleData || !femaleData)
    return (
      <div className="relative flex flex-col justify-center items-center h-screen w-full">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          className="rounded-full h-28 w-28"
        />
        <p>patience....</p>
      </div>
    );

  const pieData = {
    labels: [
      'Education',
      'Entertainment',
      'Playing Games',
      'Social media',
      'During meals',
      'Before bed time',
      'For engaging the child',
    ],
    datasets: [
      {
        label: 'Weekend Screen Time Purpose%',
        data: Object.values(totalData),
        backgroundColor: [
          'rgba(240, 128, 128, 0.8)',
          'rgba(135, 206, 250, 0.8)',
          'rgba(144, 238, 144, 0.8)',
          'rgba(250, 250, 210, 0.8)',
          'rgba(255, 160, 122, 0.8)',
          'rgba(255, 182, 193, 0.8)',
          'rgba(32, 178, 170, 0.8)',
          'rgba(119, 136, 153, 0.8)',
          'rgba(176, 196, 222, 0.8)',
        ],
        hoverOffset: 20,
      },
    ],
  };

  const chartData = {
    labels: [
      'Education',
      'Entertainment',
      'Playing Games',
      'Social media',
      'During meals',
      'Before bed time',
      'For engaging the child',
    ],
    datasets: [
      {
        label: 'Male(%)',
        data: Object.values(maleData),
        backgroundColor: 'rgba(240, 128, 128, 0.5)',
        borderColor: 'rgba(240, 128, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Female(%)',
        data: Object.values(femaleData),
        backgroundColor: 'rgba(128, 128, 240, 0.5)',
        borderColor: 'rgba(128, 128, 240, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full overflow-x-hidden p-5 md:px-10">
      <h1 className="mb-10 text-lg md:text-3xl text-center">
        Query : Graphical representation of weekdays screentime purpose
        percentage(%) of children
      </h1>
      <div className="w-full h-full flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        <div
          className="relative flex justify-center"
          style={{
            width: width < 768 ? width - 40 : width * (50 / 100),
            height: width < 768 ? width * (80 / 100) : width * (30 / 100),
          }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              aspectRatio: 2,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      return value + '%';
                    },
                  },
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Gender wise %',
                },
              },
            }}
          />
        </div>
        <div
          className="relative flex justify-center"
          style={{
            width: width < 768 ? width - 40 : width * (50 / 100),
            height: width < 768 ? width * (80 / 100) : width * (30 / 100),
          }}>
          <Pie
            options={{responsive: true, maintainAspectRatio: false}}
            data={pieData}
          />
        </div>
      </div>
      <div className="mt-10 w-full overflow-x-scroll md:overscroll-x-none md:flex md:flex-col md:items-center">
        <h2 className="mb-4 text-center md:text-start text-lg md:text-xl lg:text-2xl">
          Screen Time Data
        </h2>
        <table className="shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700 font-medium">
              <th className="px-4 py-2 text-center">Program Watched</th>
              <th className="px-4 py-2 text-center">Male Percentage (%)</th>
              <th className="px-4 py-2 text-center">Female Percentage (%)</th>
              <th className="px-4 py-2 text-center">Total Percentage (%)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(maleData).map(program => (
              <tr
                key={program}
                className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2 text-center">
                  {program.charAt(0).toUpperCase() + program.slice(1)}
                </td>
                <td className="px-4 py-2 text-center">
                  {maleData[program].toFixed(2)}%
                </td>
                <td className="px-4 py-2 text-center">
                  {femaleData[program].toFixed(2)}%
                </td>
                <td className="px-4 py-2 text-center">
                  {totalData[program].toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10 px-5">
        <p className="text-base md:text-lg font-semibold">Overall Usage:</p>
        <ul className="text-sm md:text-base my-2">
          <li>
            The highest overall screen time usage is for entertainment (25.53%),
            followed by engaging (15.83%) and education at (15.11%), and meals
            (14.03%). Lower percentages are seen in playing games (11.15%),
            social connect (7.55%), and before bed (11.15%).
          </li>
        </ul>
        <p className="text-base md:text-lg font-semibold">Gender Comparison:</p>
        <ul className="text-sm md:text-base my-2">
          <li>
            Males spend more time on entertainment (25.53%) and engaging
            (16.60%), while females spend more on meals (23.26%) and entertainment
            (23.26%). Education is fairly similar for both genders (males:
            14.89%, females: 16.28%). Males also have higher screen time for
            social connect (8.09%) and before bed (12.34%) compared to females
            (4.65% for both categories).
          </li>
        </ul>
        <h2 className="text-xl md:text-2xl">Conclusion</h2>
        <p className="text-sm md:text-base">
          Entertainment is the dominant screen time activity for both genders.
          Notable gender differences are present in screen time for engaging,
          playing games, and meals. Overall, males and females show distinct
          preferences in their screen time activities.
        </p>
      </div>
    </div>
  );
};

export default ScreenTimeChartthree;
