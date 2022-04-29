# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Workspace.destroy_all
Channel.destroy_all
demo_user = User.create(email: "DemoUser@gmail.com", password: "demouserpassword", display_name: "Demo User");

office_users = User.create([
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
  { email: "StanleyHudson@DunderMifflin.com", password: "demouserpassword", display_name: "Stanley Hudson"},
  { email: "PhyllisVance@DunderMifflin.com", password: "demouserpassword", display_name: "Phyllis Vance" }
])

community_users = User.create([
  { email: "DeanCraigPelton@greendale.edu", password: "demouserpassword", display_name: "Dean Craig Pelton"},
  { email: "JeffWinger@greendale.edu", password: "demouserpassword", display_name: "Jeff Winger"},
  { email: "AnnieEdison@greendale.edu", password: "demouserpassword", display_name: "Annie Edison"},
  { email: "AbedNadir@greendale.edu", password: "demouserpassword", display_name: "Abed Nadir"},
  { email: "BrittaPerry@greendale.edu", password: "demouserpassword", display_name: "Britta Perry"},
  { email: "TroyBarnes@greendale.edu", password: "demouserpassword", display_name: "Troy Barnes"},
  { email: "PierceHawthorne@greendale.edu", password: "demouserpassword", display_name: "Pierce Hawthorne"},
  { email: "ShirleyBennett@greendale.edu", password: "demouserpassword", display_name: "Shirley Bennett"}
])

app_academy_users = User.create([
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

dunderMifflin = Workspace.create(name: "Dunder Mifflin", url: "DunderMifflin.relay.herokuapp", owner_id: office_users[0].id)
greendale = Workspace.create(name: "Greendale", url: "Greendale.relay.herokuapp", owner_id: community_users[0].id)
appacademy = Workspace.create(name: "App Academy", url: "AppAcademy.relay.herokuapp", owner_id: app_academy_users[0].id)

office_users.each { |user| dunderMifflin.members << user unless dunderMifflin.members.include?(user) }
community_users.each { |user| greendale.members << user unless greendale.members.include?(user)}
app_academy_users.each { |user| appacademy.members  << user unless appacademy.members.include?(user) }

dunderMifflin.save!
greendale.save!
appacademy.save!

channels_dunderMifflin = Channel.create([
  { name: 'Scranton Branch', description: 'Channel for all Scranton employees', admin_id: office_users[0].id, workspace_id: dunderMifflin.id, public: true },
  { name: 'Threat Level Midnight',  description: 'He Shoots...He Scores', admin_id: office_users[4].id, workspace_id: dunderMifflin.id, public: false },
  { name: 'Finer Things Club', description: 'Bookclub to discuss finer things', admin_id: office_users[2].id, workspace_id: dunderMifflin.id, public: false },
  { name: 'Dwight\'s Task Force', description: 'Task Force: Perpetrators Beware', admin_id: office_users[3].id, workspace_id: dunderMifflin.id, public: false },
  { name: 'Party Planning Committee', description: 'Nutcracker Christmas', admin_id: office_users[9].id, workspace_id: dunderMifflin.id, public: false },
  { name: 'The Committee to Plan Parties',  description: 'Magarita Karaoke Christmas!!', admin_id: office_users[13].id, workspace_id: dunderMifflin.id, public: true },
])


office_users.each { |user| channels_dunderMifflin[0].members << user unless channels_dunderMifflin[0].members.include?(user) }
office_users.each { |user| channels_dunderMifflin[1].members << user unless channels_dunderMifflin[0].members.include?(user) }

# Finer Things
channels_dunderMifflin[2].members << office_users[9]
channels_dunderMifflin[2].members << office_users[15]

# Party Planning
channels_dunderMifflin[4].members << office_users[17]

# Committee to Plan Parties
channels_dunderMifflin[5].members << office_users[2]

# Add demo user
dunderMifflin.members << demo_user
greendale.members << demo_user
appacademy.members << demo_user
dunderMifflin.save!
greendale.save!
appacademy.save!

channels_dunderMifflin.each { |channel| channel.members << demo_user }
channels_dunderMifflin.each { |channel| channel.save! }
demo_sub = demo_user.subscriptions.first
demo_sub.signed_in = false;
demo_sub.save!
