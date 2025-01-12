const strings: Record<number, string[]> = {
  1: ["Full points!", "Wow!", "Top marks!", "JURASSIC PARK!"],
  2: ["Great work!", "Excellent", "Nice!", "Back of the net!"],
  3: ["Good effort", "Not bad at all", "'A' for effort"],
  4: ["...not great", "Room for improvement", "you tried"],
  5: ["Did you fall asleep??", "*facepalm*"],
};

const randomFromRange = (key: number) => {
  const options = strings[key];
  const int = Math.floor(Math.random() * options.length)
  console.log(int)
  return options[Math.floor(Math.random() * options.length)];
} 

export const resultResponse = (numerator:number, denominator:number) => {
  const percentage = (numerator / denominator) * 100;
  let key = -1;

  if(percentage === 100){ // 100%
    key = 1;
  } else if(percentage > 80 && percentage < 100){ // 80 - 99
    key = 2;
  } else if (percentage > 49){ // 50 - 79
    key = 3
  } else if (percentage > 19){ // 20 - 49
    key = 4
  } else {
    key = 5 // < 20
  }

  console.log(percentage)
  console.log('key: ', key)
  const value = randomFromRange(key);
  return value
}