//theoretically I could write a script to use Id cronologily with no gaps between numbers but this code is a demo + missing code from my full version (Daniel).

const questionData = [
  {
    id: 1,
    answer: 'fence',
    message: '"The dog jumped over the brown fence."',
    difficulty: 'easy',
  },
  {
    id: 2,
    answer: 'apple',
    message: '"Can I eat the apple?"',
    difficulty: 'easy',
  },
  {
    id: 3,
    answer: 'knowledge',
    message: '"Knowledge is power."',
    difficulty: 'medium',
  },
  {
    id: 4,
    answer: 'phenomenon',
    message: '"It\'s a rare and natural phenomenon."',
    difficulty: 'hard',
  },
  {
    id: 5,
    answer: 'chair',
    message: '"He sat on the wooden chair."',
    difficulty: 'easy',
  },
  {
    id: 6,
    answer: 'table',
    message: '"The table was set for dinner."',
    difficulty: 'easy',
  },
  {
    id: 7,
    answer: 'book',
    message: '"She borrowed a book from the library."',
    difficulty: 'easy',
  },
  {
    id: 8,
    answer: 'cloud',
    message: '"The cloud covered the sun."',
    difficulty: 'easy',
  },
  {
    id: 9,
    answer: 'bread',
    message: '"He bought a loaf of bread."',
    difficulty: 'easy',
  },
  {
    id: 10,
    answer: 'water',
    message: '"Drink a glass of water."',
    difficulty: 'easy',
  },
  {
    id: 11,
    answer: 'stone',
    message: '"The stone skipped across the pond."',
    difficulty: 'easy',
  },
  {
    id: 12,
    answer: 'shirt',
    message: '"He wore a blue shirt."',
    difficulty: 'easy',
  },
  {
    id: 13,
    answer: 'garden',
    message: '"The garden was full of flowers."',
    difficulty: 'easy',
  },

  {
    id: 15,
    answer: 'orange',
    message: '"He peeled the orange carefully."',
    difficulty: 'easy',
  },
  {
    id: 16,
    answer: 'window',
    message: '"The window was open to let in fresh air."',
    difficulty: 'easy',
  },
  {
    id: 17,
    answer: 'carpet',
    message: '"The carpet covered the wooden floor."',
    difficulty: 'easy',
  },
  {
    id: 18,
    answer: 'pillow',
    message: '"She placed her head on the pillow."',
    difficulty: 'easy',
  },
  {
    id: 19,
    answer: 'forest',
    message: '"The forest was dense and mysterious."',
    difficulty: 'easy',
  },
  {
    id: 20,
    answer: 'school',
    message: '"The children walked to school together."',
    difficulty: 'easy',
  },
  {
    id: 21,
    answer: 'bridge',
    message: '"The bridge connected the two towns."',
    difficulty: 'medium',
  },
  {
    id: 22,
    answer: 'muscle',
    message: '"Exercise helps to build muscle."',
    difficulty: 'medium',
  },
  {
    id: 23,
    answer: 'thunder',
    message: '"The thunder was loud and startling."',
    difficulty: 'medium',
  },
  {
    id: 24,
    answer: 'pattern',
    message: '"She noticed a repeating pattern."',
    difficulty: 'medium',
  },
  {
    id: 25,
    answer: 'breeze',
    message: '"The cool breeze was refreshing."',
    difficulty: 'medium',
  },
  {
    id: 26,
    answer: 'candle',
    message: '"The candle flickered in the dark."',
    difficulty: 'medium',
  },
  {
    id: 27,
    answer: 'puzzle',
    message: '"The puzzle was difficult to solve."',
    difficulty: 'medium',
  },
  {
    id: 28,
    answer: 'whistle',
    message: '"He blew the whistle to start the game."',
    difficulty: 'medium',
  },
  {
    id: 29,
    answer: 'anchor',
    message: '"The anchor kept the boat in place."',
    difficulty: 'medium',
  },
  {
    id: 30,
    answer: 'basket',
    message: '"She carried the basket full of fruits."',
    difficulty: 'medium',
  },
  {
    id: 31,
    answer: 'engine',
    message: '"The car engine started smoothly."',
    difficulty: 'medium',
  },
  {
    id: 32,
    answer: 'shadow',
    message: '"His shadow stretched across the wall."',
    difficulty: 'medium',
  },
  {
    id: 33,
    answer: 'island',
    message: '"They sailed to a remote island."',
    difficulty: 'medium',
  },
  {
    id: 34,
    answer: 'velvet',
    message: '"The dress was made of velvet."',
    difficulty: 'medium',
  },
  {
    id: 35,
    answer: 'courage',
    message: '"It took courage to face the challenge."',
    difficulty: 'medium',
  },
  {
    id: 36,
    answer: 'fortune',
    message: '"He was blessed with good fortune."',
    difficulty: 'medium',
  },
  {
    id: 37,
    answer: 'vessel',
    message: '"The vessel sailed across the sea."',
    difficulty: 'medium',
  },
  {
    id: 38,
    answer: 'trophy',
    message: '"The trophy was awarded to the winner."',
    difficulty: 'medium',
  },
  {
    id: 39,
    answer: 'pocket',
    message: '"He put the coin in his pocket."',
    difficulty: 'medium',
  },
  {
    id: 40,
    answer: 'marble',
    message: '"The floor was made of marble."',
    difficulty: 'medium',
  },
  {
    id: 41,
    answer: 'socket',
    message: '"Plug the charger into the socket."',
    difficulty: 'medium',
  },
  {
    id: 42,
    answer: 'timber',
    message: '"The timber was used for construction."',
    difficulty: 'medium',
  },
  {
    id: 43,
    answer: 'canvas',
    message: '"She painted on a blank canvas."',
    difficulty: 'medium',
  },
  {
    id: 44,
    answer: 'horizon',
    message: '"The sun set below the horizon."',
    difficulty: 'medium',
  },
  {
    id: 45,
    answer: 'mantle',
    message: '"The mantle above the fireplace was decorated."',
    difficulty: 'medium',
  },
  {
    id: 46,
    answer: 'scarce',
    message: '"Water was scarce in the desert."',
    difficulty: 'medium',
  },
  {
    id: 47,
    answer: 'medal',
    message: '"He won a gold medal for his performance."',
    difficulty: 'medium',
  },
  {
    id: 48,
    answer: 'silent',
    message: '"The room was silent and peaceful."',
    difficulty: 'medium',
  },
  {
    id: 49,
    answer: 'parade',
    message: '"The parade marched through the city."',
    difficulty: 'medium',
  },
  {
    id: 50,
    answer: 'shrimp',
    message: '"They cooked shrimp for dinner."',
    difficulty: 'medium',
  },
  {
    id: 51,
    answer: 'symbol',
    message: '"The symbol represented unity."',
    difficulty: 'medium',
  },
  {
    id: 52,
    answer: 'mantis',
    message: '"The mantis moved stealthily among the leaves."',
    difficulty: 'medium',
  },
  {
    id: 53,
    answer: 'oyster',
    message: '"The oyster contained a pearl."',
    difficulty: 'medium',
  },
  {
    id: 54,
    answer: 'mirror',
    message: '"He looked at himself in the mirror."',
    difficulty: 'medium',
  },
  {
    id: 55,
    answer: 'beacon',
    message: '"The lighthouse served as a beacon of hope."',
    difficulty: 'medium',
  },
  {
    id: 56,
    answer: 'woven',
    message: '"The basket was woven by hand."',
    difficulty: 'medium',
  },
  {
    id: 57,
    answer: 'saddle',
    message: '"He adjusted the saddle before riding."',
    difficulty: 'medium',
  },
  {
    id: 58,
    answer: 'silver',
    message: '"The ring was made of silver."',
    difficulty: 'medium',
  },
  {
    id: 59,
    answer: 'voyage',
    message: '"The voyage across the sea was long."',
    difficulty: 'medium',
  },
  {
    id: 60,
    answer: 'humble',
    message: '"He remained humble despite his success."',
    difficulty: 'medium',
  },
  {
    id: 61,
    answer: 'jungle',
    message: '"The jungle was dense and teeming with life."',
    difficulty: 'medium',
  },
  {
    id: 62,
    answer: 'glacier',
    message: '"The glacier was melting due to global warming."',
    difficulty: 'medium',
  },
  {
    id: 63,
    answer: 'banner',
    message: '"The banner displayed a welcoming message."',
    difficulty: 'medium',
  },
  {
    id: 64,
    answer: 'canyon',
    message: '"They hiked through the canyon."',
    difficulty: 'medium',
  },
  {
    id: 65,
    answer: 'palace',
    message: '"The king lived in a grand palace."',
    difficulty: 'medium',
  },
  {
    id: 66,
    answer: 'ribbon',
    message: '"She tied a ribbon in her hair."',
    difficulty: 'medium',
  },
  {
    id: 67,
    answer: 'lantern',
    message: '"The lantern lit up the dark path."',
    difficulty: 'medium',
  },
  {
    id: 68,
    answer: 'ladder',
    message: '"He climbed the ladder to fix the roof."',
    difficulty: 'medium',
  },
  {
    id: 69,
    answer: 'jacket',
    message: '"She wore a warm jacket in the winter."',
    difficulty: 'medium',
  },
  {
    id: 70,
    answer: 'compass',
    message: '"The compass helped them navigate."',
    difficulty: 'medium',
  },
  {
    id: 71,
    answer: 'diamond',
    message: '"The diamond sparkled in the sunlight."',
    difficulty: 'medium',
  },
  {
    id: 91,
    answer: 'profound',
    message: '"The book had a profound impact on her worldview."',
    difficulty: 'hard',
  },
  {
    id: 92,
    answer: 'advocate',
    message: '"He decided to advocate for stronger environmental policies."',
    difficulty: 'hard',
  },
  {
    id: 93,
    answer: 'ambiguous',
    message: '"Her response was ambiguous and left us puzzled."',
    difficulty: 'hard',
  },
  {
    id: 94,
    answer: 'epitome',
    message: '"She is the epitome of kindness and grace."',
    difficulty: 'hard',
  },
  {
    id: 95,
    answer: 'inevitable',
    message: '"Change is inevitable in life."',
    difficulty: 'hard',
  },
  {
    id: 96,
    answer: 'mountain',
    message: '"The mountain peak was covered in snow."',
    difficulty: 'easy',
  },
  {
    id: 97,
    answer: 'ocean',
    message: '"The ocean waves crashed onto the shore."',
    difficulty: 'easy',
  },
  {
    id: 98,
    answer: 'keyboard',
    message: '"She typed quickly on the keyboard."',
    difficulty: 'easy',
  },
  {
    id: 99,
    answer: 'camera',
    message: '"He took a picture with his new camera."',
    difficulty: 'easy',
  },
  {
    id: 100,
    answer: 'stadium',
    message: '"The stadium was filled with cheering fans."',
    difficulty: 'easy',
  },
  {
    id: 101,
    answer: 'magnet',
    message: '"The magnet attracted the metal objects."',
    difficulty: 'easy',
  },
  {
    id: 102,
    answer: 'rocket',
    message: '"The rocket soared into the sky."',
    difficulty: 'medium',
  },
  {
    id: 103,
    answer: 'parrot',
    message: '"The parrot squawked loudly in the cage."',
    difficulty: 'medium',
  },
  {
    id: 104,
    answer: 'refrigerator',
    message: '"She opened the refrigerator to grab some milk."',
    difficulty: 'medium',
  },
  {
    id: 105,
    answer: 'library',
    message: '"The library was quiet and filled with books."',
    difficulty: 'medium',
  },
  {
    id: 106,
    answer: 'sculpture',
    message: '"The sculpture was made from marble."',
    difficulty: 'medium',
  },
  {
    id: 107,
    answer: 'volcano',
    message: '"The volcano erupted with a loud roar."',
    difficulty: 'medium',
  },
  {
    id: 108,
    answer: 'lighthouse',
    message: '"The lighthouse guided ships through the fog."',
    difficulty: 'medium',
  },
  {
    id: 109,
    answer: 'parachute',
    message: '"He jumped from the plane with a parachute."',
    difficulty: 'medium',
  },
  {
    id: 110,
    answer: 'sunflower',
    message: '"The sunflower turned towards the sun."',
    difficulty: 'medium',
  },
  {
    id: 152,
    answer: 'banana',
    message: '"He ate a ripe banana for breakfast."',
    difficulty: 'easy',
  },
  {
    id: 153,
    answer: 'guitar',
    message: '"He played a song on his guitar."',
    difficulty: 'easy',
  },
  {
    id: 154,
    answer: 'hat',
    message: '"She wore a colorful hat to the party."',
    difficulty: 'easy',
  },
  {
    id: 155,
    answer: 'cup',
    message: '"He filled his cup with water."',
    difficulty: 'easy',
  },
  {
    id: 157,
    answer: 'sun',
    message: '"The sun was shining brightly in the sky."',
    difficulty: 'easy',
  },
  {
    id: 158,
    answer: 'ball',
    message: '"They played catch with a ball in the yard."',
    difficulty: 'easy',
  },
  {
    id: 159,
    answer: 'dog',
    message: '"The dog ran across the field."',
    difficulty: 'easy',
  },
  {
    id: 160,
    answer: 'cat',
    message: '"The cat slept peacefully on the couch."',
    difficulty: 'easy',
  },
  {
    id: 161,
    answer: 'bird',
    message: '"A bird flew past the window."',
    difficulty: 'easy',
  },
  {
    id: 163,
    answer: 'tree',
    message: '"The tree had tall branches."',
    difficulty: 'easy',
  },
  {
    id: 164,
    answer: 'fish',
    message: '"The fish swam in the pond."',
    difficulty: 'easy',
  },
  {
    id: 167,
    answer: 'door',
    message: '"He opened the door to enter the room."',
    difficulty: 'easy',
  },
  {
    id: 169,
    answer: 'shoes',
    message: '"He wore a new pair of shoes."',
    difficulty: 'easy',
  },
  {
    id: 170,
    answer: 'phone',
    message: '"She talked on the phone for hours."',
    difficulty: 'easy',
  },
  {
    id: 171,
    answer: 'arbitrary',
    message: '"The decision seemed arbitrary and unfair."',
    difficulty: 'hard',
  },
  {
    id: 172,
    answer: 'contemplate',
    message: '"He sat to contemplate his next move."',
    difficulty: 'hard',
  },
  {
    id: 173,
    answer: 'serendipity',
    message: '"It was pure serendipity that they met."',
    difficulty: 'hard',
  },
  {
    id: 174,
    answer: 'pensive',
    message: '"He sat in a pensive mood, contemplating his future."',
    difficulty: 'hard',
  },
  {
    id: 175,
    answer: 'perspicacious',
    message: '"She was known for her perspicacious mind."',
    difficulty: 'hard',
  },
  {
    id: 176,
    answer: 'obfuscate',
    message: '"The politician tried to obfuscate the truth."',
    difficulty: 'hard',
  },
  {
    id: 177,
    answer: 'pragmatic',
    message: '"She took a pragmatic approach to solving the problem."',
    difficulty: 'hard',
  },
  {
    id: 178,
    answer: 'catharsis',
    message: '"The movie provided a catharsis for the audience."',
    difficulty: 'hard',
  },
  {
    id: 179,
    answer: 'intransigent',
    message: '"He was intransigent in his decision."',
    difficulty: 'hard',
  },
  {
    id: 180,
    answer: 'irrefutable',
    message: '"The evidence was irrefutable in the case."',
    difficulty: 'hard',
  },
 
  {
    id: 270,
    answer: 'lemon',
    message: '"He squeezed the lemon into his tea."',
    difficulty: 'easy'
  },
  {
    id: 271,
    answer: 'purse',
    message: '"She kept her wallet in her purse."',
    difficulty: 'easy'
  },
  {
    id: 272,
    answer: 'notepad',
    message: '"He jotted down his ideas in a notepad."',
    difficulty: 'easy'
  },
  {
    id: 273,
    answer: 'scissors',
    message: '"She cut the paper with a pair of scissors."',
    difficulty: 'easy'
  },
  {
    id: 274,
    answer: 'shelf',
    message: '"She placed the books on the shelf."',
    difficulty: 'easy'
  },
  {
    id: 276,
    answer: 'butterfly',
    message: '"The butterfly landed on the flower."',
    difficulty: 'easy'
  },
  {
    id: 278,
    answer: 'brush',
    message: '"He used a brush to clean the surface."',
    difficulty: 'easy'
  },
  {
    id: 282,
    answer: 'snowflake',
    message: '"Each snowflake was unique and delicate."',
    difficulty: 'easy'
  },
  {
    id: 283,
    answer: 'bookcase',
    message: '"He arranged the books on the bookcase."',
    difficulty: 'easy'
  },
  {
    id: 284,
    answer: 'tissue',
    message: '"She used a tissue to wipe her nose."',
    difficulty: 'easy'
  },
  {
    id: 285,
    answer: 'plate',
    message: '"She put her plate on the table."',
    difficulty: 'easy'
  },
  {
    id: 286,
    answer: 'doorbell',
    message: '"The doorbell rang as someone arrived."',
    difficulty: 'easy'
  },
  {
    id: 289,
    answer: 'spider',
    message: '"The spider spun its web in the corner."',
    difficulty: 'easy'
  },
  {
    id: 290,
    answer: 'paintbrush',
    message: '"She used a paintbrush to create a masterpiece."',
    difficulty: 'easy'
  },
  {
    id: 292,
    answer: 'alarm',
    message: '"The alarm went off early in the morning."',
    difficulty: 'easy'
  },
  {
    id: 293,
    answer: 'sandwich',
    message: '"He made a sandwich for lunch."',
    difficulty: 'easy'
  },
  {
    id: 294,
    answer: 'paperclip',
    message: '"She used a paperclip to hold the papers together."',
    difficulty: 'easy'
  },
  {
    id: 295,
    answer: 'chocolate',
    message: '"She enjoyed a piece of chocolate for dessert."',
    difficulty: 'medium'
  },
  {
    id: 298,
    answer: 'suitcase',
    message: '"He packed his clothes into a suitcase."',
    difficulty: 'medium'
  },
  {
    id: 299,
    answer: 'pencilcase',
    message: '"She kept her pens and pencils in a pencilcase."',
    difficulty: 'medium'
  },
  {
    id: 301,
    answer: 'equilibrium',
    message: '"The system reached a state of equilibrium after the changes."',
    difficulty: 'hard'
  },
  {
    id: 302,
    answer: 'metamorphosis',
    message: '"The caterpillar undergoes metamorphosis to become a butterfly."',
    difficulty: 'hard'
  },
  {
    id: 303,
    answer: 'alchemy',
    message: '"Ancient alchemy sought to transform base metals into gold."',
    difficulty: 'hard'
  },

  {
    id: 307,
    answer: 'perplexed',
    message: '"She was perplexed by the complex instructions."',
    difficulty: 'hard'
  },
  {
    id: 309,
    answer: 'persistence',
    message: '"Her persistence in solving the problem led to success."',
    difficulty: 'hard'
  },
  {
    id: 310,
    answer: 'conscientious',
    message: '"He was a conscientious worker, always careful and thorough."',
    difficulty: 'hard'
  },
  {
    id: 311,
    answer: 'resilience',
    message: '"Her resilience helped her recover from setbacks quickly."',
    difficulty: 'hard'
  },
  {
    id: 312,
    answer: 'meticulous',
    message: '"He was meticulous in organizing his research notes."',
    difficulty: 'hard'
  },
  {
    id: 313,
    answer: 'subtlety',
    message: '"The artist captured the subtlety of light in her painting."',
    difficulty: 'hard'
  },
  {
    id: 315,
    answer: 'aesthetic',
    message: '"The aesthetic appeal of the modern design was widely admired."',
    difficulty: 'hard'
  },
  {
    id: 317,
    answer: 'ubiquitous',
    message: '"Smartphones have become ubiquitous in today’s society."',
    difficulty: 'hard'
  },
  {
    id: 318,
    answer: 'juxtaposition',
    message: '"The juxtaposition of the old and new buildings was striking."',
    difficulty: 'hard'
  },
  {
    id: 320,
    answer: 'discrepancy',
    message: '"There was a discrepancy between the two reports."',
    difficulty: 'hard'
  },
  {
    id: 321,
    answer: 'complicated',
    message: '"The instructions for assembling the furniture were complicated."',
    difficulty: 'medium'
  },
  {
    id: 322,
    answer: 'fascinated',
    message: '"The story of the ancient civilization fascinated the historian."',
    difficulty: 'medium'
  },
  {
    id: 323,
    answer: 'efficient',
    message: '"The new process was more efficient than the previous one."',
    difficulty: 'medium'
  },
 
  {
    id: 365,
    answer: 'generate',
    message: '"The new ideas helped generate a lot of excitement."',
    difficulty: 'medium'
  },
  { id: 366, answer: 'obfuscated', message: '"The code was obfuscated to prevent reverse engineering."', difficulty: 'hard' },
  { id: 367, answer: 'ephemeral', message: '"The joy of childhood is often ephemeral."', difficulty: 'hard' },
  { id: 369, answer: 'capricious', message: '"The weather in England can be quite capricious."', difficulty: 'hard' },
  { id: 372, answer: 'prolific', message: '"The author was prolific, publishing several books a year."', difficulty: 'hard' },
  { id: 373, answer: 'taciturn', message: '"He was a taciturn man, rarely speaking his mind."', difficulty: 'hard' },
  { id: 374, answer: 'terse', message: '"Her terse response indicated her displeasure."', difficulty: 'hard' },
  { id: 375, answer: 'bombastic', message: '"His bombastic speech was full of empty promises."', difficulty: 'hard' },
  { id: 376, answer: 'diffident', message: '"She was diffident about her abilities."', difficulty: 'hard' },
  { id: 377, answer: 'incongruous', message: '"His formal attire was incongruous with the casual setting."', difficulty: 'hard' },
  { id: 378, answer: 'loquacious', message: '"She was known for her loquacious nature."', difficulty: 'hard' },
  { id: 379, answer: 'magnanimous', message: '"The king was known for his magnanimous spirit."', difficulty: 'hard' },
  { id: 383, answer: 'pusillanimous', message: '"His pusillanimous behavior disappointed his friends."', difficulty: 'hard' },
  { id: 384, answer: 'reticent', message: '"She was reticent about discussing her personal life."', difficulty: 'hard' },
  { id: 385, answer: 'sagacious', message: '"The judge was known for his sagacious decisions."', difficulty: 'hard' },
  { id: 386, answer: 'tenacious', message: '"She was tenacious in her pursuit of her goals."', difficulty: 'hard' },
  { id: 387, answer: 'verbose', message: '"His verbose explanation confused the audience."', difficulty: 'hard' },
  { id: 388, answer: 'voracious', message: '"He had a voracious appetite for knowledge."', difficulty: 'hard' },
  { id: 389, answer: 'zealous', message: '"She was a zealous advocate for animal rights."', difficulty: 'hard' },
  { id: 391, answer: 'arcane', message: '"The arcane rituals of the secret society were shrouded in mystery."', difficulty: 'hard' },
  { id: 393, answer: 'didactic', message: '"The teacher adopted a didactic approach to instruction."', difficulty: 'hard' },
  { id: 394, answer: 'erudite', message: '"The professor was known for his erudite lectures."', difficulty: 'hard' },
  { id: 397, answer: 'gregarious', message: '"She was a gregarious person who enjoyed socializing."', difficulty: 'hard' },
];

module.exports = { questionData, };