import React from 'react';
import {ChevronDown} from "react-feather";
import "./StockTable.css"
import pafumeImg from './../images/perfume.jpeg'

function StockTable() {
    return (
        <div className={"stock-screen"}>
            <div className='ttable table-stock'>
                <table style={{position:"relative"}}>
                    <tr>
                        <th>Article</th>
                        <th >
                            <div className={"header-title"}><p>Supplier</p> <ChevronDown className={"arrow-down"}/></div>
                        </th>
                        <th>
                            <div className={"header-title"}><p>category</p> <ChevronDown className={"arrow-down"}/></div>
                        </th>
                        <th>quantity</th>
                        <th>
                            <div className={"header-title"}><p>Production</p> <ChevronDown className={"arrow-down"}/>
                            </div>
                        </th>
                        <th>
                            <div className={"header-title"}><p>Validity</p> <ChevronDown className={"arrow-down"}/></div>
                        </th>
                        <th>picture</th>
                        <th>discription</th>
                    </tr>
                    <tr>
                        <td>Hicham</td>
                        <td>Imlal</td>
                        <td>Parfum</td>
                        <td>29</td>
                        <td>29-03-2024</td>
                        <td>29-03-2024</td>
                        <td><img className={"image-perfume"} src={pafumeImg} alt="can't"/></td>

                        <td className={"description"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam nec ex vel ipsum varius ultricies.
                            </td>
                    </tr>
                    <tr>
                        <td>Hicham</td>
                        <td>Imlal</td>
                        <td>Parfum</td>
                        <td>29</td>
                        <td>29-03-2024</td>
                        <td>29-03-2024</td>
                        <td><img className={"image-perfume"} src={pafumeImg} alt="can't"/></td>
                        <td className={"description"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam nec ex vel ipsum varius ultricies.
                        </td>
                    </tr>
                    <tr>
                        <td>Hicham</td>
                        <td>Imlal</td>
                        <td>Parfum</td>
                        <td>29</td>
                        <td>29-03-2024</td>
                        <td>29-03-2024</td>
                        <td>
                            <img className={"image-perfume"} src={pafumeImg} alt="can't"/>
                        </td>
                        <td className={"description"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam nec ex vel ipsum varius ultricies.
                        </td>
                    </tr>
                </table>

            </div>
        </div>

    );
}

export default StockTable;