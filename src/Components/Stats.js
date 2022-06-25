import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker";


function Stats() {
  let [excelData, setExcelData] = useState([]);
  useEffect(() => {
    axios
      .get("https://sheet.best/api/sheets/e548f04b-5202-4414-a365-837b4a88c1e0")
      .then((response) => {
        // console.log(response.data);
        setExcelData(response.data);
      });
  }, []);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Joined Children Chart",
      },
    },
  };
  const labels = [...new Set(excelData.map((item) => item.year))];
  const names = [...new Set(excelData.map((item) => item.district))];
  const bg = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(53, 162, 235, 0.5)",
    "rgba(255,255,204)",
    "rgba(204,255,204)",
  ];
  const dataset=[];
  for(let i=0;i<names.length;i++){
    let newObj = {
      label: names[i],
      data: excelData
        .filter((item) => item.district === names[i])
        .map((item) => item.joinedChildrenCount),
      backgroundColor: bg[i],
    };
    // console.log(
    //   excelData
    //     .filter((item) => item.district == names[i])
    //     .map((item) => item.joinedChildrenCount)
    // );
    dataset.push(newObj);
  }
  // console.log(dataset);
  const data = {
    labels,
    datasets:dataset
    //  [
    //   {
    //     label: "Dataset 1",
    //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //   },
    //   {
    //     label: "Dataset 2",
    //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //     backgroundColor: "rgba(53, 162, 235, 0.5)",
    //   },
    // ],
  };
  
  return (
    <div className="container">
      <Bar options={options} data={data} />
    </div>
  );
}

export default Stats