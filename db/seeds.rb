# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: "keiko", email: "keiko@test.com", password: "keiko", city: "Oakland", state: "CA")
User.create(name: "suni", email: "suni@test.com", password: "suni", city: "Oakland", state: "CA")
User.create(name: "yuri", email: "yuri@test.com", password: "yuri", city: "Richmond", state: "CA")

Category.create(name:"Outdoors - Warm Weather", description: "Camping, Fishing, Backpacking, etc.")
Category.create(name:"Outdoors - Cold Weather", description: "Ski, Snowboarding, Snowshoe, etc.")
Category.create(name:"Building Tools", description: "Woodworking tools, saws, drills, etc,")
Category.create(name:"Gardening Tools", description: "Shovels, lawn mowers, rakes, etc,")
Category.create(name:"FREE", description: "Items for you to keep for FREE!")

Item.create(name: "Circ Saw", description: "Circ Saw for cutting planks of wood.", category_id: "3", user_id: "2")
Item.create(name: "Tent", description: "Tent for 4 people.", category_id: "1", user_id: "1")
Item.create(name: "Lawn Mower - Gas", description: "Push lawn mower by Cat Brand", category_id: "4", user_id: "3")
Item.create(name: "Snow Shoes", description: "Size Small Womens", category_id: "2", user_id: "3")
