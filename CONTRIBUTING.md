# Contributing to Kishwar Rengasamy's Portfolio

Thank you for your interest in contributing! This project is a personal portfolio, but suggestions, bug reports, and improvements are always welcome.

---

## 🐛 Reporting Bugs

1. Search [existing issues](https://github.com/KishwarRengasamy/Portfolio/issues) before opening a new one.
2. Use the **Bug Report** template when creating an issue.
3. Include as much detail as possible: steps to reproduce, expected vs. actual behaviour, screenshots.

---

## 💡 Suggesting Features

1. Open a [Feature Request](https://github.com/KishwarRengasamy/Portfolio/issues/new?template=feature_request.yml).
2. Describe the use-case clearly.
3. Explain why it would improve the portfolio.

---

## 🔧 Making Changes

1. **Fork** this repository.
2. Create a branch using the naming convention:
   ```
   feat/short-description
   fix/short-description
   docs/short-description
   ```
3. Commit using [Conventional Commits](https://www.conventionalcommits.org):
   ```
   feat: add animated skills section
   fix: resolve reply-to email issue
   docs: update README installation steps
   style: improve contact section layout
   refactor: extract ContactRow component
   chore: update dependencies
   ```
4. Open a **Pull Request** against `main`.
5. Fill in the PR template completely.

---

## 🛠 Development Setup

```bash
git clone https://github.com/KishwarRengasamy/Portfolio.git
cd Portfolio
npm install
cp .env.example .env   # Fill in your EmailJS credentials
npm run dev
```

---

## ✅ Code Style

- Follow existing patterns — don't introduce new styling methodologies.
- Run `npm run lint` before committing.
- Run `npm run format` to auto-format with Prettier.
- Keep components small and focused — one responsibility per component.
- Add TypeScript types; avoid `any`.

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
