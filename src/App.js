import { useState, useEffect } from "react";
import Main from './Main';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';

function App(){
  

   const [loading, setloading] = useState(false);
    useEffect(() => {
      setloading(true);
      setTimeout(() => {
        setloading(false);
      }, 3000);
    }, []);


    return (
      <div>
        {loading ? (
          <div className="app">
            <ClipLoader
              color={"#0ef"}
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div>
            <Main />
          </div>
        )}
      </div>
    );
   
 }

export default App