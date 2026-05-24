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