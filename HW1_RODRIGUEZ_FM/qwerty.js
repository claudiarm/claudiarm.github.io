var osc, env, modulator;
var freq=200;
var carrierBaseFreq = 220;
var modMaxFreq = 1000;
var modMinFreq = 0;
var modMaxDepth = 50000;
var modMinDepth = 0;
var dSlider = 0;
var fSlider = 0;
var selTypeCar;
var selTypeMod;
var octave = 0;

var playing = false;

console.log("Hello hello");

function setup(){
    console.log("setup");

    createCanvas(710, 700);
    textSize(15);
    noStroke();

    /*dSlider = createSlider(modMinDepth, modMaxDepth, 0, 20);
    dSlider.position(85, 300);

    fSlider = createSlider(modMinFreq, modMaxFreq, 0, 10);
    fSlider.position(305, 300);*/

    
    //Carrier
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.amp(0);
    osc.freq(freq);
    osc.start();
    
    //Modulator
    modulator = new p5.Oscillator();
    modulator.setType('sine');
    modulator.freq(30);
    modulator.amp(1);
    modulator.start();
    modulator.disconnect();

    osc.freq(modulator);

    env = new p5.Env();
    env.setADSR(0.04, 0.5, 0.1, 0.5);
    env.setRange(1, 0);

    textAlign(CENTER);
    selTypeCar = createSelect();
    selTypeCar.position(197, 200);
    selTypeCar.option('sine');
    selTypeCar.option('triangle');
    selTypeCar.option('square');
    selTypeCar.option('sawtooth');
    selTypeCar.changed(waveCar);

    textAlign(CENTER);
    selTypeMod = createSelect();
    selTypeMod.position(338, 200);
    selTypeMod.option('sine');
    selTypeMod.option('triangle');
    selTypeMod.option('square');
    selTypeMod.option('sawtooth');
    selTypeMod.changed(waveMod);
   
}

function draw(){

    var modDepth = dSlider;
    modulator.amp(modDepth);
    

    var modFreq = fSlider;
    modulator.freq(modFreq);
  
}

function waveCar() {
    var WFCar = selTypeCar.value();
    console.log(WFCar);
    osc.setType(WFCar);
  }
  
function waveMod() {
    var WFMod = selTypeMod.value();
    console.log(WFMod);
    modulator.setType(WFMod);
  }

function keyPressed(){
    
    var freq = 0;
   
    switch(key){
        case "Q":
        freq = midiToFreq(60 + octave);
        break;
        case "2":
        freq = midiToFreq(61 + octave);
        break;
        case "W":
        freq = midiToFreq(62 + octave);
        break;
        case "3":
        freq = midiToFreq(63 + octave);
        break;
        case "E":
        freq = midiToFreq(64 + octave);
        break;
        case "R":
        freq = midiToFreq(65 + octave);
        break;
        case "5":
        freq = midiToFreq(66 + octave);
        break;
        case "T":
        freq = midiToFreq(67 + octave);
        break;
        case "6":
        freq = midiToFreq(68 + octave);
        break;
        case "Y":
        freq = midiToFreq(69 + octave);
        break;
        case "7":
        freq = midiToFreq(70 + octave);
        break;
        case "U":
        freq = midiToFreq(71 + octave);
        break;
        case "I":
        freq = midiToFreq(72 + octave);
        break;
        case "S":
        octave += 12;
        break;
        case "A":
        octave -= 12;
        break;
    }

    osc.freq(freq);
    env.triggerAttack(osc);
   // console.log("Freq " + freq);
}

function keyReleased(){
    osc.amp(0);
    env.triggerRelease(osc);
}




