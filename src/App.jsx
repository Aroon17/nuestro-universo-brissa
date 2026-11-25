import { useState } from 'react';
import {
  Heart,
  Sparkles,
  Gift,
  Music,
  Star,
  RotateCcw,
  Check,
  PartyPopper
} from 'lucide-react';

const questions = [
  {
    question: '¿Qué es lo que más me gusta de ti?',
    options: ['Tu sonrisa', 'Tu forma de ser', 'Tus ojitos', 'Todo de ti'],
    answer: 3
  },
  {
    question: '¿Qué quiero contigo?',
    options: ['Una aventura pasajera', 'Muchos momentos juntos', 'Solo amistad', 'Nada'],
    answer: 1
  },
  {
    question: '¿Cuál es mi plan favorito?',
    options: ['Estar contigo', 'Dormir', 'Jugar videojuegos', 'Ver películas solo'],
    answer: 0
  },
  {
    question: '¿Qué eres para mí?',
    options: ['Una casualidad', 'Una persona más', 'Alguien muy especial', 'Una desconocida'],
    answer: 2
  }
];

const memoryCards = ['💗', '🌷', '🦋', '💕', '💗', '🌷', '🦋', '💕'];

const romanticTasks = [
  'Dame un abrazo de esos que duran mucho.',
  'Regálame un besito.',
  'Dime algo bonito al oído.',
  'Hagamos un recuerdo nuevo juntos.',
  'Sonríe, porque tu sonrisa es mi favorita.',
  'Dame la mano y no la sueltes.'
];

