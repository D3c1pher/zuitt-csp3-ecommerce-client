import React, { useState, useEffect } from 'react';

export default function CountdownSection() {
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-03-22') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div 
      className="pt-5"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="divider text-center text-3xl font-bold">
        <h2>STYLESPHERE 2024 COUNTDOWN</h2>
      </div>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center">
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{"--value": timeLeft.days}}></span>
          </span>
          days
        </div> 
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{"--value": timeLeft.hours}}></span>
          </span>
          hours
        </div> 
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{"--value": timeLeft.minutes}}></span>
          </span>
          min
        </div> 
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{"--value": timeLeft.seconds}}></span>
          </span>
          sec
        </div>
      </div>
      <div className="divider divider-base-300"></div>
    </div>
  );
}