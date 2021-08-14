75.times do
    NonPlayableCharacter.create(
        first_name: Faker::Games::ElderScrolls.first_name, 
        last_name: Faker::Games::ElderScrolls.last_name,
        city: Faker::Games::ElderScrolls.city,
        race: Faker::Games::ElderScrolls.race,
        weapon: Faker::Games::ElderScrolls.weapon
    )
end