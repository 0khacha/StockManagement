import React from 'react';
import userimg from "../images/user.png";

function UserHistory() {
    return (
        <div className='setting-page-profile'>
            <section className='profile-details-section'>
                <h2>Profile Details</h2>
                <div className='photo-section'>
                    <div className={'image'}>
                        <img src={userimg} alt="user-image"/>
                    </div>
                    <button>Upload profile Photo</button>
                    <button>Remove</button>
                </div>
                <div className='user-email'>
                    <form>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name='username' defaultValue={'form database'}/>
                        <label htmlFor="email">Email</label>
                        <input type="Email" id='email' name='email' defaultValue={'from database'}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' defaultValue={'from database'}/>
                        <button>Update</button>

                    </form>
                </div>
            </section>
            <section className={'section-second-box'}>
                <section className='password-section'>
                    <h2>Change Password</h2>
                    <p>To change your password, please enter your current password and your new password below.</p>
                    <button>Change Password</button>
                    {/* Uncomment below form fields if you ever want to enable change password through this place, Make sure to secure properly */}
                    {/*
                    <form>
                        <label htmlFor="currentPassword">Current Password</label>
                        <input type="password" id='currentPassword' name='currentPassword' />

                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id='newPassword' name='newPassword' />

                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input type="password" id='confirmNewPassword' name='confirmNewPassword' />

                        <button type="submit">Change Password</button>
                    </form>
                */}
                </section>

                <section className='delete-account-section'>
                    <h2>Delete Account</h2>
                    <p>If you would like to delete your account, please click the button below.</p>
                    <button>Delete Account</button>
                </section>
            </section>

        </div>
    );
}

export default UserHistory;