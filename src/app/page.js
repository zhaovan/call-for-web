"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { answers } from "./answers";
import useMousePosition from "./useMouseMove";

export default function Home() {
  const [openedAnswer, setOpenedAnswer] = useState(false);
  const [answerNum, setAnswerNum] = useState(0);

  const [dragging, setDragging] = useState(false);

  const [randLoc, setRandLoc] = useState({});

  function handleButtonClick(num) {
    setOpenedAnswer(true);
    setAnswerNum(num);
    const rand = Math.floor(Math.random() * 60);
    // setRandLoc({ x: parseInt(rand) + "vw", y: parseInt(rand) + "vh" });
  }

  const mousePosition = useMousePosition();
  function handleMouseDown(evt) {
    evt.preventDefault();
    setDragging(true);
  }

  function handleMouseUp(evt) {
    evt.preventDefault();
    setDragging(false);
  }
  function handleMouseMove() {
    if (dragging) {
      setRandLoc({
        x: mousePosition.x - window.innerWidth / 4,
        y: mousePosition.y - 16,
      });
    }
  }

  return (
    <main onMouseMove={handleMouseMove} className={styles.main}>
      <div className={styles.container}>
        <button onClick={() => handleButtonClick(0)}>
          <h1>i am a designer, writer, and web artist</h1>
        </button>

        <button onClick={() => handleButtonClick(1)}>
          <h1>manifestations of css in projects and art</h1>
        </button>

        {/* Do you have other pratices, such as writing, poetry, installation or performance, that you feel could be intertwined with the broader artistic aspect of the worksession? */}
        <button onClick={() => handleButtonClick(2)}>
          <h1>poetry, installation, and comics</h1>
        </button>

        <button onClick={() => handleButtonClick(3)}>
          <h1>kernel and open source work</h1>
        </button>
      </div>
      {openedAnswer && (
        <div
          className={styles.win98popup}
          style={{ top: randLoc.y, left: randLoc.x }}
        >
          <div
            className={styles.bar}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <p>answer</p>
            <button
              className={styles.shadow}
              onClick={() => setOpenedAnswer(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8px"
                height="7px"
                viewBox="0 0 8 7"
                fillRule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
              >
                <path d="M1 6V5h1V4h1V3h2v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1zm0-4V1H0V0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H2V2H1z" />
              </svg>
            </button>
          </div>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: answers[answerNum] }}
          ></div>
        </div>
      )}
      <div style={{ position: "absolute", left: "50vw" }}>
        <embed
          src="/ivan-zhao-resume.pdf"
          width={400}
          height={600}
          alt="resume"
        />
      </div>
    </main>
  );
}
