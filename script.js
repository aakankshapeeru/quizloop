const QUESTIONS_PER_QUIZ = 3;
const STORAGE_KEY = "quizloop-history";

const QUESTIONS = [
  {
    id: "py-len",
    topic: "Python",
    concept: "lists and len()",
    prompt: "What does len([10, 20, 30]) return?",
    choices: ["2", "3", "30", "An error, because lists have no length"],
    answer: 1,
    explanation: "len() returns the number of items in a sequence. This list has three items.",
  },
  {
    id: "py-dict",
    topic: "Python",
    concept: "dictionaries",
    prompt: "Which value is a dictionary?",
    choices: ['["a", 1]', '{"a": 1}', '("a", 1)', '"a: 1"'],
    answer: 1,
    explanation: "Curly braces with key: value pairs create a dictionary. Square brackets make a list.",
  },
  {
    id: "py-slice",
    topic: "Python",
    concept: "slicing",
    prompt: 'What is the value of "hello"[1:4]?',
    choices: ['"hell"', '"ell"', '"ello"', '"h"'],
    answer: 1,
    explanation: "A slice starts at the first index and stops before the second. Indexes 1, 2, and 3 are e, l, and l.",
  },
  {
    id: "py-default",
    topic: "Python",
    concept: "default arguments",
    prompt: "Why can a mutable default argument surprise you?",
    choices: [
      "Python recreates the default list on every call",
      "The same default list is reused across calls",
      "Default arguments are not allowed in Python",
      "Lists cannot be passed to functions",
    ],
    answer: 1,
    explanation: "Default values are created once, when the function is defined. A list default is shared by later calls.",
  },
  {
    id: "py-comp",
    topic: "Python",
    concept: "list comprehensions",
    prompt: "What does [n * 2 for n in [1, 2, 3]] produce?",
    choices: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "A generator that never builds a list"],
    answer: 1,
    explanation: "A list comprehension builds a new list. Each number is doubled, so the result is [2, 4, 6].",
  },
  {
    id: "py-eq",
    topic: "Python",
    concept: "equality and identity",
    prompt: "What does == compare for two lists such as [1, 2] == [1, 2]?",
    choices: [
      "Whether they are the same object in memory",
      "Whether their values are equal",
      "Only the first item",
      "Their memory addresses as numbers",
    ],
    answer: 1,
    explanation: "== checks value equality. The is operator checks whether two names refer to the same object.",
  },
  {
    id: "ds-stack",
    topic: "Data Structures",
    concept: "stacks",
    prompt: "Which removal order describes a stack?",
    choices: [
      "First in, first out",
      "Last in, first out",
      "Smallest value first",
      "Random order",
    ],
    answer: 1,
    explanation: "A stack removes the most recently added item first. That is last in, first out.",
  },
  {
    id: "ds-queue",
    topic: "Data Structures",
    concept: "queues",
    prompt: "Which removal order describes a queue?",
    choices: [
      "Last in, first out",
      "Largest value first",
      "First in, first out",
      "The middle item first",
    ],
    answer: 2,
    explanation: "A queue serves the oldest waiting item first. That is first in, first out.",
  },
  {
    id: "ds-binary",
    topic: "Data Structures",
    concept: "binary search",
    prompt: "What is the time complexity of binary search on a sorted array of n items?",
    choices: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1,
    explanation: "Each comparison discards about half of the remaining items, so the search takes logarithmic time.",
  },
  {
    id: "ds-hash",
    topic: "Data Structures",
    concept: "hash tables",
    prompt: "What is the average-case time for a hash table lookup?",
    choices: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 0,
    explanation: "A good hash function sends a key to a bucket in constant time on average. Collisions can make a single lookup slower.",
  },
  {
    id: "ds-list",
    topic: "Data Structures",
    concept: "linked lists",
    prompt: "Inserting a node at the head of a singly linked list takes how long?",
    choices: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 0,
    explanation: "You only update the new node's next pointer and the list head. You do not walk the rest of the list.",
  },
  {
    id: "ds-bst",
    topic: "Data Structures",
    concept: "binary search trees",
    prompt: "In a binary search tree, where do keys smaller than a node belong?",
    choices: [
      "In the right subtree",
      "In the left subtree",
      "Only in the root",
      "In either subtree",
    ],
    answer: 1,
    explanation: "A binary search tree keeps smaller keys in the left subtree and larger keys in the right subtree.",
  },
  {
    id: "ml-supervised",
    topic: "Machine Learning",
    concept: "supervised learning",
    prompt: "What does supervised learning train on?",
    choices: [
      "Examples with known labels",
      "Only unlabeled raw data",
      "A fixed set of if-statements",
      "Random numbers with no examples",
    ],
    answer: 0,
    explanation: "Supervised learning uses input examples paired with known outputs, such as spam or not spam.",
  },
  {
    id: "ml-overfit",
    topic: "Machine Learning",
    concept: "overfitting",
    prompt: "What is overfitting?",
    choices: [
      "A model that is too simple to learn the training data",
      "A model that memorizes training data and does poorly on new data",
      "A model that always predicts the majority class on purpose",
      "Splitting data into training and test sets",
    ],
    answer: 1,
    explanation: "An overfit model fits noise in the training set. It looks strong in training and weak on unseen examples.",
  },
  {
    id: "ml-split",
    topic: "Machine Learning",
    concept: "train/test split",
    prompt: "Why keep a test set separate from training data?",
    choices: [
      "To estimate how the model does on unseen data",
      "To make training faster by deleting features",
      "To guarantee the model never makes mistakes",
      "To replace the need for labels",
    ],
    answer: 0,
    explanation: "A held-out test set checks generalization. Scoring on data the model already trained on can hide overfitting.",
  },
  {
    id: "ml-metrics",
    topic: "Machine Learning",
    concept: "precision and recall",
    prompt: "A classifier finds most of the true positive cases but also flags many false positives. Which description fits?",
    choices: [
      "High recall and low precision",
      "Low recall and high precision",
      "Perfect precision and perfect recall",
      "No labels were used",
    ],
    answer: 0,
    explanation: "Recall asks how many real positives were found. Precision asks how many predicted positives were correct.",
  },
  {
    id: "ml-gd",
    topic: "Machine Learning",
    concept: "gradient descent",
    prompt: "What does gradient descent do during training?",
    choices: [
      "Updates parameters to reduce the loss",
      "Sorts the training rows alphabetically",
      "Removes every feature except one",
      "Counts the labels and stops",
    ],
    answer: 0,
    explanation: "Gradient descent follows the slope of the loss and steps the parameters toward a lower loss.",
  },
  {
    id: "ml-feature",
    topic: "Machine Learning",
    concept: "features",
    prompt: "In a model that predicts house prices, what is a feature?",
    choices: [
      "An input variable, such as square footage",
      "The prediction error on one house",
      "The algorithm's name",
      "The test-set accuracy",
    ],
    answer: 0,
    explanation: "Features are the input variables the model uses. The price it tries to predict is the label, or target.",
  },
];

