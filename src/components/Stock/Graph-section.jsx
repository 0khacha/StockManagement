import React from 'react';
import { Pie } from 'react-chartjs-2';
import './GraphSection.css'
import ProductDetails from "./product-details";

function GraphSection() {
    const data = {
        labels: ['Perfumes', 'Skin Care', 'Category 2', 'Category 3'],
        datasets: [
            {
                data: [300, 150, 100, 200], // Example data, replace with your own
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#8A2BE2' // Add more colors if you have more categories
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#8A2BE2' // Add more colors if you have more categories
                ],
            },
        ],
    };

    return (
        <div className='cercle-graph-section'>
            <ProductDetails/>
            <div className='Cergraph-container'>
                <h2>Circle Graph</h2>
                <div className={"Tubercle"}>
                <Pie  data={data}/>
                </div>
            </div>
        </div>
    );}
export default GraphSection;
