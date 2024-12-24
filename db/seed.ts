import { db } from './drizzle';
import { gameTemplate, GameTypeEnum, type GameTemplateInsert } from './schema';

async function seedGames() {
  try {
    const games: GameTemplateInsert[] = [
      {
        type: GameTypeEnum.puzzle,
        name: 'Jigsaw Puzzle',
        description: 'Arrange the pieces to complete the picture and reveal the surprise!',
        defaultConfig: {
          gridSize: 3,
          aspectRatio: 4 / 3,
          imagePath: '/placeholder-image.jpg',
        },
        isActive: true,
      },
      {
        type: GameTypeEnum.memory,
        name: 'Matching Pairs',
        description: 'Find matching pairs of baby-themed items to unlock the reveal.',
        defaultConfig: {
          pairs: [
            { content: '👶' },
            { content: '🍼' },
            { content: '🎈' },
            { content: '🎂' },
            { content: '🎁' },
            { content: '🎲' },
          ],
          requiredMatches: 6,
        },
        isActive: true,
      },
      {
        type: GameTypeEnum.countdown,
        name: 'Perfect Timing',
        description: 'Stop the timer at exactly the right moment to reveal the surprise!',
        defaultConfig: {
          targetRange: {
            min: 45,
            max: 55,
          },
          speed: 50, // milliseconds per tick
        },
        isActive: true,
      },
      {
        type: GameTypeEnum.arcade,
        name: 'Whack-a-Baby',
        description: 'Catch the bouncing babies to unlock the gender reveal!',
        defaultConfig: {
          requiredScore: 10,
          holeCount: 9,
          moleInterval: 1000,
          moleDisplayTime: 800,
        },
        isActive: true,
      },
      {
        type: GameTypeEnum.arcade,
        name: 'Bubble Pop',
        description: 'Pop the floating bubbles to discover the surprise inside!',
        defaultConfig: {
          requiredPops: 10,
          maxBubbles: 8,
          spawnInterval: 300,
          bubbleSettings: {
            minSize: 30,
            maxSize: 50,
            minSpeed: 0.5,
            maxSpeed: 1,
          },
        },
        isActive: true,
      },
      {
        type: GameTypeEnum.quiz,
        name: 'Word Scramble',
        description: 'Unscramble the baby-related words to reveal the gender!',
        defaultConfig: {
          words: [
            { scrambled: 'TOBEBE', original: 'BEBOTE' },
            { scrambled: 'INETAN', original: 'GIRL' },
            { scrambled: 'NI', original: 'BOY' },
          ],
        },
        isActive: true,
      },
    ];

    console.log('🌱 Seeding game templates...');

    for (const game of games) {
      await db.insert(gameTemplate).values(game);
    }

    console.log('✅ Game templates seeded successfully!');
  } catch (error) {
    console.error('Error seeding game templates:', error);
    throw error;
  }
}

// Run the seed function
seedGames().catch((error) => {
  console.error('Failed to seed database:', error);
  process.exit(1);
});