const topicView = document.querySelector("#topic-view");
const quizView = document.querySelector("#quiz-view");
const resultsView = document.querySelector("#results-view");
const optionsEl = document.querySelector("#options");
const feedbackEl = document.querySelector("#feedback");
const nextBtn = document.querySelector("#next-btn");
const progressLabel = document.querySelector("#progress-label");
const progress = document.querySelector("#progress");
const progressFill = document.querySelector("#progress-fill");

let activeTopic = "";
let quiz = [];
let index = 0;
let score = 0;
let missed = [];
let answered = false;

document.querySelector(".topic-grid").addEventListener("click", (event) => {
  const card = event.target.closest("[data-topic]");
  if (!card) return;
  startQuiz(card.dataset.topic);
});

nextBtn.addEventListener("click", () => {
  if (index < quiz.length - 1) {
    index += 1;
    renderQuestion();
    return;
  }
  finishQuiz();
});

document.querySelector("#quit-btn").addEventListener("click", showTopics);
document.querySelector("#home-btn").addEventListener("click", showTopics);
document.querySelector("#retry-btn").addEventListener("click", () => {
  startQuiz(activeTopic);
});

function startQuiz(topic) {
  activeTopic = topic;
  quiz = pickQuestions(topic, QUESTIONS_PER_QUIZ);
  index = 0;
  score = 0;
  missed = [];
  show(quizView);
  renderQuestion();
}

