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
  { email: "AndyBernard@DunderMifflin.com", password: "demouserpassword", display_name: "Andy Bernard"},
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
  { email: "JacobBenowitz@appacademy.io", password: "demouserpassword", display_name: "Jacob Benowitz"},
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
  { name: 'Scranton Branch', description: 'Channel for all Scranton employees', admin_id: office_users[0].id, workspace_id: dunderMifflin.id, public: true, required: true },
  { name: 'Threat Level Midnight',  description: 'He Shoots...He Scores', admin_id: office_users[4].id, workspace_id: dunderMifflin.id, public: false },
  { name: 'Finer Things Club', description: 'Bookclub to discuss finer things', admin_id: office_users[2].id, workspace_id: dunderMifflin.id, public: false },
  { name: 'Dwight\'s Task Force', description: 'Task Force: Perpetrators Beware', admin_id: office_users[3].id, workspace_id: dunderMifflin.id, public: false },
  { name: 'Party Planning Committee', description: 'Nutcracker Christmas', admin_id: office_users[9].id, workspace_id: dunderMifflin.id, public: false },
  { name: 'The Committee to Plan Parties',  description: 'Magarita Karaoke Christmas!!', admin_id: office_users[13].id, workspace_id: dunderMifflin.id, public: true },
  { name: 'Jim\'s Barbeque',  description: 'Don\'t Tell Michael!', admin_id: office_users[1].id, workspace_id: dunderMifflin.id, public: false },
])


channels_greendale = Channel.create([
  { name: 'Greendale Community College', description: 'Go Greendale Human Beings!', admin_id: community_users[0].id, workspace_id: greendale.id, public: true, required: true },
  { name: 'Study Group',  description: 'Spanish 101', admin_id: community_users[1].id, workspace_id: greendale.id, public: false },
  { name: 'Save Garrett', description: 'To save Garrett', admin_id: community_users[2].id, workspace_id: greendale.id, public: true },
  { name: 'Glee Club', description: 'GLEE', admin_id: community_users[3].id, workspace_id: greendale.id, public: false },
  { name: 'Troy and Abed', description: 'Troy and Abed in the Morning!', admin_id: community_users[5].id, workspace_id: greendale.id, public: true },
  { name: 'Psychology 101',  description: 'Free Therapy', admin_id: community_users[4].id, workspace_id: greendale.id, public: true },
])

channels_app_academy = Channel.create([
  { name: '2022-01-31-ny', description: 'In Person Cohort', admin_id: app_academy_users[0].id, workspace_id: appacademy.id, public: true, required: true },
  { name: 'kyle-01-2022-fsp-pm-group', description: 'Let’s get this bread', admin_id: app_academy_users[0].id, workspace_id: appacademy.id, public: false },
])

office_users.each { |user| channels_dunderMifflin[0].members << user unless channels_dunderMifflin[0].members.include?(user) }
office_users.each { |user| channels_dunderMifflin[1].members << user unless channels_dunderMifflin[1].members.include?(user) }

# Finer Things
channels_dunderMifflin[2].members << office_users[9]
channels_dunderMifflin[2].members << office_users[15]
channels_dunderMifflin[2].members << office_users[1]


# Party Planning
channels_dunderMifflin[4].members << office_users[17]

# Committee to Plan Parties
channels_dunderMifflin[5].members << office_users[2]

# bbq
office_users.each { |user| channels_dunderMifflin[6].members << user unless channels_dunderMifflin[6].members.include?(user) || user == office_users[4]}

community_users.each { |user| channels_greendale[0].members << user unless channels_greendale[0].members.include?(user) }
community_users.each { |user| channels_greendale[1].members << user unless channels_greendale[1].members.include?(user) }
community_users.each { |user| channels_greendale[2].members << user unless channels_greendale[1].members.include?(user) }
community_users.each { |user| channels_greendale[3].members << user unless channels_greendale[1].members.include?(user) }
community_users.each { |user| channels_greendale[4].members << user unless channels_greendale[1].members.include?(user) }
community_users.each { |user| channels_greendale[5].members << user unless channels_greendale[1].members.include?(user) }


