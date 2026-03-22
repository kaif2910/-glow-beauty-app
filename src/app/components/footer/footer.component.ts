import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Glow Beauty</h3>
          <p>Your journey to radiant skin begins here. Natural, effective, and beautiful skincare.</p>
          <div class="social-links">
            <span>📸</span> <span>📘</span> <span>🐦</span>
          </div>
        </div>
        <div class="footer-links">
          <h4>Shop</h4>
          <ul>
            <li>Serums</li>
            <li>Moisturizers</li>
            <li>Cleansers</li>
            <li>Masks</li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Support</h4>
          <ul>
            <li>Contact Us</li>
            <li>Shipping Info</li>
            <li>Returns</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div class="footer-newsletter">
          <h4>Join the Glow</h4>
          <p>Subscribe to get skin tips and early access to new launches.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Email address">
            <button>Join</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Glow Beauty App. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: #111827; color: #f9fafb; padding: 60px 5% 20px; margin-top: 60px; }
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 3rem;
      margin-bottom: 40px;
    }
    .footer-brand h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #ec4899; }
    .footer-brand p { color: #9ca3af; line-height: 1.6; }
    .social-links { display: flex; gap: 1rem; font-size: 1.5rem; margin-top: 1rem; }

    .footer-links h4 { margin-bottom: 1.5rem; }
    .footer-links ul { list-style: none; padding: 0; }
    .footer-links li { margin-bottom: 0.75rem; color: #9ca3af; cursor: pointer; transition: color 0.2s; }
    .footer-links li:hover { color: #ec4899; }

    .footer-newsletter h4 { margin-bottom: 1rem; }
    .footer-newsletter p { color: #9ca3af; margin-bottom: 1.5rem; }
    .newsletter-form { display: flex; gap: 0.5rem; }
    .newsletter-form input {
      flex: 1; padding: 10px; border-radius: 8px; border: none; background: #1f2937; color: white;
    }
    .newsletter-form button {
      padding: 10px 20px; background: #ec4899; border: none; border-radius: 8px;
      color: white; font-weight: 600; cursor: pointer;
    }

    .footer-bottom { border-top: 1px solid #1f2937; padding-top: 20px; text-align: center; color: #6b7280; font-size: 0.9rem; }
  `]
})
export class FooterComponent {}
