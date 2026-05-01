// ============================================
// Error Page Generator - Main Application
// ============================================

(function() {
    'use strict';

    // ========== STATE & CONFIG ==========
    const state = {
        theme: 'modern',
        template: 'warning-badge',
        errorCode: '404',
        animationSpeed: 1,
        buttonStyle: 'solid',
        fontSize: 1,
        borderRadius: 12,
        errorTitle: 'Page Not Found',
        errorMessage: "The page you're looking for doesn't exist or has been moved.",
        buttonText: 'Go Home',
        buttonLink: 'https://example.com',
        bgColor: '#ffffff',
        textColor: '#333333',
        accentColor: '#FF6B6B',
        showNavbar: true,
        showFooter: true,
        viewport: 'desktop'
    };

    const validTemplates = new Set(['warning-badge', 'broken-link', 'server-alert', 'text-only']);
    const legacyTemplateMap = {
        tree: 'warning-badge',
        robot: 'server-alert',
        galaxy: 'broken-link',
        '404-text': 'text-only'
    };

    function normalizeTemplate(template) {
        const mapped = legacyTemplateMap[template] || template;
        return validTemplates.has(mapped) ? mapped : 'warning-badge';
    }

    // Load preferences from localStorage
    function loadPreferences() {
        const saved = localStorage.getItem('epg-preferences');
        if (saved) {
            Object.assign(state, JSON.parse(saved));
            state.template = normalizeTemplate(state.template);
        }
    }

    // Save preferences to localStorage
    function savePreferences() {
        localStorage.setItem('epg-preferences', JSON.stringify(state));
    }

    // ========== DOM ELEMENTS ==========
    const elements = {
        // Inputs
        errorTheme: () => document.getElementById('errorTheme'),
        template: () => document.getElementById('template'),
        errorCode: () => document.getElementById('errorCode'),
        animationSpeed: () => document.getElementById('animationSpeed'),
        buttonStyle: () => document.getElementById('buttonStyle'),
        fontSize: () => document.getElementById('fontSize'),
        borderRadius: () => document.getElementById('borderRadius'),
        errorTitle: () => document.getElementById('errorTitle'),
        errorMessage: () => document.getElementById('errorMessage'),
        buttonText: () => document.getElementById('buttonText'),
        buttonLink: () => document.getElementById('buttonLink'),
        bgColor: () => document.getElementById('bgColor'),
        textColor: () => document.getElementById('textColor'),
        accentColor: () => document.getElementById('accentColor'),
        showNavbar: () => document.getElementById('showNavbar'),
        showFooter: () => document.getElementById('showFooter'),

        // Display
        previewFrame: () => document.getElementById('previewFrame'),
        codeDisplay: () => document.getElementById('codeDisplay'),

        // Buttons
        themeToggle: () => document.getElementById('themeToggle'),
        resetBtn: () => document.getElementById('resetBtn'),
        copyCodeBtn: () => document.getElementById('copyCodeBtn'),
        downloadBtn: () => document.getElementById('downloadBtn'),
        openFullscreen: () => document.getElementById('openFullscreen'),

        // Value displays
        animationSpeedValue: () => document.getElementById('animationSpeedValue'),
        fontSizeValue: () => document.getElementById('fontSizeValue'),
        borderRadiusValue: () => document.getElementById('borderRadiusValue'),
        bgColorValue: () => document.getElementById('bgColorValue'),
        textColorValue: () => document.getElementById('textColorValue'),
        accentColorValue: () => document.getElementById('accentColorValue'),

        // Tabs
        tabBtns: () => document.querySelectorAll('.tab-btn'),
        tabContents: () => document.querySelectorAll('.tab-content'),
        codeFormatBtns: () => document.querySelectorAll('.code-format-btn'),
        viewportBtns: () => document.querySelectorAll('.viewport-btn'),

        // Toast
        toast: () => document.getElementById('toast')
    };

    // ========== THEME MANAGEMENT ==========
    function initTheme() {
        const isDark = localStorage.getItem('epg-theme-dark') === 'true';
        if (isDark) {
            document.documentElement.classList.add('dark');
            updateThemeToggle();
        }
    }

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('epg-theme-dark', isDark);
        updateThemeToggle();
    }

    function updateThemeToggle() {
        const icon = elements.themeToggle().querySelector('i');
        const isDark = document.documentElement.classList.contains('dark');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ========== STATE UPDATES ==========
    function updateState(field, value) {
        if (field === 'template') {
            value = normalizeTemplate(value);
        }
        state[field] = value;
        savePreferences();
        updatePreview();
    }

    function getSpeedLabel(speed) {
        const labels = {
            '0.5': 'Slow',
            '1': 'Normal',
            '1.5': 'Fast',
            '2': 'Very Fast',
            '2.5': 'Ultra Fast',
            '3': 'Instant'
        };
        return labels[speed] || 'Normal';
    }

    function getSizeLabel(size) {
        const parsed = parseFloat(size);
        if (parsed < 0.9) return 'Small';
        if (parsed < 1.05) return 'Normal';
        if (parsed < 1.15) return 'Large';
        return 'Very Large';
    }

    function getBorderLabel(radius) {
        const parsed = parseInt(radius);
        if (parsed === 0) return 'Sharp';
        if (parsed <= 10) return 'Slightly Rounded';
        if (parsed <= 20) return 'Medium';
        if (parsed <= 35) return 'Rounded';
        return 'Very Rounded';
    }

    // ========== PREVIEW GENERATION ==========
    function generateErrorPageHTML() {
        const css = generateErrorPageCSS();
        const { svg, themeLabel, hasTemplateIcon } = generateErrorPageContent();
        const safeCode = escapeHtml(state.errorCode);

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.errorCode} - ${state.errorTitle}</title>
    <style>
${css}
    </style>
</head>
<body class="scene-${state.theme}">
    ${state.showNavbar ? `<nav class="error-navbar">
        <div class="nav-content">
            <div class="brand-badge">${themeLabel}</div>
            <h2>${safeCode} Experience</h2>
            <a href="#" class="nav-link">Support</a>
        </div>
    </nav>` : ''}
    
    <div class="ambient ambient-a"></div>
    <div class="ambient ambient-b"></div>

    <main class="error-container">
        <section class="error-card">
            <div class="error-card-head">
                <span class="status-pill">Status ${safeCode}</span>
                <span class="theme-pill">${themeLabel}</span>
            </div>

            <div class="error-content ${hasTemplateIcon ? '' : 'no-template-icon'}">
                ${hasTemplateIcon ? `<div class="error-visual">${svg}</div>` : ''}
                <h1 class="error-code">${safeCode}</h1>
                <h2 class="error-title">${escapeHtml(state.errorTitle)}</h2>
                <p class="error-message">${escapeHtml(state.errorMessage)}</p>

                <div class="error-actions">
                    <a href="${escapeHtml(state.buttonLink)}" class="error-button primary">${escapeHtml(state.buttonText)}</a>
                    <a href="#" class="error-button ghost" onclick="window.location.reload(); return false;">Refresh</a>
                </div>

                <div class="quick-links">
                    <a href="#" onclick="history.back(); return false;">Go Back</a>
                    <a href="/">Home</a>
                    <a href="#" onclick="window.location.reload(); return false;">Retry</a>
                </div>
            </div>
        </section>
    </main>
    
    ${state.showFooter ? `<footer class="error-footer">
        <p>&copy; 2026 Your Platform. Crafted for clarity and speed.</p>
    </footer>` : ''}
</body>
</html>`;
    }

    function generateErrorPageCSS() {
        const preset = getThemePreset();
        return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: ${state.accentColor};
    --bg-color: ${state.bgColor};
    --text-color: ${state.textColor};
    --muted-color: ${adjustColor(state.textColor, -70)};
    --border-radius: ${state.borderRadius}px;
    --animation-speed: ${1 / state.animationSpeed}s;
    --font-scale: ${state.fontSize};
    --theme-a: ${preset.a};
    --theme-b: ${preset.b};
    --theme-c: ${preset.c};
}

html, body {
    width: 100%;
    height: 100%;
    font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--theme-a) 26%, var(--bg-color)) 0%, var(--bg-color) 40%), radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--theme-b) 20%, var(--bg-color)) 0%, var(--bg-color) 45%);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
}

${state.showNavbar ? `
.error-navbar {
    position: relative;
    z-index: 10;
    padding: 1rem 1.4rem;
    background: linear-gradient(120deg, color-mix(in srgb, var(--theme-a) 75%, #111827), color-mix(in srgb, var(--theme-b) 75%, #111827));
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-content {
    max-width: 1080px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
}

.nav-content h2 {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.04em;
}

.brand-badge {
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.16);
}

.nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 0.9rem;
    opacity: 0.92;
}
` : ''}

.ambient {
    position: fixed;
    border-radius: 999px;
    filter: blur(60px);
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
}

.ambient-a {
    width: 28rem;
    height: 28rem;
    background: color-mix(in srgb, var(--theme-a) 50%, transparent);
    top: -8rem;
    left: -7rem;
}

.ambient-b {
    width: 24rem;
    height: 24rem;
    background: color-mix(in srgb, var(--theme-b) 50%, transparent);
    right: -6rem;
    bottom: -8rem;
}

.error-container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: ${state.showNavbar || state.showFooter ? 'calc(100vh - 140px)' : '100vh'};
    padding: 2rem;
}

.error-card {
    width: 100%;
    max-width: 760px;
    border-radius: calc(var(--border-radius) + 12px);
    border: 1px solid color-mix(in srgb, var(--theme-a) 32%, rgba(255, 255, 255, 0.4));
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.7));
    box-shadow: 0 35px 80px -45px rgba(15, 23, 42, 0.6);
    overflow: hidden;
}

.error-card-head {
    padding: 1rem 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(248, 250, 252, 0.72);
}

.status-pill,
.theme-pill {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.8rem;
    font-size: 0.78rem;
    border-radius: 999px;
    font-weight: 700;
}

.status-pill {
    color: #fff;
    background: linear-gradient(120deg, var(--theme-a), var(--theme-b));
}

.theme-pill {
    color: var(--theme-c);
    background: color-mix(in srgb, var(--theme-b) 22%, white);
}

.error-content {
    text-align: center;
    padding: 2rem 2rem 2.2rem;
    animation: fadeInUp var(--animation-speed) ease-out;
}

.error-content.no-template-icon {
    padding-top: 1.8rem;
}

.error-visual {
    width: 150px;
    height: 150px;
    margin: 0 auto 1rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--theme-a) 32%, white), color-mix(in srgb, var(--theme-b) 18%, transparent));
    border: 1px solid color-mix(in srgb, var(--theme-a) 30%, rgba(255, 255, 255, 0.55));
    box-shadow: 0 22px 38px -28px rgba(15, 23, 42, 0.58);
}

.error-svg {
    width: 114px;
    height: 114px;
    margin: 0;
    animation: float 3s ease-in-out infinite;
}

.error-code {
    font-size: calc(5rem * var(--font-scale));
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1;
    background: linear-gradient(125deg, var(--theme-a), var(--theme-b));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0.2rem 0 0.8rem;
    animation: scaleDown var(--animation-speed) ease-out;
}

.error-title {
    font-size: calc(2.05rem * var(--font-scale));
    margin-bottom: 0.8rem;
    font-weight: 800;
    letter-spacing: -0.02em;
}

.error-message {
    font-size: calc(1rem * var(--font-scale));
    color: var(--muted-color);
    max-width: 58ch;
    margin: 0 auto 1.6rem;
    line-height: 1.75;
}

.error-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 158px;
    padding: 0.85rem 1.4rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-weight: 700;
    transition: all 0.25s ease;
    cursor: pointer;
    border: 1px solid transparent;
}

.error-actions {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;
}

.error-button:hover {
    transform: translateY(-2px);
}

.error-button.primary {
    ${getButtonStyles()}
}

.error-button.ghost {
    color: var(--theme-c);
    border-color: color-mix(in srgb, var(--theme-a) 38%, rgba(148, 163, 184, 0.45));
    background: rgba(255, 255, 255, 0.58);
}

.quick-links {
    margin-top: 1.1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.quick-links a {
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--theme-c);
    opacity: 0.9;
}

${state.showFooter ? `
.error-footer {
    position: relative;
    z-index: 3;
    background: rgba(255, 255, 255, 0.66);
    color: ${adjustColor(state.textColor, -20)};
    text-align: center;
    padding: 1rem;
    border-top: 1px solid rgba(148, 163, 184, 0.35);
    font-size: 0.92rem;
}
` : ''}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(2rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleDown {
    from {
        transform: scale(1.2);
    }
    to {
        transform: scale(1);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-12px);
    }
}

@media (max-width: 768px) {
    .error-container {
        padding: 1rem;
    }

    .error-content {
        padding: 1.4rem 1.1rem 1.6rem;
    }

    .error-visual {
        width: 132px;
        height: 132px;
    }

    .error-svg {
        width: 100px;
        height: 100px;
    }

    .error-card-head {
        padding: 0.8rem;
    }

    .error-code {
        font-size: calc(3.5rem * var(--font-scale));
    }
    
    .error-title {
        font-size: calc(1.5rem * var(--font-scale));
    }
    
    .error-message {
        font-size: calc(0.9rem * var(--font-scale));
    }
    
    .error-button {
        width: 100%;
    }

    .error-actions {
        gap: 0.6rem;
    }

    .nav-content {
        grid-template-columns: 1fr;
        justify-items: start;
        gap: 0.5rem;
    }
}`;
    }

    function getThemePreset() {
        const presets = {
            modern: { a: state.accentColor, b: '#14b8a6', c: '#0f172a' },
            glassmorphism: { a: '#0ea5e9', b: '#8b5cf6', c: '#1e293b' },
            gradient: { a: '#f97316', b: '#db2777', c: '#111827' },
            neon: { a: '#22d3ee', b: '#a3e635', c: '#052e16' },
            'dark-modern': { a: '#60a5fa', b: '#a78bfa', c: '#e2e8f0' },
            elegant: { a: '#0f766e', b: '#a16207', c: '#1f2937' },
            playful: { a: '#fb7185', b: '#38bdf8', c: '#312e81' }
        };

        return presets[state.theme] || presets.modern;
    }

    function generateErrorPageContent() {
        const preset = getThemePreset();
        const svgs = {
            'warning-badge': `<svg class="error-svg" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="icon-grad" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" stop-color="${preset.a}"/><stop offset="100%" stop-color="${preset.b}"/></linearGradient></defs><circle cx="70" cy="70" r="52" fill="none" stroke="url(#icon-grad)" stroke-width="5" opacity="0.9"/><polygon points="70,30 107,96 33,96" fill="url(#icon-grad)" opacity="0.2"/><path d="M70 48v25" stroke="url(#icon-grad)" stroke-width="7" stroke-linecap="round"/><circle cx="70" cy="85" r="4.5" fill="url(#icon-grad)"/></svg>`,
            'broken-link': `<svg class="error-svg" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="icon-grad" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" stop-color="${preset.a}"/><stop offset="100%" stop-color="${preset.b}"/></linearGradient></defs><path d="M45 55a15 15 0 0 1 0-21l10-10a15 15 0 0 1 21 21l-5 5" fill="none" stroke="url(#icon-grad)" stroke-width="8" stroke-linecap="round"/><path d="M95 85a15 15 0 0 1 0 21l-10 10a15 15 0 0 1-21-21l5-5" fill="none" stroke="url(#icon-grad)" stroke-width="8" stroke-linecap="round"/><path d="M56 84 84 56" stroke="url(#icon-grad)" stroke-width="8" stroke-linecap="round"/><path d="M52 52 88 88" stroke="${preset.c}" stroke-width="5" stroke-linecap="round" opacity="0.35"/></svg>`,
            'server-alert': `<svg class="error-svg" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="icon-grad" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" stop-color="${preset.a}"/><stop offset="100%" stop-color="${preset.b}"/></linearGradient></defs><rect x="33" y="28" width="74" height="22" rx="6" fill="none" stroke="url(#icon-grad)" stroke-width="4"/><rect x="33" y="58" width="74" height="22" rx="6" fill="none" stroke="url(#icon-grad)" stroke-width="4"/><rect x="33" y="88" width="74" height="22" rx="6" fill="none" stroke="url(#icon-grad)" stroke-width="4"/><circle cx="48" cy="39" r="3" fill="url(#icon-grad)"/><circle cx="48" cy="69" r="3" fill="url(#icon-grad)"/><circle cx="48" cy="99" r="3" fill="url(#icon-grad)"/><path d="M99 15 114 42H84Z" fill="url(#icon-grad)" opacity="0.24"/><path d="M99 24v9" stroke="url(#icon-grad)" stroke-width="3" stroke-linecap="round"/><circle cx="99" cy="36" r="2" fill="url(#icon-grad)"/></svg>`
        };

        const themeNames = {
            modern: 'Modern',
            glassmorphism: 'Glass',
            gradient: 'Gradient',
            neon: 'Neon',
            'dark-modern': 'Dark',
            elegant: 'Elegant',
            playful: 'Playful'
        };

        const selectedTemplate = normalizeTemplate(state.template);
        return {
            svg: selectedTemplate === 'text-only' ? '' : (svgs[selectedTemplate] || svgs['warning-badge']),
            hasTemplateIcon: selectedTemplate !== 'text-only',
            themeLabel: themeNames[state.theme] || 'Modern'
        };
    }

    function getButtonStyles() {
        const styles = {
            solid: `background: linear-gradient(125deg, var(--theme-a), var(--theme-b));
    color: white;
    box-shadow: 0 16px 26px -18px color-mix(in srgb, var(--theme-a) 60%, black);`,
            gradient: `background: linear-gradient(125deg, var(--theme-a), var(--theme-b), var(--theme-c));
    color: white;
    box-shadow: 0 16px 26px -18px color-mix(in srgb, var(--theme-b) 55%, black);`,
            outline: `background: transparent;
    color: var(--theme-c);
    border-color: color-mix(in srgb, var(--theme-a) 38%, rgba(148, 163, 184, 0.45));`,
            glassmorphism: `background: rgba(255, 255, 255, 0.5);
    color: var(--theme-c);
    border-color: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(10px);`
        };

        return styles[state.buttonStyle] || styles.solid;
    }

    function adjustColor(color, amount) {
        let usePound = false;
        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }
        const num = parseInt(color, 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
        return (usePound ? '#' : '') + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
    }

    // ========== PREVIEW & CODE ==========
    function updatePreview() {
        const html = generateErrorPageHTML();
        
        // Update preview frame
        const frame = elements.previewFrame();
        frame.innerHTML = '';
        
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.sandbox.add('allow-same-origin');
        iframe.sandbox.add('allow-scripts');
        
        frame.appendChild(iframe);
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();

        // Apply viewport styles
        applyViewportStyles(iframe);
        
        // Update code display
        updateCodeDisplay();
    }

    function applyViewportStyles(iframe) {
        let width = '100%';
        let height = 'auto';

        switch(state.viewport) {
            case 'mobile':
                width = '375px';
                height = '667px';
                break;
            case 'tablet':
                width = '768px';
                height = '1024px';
                break;
            default:
                width = '100%';
                height = '600px';
        }

        iframe.style.width = width;
        iframe.style.height = height;
    }

    function updateCodeDisplay() {
        const format = document.querySelector('.code-format-btn.active')?.dataset.format || 'html';
        let code = '';

        if (format === 'html') {
            code = generateErrorPageHTML();
        } else if (format === 'css') {
            code = generateErrorPageCSS();
        } else if (format === 'full') {
            code = generateErrorPageHTML();
        }

        elements.codeDisplay().textContent = code;
        highlightCode();
    }

    function highlightCode() {
        if (window.Prism) {
            Prism.highlightAllUnder(document.getElementById('code-tab'));
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ========== EVENT HANDLERS ==========
    function attachEventListeners() {
        // Input changes
        elements.errorTheme().addEventListener('change', (e) => {
            updateState('theme', e.target.value);
            updatePreview();
        });

        elements.template().addEventListener('change', (e) => {
            updateState('template', normalizeTemplate(e.target.value));
            updatePreview();
        });

        elements.errorCode().addEventListener('change', (e) => {
            updateState('errorCode', e.target.value);
            updatePreview();
        });

        elements.animationSpeed().addEventListener('input', (e) => {
            updateState('animationSpeed', parseFloat(e.target.value));
            elements.animationSpeedValue().textContent = getSpeedLabel(e.target.value);
            updatePreview();
        });

        elements.buttonStyle().addEventListener('change', (e) => {
            updateState('buttonStyle', e.target.value);
            updatePreview();
        });

        elements.fontSize().addEventListener('input', (e) => {
            updateState('fontSize', parseFloat(e.target.value));
            elements.fontSizeValue().textContent = getSizeLabel(e.target.value);
            updatePreview();
        });

        elements.borderRadius().addEventListener('input', (e) => {
            updateState('borderRadius', parseInt(e.target.value));
            elements.borderRadiusValue().textContent = getBorderLabel(e.target.value);
            updatePreview();
        });

        elements.errorTitle().addEventListener('input', (e) => {
            updateState('errorTitle', e.target.value || 'Page Not Found');
            updatePreview();
        });

        elements.errorMessage().addEventListener('input', (e) => {
            updateState('errorMessage', e.target.value || "The page you're looking for doesn't exist or has been moved.");
            updatePreview();
        });

        elements.buttonText().addEventListener('input', (e) => {
            updateState('buttonText', e.target.value || 'Go Home');
            updatePreview();
        });

        elements.buttonLink().addEventListener('input', (e) => {
            updateState('buttonLink', e.target.value || 'https://example.com');
            updatePreview();
        });

        elements.bgColor().addEventListener('input', (e) => {
            updateState('bgColor', e.target.value);
            elements.bgColorValue().textContent = e.target.value.toUpperCase();
            updatePreview();
        });

        elements.textColor().addEventListener('input', (e) => {
            updateState('textColor', e.target.value);
            elements.textColorValue().textContent = e.target.value.toUpperCase();
            updatePreview();
        });

        elements.accentColor().addEventListener('input', (e) => {
            updateState('accentColor', e.target.value);
            elements.accentColorValue().textContent = e.target.value.toUpperCase();
            updatePreview();
        });

        elements.showNavbar().addEventListener('change', (e) => {
            updateState('showNavbar', e.target.checked);
            updatePreview();
        });

        elements.showFooter().addEventListener('change', (e) => {
            updateState('showFooter', e.target.checked);
            updatePreview();
        });

        // Theme toggle
        elements.themeToggle().addEventListener('click', toggleTheme);

        // Reset button
        elements.resetBtn().addEventListener('click', resetToDefaults);

        // Copy code button
        elements.copyCodeBtn().addEventListener('click', copyCodeToClipboard);

        // Download button
        elements.downloadBtn().addEventListener('click', downloadFile);

        // Open fullscreen
        elements.openFullscreen().addEventListener('click', openInNewWindow);

        // Tab switching
        elements.tabBtns().forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                switchTab(tabName);
            });
        });

        // Code format switching
        elements.codeFormatBtns().forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.code-format-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                updateCodeDisplay();
            });
        });

        // Viewport buttons
        elements.viewportBtns().forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                state.viewport = e.currentTarget.dataset.viewport;
                updatePreview();
            });
        });
    }

    function switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        if (tabName === 'code') {
            updateCodeDisplay();
        }
    }

    function resetToDefaults() {
        Object.assign(state, {
            theme: 'modern',
            template: 'warning-badge',
            errorCode: '404',
            animationSpeed: 1,
            buttonStyle: 'solid',
            fontSize: 1,
            borderRadius: 12,
            errorTitle: 'Page Not Found',
            errorMessage: "The page you're looking for doesn't exist or has been moved.",
            buttonText: 'Go Home',
            buttonLink: 'https://example.com',
            bgColor: '#ffffff',
            textColor: '#333333',
            accentColor: '#FF6B6B',
            showNavbar: true,
            showFooter: true
        });

        // Update UI
        elements.errorTheme().value = state.theme;
        elements.template().value = state.template;
        elements.errorCode().value = state.errorCode;
        elements.animationSpeed().value = state.animationSpeed;
        elements.buttonStyle().value = state.buttonStyle;
        elements.fontSize().value = state.fontSize;
        elements.borderRadius().value = state.borderRadius;
        elements.errorTitle().value = state.errorTitle;
        elements.errorMessage().value = state.errorMessage;
        elements.buttonText().value = state.buttonText;
        elements.buttonLink().value = state.buttonLink;
        elements.bgColor().value = state.bgColor;
        elements.textColor().value = state.textColor;
        elements.accentColor().value = state.accentColor;
        elements.showNavbar().checked = state.showNavbar;
        elements.showFooter().checked = state.showFooter;

        elements.animationSpeedValue().textContent = getSpeedLabel(state.animationSpeed);
        elements.fontSizeValue().textContent = getSizeLabel(state.fontSize);
        elements.borderRadiusValue().textContent = getBorderLabel(state.borderRadius);
        elements.bgColorValue().textContent = state.bgColor.toUpperCase();
        elements.textColorValue().textContent = state.textColor.toUpperCase();
        elements.accentColorValue().textContent = state.accentColor.toUpperCase();

        savePreferences();
        updatePreview();
        showNotification('Settings reset to defaults');
    }

    function copyCodeToClipboard() {
        const code = elements.codeDisplay().textContent;
        navigator.clipboard.writeText(code).then(() => {
            showNotification('Code copied to clipboard!');
        }).catch(() => {
            showNotification('Failed to copy code', 'error');
        });
    }

    function downloadFile() {
        const html = generateErrorPageHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `error-${state.errorCode}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('File downloaded!');
    }

    function openInNewWindow() {
        const html = generateErrorPageHTML();
        const newWindow = window.open('', '_blank');
        newWindow.document.write(html);
        newWindow.document.close();
    }

    function showNotification(message, type = 'success') {
        const toast = elements.toast();
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ========== INITIALIZATION ==========
    function init() {
        loadPreferences();
        elements.template().value = state.template;
        initTheme();
        attachEventListeners();
        updatePreview();
        
        // Update display values
        elements.animationSpeedValue().textContent = getSpeedLabel(state.animationSpeed);
        elements.fontSizeValue().textContent = getSizeLabel(state.fontSize);
        elements.borderRadiusValue().textContent = getBorderLabel(state.borderRadius);
        elements.bgColorValue().textContent = state.bgColor.toUpperCase();
        elements.textColorValue().textContent = state.textColor.toUpperCase();
        elements.accentColorValue().textContent = state.accentColor.toUpperCase();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
