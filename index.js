/*
Belittle Streamer()
{person} + {discriptor} + {animal}

Posative()
{Made up word} + {randomCountOf!}

Personal Question()
{question start} + {action} + {noun} + {?}
Have you ever taken pills?

Topical Question()
{questionStart}+{descriptor}+{contentCreatorJob}+{action}+{descriptor}+{contentCreatorJob}+{noun}
What do you think about that bald influencer stealing the pretty streamer's content
*/

const synth = window.speechSynthesis;
let activated = false;

let chatWindow = document.getElementById("chatWindow");
let currentSentence = "";
let count = 0;
let listOfKeys = [];
let startButton = document.getElementById("start");


function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//INSULT ARRAYS
let comparators = [
  "looks like",
  "sounds like",
  "sounding like",
  "feels like",
  "makes me think of",
  "is",
  "reminds me of",
  "resembles",
  "evokes",
  "brings to mind",
  "is similar to",
  "is akin to",
  "is reminiscent of",
  "parallels",
  "mirrors",
  "echoes",
  "matches",
  "corresponds to",
  "approximates",
  "smells like",
  "tastes like",
  "vibes like",
  "gives the impression of",
  "is comparable to",
  "is in the vein of",
  "is in the style of",
  "is along the lines of",
  "is in the same category as",
  "is a lot like",
  "is almost like",
  "is practically",
  "could be",
  "might as well be",
  "is indistinguishable from",
  "is a dead ringer for",
  "is the spitting image of",
  "is a carbon copy of",
  "is a clone of",
  "is a twin of",
  "is a cousin of",
  "is a sibling to",
  "is a distant relative of",
  "is cut from the same cloth as",
  "is cast in the same mold as",
  "is a reflection of",
  "is a shadow of",
  "is a variation of",
  "is a twist on",
  "is a riff on",
  "is a nod to",
  "is an homage to",
  "is inspired by",
  "is derivative of",
  "is modeled after",
  "is patterned after",
  "is based on",
  "is built like",
  "functions like",
  "operates like",
  "behaves like",
  "mimics",
  "imitates",
  "copies",
  "follows the lead of",
  "takes after"];
