import React from 'react'
import '../components/css/client.css'
import {Delete, Edit, Menu, Trash2} from "react-feather";
function Client() {
    return (
        <div className='client-screen'>
            <div className='forme'>
                <form action="" className='formulaire'>
                    <div className='title-input'>
                        <h5>Name</h5>
                        <input type="text" placeholder='Please enter the name ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>First name</h5>
                        <input type="text" placeholder='Please enter the first name ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Email</h5>
                        <input type="email" placeholder='Please enter the email ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Phone Number</h5>
                        <input type="text" placeholder='Please enter the phone number ...'/>
                    </div>
                    <div className='title-input'>
                        <h5>Address</h5>
                        <input type="text" placeholder='Please enter the address ...'/>
                    </div>
                    <button className='validate'>Validate</button>
                </form>
            </div>
            <div className='ttable'>
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                    <td>Hicham</td>
                        <td>Imlal</td>
                        <td>exemple@email.com</td>
                        <td>0707995929</td>
                        <td>Sidi Bibi</td>
                        <div className={"action"}>
                            <button className={"edit"}><Edit className="nav__toggle icon-edit"/></button>
                            <button className={"delete"}><Trash2 className="nav__toggle icon-delete" /></button>
                        </div>
                    </tr>
                    <tr>
                        <td>Hicham</td>
                        <td>Imlal</td>
                        <td>exemple@email.com</td>
                        <td>0707995929</td>
                        <td>Sidi Bibi</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

            </div>
        </div>
    )
}

export default Client