# Add demo user
dunderMifflin.members << demo_user
greendale.members << demo_user
appacademy.members << demo_user
dunderMifflin.save!
greendale.save!
appacademy.save!

channels_greendale.each { |channel| channel.members << demo_user }
channels_greendale.each { |channel| channel.save! }

channels_app_academy.each { |channel| channel.members << demo_user }
channels_app_academy.each { |channel| channel.save! }

channels_dunderMifflin.each { |channel| channel.members << demo_user }
channels_dunderMifflin.each { |channel| channel.save! }

demo_sub = demo_user.subscriptions.last
demo_sub.signed_in = false;
demo_sub.save!

# 4 michael, 6 jan
channels_dunderMifflin[0].messages.create([
  {body: "So when we get to the Radisson, I'd like to, um-", author_id: office_users[6].id },
  {body: "I changed it. To Chili's.", author_id: office_users[4].id },
  {body: "Excuse me?", author_id: office_users[6].id },
  {body: "Radisson just gives out this vibe, 'Oh, I'm doing business at the Radisson'. It's kind of snooty. So.", author_id: office_users[4].id },
  {body: "You had no right to do that, Michael.", author_id: office_users[6].id },
  {body: "Here's the thing. Chili's is the new golf course. It's where business happens. Small Businessman Magazine.", author_id: office_users[4].id },
  {body: "It said that.", author_id: office_users[6].id },
  {body: "It will. I sent it in. Letter to the editor.", author_id: office_users[4].id },
  {body: "Alright. But you will let me run this meeting.", author_id: office_users[6].id },
  {body: "Uh huh, uh huh. [under his breath] Power trip.", author_id: office_users[4].id},
  {body: "What?", author_id: office_users[6].id },
])

# 1 jim, 2 pam
channels_dunderMifflin[2].messages.create([
  {body: "So tell me again why I can’t be part of your club?", author_id: office_users[1].id },
  {body: "Because some people think you monopolize the conversation by trying to be funny.", author_id: office_users[2].id },
  {body: "Oscar?", author_id: office_users[1].id },
  {body: "Some people.", author_id: office_users[2].id },
])

# 1 jim, 3 dwight
channels_dunderMifflin[6].messages.create([
  {body: "Question: on the Internet there are several different options to get to your house for the party tonight-", author_id: office_users[3].id },
  {body: "Oh, uh, no. Could-", author_id: office_users[1].id },
  {body: "I was wondering-", author_id: office_users[3].id },
  {body: "Could, keep that down.", author_id: office_users[1].id },
  {body: "Why?", author_id: office_users[3].id },
  {body: "Because not everybody knows about the party.", author_id: office_users[1].id },
  {body: "Like who? Who doesn’t know?", author_id: office_users[3].id },
  {body: "Umm, Michael.", author_id: office_users[1].id },
  {body: "Why just Michael?", author_id: office_users[3].id },
  {body: "Because it’s a surprise.", author_id: office_users[1].id },
  {body: "Is it?", author_id: office_users[3].id },
  {body: "Uh hmm.", author_id: office_users[1].id },
  {body: "Oh, that’s perfect!", author_id: office_users[3].id },
  {body: "So, don’t tell.", author_id: office_users[1].id },
  {body: "I won’t.", author_id: office_users[3].id },
  {body: "Ok.", author_id: office_users[1].id },
])


office_direct_messages = DirectMessage.create([
  { workspace_id: dunderMifflin.id, user_ids: [office_users[1].id, office_users[2].id] },
  { workspace_id: dunderMifflin.id, user_ids: [office_users[3].id, office_users[9].id] },
  { workspace_id: dunderMifflin.id, user_ids: [office_users[4].id, office_users[10].id] },
  { workspace_id: dunderMifflin.id, user_ids: [office_users[9].id, office_users[2].id, office_users[17].id] },
  { workspace_id: dunderMifflin.id, user_ids: [office_users[12].id, office_users[15].id, office_users[16].id] },
])