let enhancers = [
  "fucking", "really", "very", "for real", ", and I'm not even joking,", "on god", "some sort of",
  "absolutely", "totally", "seriously", "no cap", ", swear to god,", "legit", "kind of",
  "hella", "proper", "genuinely", "fr fr", ", no lies,", "deadass", "sort of"
];
let shapeDescriptor = [
  "angular", "arched", "asymmetrical", "bent", "blocky", "blobby",
  "boxy", "broad", "bulbous", "bulky", "chunky", "compact",
  "conical", "contoured", "crooked", "curved", "cylindrical", "fat",
  "flat", "flattened", "full", "geometric", "hollow", "jagged",
  "lanky", "lean", "narrow", "oblong", "oval", "pointed",
  "protruding", "rectangular", "round", "rounded", "sculpted",
  "skinny", "slim", "slender", "solid", "spherical", "spiked",
  "straight", "tapered", "thick", "thin", "triangular", "twisted",
  "wide", "wiry"
];
let ageDescriptor = ["aged", "ancient", "antique", "archaic", "contemporary", "frayed", "fresh", "grizzled", "immature", "juvenile", "mature", "obsolete", "old", "primordial", "ragged", "raw", "senile", "shabby", "stale", "tattered", "threadbare", "trite", "vintage", "worn"];
let negativeDescriptor = [
  "ugly", "stupid", "foolish", "pathetic", "cringe", "lame", "goofy",
  "cowardly", "weak-willed", "ignorant", "incompetent", "clueless",
  "worthless", "hopeless", "disgusting", "repulsive", "vile", "wretched",
  "ridiculous", "absurd", "nonsensical", "pointless", "useless", "inferior",
  "mediocre", "pitiful", "deplorable", "contemptible", "despicable",
  "loathsome", "abhorrent", "revolting", "offensive", "vulgar", "crass",
  "tasteless", "graceless", "awkward", "clumsy", "inept", "bungling",
  "inferior", "subpar", "unimpressive", "forgettable", "irritating",
  "annoying", "obnoxious", "insufferable", "unbearable", "tedious",
  "dull", "boring", "unoriginal", "derivative", "predictable", "trite",
  "overrated", "exaggerated", "pretentious", "arrogant", "smug",
  "selfish", "narcissistic", "egotistical", "conceited", "vain",
  "shallow", "superficial", "petty", "immature", "childish",
  "irresponsible", "unreliable", "flaky", "inconsistent", "untrustworthy",
  "deceitful", "manipulative", "toxic", "damaging", "harmful"
];
let closeTarget = [
  "homie", "this guy", "my streamer", "this dude", "little bro",
  "gamer", "this individual", "bro", "this freak", "our guy",
  "buddy", "chief", "playa", "this legend", "my guy",
  "captain", "sport", "this champion", "big guy", "this hero",
  "pal", "this genius", "this master", "dawg", "this wizard",
  "this star", "king", "this prodigy", "this soul", "this creature"
];
let animals = [
  "Alligator",
  "Ant",
  "Anteater",
  "Ape",
  "Armadillo",
  "Donkey",
  "Baboon",
  "Badger",
  "Bat",
  "Bear",
  "Beaver",
  "Bee",
  "Bison",
  "Boar",
  "Buffalo",
  "Butterfly",
  "Camel",
  "Capybara",
  "Cat",
  "Caterpillar",
  "Cheetah",
  "Chicken",
  "Chimpanzee",
  "Clam",
  "Cobra",
  "Cockroach",
  "Cod",
  "Coyote",
  "Crab",
  "Crane",
  "Crocodile",
  "Crow",
  "Deer",
  "Dinosaur",
  "Dog",
  "Dolphin",
  "Dove",
  "Dragonfly",
  "Duck",
  "Eagle",
  "Eel",
  "Elephant",
  "Elk",
  "Emu",
  "Falcon",
  "Ferret",
  "Finch",
  "Fish",
  "Flamingo",
  "Fox",
  "Frog",
  "Gerbil",
  "Giraffe",
  "Gnat",
  "Goat",
  "Goldfish",
  "Goose",
  "Gorilla",
  "Grasshopper",
  "Hamster",
  "Hare",
  "Hawk",
  "Hedgehog",
  "Hippopotamus",
  "Hornet",
  "Horse",
  "Human",
  "Hummingbird",
  "Hyena",
  "Jay",
  "Jellyfish",
  "Kangaroo",
  "Lobster",
  "Locust",
  "Manatee",
  "Mantis",
  "Mole",
  "Mongoose",
  "Monkey",
  "Moose",
  "Mosquito",
  "Mouse",
  "Mule",
  "Newt",
  "Octopus",
  "Ostrich",
  "Otter",
  "Owl",
  "Oyster",
  "Parrot",
  "Partridge",
  "Pelican",
  "Penguin",
  "Pig",
  "Pigeon",
  "Pony",
  "Porcupine",
  "Rabbit",
  "Raccoon",
  "Rat",
  "Salmon",
  "Sardine",
  "Seahorse",
  "Seal",
  "Shark",
  "Sheep",
  "Shrew",
  "Skunk",
  "Snail",
  "Snake",
  "Sparrow",
  "Spider",
  "Squid",
  "Squirrel",
  "Starling",
  "Stingray",
  "Stinkbug",
  "Swallow",
  "Swan",
  "Termite",
  "Toad",
  "Trout",
  "Turkey",
  "Turtle",
  "Vulture",
  "Wallaby",
  "Walrus",
  "Wasp",
  "Weasel",
  "Whale",
  "Woodcock",
  "Woodpecker",
  "Worm",
  "Yak",
  "Zebra"
];
//INSULT ARRAYS

