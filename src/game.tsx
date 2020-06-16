import React from "react";
import Rabbit from "../assets/images/rabbit.png";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export default function Game() {
  const [timeLeft, setTimeLeft] = React.useState<number>(0);
  const [point, setPoint] = React.useState<number>(0);
  const [actives, setActives] = React.useState<{ id: number; show: boolean }[]>(
    numbers.map(n => {
      return {
        id: n,
        show: false
      };
    })
  );

  React.useEffect(() => {
    if (timeLeft > 0) {
      const id = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(id);
    }
  }, [timeLeft]);

  React.useEffect(() => {
    if (timeLeft > 0) {
      const id = setInterval(onChangeActive, timeOut());
      return () => clearInterval(id);
    }
  }, [actives]);

  const resetGame = () => {
    setPoint(0);
    onChangeActive();
    setTimeLeft(90);
  };

  const timeOut = () => {
    if (timeLeft > 75) {
      return 800;
    } else if (timeLeft > 60) {
      return 700;
    } else if (timeLeft > 45) {
      return 600;
    } else if (timeLeft > 30) {
      return 500;
    } else if (timeLeft > 15) {
      return 400;
    }

    return 300;
  };

  const onClick = (active: boolean) => {
    if (active && timeLeft) {
      setPoint(point + 1);
      onChangeActive();
    }
    return;
  };

  const onChangeActive = () => {
    let asc: { id: number; show: boolean }[] = numbers.map(n => {
      return {
        id: n,
        show: false
      };
    });

    let index = randomNumber(0, numbers.length);
    console.log(index);

    asc[index].show = true;

    setActives(asc);
  };

  const stop = () => {
    setTimeLeft(0);
  };

  return (
    <div className="container">
      <div className="mt-5" />
      <div className="row">
        <div className="col-md-8 mt-3">
          <div className="row">
            {actives.map(m => (
              <div
                className={numbers.length > 9 ? "col-3 border" : "col-4 border"}
                key={m.id}
                onClick={() => {
                  onClick(m.show);
                }}
              >
                <div className={`box${m.show ? " active" : ""}`}>
                  {m.show && <img alt="chiken" src={Rabbit} className="img" />}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div>
            <div>Poin: {point}</div>
            <div>
              <button className="btn btn-primary mt-3" onClick={resetGame}>
                Start
              </button>
            </div>
            <div>
              <button className="btn btn-secondary mt-3" onClick={stop}>
                Stop
              </button>
            </div>
            <div className="mt-3">
              <span>Time left: {timeLeft ? timeLeft : "0"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
