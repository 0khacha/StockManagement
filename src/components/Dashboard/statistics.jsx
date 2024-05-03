import React, { useEffect, useRef } from 'react';
import arrow from "../images/arrow.png";
import Chart from 'chart.js/auto';
import './statistics.css';

function Statistics() {
    // Define separate chart references and instances for each chart
    const ordersChartRef = useRef(null);
    const salesChartRef = useRef(null);
    const articlesChartRef = useRef(null);

    useEffect(() => {
        // Function to create a new chart instance
        const createChart = (chartRef, data,borderColor) => {
            if (chartRef.current) {
                const ctx = chartRef.current.getContext('2d');
                return new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['', '', '', '', '', ''],
                        datasets: [{
                            data,
                            borderWidth:2,
                            borderColor,
                            tension: 0.1,
                            fill: false
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                display: false
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: true
                            }
                        },
                        interaction: {
                            mode: 'nearest',
                            intersect: false
                        },
                        elements: {
                            point: {
                                radius: 0
                            },
                            line: {
                                backgroundColor: 'rgba(0, 0, 0, 0)'
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        }
                    }
                });
            }
            return null;
        };

        // Create and store chart instances
        const ordersChartInstance = createChart(ordersChartRef, [10, 12, 17, 27, 34, 30],'#0ae146');
        const salesChartInstance = createChart(salesChartRef, [10, 12, 17, 15, 11, 8],'#F40C0C');
        const articlesChartInstance = createChart(articlesChartRef, [10, 12, 17, 27, 34, 30],'#0ae146');

        // Cleanup function
        return () => {
            if (ordersChartInstance) {
                ordersChartInstance.destroy();
            }
            if (salesChartInstance) {
                salesChartInstance.destroy();
            }
            if (articlesChartInstance) {
                articlesChartInstance.destroy();
            }
        };
    }, []); // Run once on component mount

    return (
        <div className="statistics">
            <div className="stat-boxes">
                {/* Orders Section */}
                <div className="orders">
                    <div className='content'>
                        <h3>Orders</h3>
                        <h2>22</h2>
                        <div className='state-arrow'>
                            <img src={arrow} alt="" className='arrow' />
                            <p>Since yesterday</p>
                        </div>
                    </div>
                    <div className='graph-top'>
                        <canvas ref={ordersChartRef}></canvas>
                        <p className='value-pos'>+1,9%</p>
                    </div>
                </div>
                <div className="sales">
                    <div className='content'>
                        <h3>Sales</h3>
                        <h2>22</h2>
                        <div className='state-arrow'>
                            <img src={arrow} alt="" className='arrow' />
                            <p>Since yesterday</p>
                        </div>
                    </div>
                    <div className='graph-top'>
                        <canvas ref={salesChartRef}></canvas>
                        <p  className='value-neg'>-1,9%</p>
                    </div>
                </div>

                {/* Articles Section */}
                <div className="articles">
                    <div className='content'>
                        <h3>Articles</h3>
                        <h2>22</h2>
                        <div className='state-arrow'>
                            <img src={arrow} alt="" className='arrow' />
                            <p>Since yesterday</p>
                        </div>
                    </div>
                    <div className='graph-top'>
                        <canvas ref={articlesChartRef}></canvas>
                        <p className='value-pos'>+1,9%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
