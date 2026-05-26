// Sound utility using Web Audio API
// Sounds play when soundEnabled is true

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

// Magical chime - plays when random result is revealed
export function playMagicChime() {
  playTone(523.25, 0.15, 'sine', 0.2); // C5
  setTimeout(() => playTone(659.25, 0.15, 'sine', 0.2), 80); // E5
  setTimeout(() => playTone(783.99, 0.3, 'sine', 0.15), 160); // G5
}

// Success sound - plays on positive outcome
export function playSuccess() {
  playTone(523.25, 0.1, 'sine', 0.25);
  setTimeout(() => playTone(659.25, 0.1, 'sine', 0.25), 100);
  setTimeout(() => playTone(783.99, 0.15, 'sine', 0.25), 200);
  setTimeout(() => playTone(1046.50, 0.2, 'sine', 0.2), 280);
}

// Click/tap sound - light feedback
export function playClick() {
  playTone(800, 0.05, 'square', 0.1);
}

// Wheel spin sound - longer rumble
export function playWheelSpin() {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(100, ctx.currentTime);

  gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.5);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

  oscillator.frequency.setValueAtTime(100, ctx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(300, ctx.currentTime + 1.5);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 1.5);
}

// Coin flip sound
export function playCoinFlip() {
  playTone(200, 0.1, 'square', 0.15);
  setTimeout(() => playTone(300, 0.15, 'square', 0.15), 150);
}

// Error/warning sound
export function playError() {
  playTone(200, 0.15, 'square', 0.2);
  setTimeout(() => playTone(150, 0.2, 'square', 0.2), 200);
}

// ============ Additional warm paper theme sounds ============

// Mystical enchantment — plays on yes/no oracle reveal
export function playEnchant() {
  playTone(440, 0.1, 'sine', 0.2);
  setTimeout(() => playTone(554.37, 0.1, 'sine', 0.2), 100); // C#5
  setTimeout(() => playTone(659.25, 0.1, 'sine', 0.2), 200); // E5
  setTimeout(() => playTone(880, 0.2, 'sine', 0.15), 300);   // A5
  setTimeout(() => playTone(1108.73, 0.25, 'sine', 0.12), 420); // C#6
  setTimeout(() => playTone(1318.51, 0.3, 'sine', 0.1), 560);    // E6
}

// Gentle reveal — plays on random picker / name picker reveal
export function playReveal() {
  playTone(587.33, 0.12, 'sine', 0.18); // D5
  setTimeout(() => playTone(739.99, 0.12, 'sine', 0.18), 120); // F#5
  setTimeout(() => playTone(987.77, 0.25, 'sine', 0.14), 240);  // B5
  setTimeout(() => playTone(1174.66, 0.2, 'sine', 0.12), 380); // D6
}

// Dramatic fanfare — plays on big reveals (maximizer quiz, d20 roll of 20)
export function playFanfare() {
  playTone(523.25, 0.08, 'sine', 0.25); // C5
  setTimeout(() => playTone(659.25, 0.08, 'sine', 0.25), 80);  // E5
  setTimeout(() => playTone(783.99, 0.08, 'sine', 0.25), 160); // G5
  setTimeout(() => playTone(1046.50, 0.08, 'sine', 0.25), 240); // C6
  setTimeout(() => playTone(783.99, 0.08, 'sine', 0.25), 300);  // G5
  setTimeout(() => playTone(1046.50, 0.15, 'sine', 0.25), 380); // C6
  setTimeout(() => playTone(1318.51, 0.2, 'sine', 0.2), 440);   // E6
  setTimeout(() => playTone(1567.98, 0.3, 'sine', 0.18), 580);  // G6
  setTimeout(() => playTone(2093.00, 0.4, 'sine', 0.15), 750);  // C7
}

// D20 dice roll — short mechanical ratchet
export function playD20Roll() {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(150, ctx.currentTime);

  gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

  oscillator.frequency.setValueAtTime(150, ctx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.8);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.8);
}

// Soft bell ping — minimal feedback
export function playSoftPing() {
  playTone(987.77, 0.15, 'sine', 0.15); // B5
}

// Tie warning — plays on tie/equal outcome
export function playTie() {
  playTone(440, 0.15, 'triangle', 0.2);
  setTimeout(() => playTone(440, 0.15, 'triangle', 0.2), 200);
  setTimeout(() => playTone(349.23, 0.3, 'triangle', 0.15), 400); // F4
}

// Activity unlock — festive two-tone
export function playUnlock() {
  playTone(587.33, 0.1, 'sine', 0.2);   // D5
  setTimeout(() => playTone(880, 0.1, 'sine', 0.2), 100);   // A5
  setTimeout(() => playTone(783.99, 0.15, 'sine', 0.2), 200); // G5
  setTimeout(() => playTone(1174.66, 0.2, 'sine', 0.18), 300); // D6
}

// Outfit reveal — light ascending arpeggio
export function playOutfitReveal() {
  playTone(523.25, 0.08, 'sine', 0.18);
  setTimeout(() => playTone(659.25, 0.08, 'sine', 0.18), 90);
  setTimeout(() => playTone(783.99, 0.08, 'sine', 0.18), 180);
  setTimeout(() => playTone(1046.50, 0.15, 'sine', 0.15), 270);
}

// Screen swap — whoosh sweep
export function playScreenSwap() {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(800, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);

  gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.3);
}

// Rock paper scissors — short competitive sting
export function playRPSSting() {
  playTone(440, 0.08, 'square', 0.15);
  setTimeout(() => playTone(523.25, 0.1, 'square', 0.15), 100);
  setTimeout(() => playTone(330, 0.12, 'square', 0.12), 200);
}

// Chore spinner — medium rumble longer than wheel spin
export function playChoreSpin() {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(100, ctx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(250, ctx.currentTime + 2.5);

  gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.8);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.5);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 2.5);
}