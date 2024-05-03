import React, { useState } from "react";
import './styles.css';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rememberMe) {
      console.log("Remember me is checked");
    }


    console.log(`Submitted username: ${username}, password: ${password}`);
  };

  return (
    <div id="login-tab-content" className="tabcontent">
      <form className="login-form" action="" method="post" onSubmit={handleSubmit}>
        <input type="text" className="input" id="user_login" autoComplete="off" placeholder="Username" value={username} onChange={handleUsernameChange}/>
        <input type="password" className="input" id="user_pass" autoComplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <input 
          type="checkbox" 
          className="checkbox"
          id="remember_me" 
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        <label form="remember_me">Remember me</label>

        <input type="submit" className="button" value="Login" />
      </form>
      <div className="help-text">
        <p>
          <a href="#">Forget your password?</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
