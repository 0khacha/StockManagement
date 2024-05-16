import React from 'react';
import StockTable from "../../components/Stock/StockTable";
import GraphSection from "../../components/Stock/Graph-section";
import './style.css'

function Stock() {
    return (
        <div className={'stock-page'}>
            <div className={"graphstock-container"}>
                <GraphSection/>
            </div>
            <div className={"stock-table"}>
                <StockTable/>
            </div>
        </div>
    );
}

export default Stock;