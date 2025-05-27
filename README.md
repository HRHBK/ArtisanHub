# ArtisanHub
ArtisanHub is an e-commerce platform that connects Artisans, Craft people, and Makers with customers who appreciate handmade goods. It features an escrow payment system, AI powered image search, and sales tracking, providing a seamless experience for both Artisans and customers.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI (MUI)](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [ESLint](https://eslint.org/) (with recommended React rules)

## Getting Started

Follow these steps to set up the project locally and start contributing:

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo/Frontend/artisan-hub
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and [npm](https://www.npmjs.com/) installed.

```sh
npm install
```

### 3. Start the Development Server

```sh
npm run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 4. Lint the Code

To check for linting errors and maintain code quality:

```sh
npm run lint
```

### 5. Build for Production

```sh
npm run build
```

### 6. Preview the Production Build

```sh
npm run preview
```

## Project Structure

```
artisan-hub/
├── public/           # Static assets (e.g., vite.svg)
├── src/              # Source code
│   ├── assets/       # Images and SVGs (e.g., react.svg)
│   ├── App.jsx       # Main App component
│   ├── main.jsx      # Entry point
│   └── index.css     # Global styles (minimal, mostly handled by MUI)
├── package.json      # Project metadata and scripts
├── vite.config.js    # Vite configuration
└── README.md         # This file
```

## Contribution Guidelines

- **Use Material UI** for all UI components and styling.
- **Do not use external CSS frameworks**; keep styles within MUI or minimal in `index.css`.
- **Use Framer Motion** for animations where needed.
- **Write clear, concise commit messages.**
- **Lint your code** before pushing.
- **Open a pull request** for all changes. Describe your changes clearly.

## Troubleshooting

- If you encounter issues with dependencies, try deleting `node_modules` and `package-lock.json`, then run `npm install` again.
- For issues with Vite, refer to the [Vite documentation](https://vitejs.dev/guide/).

## Useful Links

- [Material UI Documentation](https://mui.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)

---

Happy coding! 🎨🚀
>>>>>>> 6115529 (Beckys commit)
