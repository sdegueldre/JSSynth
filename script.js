const baseFreqs = {
  C: 16.35,
  C_sharp: 17.32,
  D: 18.35,
  D_sharp: 19.45,
  E: 20.6,
  F: 21.83,
  F_sharp: 23.12,
  G: 24.5,
  G_sharp: 25.96,
  A: 27.5,
  A_sharp: 29.14,
  B: 30.87
};

window.addEventListener('load', () => {

  let octave = document.querySelector('.octave');
  let synth = document.querySelector('.synth');

  for(let i = 0; i < 3; i++){
    let newOctave = octave.cloneNode(true);
    synth.appendChild(newOctave);
  }

  let ctx = new window.AudioContext();
  console.log(synth);
  let octaves = [...synth.querySelectorAll('.octave')];
  console.log(octaves);
  for(let octave of octaves){
    let notes = [...octave.querySelectorAll('.note')];
    console.log(notes);
    for(let note of notes){
      bindSound(ctx, note, octaves.indexOf(octave)+3);
    }
  }
});

function playNote(ctx, freq){
  let osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.connect(ctx.destination);
  osc.start();
  return osc;
}

function bindSound(ctx, note, freqMult){
  let freq = baseFreqs[note.classList[0]]*2**freqMult;
  note.play = () => {
    console.log('playing ' + note.classList[0]);
    note.osc = playNote(ctx, freq);
  }

  note.stop = () => {
    if(note.osc){
      note.osc.stop(ctx.currentTime);
    }
  }
  note.addEventListener('mousedown', note.play);
  note.addEventListener('mouseover', (e) => {
    if(e.buttons & 1)
      note.play();
  })
  note.addEventListener('mouseup', note.stop);
  note.addEventListener('mouseout', note.stop);
}


/* useless comment for a test */
