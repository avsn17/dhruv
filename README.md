# Dhruv
Trying is the outcome of dreams and possibilities. - I hoped for and manifested in you - Us is the realization of dreams coming together &lt;3



## Structure

```
planning-structure/
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml
├── README.md
├── LICENSE
├── package.json
├── index.html
├── css/
│   ├── styles.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── scroll.js
│   └── utils.js
├── assets/
│   ├── images/
│   ├── fonts/
│   └── svg/
├── docs/
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
└── tests/
    └── index.test.js
```

---


---

## 3. README.md

```markdown
# 💜 Avi & Dhruv: A unwaranted story 

Heartfelt.


## 📁 Project Structure

```
├── index.html          # Main HTML file
├── css/               # Stylesheets
│   ├── styles.css      # Main styles
│   ├── animations.css  # Animation definitions
│   └── responsive.css  # Media queries
├── js/                # JavaScript files
│   ├── main.js        # Main application logic
│   ├── scroll.js      # Scroll event handlers
│   └── utils.js       # Utility functions
└── assets/            # Images, fonts, SVGs
```


Made with 💜 by Avi
```

---

## 4. LICENSE (MIT)

```
MIT License

Copyright (c) 2026 Avi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 5. GitHub Workflow (CI/CD)

### .github/workflows/deploy.yml

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Lint code
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```
