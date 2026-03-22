import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h2>Discover Your <br> <span>Natural Glow</span></h2>
        <p>Premium skincare crafted with nature's best ingredients. <br> Science-backed formulas for every skin type.</p>
        <div class="hero-btns">
          <button class="primary-btn">Shop Collection</button>
          <button class="secondary-btn">Learn More</button>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="circle"></div>
        <div class="glow-box">✨</div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
      padding: 60px 10%;
      border-radius: 20px;
      margin: 20px 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
    }
    .hero-content { flex: 1; z-index: 1; }
    .hero h2 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 1.5rem; color: #1f2937; }
    .hero h2 span { color: #ec4899; }
    .hero p { font-size: 1.1rem; color: #4b5563; margin-bottom: 2rem; }
    
    .hero-btns { display: flex; gap: 1rem; }
    .primary-btn { background: #ec4899; color: white; padding: 12px 30px; border: none; border-radius: 30px; cursor: pointer; font-weight: 600; transition: transform 0.2s, box-shadow 0.2s; }
    .secondary-btn { background: transparent; color: #ec4899; border: 2px solid #ec4899; padding: 10px 30px; border-radius: 30px; cursor: pointer; font-weight: 600; }
    .primary-btn:hover { transform: translateY(-3px); box-shadow: 0 4px 15px rgba(236,72,153,0.3); }

    .hero-decoration { flex: 0.8; position: relative; height: 300px; }
    .circle { width: 300px; height: 300px; background: white; border-radius: 50%; opacity: 0.5; }
    .glow-box { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 8rem; }

    @media (max-width: 768px) {
      .hero { flex-direction: column; text-align: center; }
      .hero h2 { font-size: 2.5rem; }
      .hero-decoration { display: none; }
      .hero-btns { justify-content: center; }
    }
  `]
})
export class HeroComponent {}
