import ReactSlider from "react-slider";
import "./Hygrometer.css";

import { useClimate } from "../../context/ClimateContext";
import { useEffect, useState } from "react";

function Hygrometer() {
  const { humidity, setHumidity } = useClimate();
  const [defaultHumidity, setDefaultHumidity] = useState(humidity);

  useEffect(() => {
    if (humidity !== defaultHumidity) {
      const intervalId = setTimeout(() => {
        setHumidity(prevHumidity => {
          if (prevHumidity < defaultHumidity) prevHumidity++;
          else if (prevHumidity > defaultHumidity) prevHumidity--;
          else {
            clearTimeout(intervalId)
          }
          return prevHumidity;
        })
        setTimeout(intervalId);
        return () => clearTimeout(intervalId);
      }, 1000)
    }
  }, [humidity, defaultHumidity])

  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {humidity}%</div>
      <ReactSlider
        value={defaultHumidity}
        onAfterChange={(val) => { setDefaultHumidity(() => val) }}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
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

export default Hygrometer;
