// Science Content for science.delulu.kids
// Kid-friendly science content covering Physics, Chemistry, Biology, Earth Science, and Space Science

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  color: string;
  whatIsIt: string;
  howItWorks: string[];
  realLifeExamples: string[];
  funFacts: string[];
  experimentTitle?: string;
  experimentSteps?: string[];
  voiceNarration: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  topics: Topic[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export const categories: Category[] = [
  {
    id: "physics",
    name: "PHYSICS",
    color: "#C9FF6B",
    bgColor: "#F0FFE0",
    topics: [
      {
        id: "electricity",
        title: "Electricity",
        subtitle: "Power up your knowledge!",
        description: "Electricity is the energy that makes lights glow and fans spin!",
        image: "/topic_electricity.jpg",
        category: "physics",
        color: "#C9FF6B",
        whatIsIt: "Electricity is a type of energy that can flow through wires. It powers everything from your tablet to the lights in your home! Think of it like invisible energy that travels super fast through special paths called circuits.",
        howItWorks: [
          "Electricity starts at a power source (like a battery or power plant)",
          "It travels through wires like water flowing through pipes",
          "When it reaches a device (like a light bulb), the energy does work",
          "The electricity flows back to complete the circuit",
          "Switches can open or close the path to turn things on and off!"
        ],
        realLifeExamples: [
          "Lightning during a thunderstorm is natural electricity!",
          "Your phone charger brings electricity to your device",
          "Static electricity makes your hair stick up on a dry day",
          "Electric eels can create their own electricity to protect themselves!"
        ],
        funFacts: [
          "Lightning is 5 times hotter than the surface of the Sun!",
          "Electricity travels at nearly the speed of light — 186,000 miles per second!",
          "A single bolt of lightning has enough energy to toast 100,000 slices of bread!",
          "Your brain uses electricity to send messages to your body!"
        ],
        experimentTitle: "Static Electricity Butterfly",
        experimentSteps: [
          "Cut a butterfly shape from tissue paper",
          "Rub a balloon against your hair fast for 10 seconds",
          "Hold the balloon near the butterfly — watch it dance!",
          "The static electricity from the balloon attracts the light paper"
        ],
        voiceNarration: "Electricity is amazing! It's the energy that makes lights glow, phones charge, and games load. Imagine tiny particles called electrons zooming through wires at super speed. That's electricity in action!"
      },
      {
        id: "sound",
        title: "Sound",
        subtitle: "Hear how waves work!",
        description: "Sound is vibration that travels through the air to your ears!",
        image: "/topic_sound.jpg",
        category: "physics",
        color: "#C9FF6B",
        whatIsIt: "Sound is a type of energy made by vibrations. When something vibrates (moves back and forth really fast), it creates sound waves that travel through the air to your ears. That's how you hear music, birds singing, and your friends laughing!",
        howItWorks: [
          "Something vibrates — like a guitar string or your vocal cords",
          "The vibration pushes air molecules together (compression)",
          "Then the air molecules spread apart (rarefaction)",
          "These compressions and rarefactions travel as a sound wave",
          "Your ear catches the wave and your brain understands it as sound!"
        ],
        realLifeExamples: [
          "When you pluck a guitar string, it vibrates and makes music!",
          "Thunder is the sound of lightning heating the air super fast",
          "Bats use sound waves called echolocation to find their way in the dark",
          "Doctors use sound waves to see babies inside their mom's tummy!"
        ],
        funFacts: [
          "Sound cannot travel in space because there's no air!",
          "The loudest animal on Earth is the blue whale — its calls can be heard 500 miles away!",
          "Some sounds are too high for humans to hear — dogs can hear much higher sounds than us!",
          "Sound travels about 4 times faster through water than through air!"
        ],
        experimentTitle: "Water Xylophone",
        experimentSteps: [
          "Fill 4 glasses with different amounts of water",
          "Tap each glass gently with a spoon",
          "Listen — each glass makes a different sound!",
          "More water = lower sound, Less water = higher sound"
        ],
        voiceNarration: "Sound is all around us! When something shakes or vibrates, it sends invisible waves through the air. These waves reach your ears and your brain turns them into the sounds you recognize. From birds chirping to music playing — it's all sound waves!"
      },
      {
        id: "magnets",
        title: "Magnets",
        subtitle: "Attract some answers!",
        description: "Magnets pull certain metals toward them with invisible force!",
        image: "/topic_magnets.jpg",
        category: "physics",
        color: "#C9FF6B",
        whatIsIt: "Magnets are special objects that can pull certain metals toward them without even touching them! They have an invisible force field called a magnetic field that stretches out around them. Every magnet has two ends: a North pole and a South pole.",
        howItWorks: [
          "Every magnet has two poles: North and South",
          "Opposite poles attract — North and South pull toward each other",
          "Same poles repel — North and North push away from each other",
          "Magnets create an invisible force field around them",
          "This field can pass through some materials like paper and glass!"
        ],
        realLifeExamples: [
          "Your refrigerator door stays closed because of magnets!",
          "Compasses use Earth's magnetic field to point North",
          "MRI machines use super powerful magnets to take pictures inside your body",
          "Some trains called Maglev trains float above the track using magnets!"
        ],
        funFacts: [
          "Earth itself is a giant magnet with North and South poles!",
          "Some animals like sea turtles use Earth's magnetism to navigate",
          "The most powerful magnets can lift entire cars!",
          "You can make a temporary magnet by rubbing a needle on a strong magnet 50 times!"
        ],
        experimentTitle: "Magnetic Maze",
        experimentSteps: [
          "Draw a maze on a piece of cardboard",
          "Place a paperclip at the start of the maze",
          "Hold a magnet under the cardboard and move it around",
          "Guide the paperclip through the maze without touching it!"
        ],
        voiceNarration: "Magnets are magical! They can pull metal objects toward them without even touching. Every magnet has two special ends called poles. Opposite poles attract like best friends, but same poles repel like they are playing a pushing game!"
      },
      {
        id: "forces",
        title: "Forces",
        subtitle: "Push, pull, and lift!",
        description: "Forces make things move, stop, speed up, or slow down!",
        image: "/topic_forces.jpg",
        category: "physics",
        color: "#C9FF6B",
        whatIsIt: "A force is a push or a pull that can make something move, stop moving, or change direction. When you kick a ball, you are using force! When you pull open a door, that's force too. Gravity is a special force that pulls everything toward the ground.",
        howItWorks: [
          "Forces can be pushes (like kicking a ball) or pulls (like opening a door)",
          "Gravity is a force that pulls everything toward the Earth",
          "Friction is a force that slows things down when they rub against something",
          "The bigger the force, the more something will speed up or slow down",
          "Forces always happen in pairs — when you push a wall, the wall pushes back!"
        ],
        realLifeExamples: [
          "Gravity pulls an apple down from a tree — that's what inspired Isaac Newton!",
          "When you ride a bike, pedaling creates force to move you forward",
          "Brakes on a car use friction to slow down and stop",
          "Rockets use super powerful force to push against the ground and launch into space!"
        ],
        funFacts: [
          "Gravity on the Moon is 6 times weaker than on Earth — you could jump really high!",
          "A flea can jump with 100 times more force than its own weight!",
          "If you drop a feather and a hammer on the Moon, they land at the same time!",
          "Your muscles can create enough force to lift objects heavier than you!"
        ],
        experimentTitle: "Balloon-Powered Car",
        experimentSteps: [
          "Build a small car from a plastic bottle and bottle caps for wheels",
          "Tape a straw to the bottle and thread a string through it",
          "Blow up a balloon and tape it to the straw",
          "Let go and watch the air force push your car forward!"
        ],
        voiceNarration: "Forces are everywhere! Every time you push, pull, lift, or throw something, you are using force. Gravity is the force that keeps us on the ground. Friction is the force that helps us stop when we are running. Without forces, nothing would ever move!"
      }
    ]
  },
  {
    id: "chemistry",
    name: "CHEMISTRY",
    color: "#F2F0FF",
    bgColor: "#FAF8FF",
    topics: [
      {
        id: "matter",
        title: "States of Matter",
        subtitle: "Solid, liquid, gas — oh my!",
        description: "Everything around you is made of matter in different forms!",
        image: "/topic_matter.jpg",
        category: "chemistry",
        color: "#F2F0FF",
        whatIsIt: "Matter is anything that takes up space and has weight. Everything you can touch, see, or smell is made of matter! Matter comes in three main forms: solids (like ice), liquids (like water), and gases (like the air you breathe).",
        howItWorks: [
          "Solids have a fixed shape — their particles are packed tightly together",
          "Liquids take the shape of their container — their particles can slide past each other",
          "Gases spread out to fill any space — their particles are far apart and move freely",
          "When you heat matter, the particles move faster and can change state",
          "When you cool matter, the particles slow down and can become solid again!"
        ],
        realLifeExamples: [
          "Ice cream melting on a hot day — solid to liquid!",
          "Water boiling in a kettle turns into steam — liquid to gas!",
          "Clouds form when water vapor cools and becomes liquid droplets",
          "Butter softens when left out of the fridge — solid becoming softer!"
        ],
        funFacts: [
          "Glass is actually a liquid that moves very, very slowly — super old windows are thicker at the bottom!",
          "There is a fourth state of matter called plasma — lightning and the Sun are made of it!",
          "The only letter not in the periodic table is the letter J!",
          "Water is the only substance that expands when it freezes — that's why ice floats!"
        ],
        experimentTitle: "Melting Race",
        experimentSteps: [
          "Place an ice cube on a plate, one in warm water, and one in the sun",
          "Predict which one will melt first!",
          "Start a timer and watch what happens",
          "The ice in warm water melts fastest because heat speeds up the change!"
        ],
        voiceNarration: "Everything around you is matter! Your toys, your food, even the air you breathe. Matter comes in three fun forms: solids that keep their shape, liquids that flow and take the shape of their container, and gases that spread out everywhere!"
      },
      {
        id: "mixtures",
        title: "Mixtures",
        subtitle: "Stir, dissolve, separate!",
        description: "Mixtures combine different materials that you can often separate again!",
        image: "/topic_mixtures.jpg",
        category: "chemistry",
        color: "#F2F0FF",
        whatIsIt: "A mixture is when two or more materials are combined together but are not chemically joined. You can often separate them again! A salad is a mixture — you can pick out the tomatoes, lettuce, and cucumbers. Solutions are special mixtures where one material dissolves into another, like sugar in water.",
        howItWorks: [
          "In a mixture, each material keeps its own properties",
          "You can separate mixtures using filters, magnets, or by hand",
          "In a solution, one material (the solute) dissolves into another (the solvent)",
          "Heating a solution can make the solvent evaporate, leaving the solute behind",
          "Some mixtures are homogeneous (the same throughout) and some are heterogeneous (you can see the different parts)!"
        ],
        realLifeExamples: [
          "Trail mix is a mixture — you can separate the nuts, raisins, and chocolate!",
          "Salt water is a solution — the salt dissolves and spreads evenly",
          "Italian dressing separates into oil and vinegar because they do not mix well",
          "Coffee is a mixture of water and coffee grounds (or dissolved coffee)!"
        ],
        funFacts: [
          "Air is a mixture of many gases — mostly nitrogen and oxygen!",
          "You can separate a mixture of sand and iron using a magnet!",
          "Oil and water never mix because they are too different — that's why salad dressing separates!",
          "Blood is a mixture of cells floating in a liquid called plasma!"
        ],
        experimentTitle: "Layered Liquids",
        experimentSteps: [
          "Pour honey into a clear glass first",
          "Carefully pour dish soap on top of the honey",
          "Add water colored with food coloring",
          "Top it off with oil — watch the layers form!"
        ],
        voiceNarration: "Mixtures are like a party where different materials come together but do not actually become one thing. Some mixtures are easy to separate, like picking raisins out of cereal. Others, like salt dissolved in water, need special tricks to separate again!"
      },
      {
        id: "reactions",
        title: "Reactions",
        subtitle: "Bubbles, colors, heat!",
        description: "Chemical reactions create amazing changes you can see and feel!",
        image: "/topic_reactions.jpg",
        category: "chemistry",
        color: "#F2F0FF",
        whatIsIt: "A chemical reaction is when materials change into something totally new! You might see bubbles, color changes, heat, or even light. When you bake a cake, that's a chemical reaction — the batter changes into a fluffy, delicious cake that can never become batter again!",
        howItWorks: [
          "Chemical reactions start with reactants (the starting materials)",
          "The reactants' atoms rearrange to form new substances called products",
          "You might see signs like bubbles (gas being made), color changes, or heat",
          "Energy is either released (exothermic) or absorbed (endothermic)",
          "Once a chemical reaction happens, you cannot easily undo it!"
        ],
        realLifeExamples: [
          "Baking a cake — the heat causes a chemical reaction that makes it rise",
          "Rust on a bicycle — iron reacts with oxygen and water",
          "Fireworks exploding — chemicals react to make beautiful colors and sounds",
          "Digesting food — your body uses chemical reactions to break down what you eat!"
        ],
        funFacts: [
          "Your body has thousands of chemical reactions happening every second!",
          "The fastest chemical reaction ever measured happens in 0.000000000000001 seconds!",
          "When you mix baking soda and vinegar, they create carbon dioxide gas — the same gas you breathe out!",
          "Photosynthesis is a chemical reaction that turns sunlight into food for plants!"
        ],
        experimentTitle: "Fizzy Volcano",
        experimentSteps: [
          "Build a volcano shape around a small bottle using clay or playdough",
          "Add 2 spoonfuls of baking soda to the bottle",
          "Mix red food coloring with vinegar in a cup",
          "Pour the vinegar in and watch your volcano erupt with fizzy lava!"
        ],
        voiceNarration: "Chemical reactions are like magic tricks that science can explain! When certain materials meet, they transform into something completely new. You might see bubbles, colors changing, or feel heat. The best part? Once a chemical reaction happens, you cannot undo it — just like you cannot unbake a cake!"
      },
      {
        id: "atoms",
        title: "Atoms",
        subtitle: "The tiny building blocks!",
        description: "Atoms are the smallest pieces of any material in the universe!",
        image: "/topic_atoms.jpg",
        category: "chemistry",
        color: "#F2F0FF",
        whatIsIt: "Atoms are the teeny-tiny building blocks that make up everything in the entire universe! They are so small that you cannot see them with your eyes — millions of atoms could fit on the head of a pin. Every material is made of different types of atoms called elements.",
        howItWorks: [
          "Atoms are made of three main parts: protons, neutrons, and electrons",
          "Protons and neutrons live in the center (called the nucleus)",
          "Electrons zoom around the nucleus in special paths called shells",
          "Different elements have different numbers of protons",
          "When atoms join together, they form molecules — like H2O for water!"
        ],
        realLifeExamples: [
          "A water molecule (H2O) is made of 2 hydrogen atoms and 1 oxygen atom",
          "Diamonds are made of carbon atoms arranged in a super strong pattern",
          "The air you breathe is mostly nitrogen and oxygen molecules",
          "Your body is made of about 7 octillion atoms — that's 7 followed by 27 zeros!"
        ],
        funFacts: [
          "Atoms are mostly empty space — if an atom was the size of a stadium, the nucleus would be a pea in the center!",
          "There are about 90 naturally occurring types of atoms (elements) on Earth",
          "The heaviest atom found in nature is uranium — it's used in nuclear power!",
          "Stars create new atoms through nuclear fusion — we are all made of stardust!"
        ],
        experimentTitle: "Atom Model",
        experimentSteps: [
          "Use a large styrofoam ball for the nucleus (protons and neutrons)",
          "Paint small balls different colors for electrons",
          "Use wire or pipe cleaners to make electron paths (orbits)",
          "Attach the electrons to the wires — you have built a model atom!"
        ],
        voiceNarration: "Atoms are the tiniest building blocks of everything! They are so small that billions of them fit on the head of a pin. Everything you see, touch, and even breathe is made of atoms. When atoms join hands with other atoms, they create molecules — and that is how the whole universe is built!"
      }
    ]
  },
  {
    id: "biology",
    name: "BIOLOGY",
    color: "#8B5CFF",
    bgColor: "#F0EBFF",
    topics: [
      {
        id: "humanbody",
        title: "Human Body",
        subtitle: "Organs, bones, and brain!",
        description: "Your body is an amazing machine with incredible parts!",
        image: "/topic_humanbody.jpg",
        category: "biology",
        color: "#8B5CFF",
        whatIsIt: "Your body is the most amazing machine ever built! It has 206 bones, over 600 muscles, a heart that beats 100,000 times a day, and a brain with 86 billion cells. Every part works together to help you move, think, breathe, and grow.",
        howItWorks: [
          "Your heart pumps blood to every part of your body through tubes called blood vessels",
          "Your lungs take in oxygen from the air and remove carbon dioxide",
          "Your brain sends electrical messages to control everything you do",
          "Your stomach breaks down food into tiny pieces your body can use",
          "Your bones support your body and protect your important organs!"
        ],
        realLifeExamples: [
          "When you run, your heart beats faster to pump more oxygen to your muscles",
          "Blinking keeps your eyes clean and moist — you blink about 15 times per minute!",
          "Goosebumps happen when tiny muscles pull your hair upright to keep you warm",
          "Your body makes about 2 million new red blood cells every second!"
        ],
        funFacts: [
          "Your brain uses 20% of all the energy your body makes!",
          "The smallest bone in your body is in your ear — it's tinier than a grain of rice!",
          "Your blood vessels, if stretched out, would wrap around the Earth more than twice!",
          "You are taller in the morning than at night — gravity compresses your spine during the day!"
        ],
        experimentTitle: "Heart Rate Test",
        experimentSteps: [
          "Find your pulse on your wrist or neck",
          "Count the beats for 15 seconds while sitting still",
          "Multiply by 4 to get your resting heart rate",
          "Now do 20 jumping jacks and measure again — your heart works harder!"
        ],
        voiceNarration: "Your body is the most incredible machine in the world! Your heart beats over 100,000 times every day, pumping blood to every part of you. Your brain has 86 billion cells that help you think, learn, and dream. Every second, your body is doing millions of amazing things without you even knowing!"
      },
      {
        id: "plants",
        title: "Plants",
        subtitle: "Roots, leaves, and sun power!",
        description: "Plants are living factories that make their own food from sunlight!",
        image: "/topic_plants.jpg",
        category: "biology",
        color: "#8B5CFF",
        whatIsIt: "Plants are amazing living things that can make their own food using sunlight, water, and air! This superpower is called photosynthesis. Plants have roots that drink water, leaves that catch sunlight, and stems that hold them up. They also produce the oxygen we need to breathe!",
        howItWorks: [
          "Roots absorb water and nutrients from the soil",
          "The stem carries water up to the leaves like a straw",
          "Leaves catch sunlight using a green chemical called chlorophyll",
          "Through photosynthesis, plants turn sunlight, water, and CO2 into sugar (food)",
          "As a bonus, plants release oxygen into the air for us to breathe!"
        ],
        realLifeExamples: [
          "Sunflowers turn their heads to follow the sun across the sky!",
          "Venus flytraps are plants that can catch and eat insects!",
          "Bamboo is the fastest growing plant — it can grow 3 feet in one day!",
          "Trees can communicate with each other through underground fungus networks!"
        ],
        funFacts: [
          "There are over 390,000 different species of plants on Earth!",
          "The oldest living tree is over 4,800 years old — it was alive when the pyramids were built!",
          "Some plants can live for thousands of years without water by drying up and coming back to life",
          "The Rafflesia flower is the largest flower in the world — it can be 3 feet across!"
        ],
        experimentTitle: "Celery Color Change",
        experimentSteps: [
          "Fill a glass with water and add 10 drops of red food coloring",
          "Place a fresh celery stalk with leaves in the water",
          "Wait for 24 hours",
          "Cut the celery — you will see red lines showing how water travels up the stem!"
        ],
        voiceNarration: "Plants are nature's superheroes! They make their own food from sunlight through a magical process called photosynthesis. Their roots drink water from the ground, their leaves catch sunlight, and they even create the oxygen we breathe. Without plants, life on Earth would not exist!"
      },
      {
        id: "animals",
        title: "Animals",
        subtitle: "Roar, slither, flutter!",
        description: "Animals come in amazing shapes, sizes, and colors all over Earth!",
        image: "/topic_animals.jpg",
        category: "biology",
        color: "#8B5CFF",
        whatIsIt: "Animals are living creatures that can move, eat, and sense the world around them. There are over 8 million species of animals on Earth! They come in every shape and size imaginable — from tiny ants to giant blue whales. Scientists group animals into categories like mammals, birds, fish, reptiles, and amphibians.",
        howItWorks: [
          "All animals need food for energy, water to drink, and oxygen to breathe",
          "Animals have special body parts adapted to where they live",
          "Fish have gills to breathe underwater, birds have wings to fly",
          "Many animals have camouflage to hide from predators",
          "Animals communicate in amazing ways — through sounds, colors, and even dances!"
        ],
        realLifeExamples: [
          "Octopuses are super smart — they can solve puzzles and open jars!",
          "Bats use sound waves to find their way in complete darkness",
          "Arctic foxes change color — brown in summer and white in winter!",
          "Dolphins sleep with one half of their brain at a time so they can keep swimming!"
        ],
        funFacts: [
          "A blue whale's heart is as big as a small car!",
          "Cheetahs can run faster than cars on a highway — up to 70 miles per hour!",
          "There are more insects in the world than all other animals combined!",
          "Some turtles can breathe through their bottoms!"
        ],
        experimentTitle: "Bird Feeder Observation",
        experimentSteps: [
          "Make a simple bird feeder using a pinecone, peanut butter, and birdseed",
          "Hang it outside a window where you can watch",
          "Keep a journal of which birds visit and when",
          "Notice how different birds have different beaks and eating styles!"
        ],
        voiceNarration: "Animals are incredible! From the tiniest bug to the biggest whale, every animal has special superpowers that help it survive. Some can fly, some can swim, some can change colors, and some are super strong. The animal kingdom is full of amazing surprises!"
      },
      {
        id: "foodchain",
        title: "Food Chain",
        subtitle: "Who eats whom?",
        description: "Food chains show how energy moves from plants to animals!",
        image: "/topic_foodchain.jpg",
        category: "biology",
        color: "#8B5CFF",
        whatIsIt: "A food chain shows how energy moves from one living thing to another. It starts with plants (producers) that make their own food using sunlight. Then herbivores (plant-eaters) eat the plants. Carnivores (meat-eaters) eat the herbivores. When animals die, decomposers like fungi and bacteria break them down and return nutrients to the soil.",
        howItWorks: [
          "Producers (plants) make food using sunlight through photosynthesis",
          "Primary consumers (herbivores) eat plants to get energy",
          "Secondary consumers (carnivores) eat herbivores",
          "Tertiary consumers (top predators) eat other carnivores",
          "Decomposers break down dead plants and animals, returning nutrients to the soil!"
        ],
        realLifeExamples: [
          "Grass → Rabbit → Fox is a simple food chain",
          "In the ocean: plankton → small fish → big fish → shark",
          "Ladybugs eat aphids that eat plants in your garden",
          "Vultures are nature's cleanup crew — they eat dead animals!"
        ],
        funFacts: [
          "If plants disappeared, almost all life on Earth would die within weeks!",
          "Some food chains have over 10 levels of animals eating other animals!",
          "Killer whales are at the top of the ocean food chain — nothing eats them!",
          "Dung beetles eat animal poop and help recycle nutrients back into the soil!"
        ],
        experimentTitle: "Build a Food Web",
        experimentSteps: [
          "Draw pictures of plants and animals in your backyard or park",
          "Use string to connect who eats whom",
          "Start with plants and connect to insects, then to birds, then to bigger animals",
          "See how all the living things are connected in a web of life!"
        ],
        voiceNarration: "Food chains are like a big dinner party in nature! Plants make food from sunlight, animals eat plants, and bigger animals eat smaller animals. Every living thing is connected in a big web of life. If one part disappears, it affects everything else!"
      }
    ]
  },
  {
    id: "earth",
    name: "EARTH SCIENCE",
    color: "#D0F5FF",
    bgColor: "#E8FAFF",
    topics: [
      {
        id: "volcanoes",
        title: "Volcanoes",
        subtitle: "Lava, ash, and magma!",
        description: "Volcanoes are Earth's way of releasing heat and creating new land!",
        image: "/topic_volcanoes.jpg",
        category: "earth",
        color: "#D0F5FF",
        whatIsIt: "Volcanoes are like Earth's pressure valves! Deep underground, rocks melt into hot liquid called magma. When pressure builds up, the magma pushes through cracks in Earth's crust and erupts. Once magma reaches the surface, we call it lava. Volcanoes can create new islands, make mountains, and even help fertilize soil!",
        howItWorks: [
          "Deep inside Earth, it is so hot that rocks melt into magma",
          "Magma rises through cracks in Earth's crust because it is lighter than solid rock",
          "Pressure builds up underground like a shaken soda bottle",
          "When the pressure gets too high — BOOM! — the volcano erupts",
          "Lava flows out, cools down, and hardens into new rock!"
        ],
        realLifeExamples: [
          "Hawaii was formed by underwater volcanoes erupting for millions of years!",
          "Mount Vesuvius erupted in 79 AD and buried the city of Pompeii",
          "Iceland has volcanoes that heat their homes with geothermal energy",
          "The tallest volcano in our solar system is on Mars — it's three times taller than Everest!"
        ],
        funFacts: [
          "There are about 1,500 active volcanoes on Earth right now!",
          "Lava can flow as fast as a car on a highway — up to 60 km/h!",
          "The loudest sound ever recorded was a volcanic eruption in 1883 — it was heard 3,000 miles away!",
          "Some underwater volcanoes are so tall they almost reach the ocean surface!"
        ],
        experimentTitle: "Baking Soda Volcano",
        experimentSteps: [
          "Build a volcano cone around a small cup using clay or playdough",
          "Add 2 tablespoons of baking soda and a drop of red food coloring to the cup",
          "Pour in vinegar and watch the fizzy eruption!",
          "The chemical reaction creates carbon dioxide gas that bubbles up like real lava!"
        ],
        voiceNarration: "Volcanoes are like Earth's superpowered pressure cookers! Deep underground, rocks melt into hot magma. When the pressure gets too high, the magma bursts through Earth's surface as lava. Volcanoes can be scary, but they also create beautiful new land and help make soil fertile for plants!"
      },
      {
        id: "rocks",
        title: "Rocks",
        subtitle: "Igneous, sedimentary, metamorphic!",
        description: "Rocks tell the story of Earth's incredible history!",
        image: "/topic_rocks.jpg",
        category: "earth",
        color: "#D0F5FF",
        whatIsIt: "Rocks are made of minerals — special crystals that form in nature. There are three main types of rocks: Igneous rocks form when hot magma cools and hardens. Sedimentary rocks form when layers of sand, mud, and shells are pressed together over millions of years. Metamorphic rocks form when existing rocks are changed by heat and pressure deep underground.",
        howItWorks: [
          "Igneous rocks form when melted rock (magma or lava) cools and hardens",
          "Sedimentary rocks form when small pieces of rock, sand, and shells settle in layers",
          "Over millions of years, pressure cements these layers together",
          "Metamorphic rocks form when existing rocks are heated and squeezed underground",
          "The rock cycle shows how any type of rock can become another type!"
        ],
        realLifeExamples: [
          "Granite (igneous) is used for kitchen counters — it forms when magma cools slowly underground",
          "Sandstone (sedimentary) often has visible layers and sometimes fossil prints!",
          "Marble (metamorphic) starts as limestone and changes with heat and pressure",
          "Diamonds form deep underground under extreme pressure over billions of years!"
        ],
        funFacts: [
          "The oldest rocks on Earth are over 4 billion years old!",
          "Some rocks float — pumice is so full of air bubbles that it floats on water!",
          "Meteorites are rocks from space that land on Earth — some are older than our planet!",
          "Fossils are found in sedimentary rocks — they are traces of ancient plants and animals!"
        ],
        experimentTitle: "Rock Collection",
        experimentSteps: [
          "Go on a rock hunt in your neighborhood or park",
          "Collect different rocks and sort them by color, size, and texture",
          "Use a magnifying glass to look for crystals and patterns",
          "Try the vinegar test — drop vinegar on rocks to see if they fizz (they might contain fossils)!"
        ],
        voiceNarration: "Rocks are Earth's history books! Each rock tells a story about how it was formed. Some started as hot lava that cooled down. Others formed from layers of sand and mud pressed together over millions of years. And some were transformed by heat and pressure deep underground. Every rock has an amazing story to tell!"
      },
      {
        id: "weather",
        title: "Weather",
        subtitle: "Rain, wind, and storms!",
        description: "Weather is what happens in the sky every day — sun, rain, wind, and more!",
        image: "/topic_weather.jpg",
        category: "earth",
        color: "#D0F5FF",
        whatIsIt: "Weather is what the air and sky are doing right now! It includes temperature (how hot or cold it is), precipitation (rain, snow, hail), humidity (how much water is in the air), wind (moving air), and pressure (how heavy the air feels). Weather changes day by day, while climate is the pattern of weather over many years.",
        howItWorks: [
          "The Sun heats Earth's surface unevenly — equator gets more heat than poles",
          "Warm air rises and cool air sinks, creating wind",
          "When warm, moist air rises and cools, water vapor condenses into clouds",
          "If cloud droplets get heavy enough, they fall as rain or snow",
          "Thunderstorms form when warm and cold air masses collide!"
        ],
        realLifeExamples: [
          "Rainbows form when sunlight bends through raindrops like a prism",
          "Tornadoes are spinning columns of air that can be over a mile wide!",
          "Hurricanes are giant storms that form over warm ocean water",
          "Fog is just a cloud that forms at ground level!"
        ],
        funFacts: [
          "A single thunderstorm can have more energy than an atomic bomb!",
          "The fastest wind ever recorded was 253 miles per hour!",
          "Antarctica is the driest place on Earth — it hardly ever snows in some areas!",
          "You can tell temperature by counting cricket chirps — they chirp faster when it's warmer!"
        ],
        experimentTitle: "Cloud in a Jar",
        experimentSteps: [
          "Pour hot water into a jar and swirl it around",
          "Place a bag of ice on top of the jar",
          "Quickly spray hairspray inside and put the ice back on top",
          "Watch a cloud form inside the jar — just like real clouds in the sky!"
        ],
        voiceNarration: "Weather is like Earth's mood — it changes all the time! The Sun heats our planet, warm air rises, cool air sinks, and water evaporates to form clouds. Sometimes the sky is sunny and blue, sometimes it pours with rain, and sometimes thunder rumbles. Every type of weather has its own special science!"
      },
      {
        id: "watercycle",
        title: "Water Cycle",
        subtitle: "Evaporate, rain, repeat!",
        description: "The water cycle is Earth's amazing recycling system for water!",
        image: "/topic_watercycle.jpg",
        category: "earth",
        color: "#D0F5FF",
        whatIsIt: "The water cycle is Earth's amazing recycling system! Water moves around our planet in a never-ending loop. It evaporates from oceans and lakes, forms clouds in the sky, falls back to Earth as rain or snow, and flows through rivers back to the ocean. The water you drink today might have been drunk by a dinosaur millions of years ago!",
        howItWorks: [
          "Evaporation: The Sun heats water in oceans, lakes, and rivers, turning it into water vapor",
          "Condensation: Water vapor rises and cools, forming tiny droplets that make clouds",
          "Precipitation: When cloud droplets get heavy, they fall as rain, snow, sleet, or hail",
          "Collection: Water gathers in rivers, lakes, and oceans, or soaks into the ground",
          "Then the cycle starts all over again — forever!"
        ],
        realLifeExamples: [
          "Puddles disappear after the rain — the water evaporates into the air!",
          "Dew on grass in the morning is condensation — water vapor turning back to liquid",
          "Snow on mountains slowly melts and feeds rivers all year long",
          "Water from your tap has been through the water cycle countless times!"
        ],
        funFacts: [
          "The water on Earth today is the same water that existed when dinosaurs roamed!",
          "Only 3% of Earth's water is freshwater — the rest is salty ocean water!",
          "A single thundercloud can contain over 100 million pounds of water!",
          "The deepest point in the ocean is almost 7 miles down!"
        ],
        experimentTitle: "Mini Water Cycle",
        experimentSteps: [
          "Fill a clear bowl with warm water and a few drops of blue food coloring",
          "Cover the bowl with plastic wrap",
          "Place a small rock in the center to create a low point",
          "Put the bowl in the sun and watch condensation form on the plastic, then drip down like rain!"
        ],
        voiceNarration: "The water cycle is nature's greatest recycling system! Water evaporates from oceans, forms fluffy clouds, falls as rain or snow, and flows back to the sea. This cycle has been happening for billions of years — the water you drink might have been a raindrop for a dinosaur!"
      }
    ]
  },
  {
    id: "space",
    name: "SPACE SCIENCE",
    color: "#121212",
    bgColor: "#E8E8E8",
    topics: [
      {
        id: "solarsystem",
        title: "Solar System",
        subtitle: "Planets orbiting the Sun!",
        description: "Eight amazing planets travel around our star, the Sun!",
        image: "/topic_solarsystem.jpg",
        category: "space",
        color: "#121212",
        whatIsIt: "Our solar system is a giant family of objects that travel around the Sun — our nearest star! There are 8 planets, over 200 moons, millions of asteroids, and countless comets. The Sun is so big that over 1 million Earths could fit inside it! Everything in our solar system is held together by the Sun's gravity.",
        howItWorks: [
          "The Sun's gravity pulls everything in the solar system toward it",
          "Planets orbit (travel around) the Sun in oval-shaped paths",
          "Inner planets (Mercury, Venus, Earth, Mars) are rocky and smaller",
          "Outer planets (Jupiter, Saturn, Uranus, Neptune) are giant gas planets",
          "Each planet also spins on its own axis, creating day and night!"
        ],
        realLifeExamples: [
          "A year on Mercury is only 88 Earth days — that's a fast orbit!",
          "Jupiter is so big that all other planets could fit inside it",
          "Saturn's rings are made of billions of ice and rock chunks",
          "Earth is the only planet we know of that has life!"
        ],
        funFacts: [
          "The solar system is 4.6 billion years old!",
          "Neptune has the strongest winds — up to 1,300 miles per hour!",
          "Venus is the hottest planet even though Mercury is closer to the Sun",
          "There is a asteroid belt between Mars and Jupiter with millions of space rocks!"
        ],
        experimentTitle: "Planet Scale Model",
        experimentSteps: [
          "Use different sized balls to represent planets (beach ball for Sun, marble for Earth)",
          "Paint each ball to match the planet's colors",
          "Lay out string in a large space to show the orbits",
          "Place the planets at scaled distances — notice how far apart the outer planets are!"
        ],
        voiceNarration: "Our solar system is a cosmic dance party! Eight planets whirl around the Sun, our giant star, each at their own special distance. Some are small and rocky like Earth, others are huge gas giants like Jupiter. Every planet has its own personality, moons, and mysteries waiting to be discovered!"
      },
      {
        id: "moon",
        title: "Moon",
        subtitle: "Phases, craters, and tides!",
        description: "The Moon is Earth's closest neighbor in space!",
        image: "/topic_moon.jpg",
        category: "space",
        color: "#121212",
        whatIsIt: "The Moon is Earth's only natural satellite — a big ball of rock that orbits our planet. It is about one-quarter the size of Earth and about 238,900 miles away. The Moon has no air, no water, and no life, but it does have mountains, valleys, and millions of craters from asteroid impacts billions of years ago.",
        howItWorks: [
          "The Moon orbits Earth about once every 27.3 days",
          "The same side of the Moon always faces Earth — we never see the far side from here!",
          "The Moon reflects sunlight, which is why it glows in our sky",
          "Moon phases happen because we see different amounts of the lit side as it orbits",
          "The Moon's gravity pulls on Earth's oceans, creating tides!"
        ],
        realLifeExamples: [
          "The Moon's gravity causes ocean tides to rise and fall twice a day",
          "A total solar eclipse happens when the Moon passes directly between Earth and the Sun",
          "The far side of the Moon is sometimes called the dark side, but it gets just as much sunlight!",
          "Twelve humans have walked on the Moon — all between 1969 and 1972!"
        ],
        funFacts: [
          "You would weigh only 1/6 of your Earth weight on the Moon!",
          "The Moon is slowly moving away from Earth — about 1.5 inches per year",
          "There are over 1 million craters on the Moon larger than half a mile across!",
          "A day on the Moon lasts about 29.5 Earth days!"
        ],
        experimentTitle: "Moon Phases Model",
        experimentSteps: [
          "Stick a pencil through the center of a styrofoam ball",
          "In a dark room, have a friend hold a flashlight (the Sun)",
          "Stand a few feet away and hold the ball at arm's length (the Moon)",
          "Slowly turn around and watch how the lit portion changes — just like real moon phases!"
        ],
        voiceNarration: "The Moon is Earth's best friend in space! It orbits our planet, reflecting sunlight to glow in our night sky. The Moon creates ocean tides with its gravity, and its changing phases have fascinated humans for thousands of years. Twelve brave astronauts have even walked on its dusty surface!"
      },
      {
        id: "stars",
        title: "Stars",
        subtitle: "Twinkling balls of gas!",
        description: "Stars are giant balls of burning gas that light up the night sky!",
        image: "/topic_stars.jpg",
        category: "space",
        color: "#121212",
        whatIsIt: "Stars are giant balls of burning gas that produce their own light and heat! Our Sun is the closest star to Earth. Stars are born in huge clouds of gas and dust called nebulae. They shine for millions or billions of years by turning hydrogen into helium in their cores through a process called nuclear fusion. When stars die, they can become white dwarfs, neutron stars, or even black holes!",
        howItWorks: [
          "Stars are born when clouds of gas and dust collapse under gravity",
          "In the star's core, hydrogen atoms smash together to form helium",
          "This nuclear fusion releases enormous amounts of energy as light and heat",
          "Stars shine for millions to billions of years depending on their size",
          "When stars run out of fuel, they expand into red giants, then collapse!"
        ],
        realLifeExamples: [
          "The North Star (Polaris) has been used for navigation for thousands of years",
          "Sirius is the brightest star in our night sky — it's actually two stars orbiting each other!",
          "Shooting stars are not stars at all — they are meteors burning up in our atmosphere",
          "Different cultures see pictures in the stars called constellations!"
        ],
        funFacts: [
          "There are more stars in the universe than grains of sand on all Earth's beaches!",
          "The largest known star, UY Scuti, is 1,700 times bigger than our Sun!",
          "Some stars spin 600 times per second — that's faster than a blender!",
          "The light from the farthest stars we can see started its journey billions of years ago!"
        ],
        experimentTitle: "Constellation Viewer",
        experimentSteps: [
          "Find a constellation pattern online (like the Big Dipper)",
          "Use a pushpin to poke holes in black paper matching the star pattern",
          "Hold the paper up to a light source",
          "See the constellation shine through — just like stars in the night sky!"
        ],
        voiceNarration: "Stars are nature's light bulbs — giant balls of burning gas that have shone for millions of years! Our Sun is a star, and there are billions more in our galaxy alone. When you look at the night sky, some of the light you see started its journey thousands of years ago. We are all made of stardust!"
      },
      {
        id: "astronauts",
        title: "Astronauts",
        subtitle: "Living in space!",
        description: "Astronauts are brave explorers who travel beyond Earth!",
        image: "/topic_astronauts.jpg",
        category: "space",
        color: "#121212",
        whatIsIt: "Astronauts are specially trained scientists and pilots who travel to space! They live and work on the International Space Station, conduct experiments, repair satellites, and help us learn about living in microgravity (where everything floats!). Being an astronaut requires years of training in science, engineering, physical fitness, and teamwork.",
        howItWorks: [
          "Astronauts train for years to learn about spacecraft systems and science",
          "Rockets use powerful engines to push against Earth and escape gravity",
          "In orbit, astronauts float because they are in freefall around Earth",
          "They eat special packaged food and drink from sealed pouches",
          "Spacesuits protect astronauts from extreme temperatures and provide oxygen!"
        ],
        realLifeExamples: [
          "The International Space Station has been continuously occupied since the year 2000!",
          "Astronauts grow plants in space to learn how to farm on other planets",
          "Without gravity, astronauts' muscles get weaker — they exercise 2 hours every day!",
          "NASA's Artemis program plans to send the first woman to the Moon by 2026!"
        ],
        funFacts: [
          "Astronauts grow up to 2 inches taller in space because their spines stretch!",
          "You cannot cry normally in space — tears stick to your eyeballs in balls!",
          "Astronauts have to strap themselves down to sleep so they do not float away!",
          "The longest time anyone has lived in space is 438 days straight!"
        ],
        experimentTitle: "Microgravity Simulation",
        experimentSteps: [
          "Fill a clear bottle with water and a few drops of food coloring",
          "Add some oil and an antacid tablet",
          "Quickly seal the bottle and turn it upside down",
          "Watch the bubbles float up just like they would in space!"
        ],
        voiceNarration: "Astronauts are real-life space explorers! They live in the International Space Station, float around in zero gravity, and conduct amazing experiments. They have to learn to eat, sleep, and even use the bathroom in space. Being an astronaut is one of the most exciting jobs in the whole universe!"
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which gas do plants need to make food?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
    correctIndex: 1,
    explanation: "Plants use Carbon Dioxide from the air, along with sunlight and water, to make their food through photosynthesis!",
    category: "biology"
  },
  {
    id: "q2",
    question: "What is the closest star to Earth?",
    options: ["Proxima Centauri", "The Sun", "Sirius"],
    correctIndex: 1,
    explanation: "The Sun is our closest star! It is about 93 million miles away and provides light and heat for our planet.",
    category: "space"
  },
  {
    id: "q3",
    question: "What do we call water that turns into gas?",
    options: ["Steam", "Ice", "Rain"],
    correctIndex: 0,
    explanation: "When water is heated enough, it turns into steam (water vapor) through a process called evaporation!",
    category: "chemistry"
  },
  {
    id: "q4",
    question: "What force keeps us on the ground?",
    options: ["Magnetism", "Friction", "Gravity"],
    correctIndex: 2,
    explanation: "Gravity is the force that pulls everything toward the center of Earth, keeping us on the ground!",
    category: "physics"
  },
  {
    id: "q5",
    question: "What is hot liquid rock called underground?",
    options: ["Lava", "Magma", "Obsidian"],
    correctIndex: 1,
    explanation: "Magma is molten rock beneath Earth's surface. Once it erupts from a volcano, we call it lava!",
    category: "earth"
  },
  {
    id: "q6",
    question: "How many bones does an adult human have?",
    options: ["106", "206", "306"],
    correctIndex: 1,
    explanation: "An adult human has 206 bones! Babies are born with about 270 bones that fuse together as they grow.",
    category: "biology"
  },
  {
    id: "q7",
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Neptune", "Jupiter"],
    correctIndex: 2,
    explanation: "Jupiter is the largest planet — it is so big that all other planets could fit inside it!",
    category: "space"
  },
  {
    id: "q8",
    question: "What do we call a material that dissolves in water?",
    options: ["Soluble", "Insoluble", "Magnetic"],
    correctIndex: 0,
    explanation: "A soluble material is one that can dissolve in water, like sugar or salt!",
    category: "chemistry"
  },
  {
    id: "q9",
    question: "What travels faster: light or sound?",
    options: ["Light", "Sound", "They are the same"],
    correctIndex: 0,
    explanation: "Light travels MUCH faster than sound — that is why you see lightning before you hear thunder!",
    category: "physics"
  },
  {
    id: "q10",
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Diamond", "Iron"],
    correctIndex: 1,
    explanation: "Diamond is the hardest natural substance! It is made of carbon atoms arranged in a super strong crystal pattern.",
    category: "earth"
  }
];

export const badges: Badge[] = [
  {
    id: "explorer",
    name: "Science Explorer",
    description: "Open your first science topic!",
    icon: "🔭",
    condition: "open_topic"
  },
  {
    id: "quizmaster",
    name: "Quiz Master",
    description: "Answer 3 quiz questions correctly!",
    icon: "🏆",
    condition: "quiz_correct_3"
  },
  {
    id: "experimenter",
    name: "Lab Genius",
    description: "Read about 5 experiments!",
    icon: "🧪",
    condition: "read_experiments_5"
  },
  {
    id: "listener",
    name: "Story Listener",
    description: "Use voice narration 3 times!",
    icon: "🎧",
    condition: "voice_3"
  },
  {
    id: "champion",
    name: "Science Champion",
    description: "Complete all quiz questions!",
    icon: "⭐",
    condition: "quiz_complete"
  }
];

export const getTopicById = (id: string): Topic | undefined => {
  for (const cat of categories) {
    const topic = cat.topics.find(t => t.id === id);
    if (topic) return topic;
  }
  return undefined;
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(c => c.id === id);
};