function App() {
  const [activeGame, setActiveGame] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [cards, setCards] = useState(() =>
    [...memoryCards].sort(() => Math.random() - 0.5)
  );
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [task, setTask] = useState('');
  const [heartCount, setHeartCount] = useState(0);

  const score = questions.filter(
    (question, index) => answers[index] === question.answer
  ).length;

  function chooseAnswer(questionIndex, optionIndex) {
    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex
    }));
  }

  function resetQuiz() {
    setAnswers({});
    setShowResult(false);
  }

  function flipCard(index) {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const [first, second] = nextFlipped;

      if (cards[first] === cards[second]) {
        setMatched((previous) => [...previous, first, second]);
        setTimeout(() => setFlipped([]), 650);
      } else {
        setTimeout(() => setFlipped([]), 850);
      }
    }
  }

  function resetMemory() {
    setCards([...memoryCards].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
  }

  function spinWheel() {
    const randomTask = romanticTasks[
      Math.floor(Math.random() * romanticTasks.length)
    ];
    setTask(randomTask);
  }

  function addHeart() {
    setHeartCount((count) => count + 1);
  }

  return (
    <main>
      <div className="floating-hearts" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <Heart key={index} size={18 + (index % 3) * 8} />
        ))}
      </div>

      <header className="hero" id="inicio">
        <div className="hero-label">
          <Sparkles size={16} /> Un pequeño universo para ti
        </div>

        <div className="main-heart">
          <Heart fill="currentColor" size={55} />
        </div>

        <p className="eyebrow">PARA MI PERSONA FAVORITA</p>
        <h1>Mi querida <span>Brissa</span></h1>

        <p className="hero-description">
          Si pudiera elegir nuevamente, volvería a elegirte a ti.
          Porque contigo los momentos sencillos se vuelven especiales.
        </p>

        <div className="date-label">
          <Heart size={15} fill="currentColor" />
          13 de septiembre de 2025
          <Heart size={15} fill="currentColor" />
        </div>

        <a href="#nuestra-historia" className="primary-button">
          Descubre nuestro universo <Heart size={17} />
        </a>
      </header>

      <section className="section story" id="nuestra-historia">
        <div className="section-heading">
          <span className="section-tag">NUESTRA HISTORIA</span>
          <h2>Un capítulo que quiero seguir escribiendo contigo</h2>
          <p>
            No necesito una historia perfecta. Solo quiero una historia
            sincera, llena de cariño, risas y momentos a tu lado.
          </p>
        </div>

        <div className="story-card">
          <div className="story-icon"><Heart fill="currentColor" /></div>
          <p>
            Desde que llegaste a mi vida, hay momentos que tienen un
            significado diferente. Me gusta compartir contigo, conocerte
            cada día un poquito más y construir recuerdos que sean solo
            nuestros.
          </p>
          <p>
            Quiero que sigamos aprendiendo, creciendo y cuidando lo bonito
            que tenemos. No prometo ser perfecto, pero sí poner de mi parte
            para hacerte feliz.
          </p>
          <strong>Con mucho amor, Aroon ♡</strong>
        </div>
      </section>

      <section className="section games-section" id="juegos">
        <div className="section-heading">
          <span className="section-tag">UN RATITO PARA NOSOTROS</span>
          <h2>¿Jugamos, mi amor?</h2>
          <p>Preparé algunas pequeñas sorpresas para compartir contigo.</p>
        </div>

        <div className="game-menu">
          <button
            className={activeGame === 'memory' ? 'game-card selected' : 'game-card'}
            onClick={() => setActiveGame(activeGame === 'memory' ? '' : 'memory')}
          >
            <span className="game-icon pink"><Heart /></span>
            <strong>Parejas de corazones</strong>
            <small>Encuentra todas las parejas.</small>
          </button>

          <button
            className={activeGame === 'quiz' ? 'game-card selected' : 'game-card'}
            onClick={() => setActiveGame(activeGame === 'quiz' ? '' : 'quiz')}
          >
            <span className="game-icon purple"><Sparkles /></span>
            <strong>¿Cuánto me conoces?</strong>
            <small>Responde estas preguntitas.</small>
          </button>

          <button
            className={activeGame === 'wheel' ? 'game-card selected' : 'game-card'}
            onClick={() => setActiveGame(activeGame === 'wheel' ? '' : 'wheel')}
          >
            <span className="game-icon yellow"><Gift /></span>
            <strong>Ruleta romántica</strong>
            <small>Una sorpresa para los dos.</small>
          </button>

          <button
            className={activeGame === 'hearts' ? 'game-card selected' : 'game-card'}
            onClick={() => setActiveGame(activeGame === 'hearts' ? '' : 'hearts')}
          >
            <span className="game-icon blue"><Star /></span>
            <strong>Atrapa los corazones</strong>
            <small>Junta tantos como puedas.</small>
          </button>
        </div>

        {activeGame === 'memory' && (
          <div className="game-panel">
            <h3>Encuentra las parejas 💗</h3>
            <p>Busca las dos cartas que tienen el mismo símbolo.</p>
            <div className="memory-grid">
              {cards.map((card, index) => (
                <button
                  key={index}
                  className={`memory-card ${
                    flipped.includes(index) || matched.includes(index)
                      ? 'revealed'
                      : ''
                  }`}
                  onClick={() => flipCard(index)}
                  disabled={flipped.length === 2 || matched.includes(index)}
                >
                  {flipped.includes(index) || matched.includes(index) ? card : '♡'}
                </button>
              ))}
            </div>
            <p className="game-feedback">
              {matched.length === cards.length
                ? '¡Lo logramos! Somos un gran equipo. 💕'
                : `Parejas encontradas: ${matched.length / 2} de 4`}
            </p>
            <button className="secondary-button" onClick={resetMemory}>
              <RotateCcw size={16} /> Volver a jugar
            </button>
          </div>
        )}

        {activeGame === 'quiz' && (
          <div className="game-panel">
            <h3>¿Cuánto me conoces? 💌</h3>
            {questions.map((question, index) => (
              <div className="quiz-question" key={index}>
                <strong>{index + 1}. {question.question}</strong>
                <div className="quiz-options">
                  {question.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className={answers[index] === optionIndex ? 'answer selected-answer' : 'answer'}
                      onClick={() => chooseAnswer(index, optionIndex)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {!showResult ? (
              <button
                className="primary-button"
                disabled={Object.keys(answers).length !== questions.length}
                onClick={() => setShowResult(true)}
              >
                Ver mis resultados <Heart size={17} />
              </button>
            ) : (
              <div className="result-message">
                <Sparkles />
                <strong>¡Obtuviste {score} de {questions.length}!</strong>
                <p>{score === 4 ? '¡Me conoces muy bien, mi amor!' : 'Lo importante es que sigamos conociéndonos cada día.'}</p>
                <button className="secondary-button" onClick={resetQuiz}>
                  Intentar nuevamente
                </button>
              </div>
            )}
          </div>
        )}

        {activeGame === 'wheel' && (
          <div className="game-panel">
            <h3>Ruleta romántica 🎀</h3>
            <p>Presiona el botón para descubrir tu pequeña misión.</p>
            <div className="wheel-circle">
              <Gift size={55} />
            </div>
            <button className="primary-button" onClick={spinWheel}>
              Girar la ruleta <Sparkles size={17} />
            </button>
            {task && <div className="task-result">{task}</div>}
          </div>
        )}

        {activeGame === 'hearts' && (
          <div className="game-panel">
            <h3>¡Atrapa los corazones! 💖</h3>
            <p>Presiona el corazón todas las veces que quieras.</p>
            <button className="catch-heart" onClick={addHeart}>
              <Heart size={65} fill="currentColor" />
            </button>
            <div className="heart-score">Corazones atrapados: <strong>{heartCount}</strong></div>
            <button className="secondary-button" onClick={() => setHeartCount(0)}>
              Reiniciar
            </button>
          </div>
        )}
      </section>

      <section className="section promise-section">
        <div className="promise-card">
          <Sparkles size={30} />
          <h2>Una pequeña promesa</h2>
          <p>
            Prometo seguir eligiéndote, escucharte, respetarte y cuidar
            nuestra relación. Que nunca nos falten las ganas de solucionar
            las cosas y seguir caminando juntos.
          </p>
          <div className="promise-signature">Aroon <Heart size={18} fill="currentColor" /></div>
        </div>
      </section>

      <section className="section final-section">
        <div className="final-heart"><Heart fill="currentColor" size={42} /></div>
        <h2>Mi lugar favorito siempre será contigo.</h2>
        <p>Gracias por formar parte de mi historia, Brissa.</p>
        <button className="final-button" onClick={() => setRevealed(!revealed)}>
          {revealed ? 'Cerrar mi mensajito' : 'Tengo algo más que decirte'}
          <Heart size={17} />
        </button>
        {revealed && (
          <div className="secret-message">
            <PartyPopper size={25} />
            <p>
              Te amo, Brissa. Gracias por cada sonrisa, cada abrazo y cada
              instante compartido. Quiero que este sea uno de muchísimos
              capítulos bonitos que todavía nos esperan. ♡
            </p>
            <strong>Con amor, Aroon.</strong>
          </div>
        )}
      </section>

      <footer>
        Hecho con <Heart size={13} fill="currentColor" /> para Brissa · Aroon
      </footer>
    </main>
  );
}

export default App;
