// Answers for the quiz
    // Answers and explanations (sourced from kdagiitkgp site)
    const answers = ["a","a","a","a","a","a","a","a","a","a"];
    const explanations = [
      "KDAG stands for Kharagpur Data Analytics Group (site header and about).",
      "KDAG is a student initiative at IIT Kharagpur.",
      "The site promotes the Kharagpur Data Science Hackathon as a flagship event.",
      "KDAG focuses on Data Analytics, Machine Learning, and AI as described on the homepage.",
      "Their website contains resources and blog posts for learners and participants.",
      "The 'Think Tank' prep resource focuses on logic and probability puzzles for interview prep.",
      "Resources include curated modules for ML/DS, workshops and interview prep guides.",
      "The team page lists student leads (heads) and advisors — both are visible on the site.",
      "KDAG has collaborated on courses such as a realtime LLM bootcamp with Pathway (gitbook).",
      "The site advertises a hackathon with a prize pool of around ₹2.5 Lakh in recent editions."
    ];

    // localStorage keys
    const ATT_KEY = 'kdag_quiz_attempts';
    const BEST_KEY = 'kdag_quiz_best';
    const LAST_KEY = 'kdag_quiz_last';

    function readLS(k, fallback){ const v = localStorage.getItem(k); return v===null?fallback:Number(v); }
    function writeLS(k,v){ localStorage.setItem(k,String(v)); }

    // init UI
    document.getElementById('attempts').textContent = readLS(ATT_KEY,0);
    document.getElementById('best').textContent = readLS(BEST_KEY,0);
    const last = localStorage.getItem(LAST_KEY); document.getElementById('last').textContent = last===null?'-':last;

    function gatherAnswers(){ return Array.from({length:10}).map((_,i)=>{
      const el = document.querySelector(`input[name=q${i}]:checked`);
      return el?el.value:null;
    }); }

    function grade(){
      const user = gatherAnswers();
      let score=0; const chosen = [];
      for(let i=0;i<answers.length;i++){
        chosen.push(user[i]||'—');
        if(user[i] && user[i]===answers[i]) score++; }
      return {score,chosen,user};
    }

    function renderSolutions(result){
      const area = document.getElementById('solutionsArea'); area.innerHTML='';
      for(let i=0;i<answers.length;i++){
        const qnum = i+1;
        const userAns = result.user[i] || 'No answer';
        const correct = answers[i];
        const ok = userAns===correct;
        const div = document.createElement('div'); div.className='solution';
        div.innerHTML = `<strong>Q${qnum}.</strong> Your answer: <em>${userAns}</em> — <strong>${ok? 'Correct' : 'Incorrect'}</strong><br><small>${explanations[i]}</small>`;
        area.appendChild(div);
      }
    }

    document.getElementById('submitBtn').addEventListener('click',()=>{
      const res = grade();
      // update attempts
      let attempts = readLS(ATT_KEY,0); attempts++; writeLS(ATT_KEY,attempts);
      writeLS(LAST_KEY,res.score);
      const best = Math.max(readLS(BEST_KEY,0), res.score); writeLS(BEST_KEY,best);

      // update UI
      document.getElementById('attempts').textContent = readLS(ATT_KEY,0);
      document.getElementById('best').textContent = readLS(BEST_KEY,0);
      document.getElementById('last').textContent = readLS(LAST_KEY,'-');

      document.getElementById('scoreOut').textContent = res.score;
      document.getElementById('chosenSummary').textContent = res.chosen.join(', ');
      renderSolutions(res);
      document.getElementById('resultCard').style.display='block';
      // scroll to results
      document.getElementById('resultCard').scrollIntoView({behavior:'smooth'});
    });

    document.getElementById('resetBtn').addEventListener('click',()=>{
      document.getElementById('quizForm').reset();
      document.getElementById('resultCard').style.display='none';
    });
      //mobile menu toggle
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}


    document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element Selection ---
  const questions = document.querySelectorAll('.q');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const quizForm = document.getElementById('quizForm');
  const resultCard = document.getElementById('resultCard');
  const solutionsArea = document.getElementById('solutionsArea');
  const scoreOut = document.getElementById('scoreOut');
  const chosenSummary = document.getElementById('chosenSummary');
  const attemptsSpan = document.getElementById('attempts');
  const bestSpan = document.getElementById('best');
  const lastSpan = document.getElementById('last');

  // --- State & Data ---
  let currentQuestionIndex = 0;
  const totalQuestions = questions.length;

  const correctAnswers = {
    q0: 'a', q1: 'a', q2: 'a', q3: 'a', q4: 'a',
    q5: 'a', q6: 'a', q7: 'a', q8: 'a', q9: 'a'
  };

  const solutionText = [
    "KDAG stands for Kharagpur Data Analytics Group.",
    "KDAG is the official student group of IIT Kharagpur.",
    "The flagship event is the Kharagpur Data Science Hackathon.",
    "KDAG focuses on Data Analytics, Machine Learning, and AI.",
    "The website offers extensive resources and blog posts.",
    "The 'Think Tank' section contains probability and logic puzzles.",
    "The 'Resources' section has curated learning modules and interview prep.",
    "The team page lists student leads, members, and faculty advisors.",
    "KDAG collaborated with Pathway for a real-time LLM course.",
    "The hackathon prize pool is advertised as being worth ₹2.5 Lakh."
  ];

  // --- Functions ---
  function updateButtons() {
    prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = currentQuestionIndex === totalQuestions - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = currentQuestionIndex === totalQuestions - 1 ? 'inline-block' : 'none';
  }

  function showQuestion(index) {
    questions.forEach((q, i) => {
      q.style.display = i === index ? 'block' : 'none';
    });
    currentQuestionIndex = index;
    updateButtons();
  }

  function calculateScore() {
    let score = 0;
    const userChoices = {};
    const formData = new FormData(quizForm);
    for (let i = 0; i < totalQuestions; i++) {
      const choice = formData.get(`q${i}`);
      userChoices[`q${i}`] = choice || 'Not Answered';
      if (choice === correctAnswers[`q${i}`]) {
        score++;
      }
    }
    return { score, userChoices };
  }

  function showResults() {
    const { score, userChoices } = calculateScore();
    scoreOut.textContent = score;
    
    let chosenHtml = '';
    for (let i = 0; i < totalQuestions; i++) {
      const chosen = userChoices[`q${i}`];
      chosenHtml += `Q${i + 1}: ${chosen ? chosen.toUpperCase() : 'N/A'} `;
    }
    chosenSummary.textContent = chosenHtml;

    solutionsArea.innerHTML = '';
    for (let i = 0; i < totalQuestions; i++) {
      const userChoice = userChoices[`q${i}`];
      const isCorrect = userChoice === correctAnswers[`q${i}`];
      const solDiv = document.createElement('div');
      solDiv.className = 'solution';
      solDiv.innerHTML = `
        <p><b>Question ${i + 1}:</b> You chose ${userChoice ? userChoice.toUpperCase() : 'Not Answered'}. 
        Correct answer: ${correctAnswers[`q${i}`].toUpperCase()}.</p>
        <p>${isCorrect ? '✅' : '❌'} ${solutionText[i]}</p>
      `;
      solutionsArea.appendChild(solDiv);
    }

    resultCard.style.display = 'block';
    updateStats(score);
    resultCard.scrollIntoView({ behavior: 'smooth' });
  }
  
  function updateStats(currentScore) {
    let attempts = parseInt(localStorage.getItem('kdag_quiz_attempts') || '0');
    let best = parseInt(localStorage.getItem('kdag_quiz_best') || '0');

    attempts++;
    if (currentScore > best) {
      best = currentScore;
    }

    localStorage.setItem('kdag_quiz_attempts', attempts);
    localStorage.setItem('kdag_quiz_best', best);
    localStorage.setItem('kdag_quiz_last', currentScore);

    attemptsSpan.textContent = attempts;
    bestSpan.textContent = best;
    lastSpan.textContent = currentScore;
  }

  function loadStats() {
    attemptsSpan.textContent = localStorage.getItem('kdag_quiz_attempts') || '0';
    bestSpan.textContent = localStorage.getItem('kdag_quiz_best') || '0';
    lastSpan.textContent = localStorage.getItem('kdag_quiz_last') || '-';
  }

  function resetQuiz() {
    quizForm.reset();
    resultCard.style.display = 'none';
    showQuestion(0);
  }

  // --- Event Listeners ---
  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      showQuestion(currentQuestionIndex + 1);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      showQuestion(currentQuestionIndex - 1);
    }
  });

  submitBtn.addEventListener('click', showResults);
  resetBtn.addEventListener('click', resetQuiz);

  // --- Initial Setup ---
  loadStats();
  showQuestion(0);
});

// --- Global Functions ---

// Hamburger Menu Toggle
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('show');
}
