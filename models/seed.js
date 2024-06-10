const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
    console.log("Connected to MongoDB");

    // Clear existing characters
    await Character.deleteMany({});

    // Create seed characters
    const seedCharacters = [
        {
            playerName: 'John Doe',
            characterName: 'Aragorn',
            race: 'Human',
            class: 'Ranger',
            level: 5,
            background: 'Noble',
            alignment: 'Chaotic Good',
            experiencePoints: 1500,
            description: 'A tall, stern-looking man with a rugged appearance.',
            strength: 18,
            dexterity: 15,
            constitution: 16,
            intelligence: 12,
            wisdom: 14,
            charisma: 13,
            weaponName: 'Sword',
            userId: new mongoose.Types.ObjectId() // Replace with a valid user ID
        },
        {
            playerName: 'Jane Smith',
            characterName: 'Eldrin',
            race: 'Elf',
            class: 'Mage',
            level: 7,
            background: 'Sage',
            alignment: 'Neutral Good',
            experiencePoints: 3000,
            description: 'A slender elf with piercing blue eyes and silver hair.',
            strength: 10,
            dexterity: 14,
            constitution: 12,
            intelligence: 18,
            wisdom: 16,
            charisma: 11,
            weaponName: 'Staff',
            userId: new mongoose.Types.ObjectId() // Replace with a valid user ID
        },
        {
            playerName: 'Bob Johnson',
            characterName: 'Thorin',
            race: 'Dwarf',
            class: 'Warrior',
            level: 4,
            background: 'Soldier',
            alignment: 'Lawful Neutral',
            experiencePoints: 1200,
            description: 'A stout dwarf with a long braided beard and a gruff voice.',
            strength: 16,
            dexterity: 12,
            constitution: 17,
            intelligence: 11,
            wisdom: 13,
            charisma: 10,
            weaponName: 'Axe',
            userId: new mongoose.Types.ObjectId() // Replace with a valid user ID
        }
    ];

    // Insert seed characters into the database
    await Character.insertMany(seedCharacters);

    console.log("Seed data inserted successfully");
    mongoose.connection.close();
});