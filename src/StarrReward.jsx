import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./StarrReward.css";

const CHARACTERS = [
  "Abdallah", "Ethan", "Louis", "Mathis", "Nohlan", "Soen", "Tony",
].map((name, i) => ({ name, image: `/personne${i + 1}.png` }));

const RARITIES = [
  { name: "RARE", color: "#42e879" },
  { name: "ÉPIQUE", color: "#b45cff" },
  { name: "LÉGENDAIRE", color: "#ffb52e" },
];
const KEY = "starr-reward-scores";
const emptyScores = () => Object.fromEntries(CHARACTERS.map(p => [p.name, 0]));

function loadScores() {
  try {
    return { ...emptyScores(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return emptyScores();
  }
}

export default function StarrReward() {
  const stage = useRef(null), box = useRef(null), glow = useRef(null);
  const flash = useRef(null), result = useRef(null), timeline = useRef(null);

  const [scores, setScores] = useState(loadScores);
  const [obtained, setObtained] = useState([]);
  const [character, setCharacter] = useState(null);
  const [rarity, setRarity] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [started, setStarted] = useState(false);
  const [opening, setOpening] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const finished = obtained.length === CHARACTERS.length;
  const particles = () => stage.current.querySelectorAll(".particle");

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(scores)); } catch {}
  }, [scores]);

  useEffect(() => () => timeline.current?.kill(), []);

  function startReward() {
    if (started || opening || finished) return;
    setClicks([]);
    setStarted(true);
    setRevealed(false);
    setCharacter(null);
    setRarity(0);
    gsap.set([box.current, result.current, glow.current, flash.current, ...particles()], {
      clearProps: "all",
    });
    gsap.set(result.current, { opacity: 0, scale: 0.5, y: 30 });
    gsap.set(glow.current, { opacity: 0.2, scale: 0.8 });
    gsap.set(flash.current, { opacity: 0 });
  }

  function clickStep(index) {
    if (!started || opening || clicks.includes(index)) return;
    const next = [...clicks, index];
    setClicks(next);
    setRarity(Math.min(next.length - 1, 2));

    gsap.to(glow.current, {
      opacity: 0.2 + next.length * 0.18,
      scale: 0.8 + next.length * 0.2,
      duration: 0.3,
    });
    gsap.fromTo(box.current, { rotation: index % 2 ? 7 : -7 }, {
      rotation: 0, scale: 1 + next.length * 0.05,
      duration: 0.25, ease: "back.out(2)",
    });

    if (next.length === 4) {
      setStarted(false);
      revealReward();
    }
  }

  function revealReward() {
    const remaining = CHARACTERS.filter(p => !obtained.includes(p.name));
    if (!remaining.length) return;

    const selected = remaining[Math.floor(Math.random() * remaining.length)];
    const finalRarity = Math.random() < 0.6 ? 0 : Math.random() < 0.75 ? 1 : 2;
    const bits = particles();

    setCharacter(selected);
    setRarity(finalRarity);
    setOpening(true);
    setRevealed(false);
    timeline.current?.kill();

    gsap.set([box.current, ...bits], { opacity: 1, scale: 1, rotation: 0, x: 0, y: 0 });
    gsap.set(result.current, { opacity: 0, scale: 0.5, y: 30 });
    gsap.set(flash.current, { opacity: 0 });

    timeline.current = gsap.timeline({
      onComplete: () => {
        setObtained(old => [...old, selected.name]);
        setRevealed(true);
        setOpening(false);
      },
    })
      .to(box.current, {
        keyframes: [
          { rotation: -9, scale: 1.15, duration: 0.12 },
          { rotation: 9, scale: 1.2, duration: 0.12 },
          { rotation: -6, duration: 0.1 },
          { rotation: 6, duration: 0.1 },
          { rotation: 0, scale: 1.3, duration: 0.25 },
        ],
      })
      .to(glow.current, { opacity: 1, scale: 1.7, duration: 0.45 }, "<")
      .to(bits, {
        x: i => Math.cos(i * 2.4) * (100 + i % 4 * 25),
        y: i => Math.sin(i * 2.4) * (100 + i % 3 * 30),
        opacity: 0, scale: 0, rotation: 180, duration: 0.8, stagger: 0.012,
      }, "-=0.1")
      .to(flash.current, { opacity: 0.95, duration: 0.12 }, "-=0.35")
      .to(flash.current, { opacity: 0, duration: 0.5 })
      .to(box.current, { opacity: 0, scale: 1.7, duration: 0.25 }, "<")
      .to(result.current, {
        opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "back.out(1.7)",
      }, "-=0.2");
  }

  function resetSeries() {
    timeline.current?.kill();
    setObtained([]);
    setCharacter(null);
    setRarity(0);
    setClicks([]);
    setStarted(false);
    setOpening(false);
    setRevealed(false);
    gsap.set([box.current, result.current, glow.current, flash.current, ...particles()], {
      clearProps: "all",
    });
  }

  function resetScores() {
    setScores(emptyScores());
  }

  const ranking = [...CHARACTERS].sort(
    (a, b) => scores[b.name] - scores[a.name] || a.name.localeCompare(b.name)
  );

  return (
    <main className="reward-page" ref={stage} style={{ "--rarity-color": RARITIES[rarity].color }}>
      <div className="ambient" ref={glow} />
      <div className="flash" ref={flash} />

      <header className="reward-header">
        <h1>QUI VA PASSER ?</h1>
        <p>Cliquez sur les quatre boutons pour découvrir qui va passer.</p>
      </header>

      <section className="reward-card">
        <div className="reward-stage">
          <div className="particles">
            {Array.from({ length: 24 }, (_, i) => (
              <span className="particle" key={i}>{i % 3 ? "✧" : "✦"}</span>
            ))}
          </div>

          <div className="reward-box" ref={box}>
            <span className="box-star">★</span>
            <span className="box-question">?</span>
          </div>

          <div className="reward-result" ref={result}>
            {character && <img className="character-image" src={character.image} alt={character.name} />}
            <p className="rarity-label">{RARITIES[rarity].name}</p>
            <h2>{character?.name || "Mystère"}</h2>
            <button className="point-button" disabled={!revealed} onClick={() =>
              setScores(old => ({ ...old, [character.name]: old[character.name] + 1 }))
            }>
              Bonne réponse ! (+ Ajouter un point)
            </button>
          </div>
        </div>

        <p className="rarity-label">
          {opening ? "RÉVÉLATION..." : started ? `ÉTAPE ${clicks.length}/4` : RARITIES[rarity].name}
        </p>

        {finished ? (
          <div className="series-finished">
            <h2>Tous les personnages sont débloqués !</h2>
            <button className="open-button" onClick={resetSeries}>RESET — RECOMMENCER</button>
          </div>
        ) : (
          <>
            {!started && !opening && !revealed && (
              <button className="open-button" onClick={startReward}>OUVRIR UNE RÉCOMPENSE</button>
            )}
            {started && (
              <div className="click-buttons">
                {[0, 1, 2, 3].map(i => (
                  <button key={i} className={`click-step ${clicks.includes(i) ? "clicked" : ""}`}
                    disabled={clicks.includes(i) || opening} onClick={() => clickStep(i)}>
                    {clicks.includes(i) ? "✓" : `CLIC ${i + 1}`}
                  </button>
                ))}
              </div>
            )}
            {started && <p className="chance-info">Cliquez sur les 4 boutons ! — {clicks.length}/4 clics</p>}
            {revealed && !opening && (
              <button className="open-button" onClick={startReward}>PERSONNE SUIVANTE</button>
            )}
          </>
        )}
        <p className="chance-info">Rare 60 % · Épique 30 % · Légendaire 10 %</p>
      </section>

      <section className="ranking-card">
        <div className="ranking-header">
          <h2>🏆 Classement</h2>
          <button className="reset-button" onClick={resetScores}>Remettre les points à zéro</button>
        </div>
        <ol className="ranking-list">
          {ranking.map((person, i) => (
            <li className="ranking-item" key={person.name}>
              <span className="ranking-position">{["🥇", "🥈", "🥉"][i] || i + 1}</span>
              <img className="ranking-avatar" src={person.image} alt={person.name} />
              <span className="ranking-name">{person.name}</span>
              <strong className="ranking-points">{scores[person.name] || 0} pt</strong>
            </li>
          ))}
        </ol>
        <p className="storage-note">Classement sauvegardé sur cet appareil.</p>
      </section>
    </main>
  );
}