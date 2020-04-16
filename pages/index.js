import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";
import styled from "styled-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const timeFirstClock = 40;
const timeSecondClock = 20;

const Home = () => {
  const [playCount1, setPlayCount1] = useState(false);
  const [playCount2, setPlayCount2] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", keyPress, false);

    return () => {
      document.removeEventListener("keydown", keyPress, false);
    };
  }, []);

  const keyPress = useCallback((event) => {
    if (event.keyCode === 32) {
      resetCounters();
    }
  }, []);

  const renderTime = (value) => {
    return <Time>{value}</Time>;
  };

  const startCounters = () => {
    setPlayCount1(true);

    if (playCount1 || playCount2) {
      setPlayCount1(false);
      setPlayCount2(false);
    }
  };

  const resetCounters = () => {
    window.location.href = "/";
  };

  return (
    <Container>
      <ContainerCountdowns>
        <CustomCountdown
          isPlaying
          durationSeconds={timeFirstClock}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          renderTime={renderTime}
          isPlaying={playCount1}
          onComplete={() => {
            setPlayCount2(true);
            setPlayCount1(false);

            return [true, timeSecondClock * 1000];
          }}
        />

        <CustomCountdown
          isPlaying
          durationSeconds={timeSecondClock}
          colors={[["#276174", 0.33], ["#33C58E", 0.33], ["#63FD88"]]}
          renderTime={renderTime}
          isPlaying={playCount2}
          onComplete={() => {
            setPlayCount1(true);
            setPlayCount2(false);

            return [true, timeFirstClock * 1000];
          }}
        />
      </ContainerCountdowns>
      <ContainerButtons>
        <Button onClick={() => startCounters()}>Start</Button>
        <Button onClick={() => resetCounters()}>Reset</Button>
      </ContainerButtons>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-content: center;
  justify-content: center;
`;

const ContainerCountdowns = styled.div`
  display: flex;
  flex-flow: row;
`;

const CustomCountdown = styled(CountdownCircleTimer)``;

const Button = styled.button`
  width: 10%;
  height: 80px;
  background-color: orange;
  color: white;
  font-size: 30px;
  margin-right: 20px;
  margin-top: 50px;
`;

const Time = styled.div`
  font-size: 100px;
`;

const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row;
`;

export default Home;
