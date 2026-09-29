# imaadhusoof.com

My personal portfolio site, live at [imaadhusoof.com](https://imaadhusoof.com). It has an overview of me, my projects, my CV and how to get in touch.

## What's on it

- **Home (`index.html`):** an intro and three featured projects. Each project card plays a GIF preview when you hover over it, and a short loading-bar transition plays before you're taken to the project page.
- **Projects (`projects.html`):** every project, and each one has its own page (`project1.html` and so on) with a description, the tech stack, a screenshot carousel, and links to the GitHub repo and the live demo.
- **About (`about.html`):** a bit about me, my technical skills, and a download link for my CV (`cv.pdf`).
- **Contact (`contact.html`):** email, LinkedIn and GitHub links. There's also a photo of the Old Arts building that stays dark until your cursor lights it up like a torch.

The Space Shooter page can also launch the game in your browser. It's a WebAssembly build of my [Space-shooter](https://github.com/imaadhusoof/Space-shooter) pygame project, compiled with pygbag, and it lives in `games/space-shooter/`.

## How it's built

It's plain HTML, CSS and JavaScript, with no framework or build step. Each page has its own stylesheet, with the shared styles in `style.css`, and the whole site uses a dark theme.

The animated background on every page is `constellation.js`, a full-screen canvas of drifting nodes. Nodes that are close together get joined by lines, which fade out the further apart the nodes are, and each node twinkles slightly. Your cursor links up to nearby nodes and pushes them away, and clicking sends out a burst that scatters them. The number of nodes scales with the window size, so it stays about as dense on a phone as on a big monitor.

`animations.js` fades sections in as you scroll to them, using an `IntersectionObserver`. It also adds a style to the nav bar once you scroll down, and hides any project thumbnail that fails to load. The scroll animations are turned off for anyone whose system is set to reduce motion.

`loading.js` handles the loading bar that plays before a project page opens.

## Hosting

The site is hosted on GitHub Pages straight from the `main` branch, and the `CNAME` file points it at the custom domain. To run it locally, open `index.html` in a browser. The in-browser game needs to be served over HTTP, so run `python -m http.server` in the repo folder and go to `localhost:8000`.
