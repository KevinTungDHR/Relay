# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Workspace.destroy_all
demo_user = User.create(email: "DemoUser@gmail.com", password: "demouserpassword", display_name: "Demo User");

demo_office_users = User.create([
  { email: "DavidWallace@DunderMifflin.com", password: "demouserpassword", display_name: "David Wallace" },
  { email: "JimHalpert@DunderMifflin.com", password: "demouserpassword", display_name: "Jim Halpert" },
  { email: "PamBeesly@DunderMifflin.com", password: "demouserpassword", display_name: "Pam Beesly"},
  { email: "DwightShrute@DunderMifflin.com", password: "demouserpassword", display_name: "Dwight Shrute"},
  { email: "MichaelScott@DunderMifflin.com", password: "demouserpassword", display_name: "Michael Scott"},
  { email: "EdHelms@DunderMifflin.com", password: "demouserpassword", display_name: "Ed Helms"},
  { email: "JanLevinson@DunderMifflin.com", password: "demouserpassword", display_name: "Jan Levinson"},
  { email: "KevinMalone@DunderMifflin.com", password: "demouserpassword", display_name: "Kevin Malone"},
  { email: "RyanHoward@DunderMifflin.com", password: "demouserpassword", display_name: "Ryan Howard"},
  { email: "AngelaMartin@DunderMifflin.com", password: "demouserpassword", display_name: "Angela Martin"},
  { email: "TobyFlenderson@DunderMifflin.com", password: "demouserpassword", display_name: "Toby Flenderson"},
  { email: "DarrylPhilbin@DunderMifflin.com", password: "demouserpassword", display_name: "Darryl Philbin"},
  { email: "KellyKapoor@DunderMifflin.com", password: "demouserpassword", display_name: "Kelly Kapoor"},
  { email: "KarenFilippelli@DunderMifflin.com", password: "demouserpassword", display_name: "Karen Filippelli"},
  { email: "CreedBratton@DunderMifflin.com", password: "demouserpassword", display_name: "Creed Bratton"},
  { email: "OscarMartinez@DunderMifflin.com", password: "demouserpassword", display_name: "Oscar Martinez"},
  { email: "StanleyHudson@DunderMifflin.com", password: "demouserpassword", display_name: "Stanley Hudson"}
])

demo_community_users = User.create([
  { email: "DeanCraigPelton@greendale.edu", password: "demouserpassword", display_name: "Dean Craig Pelton"},
  { email: "JeffWinger@greendale.edu", password: "demouserpassword", display_name: "Jeff Winger"},
  { email: "AnnieEdison@greendale.edu", password: "demouserpassword", display_name: "Annie Edison"},
  { email: "AbedNadir@greendale.edu", password: "demouserpassword", display_name: "Abed Nadir"},
  { email: "BrittaPerry@greendale.edu", password: "demouserpassword", display_name: "Britta Perry"},
  { email: "TroyBarnes@greendale.edu", password: "demouserpassword", display_name: "Troy Barnes"},
  { email: "PierceHawthorne@greendale.edu", password: "demouserpassword", display_name: "Pierce Hawthorne"},
  { email: "ShirleyBennett@greendale.edu", password: "demouserpassword", display_name: "Shirley Bennett"}
])

demo_app_academy_users = User.create([
  { email: "KyleGinzeburg@appacademy.io", password: "demouserpassword", display_name: "Kyle Ginzeburg"},
  { email: "SeanOdea@appacademy.io", password: "demouserpassword", display_name: "Sean O'dea"},
  { email: "JacksonDooley@appacademy.io", password: "demouserpassword", display_name: "Jackson Dooley"},
  { email: "JohnnyMei@appacademy.io", password: "demouserpassword", display_name: "Johnny Mei"},
  { email: "DominicSwaby@appacademy.io", password: "demouserpassword", display_name: "Dominic Swaby"},
  { email: "DerekLee@appacademy.io", password: "demouserpassword", display_name: "Derek Lee"},
  { email: "ChrisMoore@appacademy.io", password: "demouserpassword", display_name: "Chris Moore"},
  { email: "HermanLee@appacademy.io", password: "demouserpassword", display_name: "Herman Lee"},
  { email: "AminBabar@appacademy.io", password: "demouserpassword", display_name: "Amin Babar"},
  { email: "SpencerLee@appacademy.io", password: "demouserpassword", display_name: "Spencer Lee"},
  { email: "NicholasAngleton@appacademy.io", password: "demouserpassword", display_name: "Nicholas Angleton"},
  { email: "JoeDelaney@appacademy.io", password: "demouserpassword", display_name: "Joe Delaney"},
  { email: "JacobBenowitz@appacademy.io", password: "demouserpassword", display_name: "JacobB enowitz"},
  { email: "HarryIsrael@appacademy.io", password: "demouserpassword", display_name: "Harry Israel"},
  { email: "NaranIvanchukov@appacademy.io", password: "demouserpassword", display_name: "Naran Ivanchukov"}
])

dunderMifflin = Workspace.create(name: "Dunder Mifflin", url: "DunderMifflin.relay.herokuapp", owner_id: demo_office_users[0].id)
greendale = Workspace.create(name: "Greendale", url: "Greendale.relay.herokuapp", owner_id: demo_community_users[0].id)
appacademy = Workspace.create(name: "App Academy", url: "AppAcademy.relay.herokuapp", owner_id: demo_app_academy_users[0].id)

demo_office_users.each { |user| dunderMifflin.members << user unless dunderMifflin.members.include?(user) }
demo_community_users.each { |user| greendale.members << user unless greendale.members.include?(user)}
demo_app_academy_users.each { |user| appacademy.members  << user unless appacademy.members.include?(user) }

dunderMifflin.members << demo_user
greendale.members << demo_user
appacademy.members << demo_user


dunderMifflin.save!
greendale.save!
appacademy.save!

demo_sub = demo_user.subscriptions.first
demo_sub.signed_in = false;
demo_sub.save!
