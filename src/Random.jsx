import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Random.css";

const RANDOM_STORAGE_KEY = "sqy-random-state";

function Random() {
    const studentList = ["Abdallah", "Nohlan", "Soen", "Ethan", "Mathis", "Tony", "Bastien", "Louis"];
    const [currentStudentList, setCurrentStudentList] = useState(() => {
        try {
            const savedState = localStorage.getItem(RANDOM_STORAGE_KEY);
            if (!savedState) {
                return [...studentList];
            }

            const parsedState = JSON.parse(savedState);
            const savedStudents = parsedState.currentStudentList;
            const savedCurrentStudent = parsedState.currentStudent;
            const isValidList = Array.isArray(savedStudents)
                && savedStudents.every((student) => studentList.includes(student));
            const isValidCurrentStudent = savedCurrentStudent === ""
                || studentList.includes(savedCurrentStudent ?? "");

            return isValidList && isValidCurrentStudent ? savedStudents : [...studentList];
        } catch {
            return [...studentList];
        }
    });
    const [currentStudent, setCurrentStudent] = useState(() => {
        try {
            const savedState = localStorage.getItem(RANDOM_STORAGE_KEY);
            if (!savedState) {
                return "";
            }

            const parsedState = JSON.parse(savedState);
            return typeof parsedState.currentStudent === "string"
                && studentList.includes(parsedState.currentStudent)
                ? parsedState.currentStudent
                : "";
        } catch {
            return "";
        }
    });
    const [spinCount, setSpinCount] = useState(0);
    const [points, setPoints] = useState(() => {
        try {
            const savedState = localStorage.getItem(RANDOM_STORAGE_KEY);
            const parsedState = savedState ? JSON.parse(savedState) : {};
            const savedPoints = parsedState.points ?? {};

            return Object.fromEntries(
                studentList.map((student) => [student, typeof savedPoints[student] === "number" ? savedPoints[student] : 0])
            );
        } catch {
            return Object.fromEntries(studentList.map((student) => [student, 0]));
        }
    });
    const resultNameRef = useRef(null);
    const scoreControlsRef = useRef(null);
    const [scoreboardStudent, setScoreboardStudent] = useState(currentStudent);

    useEffect(() => {
        const stateToSave = { currentStudentList, currentStudent, points };
        localStorage.setItem(RANDOM_STORAGE_KEY, JSON.stringify(stateToSave));
    }, [currentStudentList, currentStudent, points]);

    useEffect(() => {
        if (!currentStudent || spinCount === 0) {
            setScoreboardStudent(currentStudent);
            return;
        }

        setScoreboardStudent("");
        const revealTimer = window.setTimeout(() => {
            setScoreboardStudent(currentStudent);
        }, 2600);

        return () => window.clearTimeout(revealTimer);
    }, [currentStudent, spinCount]);

    function updatePoints(amount) {
        if (!currentStudent) {
            return;
        }

        setPoints((currentPoints) => ({
            ...currentPoints,
            [currentStudent]: Math.max(0, (currentPoints[currentStudent] ?? 0) + amount)
        }));
    }

    function rerollStudent() {
        let newCurrentStudentList = currentStudentList.filter((student) => student !== currentStudent);
        let newCurrentStudent;

        if (newCurrentStudentList.length === 0) {
            newCurrentStudentList = [...studentList];
            const availableStudents = newCurrentStudentList.filter((student) => student !== currentStudent);
            newCurrentStudent = availableStudents[Math.floor(Math.random() * availableStudents.length)];
        } else {
            newCurrentStudent = newCurrentStudentList[Math.floor(Math.random() * newCurrentStudentList.length)];
        }
        setCurrentStudentList([...newCurrentStudentList]);
        setCurrentStudent(newCurrentStudent);
        setSpinCount((count) => count + 1);
    }

    function resetRound() {
        setCurrentStudentList([...studentList]);
        setCurrentStudent("");
        setSpinCount(0);
    }

    const initials = (student) => student.slice(0, 2).toUpperCase();
    const remainingStudents = currentStudentList.filter((student) => student !== currentStudent);
    const displayedStudents = currentStudent
        ? [currentStudent, ...remainingStudents]
        : remainingStudents;
    const displayedName = currentStudent || "...";
    const currentPoints = currentStudent ? points[currentStudent] ?? 0 : "...";
    const scoreBoard = [...studentList].sort((firstStudent, secondStudent) => (
        (points[secondStudent] ?? 0) - (points[firstStudent] ?? 0)
    ));

    useLayoutEffect(() => {
        if (!currentStudent || !resultNameRef.current) {
            return;
        }

        const animationContext = gsap.context(() => {
            const letters = gsap.utils.toArray(".result-letter");

            gsap.set(letters, {
                opacity: 0,
                visibility: "visible",
                y: -36,
                rotateX: 90,
                transformOrigin: "50% 0%"
            });
            gsap.to(letters, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.65,
                delay: spinCount > 0 ? 2 : 0,
                stagger: 0.08,
                ease: "bounce.out"
            });
        }, resultNameRef);

        return () => animationContext.revert();
    }, [currentStudent, spinCount]);

    useLayoutEffect(() => {
        if (!currentStudent || !scoreControlsRef.current) {
            return;
        }

        const animationContext = gsap.context(() => {
            const digits = gsap.utils.toArray(".score-digit");
            const scoreTimeline = gsap.timeline({ delay: spinCount > 0 ? 2 : 0 });

            gsap.set(digits, {
                opacity: 0,
                visibility: "visible",
                y: -30,
                rotateX: 90,
                transformOrigin: "50% 0%"
            });
            scoreTimeline.to(digits, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.65,
                stagger: 0.08,
                ease: "bounce.out"
            });
        }, scoreControlsRef);

        return () => animationContext.revert();
    }, [currentStudent, currentPoints, spinCount]);

    return (
        <main className="random-page">
            <section className="orbit-layout" aria-label="Students orbit">
                <div className="orbit-sidebar">
                    <div className="remaining-count" aria-label={`${remainingStudents.length} students remaining`}>
                        <span>{remainingStudents.length}</span>
                        <small>students remaining</small>
                    </div>
                    <section className="scoreboard" aria-label="Student scoreboard">
                        <p className="eyebrow">SCOREBOARD</p>
                        <ol>
                            {scoreBoard.map((student) => (
                                <li className={student === scoreboardStudent ? "is-current" : ""} key={student}>
                                    <span>{student}</span>
                                    <strong>{points[student] ?? 0}</strong>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>
                <div className="orbit-section">
                    <div className={`orbit ${spinCount > 0 ? "is-spinning" : ""}`} key={spinCount}>
                        {displayedStudents.map((student, index) => (
                            <article
                                className={`student-card ${student === currentStudent ? "is-selected" : ""}`}
                                key={student}
                                style={{ "--card-angle": `${index * (360 / displayedStudents.length)}deg` }}
                            >
                                <div className="card-face card-front">
                                    <img
                                        className="student-avatar"
                                        src={`https://i.pravatar.cc/160?img=${index + 10}`}
                                        alt={`${student} portrait`}
                                        onError={(event) => {
                                            event.currentTarget.style.display = "none";
                                            const fallback = event.currentTarget.nextElementSibling;
                                            if (fallback instanceof HTMLElement) {
                                                fallback.style.display = "grid";
                                            }
                                        }}
                                    />
                                    <span className="student-initials" aria-hidden="true">{initials(student)}</span>
                                    <strong>{student}</strong>
                                    <span className="student-points">Points: {points[student] ?? 0}</span>
                                </div>
                                <div className="card-face card-back" aria-hidden="true">
                                    <span className="back-mark">SQY</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="result-panel" aria-live="polite">
                <div className="result-summary result-current">
                    <p className="eyebrow">CURRENT DRAW</p>
                    <h2 className="result-name" ref={resultNameRef} aria-label={displayedName}>
                        {Array.from(displayedName).map((letter, index) => (
                            <span className={`result-letter ${currentStudent ? "is-animated" : ""}`} key={`${letter}-${index}`}>
                                {letter === " " ? "\u00A0" : letter}
                            </span>
                        ))}
                    </h2>
                </div>
                <div className="result-summary result-points">
                    <p className="eyebrow">POINTS</p>
                    <div className={`score-controls ${currentStudent ? "is-animated" : ""}`} ref={scoreControlsRef} aria-label="Current student points">
                        <span className="score-total" aria-label={`${currentPoints} points`}>
                            {String(currentPoints).split("").map((digit, index) => (
                                <span className="score-digit" key={`${digit}-${index}`}>{digit}</span>
                            ))}
                        </span>
                        <button className="score-button" type="button" onClick={() => updatePoints(-1)} disabled={!currentStudent} aria-label="Remove one point">−</button>
                        <button className="score-button" type="button" onClick={() => updatePoints(1)} disabled={!currentStudent} aria-label="Add one point">+</button>
                    </div>
                </div>
                <div className="result-actions">
                    <button className="reset-button" type="button" onClick={resetRound}>
                        <span>Reset round</span>
                        <b>↺</b>
                    </button>
                    <button type="button" onClick={rerollStudent}>
                        <span>Reroll student</span>
                        <b>↗</b>
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Random;