// ============================================
// Error Page Generator - Main Application
// ============================================

(function() {
    'use strict';

    // ========== STATE & CONFIG ==========
    const state = {
        theme: 'modern',
        template: 'tree',
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

    // Load preferences from localStorage
    function loadPreferences() {
        const saved = localStorage.getItem('epg-preferences');
        if (saved) {
            Object.assign(state, JSON.parse(saved));
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
            document.body.classList.add('dark-mode');
            updateThemeToggle();
        }
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('epg-theme-dark', isDark);
        updateThemeToggle();
    }

    function updateThemeToggle() {
        const icon = elements.themeToggle().querySelector('i');
        const isDark = document.body.classList.contains('dark-mode');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ========== STATE UPDATES ==========
    function updateState(field, value) {
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
        const { html, svg } = generateErrorPageContent();

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
<body>
    ${state.showNavbar ? `<nav class="error-navbar">
        <div class="nav-content">
            <h2>Website</h2>
        </div>
    </nav>` : ''}
    
    <div class="error-container">
        <div class="error-content">
            ${svg}
            <h1 class="error-code">${state.errorCode}</h1>
            <h2 class="error-title">${escapeHtml(state.errorTitle)}</h2>
            <p class="error-message">${escapeHtml(state.errorMessage)}</p>
            <a href="${escapeHtml(state.buttonLink)}" class="error-button">${escapeHtml(state.buttonText)}</a>
        </div>
    </div>
    
    ${state.showFooter ? `<footer class="error-footer">
        <p>&copy; 2024 All rights reserved.</p>
    </footer>` : ''}
</body>
</html>`;
    }

    function generateErrorPageCSS() {
        return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: ${state.accentColor};
    --bg-color: ${state.bgColor};
    --text-color: ${state.textColor};
    --border-radius: ${state.borderRadius}px;
    --animation-speed: ${1 / state.animationSpeed}s;
    --font-scale: ${state.fontSize};
}

html, body {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
}

${state.showNavbar ? `
.error-navbar {
    background: linear-gradient(135deg, var(--primary-color), #4ECDC4);
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-content {
    max-width: 1200px;
    margin: 0 auto;
}

.nav-content h2 {
    font-size: 1.5rem;
}
` : ''}

.error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: ${state.showNavbar || state.showFooter ? '85vh' : '100vh'};
    padding: 2rem;
}

.error-content {
    text-align: center;
    max-width: 600px;
    animation: fadeInUp var(--animation-speed);
}

.error-svg {
    width: 150px;
    height: 150px;
    margin: 0 auto 2rem;
    animation: float var(--animation-speed) 3s ease-in-out infinite;
}

.error-code {
    font-size: calc(4rem * var(--font-scale));
    font-weight: 900;
    background: linear-gradient(135deg, var(--primary-color), #4ECDC4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 1rem 0;
    animation: scaleDown var(--animation-speed) ease-out;
}

.error-title {
    font-size: calc(2rem * var(--font-scale));
    margin-bottom: 1rem;
    font-weight: 600;
}

.error-message {
    font-size: calc(1rem * var(--font-scale));
    color: ${adjustColor(state.textColor, -30)};
    margin-bottom: 2rem;
    line-height: 1.8;
}

.error-button {
    display: inline-block;
    padding: 1rem 2.5rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid var(--primary-color);
    ${getButtonStyles()}
}

.error-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

${state.showFooter ? `
.error-footer {
    background-color: ${adjustColor(state.bgColor, state.bgColor === '#ffffff' ? -10 : 10)};
    color: ${state.textColor};
    text-align: center;
    padding: 2rem;
    border-top: 1px solid ${adjustColor(state.textColor, -80)};
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
        transform: translateY(-20px);
    }
}

@media (max-width: 768px) {
    .error-code {
        font-size: calc(2.5rem * var(--font-scale));
    }
    
    .error-title {
        font-size: calc(1.5rem * var(--font-scale));
    }
    
    .error-message {
        font-size: calc(0.9rem * var(--font-scale));
    }
    
    .error-button {
        padding: 0.75rem 2rem;
    }
}`;
    }

    function generateErrorPageContent() {
        const svgs = {
            tree: '<svg class="error-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="30" r="15" fill="url(#grad)"/><polygon points="50,50 35,70 65,70" fill="url(#grad)"/><polygon points="50,65 30,85 70,85" fill="url(#grad)"/><rect x="45" y="85" width="10" height="15" fill="url(#grad)"/><defs><linearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:' + state.accentColor + ';stop-opacity:1" /><stop offset="100%" style="stop-color:#4ECDC4;stop-opacity:1" /></linearGradient></defs></svg>',
            robot: '<svg class="error-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="20" width="40" height="45" rx="5" fill="none" stroke="url(#grad)" stroke-width="2"/><circle cx="40" cy="35" r="4" fill="url(#grad)"/><circle cx="60" cy="35" r="4" fill="url(#grad)"/><line x1="35" y1="50" x2="55" y2="50" stroke="url(#grad)" stroke-width="2"/><rect x="25" y="65" width="50" height="8" fill="url(#grad)"/><defs><linearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:' + state.accentColor + ';stop-opacity:1" /><stop offset="100%" style="stop-color:#4ECDC4;stop-opacity:1" /></linearGradient></defs></svg>',
            galaxy: '<svg class="error-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="none" stroke="url(#grad)" stroke-width="1" opacity="0.5"/><circle cx="50" cy="50" r="20" fill="none" stroke="url(#grad)" stroke-width="1" opacity="0.7"/><circle cx="50" cy="50" r="10" fill="url(#grad)"/><circle cx="65" cy="35" r="3" fill="url(#grad)"/><circle cx="70" cy="50" r="2" fill="url(#grad)"/><defs><linearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:' + state.accentColor + ';stop-opacity:1" /><stop offset="100%" style="stop-color:#4ECDC4;stop-opacity:1" /></linearGradient></defs></svg>',
            '404-text': ''
        };

        return {
            html: '',
            svg: svgs[state.template] || ''
        };
    }

    function getButtonStyles() {
        const styles = {
            solid: `background: linear-gradient(135deg, var(--primary-color), #4ECDC4);
    color: white;`,
            gradient: `background: linear-gradient(135deg, var(--primary-color), #FF1493);
    color: white;`,
            outline: `background: transparent;
    color: var(--primary-color);`,
            glassmorphism: `background: rgba(255, 255, 255, 0.1);
    color: var(--text-color);
    backdrop-filter: blur(10px);
    border-color: rgba(255, 255, 255, 0.2);`
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
            updateState('template', e.target.value);
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
            template: 'tree',
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
