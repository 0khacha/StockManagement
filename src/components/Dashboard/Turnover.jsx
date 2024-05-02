import React from 'react';
import './Turnover.css';
import Statistics from "./statistics";
function Turnover() {
    return (
        <div className="main-conatainer">
        <Statistics/>
        <div className="second-container">
            <div className="graph-container">
                <div className='title-items'>
                    <h3>Turnover</h3>
                    <div className='value'>360$</div>
                </div>
                <div className='months'>
                    <ul>
                        <li>1 Day</li>
                        <li>3 Month</li>
                        <li>6 Month</li>
                        <li>1 Year</li>
                    </ul>
                </div>
                <div className='graph'>

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