# QuizLoop

QuizLoop is a short study quiz for computer science students. Pick Python, Data Structures, or Machine Learning, answer three questions drawn from that topic, and get a score plus a review recommendation based on the concepts you missed.

Scores stay in this browser through `localStorage`. There is no account, server, or external API.

## Run it locally

From this folder, start a small static server:

```bash
python3 -m http.server 8765
```

Open [http://localhost:8765](http://localhost:8765).

You can also open `index.html` directly in a browser. A local server is the more reliable way to test saved scores.

## How a quiz works

1. Choose a topic. Each topic has six multiple-choice questions.
2. QuizLoop picks three of them at random.
3. After each answer, you see whether it was correct and a one-sentence explanation.
4. The progress label and bar show which question you are on.
5. At the end, your score and a review note are based only on the questions you missed.
6. **Retry this topic** starts a new three-question set. **Choose another topic** returns to the start.
7. Past scores appear on the home screen and on the results screen.

## Files

- `index.html` — page structure
- `style.css` — layout and light theme
- `script.js` — questions, quiz flow, recommendations, and saved scores
