# Great Wall Lawyers Static Website

Static website built from `DRAFT Website materials.docx` for GitHub Pages deployment.

## Files

- `index.html` - single-page website content and structure
- `styles.css` - responsive visual design
- `script.js` - mobile navigation and email contact form behavior
- `assets/GWLlogo.png` - Great Wall Lawyers logo

## GitHub Pages Deployment

1. Push this folder to a GitHub repository.
2. In GitHub, open **Settings > Pages**.
3. Select **Deploy from a branch**.
4. Choose the branch, then select the repository root `/`.
5. Save. GitHub will publish the site after the Pages build finishes.

The contact form uses `mailto:info@gwl.nz` by default so it works on a fully static host. To send messages directly from the website without opening the visitor's email app, connect the form to a hosted form service endpoint and place that endpoint in the form `action` attribute in `index.html`.
