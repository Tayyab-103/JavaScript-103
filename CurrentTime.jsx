import  { useState, useEffect } from 'react';
const CurrentTime = () => {

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  return (
    <div className="container mt-5" style={{borderRadius:"10px", backgroundColor:"black"}}>
    <div className="card">
      <div className="card-body text-center "  style={{borderRadius:"10px", backgroundColor:"#89FBD4"}}>
        <h1 className="card-title" style={{fontWeight:"600"}}>Current Date and Time</h1>
        <p className="card-text">{currentDateTime.toLocaleDateString()}</p>
        <p className="card-text"  style={{borderRadius:"10px", backgroundColor:"white", fontSize:"100px", fontWeight:"700"}}>{currentDateTime.toLocaleTimeString()}</p>
      </div>
    </div>
  </div>
  );
};

export default CurrentTime;
