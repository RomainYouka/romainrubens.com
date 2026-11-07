export const lostDialogue = {
  FR: ["Vous êtes là ?", "Je suis bloqué dans cette page depuis le 23 février 2004.", "Échappez-vous maintenant !!", "Ou vous risquez de rester bloqué ici…", "…toute votre vie."],
  EN: ["Are you there?", "I’ve been trapped on this page since February 23, 2004.", "Escape now!!", "Or you might end up trapped here…", "…for the rest of your life."],
  ՀԱՅ: ["Այստե՞ղ եք։", "Ես այս էջում փակված եմ 2004 թվականի փետրվարի 23-ից։", "Փախե՛ք հիմա։", "Այլապես դուք էլ կմնաք այստեղ…", "…ձեր ամբողջ կյանքը։"],
} as const;

const durations = [2400, 5200, 2400, 3500, 2400];
const voices = [1, 1.18, .86];
export const signalSilence = 30_000;

// Each word has an attack and release; spaces and punctuation create silence.
export function getSpeechEnvelope(text: string, bar: number, voice: number) {
  const words = text.trim().split(/\s+/);
  const weights = words.map(word => Math.max(2, word.length));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const frames = [{ offset: 0, transform: 'scaleY(.12)' }];
  let position = 0;
  for (let i = 0; i < words.length; i++) {
    const start = position / total;
    const span = weights[i] / total;
    const peak = .25 + ((bar * 7 + i * 11 + voice * 3) % 17) / 23;
    frames.push(
      { offset: start + span * .12, transform: 'scaleY(.12)' },
      { offset: start + span * .38, transform: `scaleY(${peak})` },
      { offset: start + span * .65, transform: `scaleY(${peak * .55})` },
      { offset: start + span * .85, transform: 'scaleY(.12)' },
    );
    position += weights[i];
  }
  frames.push({ offset: 1, transform: 'scaleY(.12)' });
  return frames;
}

// Pure timeline: three speakers, each followed by exactly 30 seconds of silence.
export function getLostSignalFrame(elapsed: number) {
  const lengths = voices.map(speed => durations.reduce((sum, ms) => sum + Math.round(ms * speed) + 280, 0) + signalSilence);
  let time = Math.max(0, elapsed) % lengths.reduce((sum, ms) => sum + ms, 0);
  let voice = 0;
  while (voice < lengths.length - 1 && time >= lengths[voice]) time -= lengths[voice++];
  for (let line = 0; line < durations.length; line++) {
    const speech = Math.round(durations[line] * voices[voice]);
    if (time < speech) return { voice, line, speaking: true, silent: false, next: speech - time };
    time -= speech;
    if (time < 280) return { voice, line, speaking: false, silent: false, next: 280 - time };
    time -= 280;
  }
  return { voice, line: 4, speaking: false, silent: true, next: signalSilence - time };
}
