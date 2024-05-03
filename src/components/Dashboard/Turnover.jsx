import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Turnover.css';
import Statistics from './statistics';

function Turnover() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('1 Day');

    useEffect(() => {
        renderChart(selectedTimePeriod);

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [selectedTimePeriod]);

    const renderChart = (timePeriod) => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: getLabelsForTimePeriod(timePeriod),
                datasets: [{
                    label: 'Number of Sales',
                    data: getDataForTimePeriod(timePeriod),
                    borderColor: 'rgb(10,225,70)', // Change this color
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                elements: {
                    line: {
                        borderWidth: 2 // Adjust the width of the border here
                    }
                }
            }
        });
    };

    const getLabelsForTimePeriod = (timePeriod) => {
        // Implement logic to get labels based on the selected time period
        switch (timePeriod) {
            case '1 Day':
                return ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
            case '3 Month':
                return ['Jan', 'Feb', 'Mar'];
            case '6 Month':
                return ['Jan', 'Apr', 'Jul'];
            case '1 Year':
                return ['2022', '2023', '2024'];
            default:
                return [];
        }
    };

    const getDataForTimePeriod = (timePeriod) => {
        // Implement logic to get data based on the selected time period
        switch (timePeriod) {
            case '1 Day':
                return [10, 20, 15, 25, 30, 20];
            case '3 Month':
                return [100, 200, 150];
            case '6 Month':
                return [200, 300, 250];
            case '1 Year':
                return [500, 600, 550];
            default:
                return [];
        }
    };

    const handleTimePeriodClick = (timePeriod) => {
        setSelectedTimePeriod(timePeriod);
    };

    return (
        <div className="main-container">
            <Statistics />
            <div className="second-container">
                <div className="graph-container">
                    <div className='title-items'>
                        <h3>Sales</h3>
                        <div className='value'>360$</div>
                    </div>
                    <div className='months'>
                        <ul>
                            <li className={selectedTimePeriod === '1 Day' ? 'selected' : ''} onClick={() => handleTimePeriodClick('1 Day')}>1 Day</li>
                            <li className={selectedTimePeriod === '3 Month' ? 'selected' : ''} onClick={() => handleTimePeriodClick('3 Month')}>3 Month</li>
                            <li className={selectedTimePeriod === '6 Month' ? 'selected' : ''} onClick={() => handleTimePeriodClick('6 Month')}>6 Month</li>
                            <li className={selectedTimePeriod === '1 Year' ? 'selected' : ''} onClick={() => handleTimePeriodClick('1 Year')}>1 Year</li>
                        </ul>
                    </div>
                    <div className='graph'>
                        <canvas ref={chartRef} height={35} width={100} />
                    </div>
                </div>
                <div className="selling-container">
                    <h3>Best Selling</h3>
                    <ul>
                        <li>
                            Best selling <span className="price">100$</span>
                        </li>
                        <li>
                            Best selling <span className="price">200$</span>
                        </li>
                        <li>
                            Best selling <span className="price">100$</span>
                        </li>
                    </ul>
                </div>
                <div className="selling-container">
                    <h3>Best Selling</h3>
                    <ul>
                        <li>
                            Best selling <span className="price">100$</span>
                        </li>
                        <li>
                            Best selling <span className="price">200$</span>
                        </li>
                        <li>
                            Best selling <span className="price">100$</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Turnover;