//USERNAME ARRAYS
let job = ["Waiter", "Paramedic", "Dentist", "Train conductor", "Nurse", "Electrician", "Doctor", "Businessman", "American football player", "Student", "Surgeon", "Doorman", "Secretary", "Soldier", "Repairman", "Scientist", "Reporter", "ConstructionWorker", "Professor", "Police officer", "Postman", "Photographer", "Pilot", "Catholic nun", "Painter", "Mechanic", "Magician", "Lifeguard", "LunchroomSupervisor", "Clown", "Housekeeper", "Gardener", "Geisha", "Footballer", "Forest ranger", "Builder", "Foreman", "Farmer", "Flight attendant", "Fireman", "Engineer", "Carpenter", "Architect", "Boxer", "Cameraman", "Detective", "Journalist", "Housewife", "Diver", "Pope", "Priest", "Salesman", "Librarian", "Pirate", "Singer"];
let title = ["Mr", "Mrs", "Miss", "Ms", "Mx", "Dr", "Admiral", "Ambassador", "Baron", "Baroness", "Brigadier", "Brother", "Canon", "Capt", "Chief", "Col", "Commander", "Consul", "General", "Count", "Countess", "Cpl", "Dame", "Deputy", "Drs", "Duchess", "Duke", "Earl", "Father", "General", "Judge", "Justice", "Lady", "Lord", "Lt", "Madam", "Madame", "Major", "Marquis", "Minister", "Mme", "Dr", "Mrs", "Mr", "Prince", "Princess", "Professor", "Prof", "Pvt", "Rabbi", "Admiral", "Senator", "Sgt", "Sheriff", "SirLady", "Sister", "Leader", "Earl", "Viscount"];
let bodyParts = ["balls", "penis", "teeth", "clit", "nipple", "toe", "ankle", "arch", "arm", "armpit", "beard", "breast", "calf", "cheek", "chest", "chin", "earlobe", "elbow", "eyebrow", "eyelash", "eyelid", "face", "finger", "forearm", "forehead", "gum", "heel", "hip", "index finger", "jaw", "knee", "knuckle", "leg", "lip", "mouth", "mustache"];
let positiveAspect = [
  "lover",
  "enjoyer",
  "helper",
  "fan",
  "supporter",
  "enthusiast",
  "advocate",
  "admirer",
  "champion",
  "believer",
  "optimist",
  "ally",
  "inspiration",
  "motivator",
  "encourager",
  "uplifter",
  "celebrator",
  "peacemaker",
  "caregiver",
  "nurturer"
];
//USERNAME ARRAYS

//QUESTION ARRAYS
let gameQuestion = [
  "hey are you going to try",
  "have you played",
  "are you a fan of",
  "i think you would like",
  "a lot of people are saying to play",
  "why don't you play",
  "have you heard about",
  "what do you think about",
  "would you be interested in playing",
  "have you considered trying",
  "do you know about",
  "you should check out",
  "I highly recommend playing",
  "have you had a chance to play",
  "are you excited to try",
  "what's your opinion on",
  "would you like to play",
  "have you seen the gameplay for",
  "are you planning to play",
  "you might enjoy playing"
];
let games = ["valorant", "GTA", "League of legends", "Balder's Gate 3", "Fortnite", "Minecraft", "EldenRing", "Mario 64", "Apex Legends", "Dark and darker", "Overwatch", "Dota", "World of warcraft", "Counter-Strike 2", "Apex Legends", "PUBG: Battlegrounds", "Call of Duty: Warzone",
  "The Witcher 3: Wild Hunt", "Red Dead Redemption 2", "Among Us", "Rocket League",
  "Fall Guys", "Roblox", "The Legend of Zelda: Breath of the Wild", "Super Smash Bros. Ultimate",
  "Animal Crossing: New Horizons", "Cyberpunk 2077", "Hades", "Stardew Valley", "Terraria",
  "Destiny 2", "Rainbow Six Siege", "Path of Exile", "Diablo IV", "Halo Infinite",
  "God of War (2018)", "The Last of Us Part I", "Spider-Man (2018)", "Ghost of Tsushima",
  "Final Fantasy XIV", "Genshin Impact", "Clash Royale", "Clash of Clans", "Candy Crush Saga",
  "Tetris Effect", "Super Mario Odyssey", "The Elder Scrolls V: Skyrim", "StarCraft II",
  "Half-Life: Alyx", "Left 4 Dead 2", "Team Fortress 2", "Palworld"
];
//QUESTION ARRAYS

