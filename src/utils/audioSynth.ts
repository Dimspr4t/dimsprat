/**
 * Web Audio API UI feedback sound generator for DIM$PRAT.
 * Lightweight synthesized clicks and sound cues for tactile UI interactions.
 */

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleGlobalMute(): boolean {
  isAudioMuted = !isAudioMuted;
  return isAudioMuted;
}

export function getIsMuted(): boolean {
  return isAudioMuted;
}

/**
 * Cyber mechanical click for button hover & UI actions
 */
export function playCyberClick(frequency = 880, duration = 0.04) {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silently ignore if audio context isn't allowed yet
  }
}

/**
 * Cyber confirmation chord / sub chime for successful actions
 */
export function playSuccessChime() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Sub base hit
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.35);
    subGain.gain.setValueAtTime(0.2, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.35);

    // High harmonic ping
    const highOsc = ctx.createOscillator();
    const highGain = ctx.createGain();
    highOsc.type = 'sawtooth';
    highOsc.frequency.setValueAtTime(523.25, now + 0.05); // C5
    highOsc.frequency.setValueAtTime(659.25, now + 0.15); // E5
    highGain.gain.setValueAtTime(0.08, now + 0.05);
    highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    highOsc.connect(highGain);
    highGain.connect(ctx.destination);
    highOsc.start(now + 0.05);
    highOsc.stop(now + 0.4);
  } catch {
    // ignore
  }
}
