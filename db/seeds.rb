user1 = User.create(name: "Alex", email: "alex@email.com", password: "12345678", level: "Beginner", phone_number:639388020, bio: "Hey! My name is Alex and I love to surf brah!")
user2 = User.create(name: "Alvaro", email: "alvaro@email.com", password: "12345678", level: "Intermediate", phone_number:639388023, bio: "Hey! My name is Alvaro and I love to surf brah!")
user3 = User.create(name: "Kashir", email: "kashir@email.com", password: "12345678", level: "Advanced", phone_number:639388023, bio: "Hey! My name is Miguel and I love to surf brah!")


trip1 = Trip.create(user_id: 1, level: "Beginner", kind_of_trip: "group", price: 30, origin: "Madrid", destination: "Cantabria", country: "Spain", start_date: "Sat, 10 Dec 2016 00:00:00 +0000", finish_date: "Tue, 13 Dec 2016 00:00:00 +0000", max_users: 4, space_material: 2, description: "Sick trip in Spain brah!")

trip2 = Trip.create(user_id: 2, level: "Advanced", kind_of_trip: "single", price: 40, origin: "Carlsbad", destination: "Malibu", country: "USA", start_date: "Sat, 11 Dec 2016 00:00:00 +0000", finish_date: "Tue, 13 Dec 2016 00:00:00 +0000", max_users: 4, space_material: 2, description: "Sick trip in California brah!")

trip3 = Trip.create(user_id: 3, level: "Advanced", kind_of_trip: "group", price: 50, origin: "San Francisco", destination: "Malibu", country: "USA", start_date: "Sat, 11 Dec 2016 00:00:00 +0000", finish_date: "Tue, 13 Dec 2016 00:00:00 +0000", max_users: 4, space_material: 2, description: "Sick trip in California brah!")

request1 = user1.requests.create(trip_id: 2)
request2 = user1.requests.create(trip_id: 3)
request3 = user2.requests.create(trip_id: 1)
request4 = user2.requests.create(trip_id: 3)
request5 = user3.requests.create(trip_id: 1)
request6 = user3.requests.create(trip_id: 2)