let excited = [
  "can I have mod?",
  "why did I get banned?",
  "GYYYYAAAAAT",
  "Back that up on my face",
  "I need her",
  "why can't I look like that",
  "let's fucking go",
  "I'm pogging",
  "I cant stop cumming",
  "this is hype",
  "lets go",
  "another W",
  "AWOOGA",
  "my eyes are popping out of my skull",
  "POGCHAMP",
  "KEKW",
  "MONKAW",
  "LUL",
  "CLAP",
  "OMEGALUL",
  "POGGERS",
  "SHEEEESH",
  "BUSSIN",
  "NO CAP",
  "FR FR",
  "RATIO",
  "DAMN BOI HE THICC",
  "I'M WEAK",
  "I CAN'T BREATHE",
  "CHAT IS MOVING TOO FAST",
  "STREAMER IS CRACKED",
  "BIG PLAYS",
  "WHAT WAS THAT?!",
  "I'M DEAD",
  "F IN THE CHAT",
  "GG EZ",
  "CLUTCH",
  "THROWING",
  "DIFF",
  "COPIUM",
  "HOPIUM",
  "MALDING",
  "POV: YOU’RE DOWN BAD",
  "I’M SIMPING",
  "FREE HIM",
  "JUST A PRANK BRO",
  "YOOOO",
  "LET HIM COOK",
  "IT’S LIT",
  "GOATED",
  "TAKE MY MONEY",
  "I’M SCREAMING",
  "THIS IS PEAK",
  "I’M DECEASED",
  "CHAT IS WILDIN’",
  "STREAMER DIED",
  "RESPECT++",
  "ACTUAL GOD",
  "UNINSTALL",
  "TOO EZ",
  "I’M CRYING",
  "SUS",
  "AMOGUS",
  "DING DING DING",
  "BRO WHAT",
  "I CAN’T EVEN",
  "THIS IS ILLEGAL",
  "BANNED",
  "MODS???",
  "ADMIN ABUSE",
  "I’M LEAVING",
  "UNHOLY",
  "CURSED",
  "BLESSED",
  "I’M SHAKING",
  "I’VE ASCENDED",
  "THIS IS ART",
  "PACK WATCH",
  "RIP BOZO",
  "L + RATIO",
  "SKILL ISSUE",
  "TOUCH GRASS",
  "GO OUTSIDE",
  "BASED",
  "CRINGE"];

function captilizeFirstLetter(word) {
  let firstLetter = word.charAt(0);
  let firstLetterCap = firstLetter.toUpperCase();
  let remainingLetters = word.slice(1);
  let capitalizedWord = firstLetterCap + remainingLetters;
  return capitalizedWord;
}

function createUsername() {
  let username = "";
  if (rand(0, 100) > 50) {
    username += captilizeFirstLetter(title[rand(0, title.length - 1)]);
  }
  if (rand(0, 100) > 70) {
    username += captilizeFirstLetter(job[rand(0, job.length - 1)]);
  }
  if (rand(0, 100) > 40) {
    username += captilizeFirstLetter(animals[rand(0, animals.length - 1)]);
  }
  if (rand(0, 100) > 60) {
    username += captilizeFirstLetter(bodyParts[rand(0, bodyParts.length - 1)]);
  }
  if (rand(0, 100) > 55) {
    username += captilizeFirstLetter(positiveAspect[rand(0, positiveAspect.length - 1)]);
  }
  if (username == "") {
    username = "anonymous";
  }
  return username;
}


function belittleStreamer() {
  let combinedString = "";
  combinedString += closeTarget[rand(0, closeTarget.length - 1)];
  combinedString += " ";
  combinedString += comparators[rand(0, comparators.length - 1)];
  combinedString += " a ";
  combinedString += enhancers[rand(0, enhancers.length - 1)];
  combinedString += " ";
  let descriptorSelector = rand(0, 2);
  if (descriptorSelector == 0) {
    combinedString += shapeDescriptor[rand(0, shapeDescriptor.length - 1)];
  } else if (descriptorSelector == 1) {
    combinedString += ageDescriptor[rand(0, ageDescriptor.length - 1)];
  } else {
    combinedString += negativeDescriptor[rand(0, negativeDescriptor.length - 1)];
  }
  combinedString += " ";
  combinedString += animals[rand(0, animals.length - 1)].toLowerCase();
  return combinedString;
}

function askStreamerGameQuestion() {
  let question = "";
  question += gameQuestion[rand(0, gameQuestion.length - 1)];
  question += " ";
  question += games[rand(0, games.length - 1)];
  question += "?";
  return question;
}

function saySomethingExciting() {
  return excited[rand(0, excited.length - 1)];
}

