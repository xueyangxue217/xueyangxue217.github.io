// Background music — plays "Sur les quais du vieux Paris" (a slowed 0.79x
// rendition) softly under the site. Loops, low volume, fades in/out. Kept
// behind the same start()/stop() interface the toggle already uses.

const SRC = '/audio/sur-les-quais.mp3';
const TARGET_VOLUME = 0.18; // gentle — sits under the site, never intrusive
const FADE_MS = 1400;

class AmbientPlayer {
  constructor() {
    this.audio = null;
    this.playing = false;
    this._fade = null;
  }

  _build() {
    const a = new Audio(SRC);
    a.loop = true;
    a.preload = 'auto';
    a.volume = 0;
    this.audio = a;
  }

  _fadeTo(target, onDone) {
    clearInterval(this._fade);
    const a = this.audio;
    const start = a.volume;
    const t0 = performance.now();
    this._fade = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / FADE_MS);
      a.volume = start + (target - start) * k;
      if (k >= 1) {
        clearInterval(this._fade);
        this._fade = null;
        onDone && onDone();
      }
    }, 40);
  }

  async start() {
    if (this.playing) return;
    if (!this.audio) this._build();
    this.playing = true;
    try {
      await this.audio.play(); // needs a user gesture; the toggle provides it
      this._fadeTo(TARGET_VOLUME);
    } catch (e) {
      this.playing = false;
    }
  }

  stop() {
    if (!this.playing || !this.audio) return;
    this.playing = false;
    this._fadeTo(0, () => this.audio.pause());
  }
}

const ambient = new AmbientPlayer();
export default ambient;
