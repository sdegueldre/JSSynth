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

  for(let i = 0; i < 5; i++){
    let newOctave = octave.cloneNode(true);
    synth.appendChild(newOctave);
  }

  let ctx;
  window.addEventListener('mousedown', (e) => {
    if(typeof ctx == 'undefined'){
      ctx = new window.AudioContext();
      let octaves = [...synth.querySelectorAll('.octave')];
      for(let octave of octaves){
        let notes = [...octave.querySelectorAll('.note')];
        for(let note of notes){
          bindSound(ctx, note, octaves.indexOf(octave)+2);
        }
      }
    }
  });
});

function bindSound(ctx, note, freqMult){
  let freq = baseFreqs[note.classList[0]]*2**freqMult;
  let gain = ctx.createGain();
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0, ctx.currentTime);


  let osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.connect(gain);
  osc.start();

  note.playing = false;

  note.play = () => {
    if(!note.playing){
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setTargetAtTime(1, ctx.currentTime, 0.03);
      note.playing = true;
    }
  }

  note.stop = () => {
    if(note.playing){
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.03);
      note.playing = false;
    }
  }

  note.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if(e.buttons & 1)
      note.play();
  });
  note.addEventListener('mouseover', (e) => {
    e.preventDefault();
    if(e.buttons & 1)
      note.play();
  })
  note.addEventListener('mouseup', note.stop);
  note.addEventListener('mouseout', note.stop);
}


/* useless comment for a test */
