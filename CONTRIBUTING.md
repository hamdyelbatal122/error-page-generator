# Contributing to Error Page Generator

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the Error Page Generator project.

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors. We pledge to:

- Be respectful of differing opinions, viewpoints, and experiences
- Welcome contributors of all levels and backgrounds
- Focus on what is best for the community
- Show empathy towards other community members

### Our Standards
Examples of behavior that contributes to a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing opinions
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior include:

- Harassment of any kind
- Unwelcome sexual attention
- Deliberate intimidation
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites
- Basic knowledge of HTML, CSS, and JavaScript
- A text editor or IDE (VS Code recommended)
- Git and GitHub account

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/error-page-generator.git
   cd error-page-generator
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Edit files as needed
   - Test thoroughly in your browser

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add meaningful commit message"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Submit a Pull Request**
   - Go to GitHub and click "New Pull Request"
   - Provide a clear description of your changes

## Types of Contributions

### 🐛 Bug Reports
Report bugs by opening an issue. Include:

- **Title:** Clear, descriptive title
- **Description:** What happened and what you expected
- **Steps to Reproduce:** How to recreate the issue
- **Screenshots:** If applicable, include images
- **Browser/OS:** Your environment details

Example:
```
Title: Dark mode toggle not working on mobile

Description:
When clicking the theme toggle button on mobile devices, the dark mode doesn't activate.

Steps to Reproduce:
1. Open app on mobile (e.g., iPhone)
2. Click the moon icon in header
3. Dark mode doesn't apply

Expected:
Dark mode should activate and apply to the interface.

Actual:
Nothing happens, interface remains in light mode.
```

### ✨ Feature Requests
Suggest improvements by opening an issue with tag `enhancement`:

- **Title:** Clear feature description
- **Use Case:** Why this feature is needed
- **Proposed Solution:** Your idea for implementation
- **Alternatives:** Other approaches you considered

Example:
```
Title: Add custom animation effects to error pages

Use Case:
Users want to add animated transitions and effects to make error pages more engaging.

Proposed Solution:
Add an "Animations" tab in the configuration panel with options like:
- Fade-in animation
- Bounce effect
- Slide transitions

This would help users create more dynamic error pages.
```

### 🎨 UI/UX Improvements
- Redesign interface elements
- Improve accessibility
- Enhance mobile responsiveness
- Optimize user experience

### 📝 Documentation
- Improve README
- Add usage examples
- Write tutorials
- Fix typos
- Add code comments

### 🔧 Code Improvements
- Refactor existing code
- Improve performance
- Add error handling
- Optimize algorithms

### 🧪 Testing
- Test edge cases
- Browser compatibility testing
- Mobile device testing
- Report issues found

## Development Guidelines

### Code Style

#### HTML
```html
<!-- Use semantic HTML5 elements -->
<header>
  <h1>Title</h1>
</header>

<!-- Use meaningful class names -->
<div class="error-container">
  <p class="error-message">Error occurred</p>
</div>

<!-- Proper indentation (2 spaces) -->
<div class="container">
  <button class="btn">Click me</button>
</div>
```

#### CSS
```css
/* Use BEM naming convention */
.component { }
.component__element { }
.component--modifier { }

/* Use CSS variables for theming */
:root {
    --primary-color: #FF6B6B;
    --spacing-unit: 1rem;
}

/* Group related properties */
.element {
    /* Display & Layout */
    display: flex;
    align-items: center;
    
    /* Typography */
    font-size: 1rem;
    font-weight: 600;
    
    /* Spacing */
    padding: 1rem;
    margin: 0;
    
    /* Visual */
    background-color: var(--primary-color);
    border-radius: 0.5rem;
    
    /* Transitions */
    transition: all 0.3s ease;
}
```

#### JavaScript
```javascript
// Use meaningful variable names
const errorPageConfig = {
    title: 'Page Not Found',
    statusCode: 404
};

// Use const by default, let if reassignment needed
const MAX_LENGTH = 100;
let currentIndex = 0;

// Use arrow functions
const updatePreview = () => {
    // Implementation
};

// Add JSDoc comments for functions
/**
 * Generate HTML for error page
 * @param {Object} config - Configuration object
 * @returns {string} HTML markup
 */
const generateHTML = (config) => {
    // Implementation
};

// Use modern JavaScript features
const { title, code } = config;
const items = data.map(item => item.name);
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (no logic change)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Build process, dependencies, etc.

**Examples:**
```bash
git commit -m "feat(preview): add viewport size selector"
git commit -m "fix(dark-mode): resolve color transition issues"
git commit -m "docs: update installation guide"
git commit -m "refactor(app): simplify event listener setup"
```

### Testing Requirements

Before submitting a PR, test:

1. **Browser Compatibility**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

2. **Responsive Testing**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

3. **Functionality**
   - All form inputs work
   - Preview updates in real-time
   - Code export functions properly
   - Dark mode toggles correctly
   - Download functionality works

4. **Performance**
   - No console errors
   - Reasonable load time
   - Smooth interactions

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Test your changes**
   - Manual testing in browser
   - No breaking changes
   - Documentation updated

3. **Keep commits clean**
   - Squash related commits
   - Clear, descriptive messages

### PR Description Template

```markdown
## Description
Brief explanation of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing Done
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots
If applicable, add screenshots showing the change.

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tested on multiple browsers
```

### Review Process

1. **Automated Checks**
   - Code style validation
   - Syntax checking

2. **Code Review**
   - A maintainer reviews your code
   - May request changes
   - Discussion in comments

3. **Approval & Merge**
   - Once approved, your PR is merged
   - You'll receive credit in release notes

## Reporting Issues

### Security Issues
**Do not** open a public issue for security vulnerabilities. Email: security@yourdomain.com

### Regular Issues
Use GitHub Issues with appropriate labels:

- `bug` - Something isn't working
- `enhancement` - Feature request
- `documentation` - Docs improvement
- `good first issue` - Good for newcomers
- `help wanted` - Seeking assistance
- `question` - Question about usage

## Community

### Communication Channels
- **GitHub Issues:** Bug reports and feature requests
- **Discussions:** General questions and discussions
- **Email:** contact@yourdomain.com

### Getting Help
- Ask in Issues/Discussions
- Check existing discussions
- Look at documentation
- Review code comments

## Recognition

We recognize and appreciate all contributions! Contributors are acknowledged:

- In README.md contributors section
- In release notes
- On GitHub contributors page
- In monthly newsletter (if applicable)

## Additional Resources

- [GitHub Guides](https://guides.github.com/)
- [How to Write Clean Code](https://www.freecodecamp.org/)
- [Web Development Best Practices](https://developer.mozilla.org/en-US/docs/Web)
- [Semantic HTML](https://www.w3schools.com/html/html5_semantic_elements.asp)

## Questions?

Feel free to ask! We're here to help:

- **GitHub Issues:** Ask in issue discussion
- **Email:** contact@yourdomain.com
- **Twitter:** [@yourhandle](https://twitter.com/yourhandle)

---

**Thank you for contributing to Error Page Generator!** 🎉

Your efforts help make this project better for everyone.
