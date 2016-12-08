user1 = User.create(name: "Alex", email: "alex@email.com", password: "12345678")
user2 = User.create(name: "Pedro", email: "pedro@email.com", password: "12345678")
user3 = User.create(name: "Laura", email: "laura@email.com", password: "12345678")
user4 = User.create(name: "Jonny", email: "jonny@email.com", password: "12345678")
user5 = User.create(name: "Alfon", email: "alfon@email.com", password: "12345678")
user6 = User.create(name: "Kashir", email: "kashir@email.com", password: "12345678")

trip1 = Trip.create(user_id: 1, level: "Beginner", kind_of_trip: "group", price: 30, origin: "Madrid", destination: "Cantabria", country: "Spain", start_date: "Sat, 10 Dec 2016 00:00:00 +0000", finish_date: "Tue, 13 Dec 2016 00:00:00 +0000", max_users: 4, space_material: 2, description: "Sick trip in Spain brah!")

trip2 = Trip.create(user_id: 6, level: "Advanced", kind_of_trip: "single", price: 40, origin: "Carlsbad", destination: "Malibu", country: "USA", start_date: "Sat, 11 Dec 2016 00:00:00 +0000", finish_date: "Tue, 13 Dec 2016 00:00:00 +0000", max_users: 4, space_material: 2, description: "Sick trip in California brah!")

trip3 = Trip.create(user_id: 3, level: "Advanced", kind_of_trip: "group", price: 50, origin: "San Francisco", destination: "Malibu", country: "USA", start_date: "Sat, 11 Dec 2016 00:00:00 +0000", finish_date: "Tue, 13 Dec 2016 00:00:00 +0000", max_users: 4, space_material: 2, description: "Sick trip in California brah!")
