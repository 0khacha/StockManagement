import './statistics.css'
import React from 'react';

function Statistics() {
    return (
        <div className="statistics">
            <div className="stat-boxes">
                <div className="orders">
                      <h5>Orders</h5>
                </div>
                <div className="sales">
                    <h5>Sales</h5>
                </div>
                <div className="articles">
                    <h5>Articles</h5>
                </div>
            </div>
        </div>
    );
}

export default Statistics;