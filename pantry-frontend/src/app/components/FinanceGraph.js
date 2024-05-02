"use client"
import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const FinanceGraph = ({title="default", width, height, data}) => {
  const [graphWidth, setGraphWidth] = useState(width);
  const [graphHeight, setGraphHeight] = useState(height);
  const [graphData, setGraphData] = useState(data);
  const [maxY, setMaxY] = useState(0);
  const [ticksY, setTicksY] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [dailyAverage, setDailyAverage] = useState(0);
  const [titleText, setTitleText] = useState(title);

  useEffect(() => {
    let newMax = Math.max(...data.map((item) => item.totalCost));
    // Round to the nearest power of 10
    newMax = Math.ceil(newMax / 10) * 10;
    console.log(newMax);
    setMaxY(newMax);
    const newTicks = Array.from({length: 5}, (v, i) => i * newMax / 5);
    newTicks.push(newMax);
    setTicksY(newTicks);

    //Set total cost
    let total = 0;
    data.forEach((item) => {
      total += item.totalCost;
    });
    setTotalCost(total);

    //Calculate daily average
    const days = data.length;
    const average = total / days;
    // Round to 2 decimal places
    setDailyAverage(average.toFixed(2));
  }, [graphData]);

  const formatter = (value) =>{
    return `$ ${value}`;
  }

  

  return(
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1 mb-3'>
        <div className='text-2xl font-light'>{titleText}</div>
        <div className='text-4xl font-semibold'>Total ${totalCost}</div>
        <div className='text-2xl font-medium'>Daily Avg. ${dailyAverage}</div>
      </div>

      <AreaChart
        width={graphWidth}
        height={graphHeight}
        data={graphData}
      >
        <CartesianGrid vertical={false} />
        <XAxis axisLine={false} dataKey="created_at" interval={10} tickSize={0} tickMargin={10}
          style ={{fontSize: "0.75rem"}}/>
        <YAxis axisLine={false} style ={{fontSize: "0.9rem"}} tickMargin={10} ticks={ticksY} tickFormatter={formatter}/>
        <Tooltip />
        <Area type="monotone" dataKey="totalCost" fill="#82ca9d" stroke="#82ca9d" strokeWidth={4}/>
      </AreaChart>
    </div>
  )

}

export default FinanceGraph;