office_direct_messages[0].messages.create([
  {body: "Wow. I don't know how you're gonna decide. They are all extremely good.", author_id: office_users[1].id },
  {body: "I think I should hire them all. Do like Lollapalooza.", author_id: office_users[2].id },
  {body: "Yes.", author_id: office_users[1].id },
  {body: "Have three stages, yeah.", author_id: office_users[2].id },
  {body: "Your mom would love that. She would. Oh, this band is called Scrantonicity.", author_id: office_users[1].id },
  {body: "Oh.", author_id: office_users[2].id },
  {body: "Let's take a look. Nice.", author_id: office_users[1].id },
  {body: "Oh, wait. That's Kevin. On the drums.", author_id: office_users[2].id },
  {body: "What?", author_id: office_users[1].id },
  {body: "On the drums! On the drums!", author_id: office_users[2].id },
  {body: "Oh, my God, that's Kevin! Great song, Kev. Oh, my God, he's the drummer and the singer.", author_id: office_users[1].id },
])

office_direct_messages[1].messages.create([
  {body: "Hello Angela. Did you hear, somebody rocked the house and got me the best present I've ever gotten.", author_id: office_users[3].id },
  {body: "Really? I wouldn't know anything about that, but I'm glad you enjoyed it.", author_id: office_users[9].id },
  {body: "Oh I did. I did.", author_id: office_users[3].id },
  {body: "I didn't get anything for Valentine's Day", author_id: office_users[9].id },
  {body: "Oh, I bet you will before the day is over.", author_id: office_users[3].id },
  {body: "Really? Well, I hope I do.", author_id: office_users[9].id },
])


office_direct_messages[2].messages.create([
  {body: "The full story is that Randall resigned because of sexual harassment. So Corporate asked me to do a five minute review of the Company Sexual Harassment policy.", author_id: office_users[10].id },
  {body: "No, no, Toby. No.", author_id: office_users[4].id },
  {body: "It's really not a big deal, Michael.", author_id: office_users[10].id },
  {body: "It is a big deal. It's a big deal! What are we supposed to do? Scrutinize every little thing we say and do all day? I mean, come on!", author_id: office_users[4].id },
  {body: "And then Corporate is going to send in a lawyer...", author_id: office_users[10].id },
  {body: "What?", author_id: office_users[4].id },
  {body: "Just to refresh you...", author_id: office_users[10].id },
  {body: "NO!", author_id: office_users[4].id },
  {body: "on our policy.", author_id: office_users[10].id },
  {body: "What? He! No! Okay, what is a lawyer going to come in and tell us? To not send out hilarious emails or not tell jokes?", author_id: office_users[4].id },
  {body: "Maybe not some of them. Maybe not inappropriate ones.", author_id: office_users[10].id },
  {body: "There is no such thing as an appropriate joke. That's why it's a joke.", author_id: office_users[4].id },
])


office_direct_messages[3].messages.create([
  {body: "I think it's alright. Jesus drank wine.", author_id: office_users[9].id },
  {body: "Hey Phyllis, come here for a second.", author_id: office_users[2].id },
  {body: "Sure.", author_id: office_users[17].id },
  {body: "Have you heard anything about any secret office romances?", author_id: office_users[2].id },
  {body: "You tell me. Well, you do mean you and Jim right? Oh God. I am so sorry, I thought, you guys hang out all the time and you're talking all the time. I'm sorry!", author_id: office_users[17].id },
  {body: "That's ok. It's ok.", author_id: office_users[2].id },
])

office_direct_messages[4].messages.create([
  {body: "I didn't think the premium laser color copy batch would sell as well as it did.", author_id: office_users[16].id },
  {body: "Yeah, it surprised us all. I'll tell you why. Because when they-", author_id: office_users[15].id },
  {body: "I'm sorry guys, can we please not talk about paper? There's gotta be something else we can talk about.", author_id: office_users[12].id },
])

office_direct_messages.each { |dm| dm.members << demo_user }