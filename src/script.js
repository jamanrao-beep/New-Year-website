/* QUIZ LOGIC */
const quizData = [
  {
    question:
      "If you had to describe your 2025 in one word, what would it be?",
    options: [
      { label: "A", text: "Chaotic but kind of worth it" },
      { label: "B", text: "Quiet but meaningful" },
      { label: "C", text: "Full-on character development" },
      { label: "D", text: "A mix of everything" }
    ],
    responses: {
      A: "The best plots always start with a little chaos.",
      B: "Quiet and meaningful is actually an elite combo.",
      C: "Main character era unlocked. Not easy, but powerful.",
      D: "You basically unlocked the full experience pack."
    }
  },
  {
    question:
      "When things got overwhelming this year, you mostly recharged by…",
    options: [
      { label: "A", text: "Listening to music alone" },
      { label: "B", text: "Talking to 1–2 safe people" },
      { label: "C", text: "Books / shows / YouTube rabbit holes" },
      { label: "D", text: "Just scrolling and thinking about life" }
    ],
    responses: {
      A: "The right playlist can fix a whole mood.",
      B: "One good person > hundred random people.",
      C: "Escaping into stories is a top-tier survival skill.",
      D: "At least your thoughts are never boring."
    }
  },
  {
    question:
      "What was the highlight of this year for you (be as honest or mysterious as you want)?",
    options: [
      { label: "A", text: "Getting into NIT 🎓" },
      { label: "B", text: "New people I met (you can quietly keep the list)" },
      { label: "C", text: "Small personal wins only I noticed" },
      { label: "D", text: "Just surviving everything somehow" }
    ],
    responses: {
      A: "NIT unlocked. That’s not a small flex at all.",
      B: "Some people really walk in like plot twists.",
      C: "Those quiet wins actually matter the most.",
      D: "Survival itself is a flex. No one says it enough."
    }
  },
  {
    question: "For 2026, you secretly want more…",
    options: [
      { label: "A", text: "Peace and stability" },
      { label: "B", text: "Laughter & inside jokes with the right people" },
      { label: "C", text: "New experiences (but not too chaotic)" },
      { label: "D", text: "Soft, calm days with people who get me" }
    ],
    responses: {
      A: "Peace is seriously underrated and very attractive.",
      B: "The right people + stupid jokes = best combo.",
      C: "Okay, main character arc continues, but with balance.",
      D: "That’s actually the dream version of life."
    }
  }
];

const quizContent = document.getElementById("quiz-content");
const quizStepLabel = document.getElementById("quiz-step-label");
const quizProgress = document.getElementById("quiz-progress");

let currentQuestionIndex = 0;
let hasSelected = false;
let selectedResponse = "";

function renderQuestion() {
  const q = quizData[currentQuestionIndex];
  hasSelected = false;
  selectedResponse = "";

  quizStepLabel.textContent =
    currentQuestionIndex + 1 + " / " + quizData.length;

  const progressPercent = (currentQuestionIndex / quizData.length) * 100;
  quizProgress.style.width = progressPercent + "%";

  quizContent.innerHTML = `
    <p class="quiz-question">${q.question}</p>
    <div class="quiz-options">
      ${q.options
        .map(
          (opt) => `
        <button type="button" class="quiz-option" data-label="${opt.label}">
          <span class="bullet">${opt.label}</span>
          <span>${opt.text}</span>
        </button>
      `
        )
        .join("")}
    </div>
    <p class="quiz-response" id="quiz-response"></p>
    <button class="quiz-next" id="quiz-next" type="button" disabled>
      Next
      <span>➜</span>
    </button>
  `;

  const optionButtons = quizContent.querySelectorAll(".quiz-option");
  const responseEl = document.getElementById("quiz-response");
  const nextBtn = document.getElementById("quiz-next");

  optionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      optionButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");

      const label = btn.dataset.label;
      selectedResponse = q.responses[label] || "";
      responseEl.textContent = selectedResponse;
      hasSelected = true;
      nextBtn.disabled = false;

      btn.style.transform = "translateY(-2px) scale(1.01)";
      setTimeout(() => {
        btn.style.transform = "";
      }, 130);
    });
  });

  nextBtn.addEventListener("click", () => {
    if (!hasSelected) return;

    if (currentQuestionIndex < quizData.length - 1) {
      currentQuestionIndex++;
      renderQuestion();
    } else {
      quizProgress.style.width = "100%";
      showQuizEnd();
    }
  });
}

function showQuizEnd() {
  quizStepLabel.textContent = "Done ✨";
  quizContent.innerHTML = `
    <p class="quiz-question">
      That’s it. Thanks for answering (even in introvert mode).
    </p>
    <p class="quiz-response">
      Now I officially know a tiny bit more about how your year looked from your side.
    </p>
  `;
}

renderQuestion();

/* FUTURE TAGS */
const futureTagsContainer = document.getElementById("future-tags");
const futureNote = document.getElementById("future-note");

futureTagsContainer.querySelectorAll(".future-tag").forEach((tag) => {
  tag.addEventListener("click", () => {
    tag.classList.toggle("selected");

    const selectedTexts = Array.from(
      futureTagsContainer.querySelectorAll(".future-tag.selected")
    ).map((t) => t.textContent.trim());

    if (selectedTexts.length === 0) {
      futureNote.textContent = "";
    } else if (selectedTexts.length === 1) {
      futureNote.textContent =
        'If 2026 actually feels like "' +
        selectedTexts[0] +
        '", that’s already a win.';
    } else {
      futureNote.textContent =
        "If 2026 matches even half of what you just picked, it’s going to be a good story.";
    }
  });
});

/* BIRTHDAY INPUT */
const birthdayInput = document.getElementById("birthday-input");
const birthdayBtn = document.getElementById("birthday-btn");
const birthdayNote = document.getElementById("birthday-note");

birthdayBtn.addEventListener("click", () => {
  const value = birthdayInput.value.trim();

  if (!value) {
    birthdayNote.textContent = "At least give me a tiny hint, na.";
    birthdayNote.style.color = "var(--danger)";
    return;
  }

  birthdayNote.style.color = "var(--accent-soft)";
  birthdayNote.textContent =
    "Got it. Now I am officially not allowed to forget " + value + " anymore.";
  birthdayInput.disabled = true;
  birthdayBtn.disabled = true;
  birthdayBtn.textContent = "Saved ✓";
});
