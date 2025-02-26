'use client';

import {useState, useEffect} from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import 'chart.js/auto';

const ScreenTimeChartsix = () => {
  const [jointFamily, setJointFamily] = useState(null);
  const [nuclearFamily, setNuclearFamily] = useState(null);
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
        const jointFamilyData = data.filter(
          child => child.familyType === 'joint' && child.gender === 'female',
        );
        const nuclearFamilyData = data.filter(
          child => child.familyType === 'nuclear' && child.gender === 'female',
        );
        setJointFamily(processScreenTimeData(jointFamilyData));
        setNuclearFamily(processScreenTimeData(nuclearFamilyData));
      })
      .catch(err => {
        console.log('Error', err);
        setError(err);
      });
  };

  const processScreenTimeData = data => {
    const programs = [
      'animatedCartoons',
      'nonAnimatedCartoons',
      'movieAnimated',
      'movienonAnimated',
      'songs',
      'rhymes',
      'knowledge',
      'spiritual',
      'serials',
    ];
    const programScreenTime = {
      animatedCartoons: 0,
      nonAnimatedCartoons: 0,
      movieAnimated: 0,
      movienonAnimated: 0,
      songs: 0,
      rhymes: 0,
      knowledge: 0,
      spiritual: 0,
      serials: 0,
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
      programs.forEach(program => {
        const timeCategory = child.programsWatched[program];
        programScreenTime[program] += timeMapping[timeCategory] || 0;
      });
    });

    const totalScreenTime = Object.values(programScreenTime).reduce(
      (acc, cur) => acc + cur,
      0,
    );
    const screenTimePercentages = {};
    programs.forEach(program => {
      screenTimePercentages[program] =
        (programScreenTime[program] / totalScreenTime) * 100;
    });

    return screenTimePercentages;
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    fetchData();
  }, []);

  if (error) return <p>skill issue womp womp</p>;
  if (!jointFamily || !nuclearFamily || !totalData)
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
      'Animated Cartoons',
      'Non Animated Cartoons',
      'Movie(Animated)',
      'Movie(non Animated)',
      'Songs',
      'Rhymes',
      'Knowledge',
      'Spiritual',
      'Serials',
    ],
    datasets: [
      {
        label: 'Weekend Screen Time %',
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
      'Animated Cartoons',
      'Non Animated Cartoons',
      'Movie(Animated)',
      'Movie(non Animated)',
      'Songs',
      'Rhymes',
      'Knowledge',
      'Spiritual',
      'Serials',
    ],
    datasets: [
      {
        label: 'Joint family female child screen time (%)',
        data: Object.values(jointFamily),
        backgroundColor: 'rgba(240, 128, 128, 0.5)',
        borderColor: 'rgba(240, 128, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Nuclear family female child screen time (%)',
        data: Object.values(nuclearFamily),
        backgroundColor: 'rgba(128, 128, 240, 0.5)',
        borderColor: 'rgba(128, 128, 240, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full overflow-x-hidden p-5 md:px-10">
      <h1 className="mb-10 text-lg md:text-3xl text-center">
        Query: Graphical representation of screen time percentage(%) of
        different programs watched by female children in joint and nuclear
        family
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
                duration: 1000,
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
          className="relative flex justify-center mb-5"
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
      <div className="mt-5 w-full md:flex md:flex-col md:items-center">
        <h2 className="text-center md:text-start text-lg md:text-xl lg:text-2xl p-0 m-0">
          Screen Time Data
        </h2>
        <div className="shadow-md overflow-x-scroll mt-5">
          <table>
            <thead>
              <tr className="bg-gray-200 text-left text-gray-700 font-medium">
                <th className="px-4 py-2 text-center">Program Watched</th>
                <th className="px-4 py-2 text-center">
                  Joint Family Percentage (%)
                </th>
                <th className="px-4 py-2 text-center">
                  Nuclear Family Percentage (%)
                </th>
                <th className="px-4 py-2 text-center">Total Percentage (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(jointFamily).map(program => (
                <tr
                  key={program}
                  className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-2 text-center">
                    {program.charAt(0).toUpperCase() + program.slice(1)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {jointFamily[program].toFixed(2)}%
                  </td>
                  <td className="px-4 py-2 text-center">
                    {nuclearFamily[program].toFixed(2)}%
                  </td>
                  <td className="px-4 py-2 text-center">
                    {totalData[program].toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-10 px-5">
        <p className="text-base md:text-lg font-semibold">Overall Usage:</p>
        <ul className="text-sm md:text-base my-2">
          <li>
            The highest overall screen time usage is for songs (17.75%) and
            rhymes (22.49%). Other significant categories include animated
            cartoons (15.98%) and spiritual (11.24%). Lower percentages are seen
            in knowledge (9.17%), movie animated (8.58%), serials (7.69%),
            non-animated cartoons (5.92%), and movie non-animated (1.18%).
          </li>
        </ul>
        <p className="text-base md:text-lg font-semibold">
          Family Type Comparison:
        </p>
        <ul className="text-sm md:text-base">
          <li className="my-2">
            Joint families spend more time on songs (24.32%) and rhymes
            (24.32%), while nuclear families spend more on animated cartoons
            (33.33%) and rhymes (33.33%). Spiritual content has a higher
            percentage in nuclear families (16.67%) compared to joint families
            (10.81%). Joint families spend more time on movie animated (10.81%)
            and non-animated cartoons (5.41%) compared to nuclear families,
            where these categories are at 0%.
          </li>
        </ul>
        <h2 className="text-xl md:text-2xl">Conclusion</h2>
        <p className="text-sm md:text-base">
          Songs and rhymes are the dominant screen time activities in joint
          families, while animated cartoons and rhymes are more popular in
          nuclear families. There are notable differences in screen time
          preferences between joint and nuclear families, particularly in the
          categories of animated and non-animated content.
        </p>
      </div>
    </div>
  );
};

export default ScreenTimeChartsix;