function pickQuestions(topic, count) {
  const pool = QUESTIONS.filter((question) => question.topic === topic);
  const copy = pool.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function renderQuestion() {
  const question = quiz[index];
  answered = false;
  const position = index + 1;

  document.querySelector("#quiz-topic").textContent = activeTopic;
  document.querySelector("#question-text").textContent = question.prompt;
  progressLabel.textContent = `Question ${position} of ${quiz.length}`;
  progress.setAttribute("aria-valuenow", String(position));
  progress.setAttribute("aria-valuemax", String(quiz.length));
  progressFill.style.width = `${(position / quiz.length) * 100}%`;

  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.hidden = true;
  nextBtn.textContent = index === quiz.length - 1 ? "See results" : "Next question";

  optionsEl.replaceChildren();
  question.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(choiceIndex));
    optionsEl.appendChild(button);
  });
}

function selectAnswer(choiceIndex) {
  if (answered) return;
  answered = true;

  const question = quiz[index];
  const correct = choiceIndex === question.answer;
  const buttons = optionsEl.querySelectorAll(".option");

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.answer) button.classList.add("correct");
    if (buttonIndex === choiceIndex && !correct) button.classList.add("incorrect");
  });

  if (correct) {
    score += 1;
    feedbackEl.classList.add("correct");
    feedbackEl.textContent = `Correct. ${question.explanation}`;
  } else {
    missed.push(question);
    feedbackEl.classList.add("incorrect");
    feedbackEl.textContent = `Not quite. ${question.explanation}`;
  }

  nextBtn.hidden = false;
  nextBtn.focus();
}

function finishQuiz() {
  const record = {
    topic: activeTopic,
    score,
    total: quiz.length,
    missed: missed.map((question) => question.concept),
    date: new Date().toISOString(),
  };
  saveRecord(record);
  renderResults(record);
  show(resultsView);
}

function renderResults(record) {
  document.querySelector("#results-topic").textContent = record.topic;
  document.querySelector("#score-text").textContent = `${record.score} / ${record.total}`;
  document.querySelector("#recommendation").textContent = recommend(record);

  const missedList = document.querySelector("#missed-list");
  missedList.replaceChildren();
  const concepts = unique(record.missed);
  if (concepts.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No missed concepts this round.";
    missedList.appendChild(item);
  } else {
    concepts.forEach((concept) => {
      const item = document.createElement("li");
      item.textContent = concept;
      missedList.appendChild(item);
    });
  }

  renderHistory(document.querySelector("#results-history"));
}

function recommend(record) {
  const concepts = unique(record.missed);
  if (concepts.length === 0) {
    return `You answered every ${record.topic} question correctly. Retry for a new set, or switch topics to keep the loop going.`;
  }
  const review = concepts.join("; ");
  if (record.score === 0) {
    return `Start with the basics of ${record.topic}. Review ${review}, then retry this topic.`;
  }
  if (concepts.length === 1) {
    return `Review ${concepts[0]} before your next ${record.topic} quiz. That was the only concept you missed.`;
  }
  return `Review these ${record.topic} areas before you retry: ${review}.`;
}

function unique(items) {
  return [...new Set(items)];
}

function showTopics() {
  renderHistory(document.querySelector("#home-history"));
  show(topicView);
}

function show(view) {
  topicView.hidden = view !== topicView;
  quizView.hidden = view !== quizView;
  resultsView.hidden = view !== resultsView;
}

function loadHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveRecord(record) {
  const history = loadHistory();
  history.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 20)));
}

function renderHistory(list) {
  const history = loadHistory();
  list.replaceChildren();
  if (history.length === 0) {
    const item = document.createElement("li");
    item.className = "empty-note";
    item.textContent = "No quizzes yet. Your scores will appear here on this browser.";
    list.appendChild(item);
    return;
  }

  history.forEach((record) => {
    const item = document.createElement("li");
    const when = new Date(record.date).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    item.textContent = `${record.topic} — ${record.score}/${record.total} — ${when}`;
    list.appendChild(item);
  });
}

showTopics();
