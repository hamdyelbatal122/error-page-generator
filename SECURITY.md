# Security Policy

## Reporting a Vulnerability

**Please do not open a public issue for security vulnerabilities.**

If you discover a security vulnerability in Error Page Generator, please email us at:
**security@yourdomain.com**

Include the following information:
- Description of the vulnerability
- Steps to reproduce it
- Potential impact
- Your contact information (optional)

We take all security reports seriously and will respond within 24-48 hours.

## Security Best Practices

When using Error Page Generator, keep these practices in mind:

### 1. Input Validation
- Always validate user input on your server
- Don't trust client-side validation alone
- Sanitize content before displaying

### 2. Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'">
```

### 3. Browser Update
- Keep your browser up-to-date
- All modern browsers are supported
- Avoid using deprecated versions

### 4. HTTPS Only
- Always serve error pages over HTTPS
- Never over unencrypted HTTP
- Use modern TLS versions (1.2+)

### 5. LocalStorage Security
- The app uses browser LocalStorage
- Don't store sensitive data in config
- LocalStorage is vulnerable to XSS attacks
- Keep your browser clean of malicious scripts

### 6. Code Review
Before deploying generated code:
- Review the HTML/CSS output
- Check for any injected code
- Test in controlled environment
- Deploy to staging first

## Known Limitations

1. **Client-Side Only**
   - No server-side validation
   - All processing in browser
   - No external API calls

2. **Browser Storage**
   - Config stored in browser LocalStorage
   - Can be cleared by user
   - Not synced across devices

3. **No Authentication**
   - No user accounts
   - No authentication mechanism
   - Anyone can generate pages

## Vulnerability Disclosure Timeline

Once we receive a security report:

1. **Acknowledgment** - Within 24 hours
2. **Investigation** - Assess severity and impact
3. **Fix Development** - Create and test patch
4. **Verification** - Test fix thoroughly
5. **Release** - Deploy security update
6. **Disclosure** - Announce and credit reporter (optional)

## Security Updates

- Check GitHub releases for updates
- Subscribe to release notifications
- Update regularly for security patches
- Test updates in staging environment

## Version Support

| Version | Support Until | Notes |
|---------|---------------|-------|
| 1.0.x   | Current       | Latest version with all features |
| 0.9.x   | 2024-06-30    | Legacy version, limited support |

## Related Security Resources

- [OWASP Web Security](https://owasp.org/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [HTTP Security Headers](https://securityheaders.com/)

## Questions?

For security-related questions:
- Email: security@yourdomain.com
- GitHub: Create private security advisory

---

**Thank you for helping keep Error Page Generator secure!** 🔒
