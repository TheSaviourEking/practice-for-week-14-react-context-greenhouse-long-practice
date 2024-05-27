import ReactSlider from "react-slider";
import './Thermometer.css';

import { useClimate } from "../../context/ClimateContext";
import { useEffect, useState } from "react";

function Thermometer() {
  const { temperature, setTemperature } = useClimate();
  let [defaultTemperature, setDefaultTemperature] = useState(temperature);

  useEffect(() => {
    if (defaultTemperature !== temperature) {
      const intervalId = setInterval(() => {
        setTemperature(prevTemp => {
          if (prevTemp < defaultTemperature) return prevTemp + 1;
          if (prevTemp > defaultTemperature) return prevTemp - 1;
          clearInterval(intervalId);
          return prevTemp;
        })
      }, 1000);
      setInterval(intervalId);

      return () => clearInterval(intervalId);
    }
  }, [defaultTemperature, temperature])

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {temperature}°F</div>
      <ReactSlider
        value={defaultTemperature}
        onAfterChange={(val) => { setDefaultTemperature(() => val) }}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;
