'use client';
import {useState, useEffect} from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js 3

const ScreenTimeChartone = () => {
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
    const devices = ['tv', 'smartphone', 'laptop', 'tablet'];
    const screenTime = {
      tv: 0,
      smartphone: 0,
      laptop: 0,
      tablet: 0,
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
      devices.forEach(device => {
        const timeCategory = child.weekdays[device];
        screenTime[device] += timeMapping[timeCategory] || 0;
      });
    });

    const totalScreenTime =
      screenTime.tv +
      screenTime.smartphone +
      screenTime.laptop +
      screenTime.tablet;
    const screenTimePercentages = {
      tv: (screenTime.tv / totalScreenTime) * 100,
      smartphone: (screenTime.smartphone / totalScreenTime) * 100,
      laptop: (screenTime.laptop / totalScreenTime) * 100,
      tablet: (screenTime.tablet / totalScreenTime) * 100,
    };

    return screenTimePercentages;
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    fetchData();
  }, []);

  if (error) return <p>skill issue womp womp</p>;
  if (!totalData)
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

  const chartData = {
    labels: ['TV', 'Smartphone', 'Laptop', 'Tablet'],
    datasets: [
      {
        label: 'Male (%)',
        data: Object.values(maleData),
        backgroundColor: 'rgba(240, 128, 128, 0.5)',
        borderColor: 'rgba(240, 128, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Female (%)',
        data: Object.values(femaleData),
        backgroundColor: 'rgba(128, 128, 240, 0.5)',
        borderColor: 'rgba(128, 128, 240, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['TV', 'Smartphone', 'Laptop', 'Tablet'],
    datasets: [
      {
        label: 'Weekdays Screen Time Purpose%',
        data: Object.values(totalData),
        backgroundColor: [
          'rgba(255, 99, 71, 0.5)',
          'rgba(119, 184, 71, 0.5)',
          'rgba(255, 255, 39, 0.6)',
          'rgba(0, 66, 255, 0.3)',
        ],
        hoverOffset: 20,
      },
    ],
  };

  return (
    <div className="w-full h-full overflow-x-hidden p-5 md:px-10">
      <h1 className="mb-10 text-lg md:text-3xl text-center">
        Query: Graphical representation of weekdays screentime % of children on
        different electronic devices
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
              animation: {
                duration: 1000
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
      <div className='mt-10 px-5'>
        <p className='text-base md:text-lg font-semibold'>Overall Usage:</p>
        <ul className='text-sm md:text-base'>
          <li>
            The highest screentime percentage for children is on TV (43.09%),
            followed by smartphones (34.15%), tablets (17.07%), and laptops
            (5.69%).
          </li>
        </ul>
        <p className='text-base md:text-lg font-semibold'>Gender Comparison:</p>
        <ul className='text-sm md:text-base'>
          <li className='my-2'>
            Both males and females show the highest screentime on TV. Males have
            a slightly higher percentage (44.00%) compared to females (39.13%).
          </li>
          <li className='my-2'>
            The screentime for smartphones is relatively balanced between
            genders, with females slightly higher (39.13%) than males (33.00%).
          </li>
          <li className='my-2'>
            Tablet usage is almost equal between males (17.00%) and females
            (17.39%).
          </li>
          <li className='my-2'>
            Laptop usage is the lowest among all devices for both genders, with
            males at 6.00% and females at 4.35%.
          </li>
        </ul>
        <h2 className='text-xl md:text-2xl'>Conclusion</h2>
        <p className='text-sm md:text-base'>
          The data reveals that TV is the most used device by children during
          weekdays, followed by smartphones, tablets, and laptops. Gender
          differences are minimal, though males slightly favor TV, and females
          use smartphones more. Tablets and laptops show minimal gender
          disparity in usage. This analysis can inform strategies for managing
          children{"'"}s screentime across different devices.
        </p>
      </div>
    </div>
  );
};

export default ScreenTimeChartone;
