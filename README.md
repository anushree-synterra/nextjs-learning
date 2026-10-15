# Next.js Learning

A simple project for learning Next.js one topic at a time.

📘 **Full guide (what's been done, how it works, what to do next): [PROJECT_GUIDE.md](PROJECT_GUIDE.md)**

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 and click **📚 Topics Covered** in the top-left to open the learning blueprint at `/topics`.

## After learning a topic

In `src/learning/topics.ts`, find the topic and set `done: true`. Then add `learnedOn`, `summary`, `points` and the `code` you used.
It gets a ✓ in the sidebar, its page opens at `/topics/<slug>`, and the next topic unlocks.
