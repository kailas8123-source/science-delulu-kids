# science.delulu.kids

A playful science learning website for kids, built with React, TypeScript, Vite, GSAP, Tailwind CSS, and React Router.

## What Is Included

- A full scrolling home experience with topic rows, experiments, games, videos, newsletter signup, and achievement progress.
- Clickable top navigation for Home, Topics, Experiments, Games, Videos, About, and Contact.
- Real detail routes for categories, topics, the featured experiment, games, video content, privacy, terms, and contact.
- Test-filled educational copy for science topics, examples, fun facts, and safe experiment steps.
- Responsive desktop and mobile layouts using the included image assets in `public/`.

## Routes

- `/`
- `/topics`
- `/topics/:topicId`
- `/categories/:categoryId`
- `/experiments`
- `/experiments/balloon-rocket`
- `/games/circuit-builder`
- `/games/element-match`
- `/videos/elephant-toothpaste`
- `/about`
- `/privacy`
- `/terms`
- `/contact`

## Run Locally

```bash
npm install
npm run dev
```

The Vite dev server is configured for port `3000`.

## Validate

```bash
npm run lint
npm run build
```

## Notes

The content is prototype-ready and should be reviewed before a public launch, especially privacy, terms, contact information, and experiment safety language.
