/* ============================================
   Main Application Logic
   ============================================ */

class ErrorPageGenerator {
    constructor() {
        this.isDarkMode = this.loadTheme();
        this.config = this.loadConfig();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updatePreview();
        this.applyTheme();
    }

    setupEventListeners() {
        // Form inputs
        const inputs = document.querySelectorAll('.input, .textarea, .color-picker, .checkbox');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updateConfig();
                this.updatePreview();
            });
            input.addEventListener('input', () => {
                if (input.type === 'color') {
                    this.updateColorValue(input);
                }
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });

        // Viewport switching
        document.querySelectorAll('.viewport-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchViewport(btn.dataset.viewport);
            });
        });

        // Code format switching
        document.querySelectorAll('.code-format-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchCodeFormat(btn.dataset.format);
            });
        });

        // Action buttons
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetToDefaults();
        });

        document.getElementById('copyCodeBtn').addEventListener('click', () => {
            this.copyCode();
        });

        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadHTML();
        });

        document.getElementById('openFullscreen').addEventListener('click', () => {
            this.openFullscreen();
        });
    }

    updateColorValue(input) {
        const valueElement = document.getElementById(input.id + 'Value');
        if (valueElement) {
            valueElement.textContent = input.value.toUpperCase();
        }
    }

    updateConfig() {
        const config = {
            errorCode: document.getElementById('errorCode').value,
            template: document.getElementById('template').value,
            errorTitle: document.getElementById('errorTitle').value,
            errorMessage: document.getElementById('errorMessage').value,
            buttonText: document.getElementById('buttonText').value,
            buttonLink: document.getElementById('buttonLink').value,
            bgColor: document.getElementById('bgColor').value,
            textColor: document.getElementById('textColor').value,
            accentColor: document.getElementById('accentColor').value,
            showNavbar: document.getElementById('showNavbar').checked,
            showFooter: document.getElementById('showFooter').checked,
        };
        
        this.config = config;
        this.saveConfig();
    }

    loadConfig() {
        const saved = localStorage.getItem('errorPageConfig');
        return saved ? JSON.parse(saved) : this.getDefaultConfig();
    }

    saveConfig() {
        localStorage.setItem('errorPageConfig', JSON.stringify(this.config));
    }

    getDefaultConfig() {
        return {
            errorCode: '404',
            template: 'tree',
            errorTitle: 'Page Not Found',
            errorMessage: 'The page you\'re looking for doesn\'t exist or has been moved.',
            buttonText: 'Go Home',
            buttonLink: 'https://example.com',
            bgColor: '#ffffff',
            textColor: '#333333',
            accentColor: '#FF6B6B',
            showNavbar: true,
            showFooter: true,
        };
    }

    resetToDefaults() {
        const defaults = this.getDefaultConfig();
        
        document.getElementById('errorCode').value = defaults.errorCode;
        document.getElementById('template').value = defaults.template;
        document.getElementById('errorTitle').value = defaults.errorTitle;
        document.getElementById('errorMessage').value = defaults.errorMessage;
        document.getElementById('buttonText').value = defaults.buttonText;
        document.getElementById('buttonLink').value = defaults.buttonLink;
        document.getElementById('bgColor').value = defaults.bgColor;
        document.getElementById('textColor').value = defaults.textColor;
        document.getElementById('accentColor').value = defaults.accentColor;
        document.getElementById('showNavbar').checked = defaults.showNavbar;
        document.getElementById('showFooter').checked = defaults.showFooter;

        this.updateColorValues();
        this.updateConfig();
        this.updatePreview();
        this.showToast('Reset to default settings', 'success');
    }

    updateColorValues() {
        ['bgColor', 'textColor', 'accentColor'].forEach(id => {
            const input = document.getElementById(id);
            this.updateColorValue(input);
        });
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tabName + '-tab');
        });

        if (tabName === 'code') {
            this.updateCodeDisplay();
        }
    }

    switchViewport(viewport) {
        document.querySelectorAll('.viewport-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.viewport === viewport);
        });

        const previewFrame = document.getElementById('previewFrame');
        const viewportSizes = {
            desktop: { width: '100%', height: '100%' },
            tablet: { width: '768px', height: '100%' },
            mobile: { width: '375px', height: '100%' },
        };

        const size = viewportSizes[viewport];
        if (previewFrame.style) {
            previewFrame.style.width = size.width;
        }
    }

    switchCodeFormat(format) {
        document.querySelectorAll('.code-format-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.format === format);
        });

        this.currentCodeFormat = format;
        this.updateCodeDisplay();
    }

    updatePreview() {
        const html = this.generatePreviewHTML();
        const previewFrame = document.getElementById('previewFrame');
        previewFrame.innerHTML = '';
        
        const iframe = document.createElement('iframe');
        iframe.srcdoc = html;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        previewFrame.appendChild(iframe);
    }

    generatePreviewHTML() {
        const config = this.config;
        const templateSVG = this.getTemplateSVG();

        const styles = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                html, body {
                    height: 100%;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                body {
                    background-color: ${config.bgColor};
                    color: ${config.textColor};
                    display: flex;
                    flex-direction: column;
                }
                ${config.showNavbar ? this.getNavbarCSS() : ''}
                ${config.showFooter ? this.getFooterCSS() : ''}
                .container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }
                .content {
                    text-align: center;
                    max-width: 600px;
                }
                .error-code {
                    font-size: 5rem;
                    font-weight: 900;
                    color: ${config.accentColor};
                    line-height: 1;
                    margin-bottom: 1rem;
                }
                .error-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: ${config.textColor};
                }
                .error-message {
                    font-size: 1.125rem;
                    margin-bottom: 2rem;
                    opacity: 0.8;
                    line-height: 1.6;
                }
                .template-svg {
                    margin: 2rem 0;
                    max-width: 400px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .btn-home {
                    display: inline-block;
                    padding: 0.75rem 2rem;
                    background-color: ${config.accentColor};
                    color: white;
                    text-decoration: none;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    transition: opacity 0.3s ease;
                }
                .btn-home:hover {
                    opacity: 0.9;
                }
                @media (max-width: 768px) {
                    .error-code { font-size: 3rem; }
                    .error-title { font-size: 1.75rem; }
                    .error-message { font-size: 1rem; }
                }
            </style>
        `;

        const navbar = config.showNavbar ? `
            <nav style="background: ${config.accentColor}; padding: 1rem 2rem; color: white;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <h3 style="font-size: 1.25rem;">My Website</h3>
                </div>
            </nav>
        ` : '';

        const footer = config.showFooter ? `
            <footer style="background: ${config.accentColor}; color: white; padding: 2rem; text-align: center; margin-top: auto;">
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </footer>
        ` : '';

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.errorCode} - ${config.errorTitle}</title>
    ${styles}
</head>
<body>
    ${navbar}
    <div class="container">
        <div class="content">
            <div class="error-code">${config.errorCode}</div>
            <h1 class="error-title">${config.errorTitle}</h1>
            <p class="error-message">${config.errorMessage}</p>
            ${templateSVG ? `<div class="template-svg">${templateSVG}</div>` : ''}
            <a href="${config.buttonLink}" class="btn-home">${config.buttonText}</a>
        </div>
    </div>
    ${footer}
</body>
</html>`;
    }

    getTemplateSVG() {
        const templates = {
            tree: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 L35 40 L50 30 L65 40 L50 25 L40 55 L50 40 L60 55 L50 45 L45 70 L50 55 L55 70 L50 65 L50 100" 
                      stroke="${this.config.accentColor}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="50" cy="105" r="5" fill="${this.config.accentColor}"/>
                </svg>`,
            robot: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="15" width="50" height="50" rx="5" stroke="${this.config.accentColor}" stroke-width="2" fill="none"/>
                <circle cx="35" cy="30" r="5" fill="${this.config.accentColor}"/>
                <circle cx="65" cy="30" r="5" fill="${this.config.accentColor}"/>
                <rect x="40" y="45" width="20" height="10" stroke="${this.config.accentColor}" stroke-width="2" fill="none"/>
                <rect x="20" y="70" width="15" height="25" stroke="${this.config.accentColor}" stroke-width="2" fill="none"/>
                <rect x="65" y="70" width="15" height="25" stroke="${this.config.accentColor}" stroke-width="2" fill="none"/>
                </svg>`,
            galaxy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="30" stroke="${this.config.accentColor}" stroke-width="2" fill="none" opacity="0.3"/>
                <circle cx="50" cy="50" r="20" stroke="${this.config.accentColor}" stroke-width="2" fill="none" opacity="0.5"/>
                <circle cx="50" cy="50" r="10" fill="${this.config.accentColor}"/>
                <circle cx="70" cy="35" r="3" fill="${this.config.accentColor}"/>
                <circle cx="80" cy="50" r="2" fill="${this.config.accentColor}"/>
                <circle cx="30" cy="60" r="2.5" fill="${this.config.accentColor}"/>
                </svg>`,
            '404-text': '',
        };

        return templates[this.config.template] || '';
    }

    getNavbarCSS() {
        return `
            nav {
                width: 100%;
            }
        `;
    }

    getFooterCSS() {
        return `
            footer {
                width: 100%;
            }
        `;
    }

    updateCodeDisplay() {
        const format = this.currentCodeFormat || 'html';
        const code = this.generateCode(format);
        document.getElementById('codeDisplay').textContent = code;
    }

    generateCode(format) {
        const config = this.config;
        
        if (format === 'full') {
            return this.generatePreviewHTML();
        } else if (format === 'css') {
            return this.generateCSS();
        } else {
            return this.generateHTMLCode();
        }
    }

    generateHTMLCode() {
        const config = this.config;
        const templateSVG = this.getTemplateSVG();

        return `<div class="container">
  <div class="content">
    <div class="error-code">${config.errorCode}</div>
    <h1 class="error-title">${config.errorTitle}</h1>
    <p class="error-message">${config.errorMessage}</p>
    ${templateSVG ? `<div class="template-svg">${templateSVG}</div>` : ''}
    <a href="${config.buttonLink}" class="btn-home">${config.buttonText}</a>
  </div>
</div>`;
    }

    generateCSS() {
        const config = this.config;

        return `.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${config.bgColor};
}

.content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-size: 5rem;
  font-weight: 900;
  color: ${config.accentColor};
  line-height: 1;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${config.textColor};
}

.error-message {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.6;
  color: ${config.textColor};
}

.template-svg {
  margin: 2rem 0;
  max-width: 400px;
}

.btn-home {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: ${config.accentColor};
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: opacity 0.3s ease;
}

.btn-home:hover {
  opacity: 0.9;
}`;
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        localStorage.setItem('darkMode', this.isDarkMode);
    }

    loadTheme() {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    }

    applyTheme() {
        const html = document.documentElement;
        const icon = document.querySelector('.theme-toggle i');
        
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    openFullscreen() {
        const html = this.generatePreviewHTML();
        const win = window.open();
        win.document.write(html);
        win.document.close();
    }

    copyCode() {
        const code = document.getElementById('codeDisplay').textContent;
        navigator.clipboard.writeText(code).then(() => {
            this.showToast('Code copied to clipboard!', 'success');
        }).catch(() => {
            this.showToast('Failed to copy code', 'error');
        });
    }

    downloadHTML() {
        const html = this.generatePreviewHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `error-${this.config.errorCode}.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        this.showToast('HTML file downloaded!', 'success');
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ErrorPageGenerator();
});
