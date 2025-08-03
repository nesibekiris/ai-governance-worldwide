# Deployment Instructions

## GitHub Pages Deployment

1. **Create a new GitHub repository**
   ```bash
   # Initialize git repository
   git init
   git add .
   git commit -m "Initial commit: Global AI Governance Matrix 2025"
   ```

2. **Push to GitHub**
   ```bash
   # Add your GitHub repository as origin
   git remote add origin [https://github.com/YOUR_USERNAME/ai-governance-matrix.git](https://github.io/nesibekiris/ai-governance-worldwide)
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Click Save

4. **Access your site**
   - Your site will be available at: `(https://github.io/nesibekiris/ai-governance-worldwide)`

## Alternative Deployment Options

### Netlify
1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site will be instantly deployed with a unique URL

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### AWS S3 + CloudFront
1. Create an S3 bucket with static website hosting enabled
2. Upload `index.html` and any assets
3. Configure CloudFront distribution for global CDN

### Traditional Web Hosting
Simply upload `index.html` to any web server via FTP/SFTP

## Custom Domain Setup

### GitHub Pages
1. Add a `CNAME` file with your domain:
   ```
   ai-governance.techletter.co
   ```
2. Configure DNS:
   - A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or CNAME: `nesibekiris.github.io`

### SSL/HTTPS
- GitHub Pages: Automatic with custom domains
- Other platforms: Usually automatic or use Let's Encrypt

## Performance Optimization

1. **Enable compression** (usually automatic on modern platforms)
2. **Set cache headers** for static assets
3. **Use a CDN** for global distribution
4. **Minify HTML/CSS/JS** if needed (optional for this project)

## Monitoring

Consider adding:
- Google Analytics (add tracking code to `index.html`)
- Uptime monitoring (e.g., UptimeRobot)
- Error tracking (e.g., Sentry)

## Updates

To update the content:
1. Edit `index.html` with new data
2. Commit and push changes
3. GitHub Pages will automatically redeploy

## Embedding

To embed the dashboard in other sites:
```html
<iframe src="https://ai-gocernance-techletter/index.html" 
        width="100%" 
        height="800" 
        frameborder="0">
</iframe>
```

## API/Data Export

Consider adding:
- JSON export functionality
- CSV download for the comparison table
- API endpoint for programmatic access

---

Created by [TechLetter.co](https://techletter.co)
