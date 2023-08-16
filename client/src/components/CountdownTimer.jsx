import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(calculateTimeRemaining(targetDate));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [targetDate]);

    const formatTime = (time) => (time < 10 ? `0${time}` : time);

    return (
        <div>
            <div>
                <span>{formatTime(remainingTime.days)}</span> ngày{' '}
                <span>{formatTime(remainingTime.hours)}</span> giờ{' '}
                <span>{formatTime(remainingTime.minutes)}</span> phút{' '}
                <span>{formatTime(remainingTime.seconds)}</span> giây
            </div>
        </div>
    );
};

const calculateTimeRemaining = (targetDate) => {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
};

export default CountdownTimer;
