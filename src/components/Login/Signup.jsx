import React, { useState } from "react";
import './styles.css';
function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  // const [formData, setFormData] = useState(
  //   {
  //     username: "",
  //     password: "",
  //     // passwordConfirm: "",
  //     email: ""
  //   }
  // );



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handlePasswordConfirmChange = (event) => {
  //   setPasswordConfirm(event.target.value);
  // }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (password !== passwordConfirm) {
    //   alert("Passwords do not match");
    //   return;
    // }

    console.log(
      `Submitted username: ${username}, password: ${password}, email: ${email}`
    );
  };

  return (
    <div id="signup-tab-content" className="tabcontent" style={{ display: "block" }}>
      <form className="signup-form" action="" method="post" onSubmit={handleSubmit} >
        <input type="email" className="input" id="user_email" autoComplete="off" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input type="text" className="input" id="user_name" autoComplete="off" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="password" className="input" id="user_pass" autoComplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        {/* <input type="password" class="input" id="user_pass_confirm" autocomplete="off" placeholder="Confirm Password" value={passwordConfirm} onChange={handlePasswordConfirmChange} /> */}
        <input type="submit" className="button" value="Sign Up" />
      </form>
      <div className="help-text">
        <p>By signing up, you agree to our</p>
        <p>
          <a href="#">Terms of service</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