function createMessage() {
  let soundMessage = "";
  let textMessage = "";
  let username = createUsername();
  soundMessage += username + " says ";
  let message = selectMessage();
  soundMessage += message;
  textMessage += username;
  textMessage += ": ";
  textMessage += message;
  let textBox = constructTextBox(textMessage);
  textToVoice(soundMessage);
  addTextToScreen(textBox);
  currentSentence = textMessage;
  animateKeyboard();
}

function selectMessage() {
  let selector = rand(0, 2);
  let selectedMessage = "";
  if (selector == 0) {
    selectedMessage = belittleStreamer();
  } else if (selector == 1) {
    selectedMessage = askStreamerGameQuestion();
  } else if (selector == 2) {
    selectedMessage = saySomethingExciting();
  }
  return selectedMessage;
}



function constructTextBox(message) {
  let textBoxContainer = document.createElement("div");
  textBoxContainer.classList.add("textBoxContainer");

  let profilePicture = document.createElement("div");
  profilePicture.classList.add("profilePicture");

  let textBox = document.createElement("div");
  textBox.classList.add("textBox");
  textBox.innerHTML = message;

  let textCenter = document.createElement("div");
  textCenter.classList.add("textCenter");

  textBoxContainer.appendChild(profilePicture);
  textCenter.appendChild(textBox);
  textBoxContainer.appendChild(textCenter);

  textBoxContainer.addEventListener("animationend", () => {
    textBoxContainer.remove();
  });

  setTimeout(() => {
    textBoxContainer.classList.add("fadeOut");
  }, 5000);

  return textBoxContainer;
}

function addTextToScreen(textContainer) {
  chatWindow.appendChild(textContainer);
}

function textToVoice(message) {
  var utterance = new SpeechSynthesisUtterance(message);

  // Dynamic speed: longer = faster (with limits)
  var wordCount = message.split(' ').length;
  utterance.rate = Math.min(2.0, 1 + (wordCount * 0.02)); // Caps at 2.0x speed
  utterance.pitch = 0.1 + Math.random() * 1; // 0.5 to 1.5

  // Random voice
  var allVoices = speechSynthesis.getVoices();
  var englishVoices = allVoices.filter(voice =>
    voice.lang.startsWith('en')
  );

  // Random English voice
  if (englishVoices.length > 0) {
    var randomVoiceIndex = Math.floor(Math.random() * englishVoices.length);
    utterance.voice = englishVoices[randomVoiceIndex];
  }

  synth.speak(utterance);
}


startButton.addEventListener("click", () => {
  if (activated == false) {
    activated = true;
    loop();
  }
});
startButton.addEventListener("mousedown", () => {
  startButton.style.boxShadow = "0px 0px 0px 3px #646669 inset";
  startButton.style.background = "#2c2e31";
});
startButton.addEventListener("mouseup", () => {
  startButton.style.boxShadow = "none";
  startButton.style.background = "#dbb941";
});

function populateKeyboard() {
  typingWindow = document.getElementById("typingWindow");
  for (let j = 0; j < 2; j++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let i = 0; i < 6; i++) {
      let key = document.createElement("div");
      key.classList.add("key");
      row.appendChild(key);
      listOfKeys.push(key);
    }
    typingWindow.appendChild(row);
  }

}
function animateKeyboard() {
  let keySelector = rand(0, listOfKeys.length - 1);
  listOfKeys[keySelector].style.background = "#dbb941";
  setTimeout(() => {
    listOfKeys[keySelector].style.background = "#646669";
  }, 200);
  if (count < currentSentence.length) {
    setTimeout(() => {
      count++;
      animateKeyboard();
    }, rand(0, 100));
  } else {
    count = 0;
  }
}
populateKeyboard();

let messageSpeed = 5000;
function loop() {
  createMessage();
  setTimeout(() => {
    loop()
  }, rand(messageSpeed, messageSpeed * 3));
}

// Connect the slider to the message_speed variable
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

// Update the message_speed when slider changes
speedSlider.addEventListener('input', function () {
  messageSpeed = parseInt(this.value);
  speedValue.textContent = this.value / 1000;
});

// Initialize the display
speedValue.textContent = messageSpeed / 1000;
speedSlider.value = messageSpeed;