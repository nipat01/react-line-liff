import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';

function App() {
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {
    liff.logout();
    localStorage.clear();
    window.location.reload();
  }

  const initLine = () => {
    liff.init({ liffId: '1657519406-zKY5Yxqw' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    localStorage.setItem("token", idToken)
    liff.getProfile().then(profile => {
      console.log(profile);

      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);

      localStorage.setItem("displayName", profile.displayName);
      localStorage.setItem("pictureUrl", profile.pictureUrl);
      localStorage.setItem("statusMessage", profile.statusMessage);
      localStorage.setItem("userId", profile.userId);
    }).catch(err => console.error(err));
  }



  useEffect(() => {
    // initLine();
    const displayName = localStorage.getItem("displayName");
    const pictureUrl = localStorage.getItem("pictureUrl");
    const statusMessage = localStorage.getItem("statusMessage");
    const userId = localStorage.getItem("userId");
    console.log("displayName: ", displayName);
    console.log("pictureUrl: ", pictureUrl);
    console.log("statusMessage: ", statusMessage);
    console.log("userId: ", userId);
    if (displayName) {
      setDisplayName(displayName);
      setPictureUrl(pictureUrl);
      setStatusMessage(statusMessage);
      setUserId(userId);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "center" }}>
          <h1>React with LINE Login test bot1</h1>
          <hr />
          <img src={pictureUrl} width="300px" height="300px" />
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>

          <button onClick={() => initLine()} style={{ width: "100%", height: 30 }}>Login</button>
          <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default App;
