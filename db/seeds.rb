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
demo_user = User.create!(email: "DemoUser@gmail.com", password: "demouserpassword", display_name: "Demo User");

office_users = User.create!([
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

community_users = User.create!([
  { email: "DeanCraigPelton@greendale.edu", password: "demouserpassword", display_name: "Dean Craig Pelton"},
  { email: "JeffWinger@greendale.edu", password: "demouserpassword", display_name: "Jeff Winger"},
  { email: "AnnieEdison@greendale.edu", password: "demouserpassword", display_name: "Annie Edison"},
  { email: "AbedNadir@greendale.edu", password: "demouserpassword", display_name: "Abed Nadir"},
  { email: "BrittaPerry@greendale.edu", password: "demouserpassword", display_name: "Britta Perry"},
  { email: "TroyBarnes@greendale.edu", password: "demouserpassword", display_name: "Troy Barnes"},
  { email: "PierceHawthorne@greendale.edu", password: "demouserpassword", display_name: "Pierce Hawthorne"},
  { email: "ShirleyBennett@greendale.edu", password: "demouserpassword", display_name: "Shirley Bennett"}
])

app_academy_users = User.create!([
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

dunderMifflin = Workspace.create!(name: "Dunder Mifflin", url: "DunderMifflin.relay.herokuapp", owner_id: office_users[0].id)
greendale = Workspace.create!(name: "Greendale", url: "Greendale.relay.herokuapp", owner_id: community_users[0].id)
appacademy = Workspace.create!(name: "App Academy", url: "AppAcademy.relay.herokuapp", owner_id: app_academy_users[0].id)

office_users.each { |user| dunderMifflin.members << user unless dunderMifflin.members.include?(user) }
community_users.each { |user| greendale.members << user unless greendale.members.include?(user)}
app_academy_users.each { |user| appacademy.members  << user unless appacademy.members.include?(user) }

dunderMifflin.save!
greendale.save!
appacademy.save!

channels_dunderMifflin = Channel.create!([
  { name: 'Scranton Branch', description: 'Channel for all Scranton employees', admin_id: office_users[0].id, workspace_id: dunderMifflin.id, public: true, required: true },
  { name: 'Threat Level Midnight',  description: 'He Shoots...He Scores', admin_id: office_users[4].id, workspace_id: dunderMifflin.id, public: true },
  { name: 'Finer Things Club', description: 'Bookclub to discuss finer things', admin_id: office_users[2].id, workspace_id: dunderMifflin.id, public: false },
  { name: 'Dwight\'s Task Force', description: 'Task Force: Perpetrators Beware', admin_id: office_users[3].id, workspace_id: dunderMifflin.id, public: true },
  { name: 'Party Planning Committee', description: "Kelly's Birthday", admin_id: office_users[1].id, workspace_id: dunderMifflin.id, public: true },
  { name: 'Office Olympics',  description: 'Magarita Karaoke Christmas!!', admin_id: office_users[1].id, workspace_id: dunderMifflin.id, public: true },
  { name: 'Jim\'s Barbeque',  description: 'Don\'t Tell Michael!', admin_id: office_users[1].id, workspace_id: dunderMifflin.id, public: false },
])


channels_greendale = Channel.create!([
  { name: 'Greendale Community College', description: 'Go Greendale Human Beings!', admin_id: community_users[0].id, workspace_id: greendale.id, public: true, required: true },
  { name: 'Study Group',  description: 'Spanish 101', admin_id: community_users[1].id, workspace_id: greendale.id, public: false },
  { name: 'Save Garrett', description: 'To save Garrett', admin_id: community_users[2].id, workspace_id: greendale.id, public: true },
  { name: 'Glee Club', description: 'GLEE', admin_id: community_users[3].id, workspace_id: greendale.id, public: false },
  { name: 'Troy and Abed', description: 'Troy and Abed in the Morning!', admin_id: community_users[5].id, workspace_id: greendale.id, public: true },
  { name: 'Psychology 101',  description: 'Free Therapy', admin_id: community_users[4].id, workspace_id: greendale.id, public: true },
])

channels_app_academy = Channel.create!([
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
channels_dunderMifflin[4].members << office_users[3]
channels_dunderMifflin[4].members << office_users[12]

# Office Olympics
office_users.each { |user| channels_dunderMifflin[5].members << user unless channels_dunderMifflin[5].members.include?(user) }

# bbq
office_users.each { |user| channels_dunderMifflin[6].members << user unless channels_dunderMifflin[6].members.include?(user) || user == office_users[4]}

community_users.each { |user| channels_greendale[0].members << user unless channels_greendale[0].members.include?(user) }
community_users.each { |user| channels_greendale[1].members << user unless channels_greendale[1].members.include?(user) }
community_users.each { |user| channels_greendale[2].members << user unless channels_greendale[1].members.include?(user) }
community_users.each { |user| channels_greendale[3].members << user unless channels_greendale[1].members.include?(user) }
community_users.each { |user| channels_greendale[4].members << user unless channels_greendale[1].members.include?(user) }
community_users.each { |user| channels_greendale[5].members << user unless channels_greendale[1].members.include?(user) }


app_academy_users.each { |user| channels_app_academy[0].members << user unless channels_app_academy[0].members.include?(user) }
app_academy_users.each { |user| channels_app_academy[1].members << user unless channels_app_academy[1].members.include?(user) }


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
demo_sub.connected = false;
demo_sub.save!

channels_dunderMifflin[0].messages.create!([
  {body: "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.", author_id: office_users[4].id },
  {body: "I’m not superstitious, but I am a little stitious.", author_id: office_users[4].id },
  {body: "If I don’t have some cake soon, I might die.", author_id: office_users[15].id },
  {body: "I just want to lie on the beach and eat hot dogs. That’s all I’ve ever wanted.", author_id: office_users[7].id },
  {body: "Sometimes the clothes at Gap Kids are too flashy, so I’m forced to go to the American Girl store and order clothes for large colonial dolls.", author_id: office_users[9].id },
  {body: "I talk a lot, so I’ve learned to tune myself out.", author_id: office_users[12].id },
  {body: "A few years ago, my family was on a safari in Africa and my cousin, Mufasa, was um, he was trampled to death by a pack of wildebeests and um, we all took it really hard.", author_id: office_users[8].id },
  {body: "I run a small fake ID company from my car with a laminating machine that I swiped from the Sheriff’s station.", author_id: office_users[14].id },
  {body: "There’s a lot of beauty in ordinary things. Isn’t that kind of the point?", author_id: office_users[2].id },
  {body: "And I knew exactly what to do. But in a much more real sense, I had no idea what to do.", author_id: office_users[4].id },
])

channels_dunderMifflin[1].messages.create!([
  {body: "After three years of writing, one year of shooting, four years of re-shooting and two years of editing, I have finally completed my movie, Threat Level: Midnight.", author_id: office_users[4].id },
  {body: "I play Samuel, Michael Scarn’s robot butler. I wanted Samuel’s voice- [robot impression] to be like this! [normally] But Michael thought that Samuel should be a very advance android, almost indistinguishable from a real person.", author_id: office_users[3].id },
  {body: "Dwight does not play a robot.", author_id: office_users[4].id },
  {body: "Threat Level: Midnight is the great lost film of Michael Scott.", author_id: office_users[1].id },
  {body: "We’re all in it, from like years and years ago. It’s like a home movie.", author_id: office_users[2].id },
  {body: "Yeah, if Michael Scott did your home movie!", author_id: office_users[1].id },
  {body: "I did not love the dialogue. Or the character. I took the role to impress a receptionist who will remain nameless. ", author_id: office_users[1].id },
  {body: "A man, sitting several seats down, who has a gold face, turns to Michael Scarn. Oscar, do you want to play Goldenface?", author_id: office_users[1].id },
  {body: "Mr. Scarn, perhpas you would be more comfortable in my private jet.", author_id: office_users[15].id },
  {body: "Yes, perhaps I would, Golden Face. Sam, get my luggage.", author_id: office_users[3].id },
  {body: "I forget it, brother", author_id: office_users[8].id },
  {body: "Samuel, you are such an idiot, you are the worst assistant ever. And you're disugsting, Dwigt. Wait, who's Dwigt?", author_id: office_users[3].id },
])


# 1 jim, 2 pam
channels_dunderMifflin[2].messages.create!([
  {body: "So tell me again why I can’t be part of your club?", author_id: office_users[1].id },
  {body: "Because some people think you monopolize the conversation by trying to be funny.", author_id: office_users[2].id },
  {body: "Oscar?", author_id: office_users[1].id },
  {body: "Some people.", author_id: office_users[2].id },
])

channels_dunderMifflin[3].messages.create!([
  {body: "Whenever I'm about to do something, I think 'Would an idiot do that?' And if they would, I do not do that thing.", author_id: office_users[3].id },
  {body: "Security in this office park is a joke. Last year I came to work with my spud-gun in a duffel bag. I sat at my desk all day with a rifle that shoots potatoes at 60 pounds per square inch. Can you imagine if I was deranged?", author_id: office_users[3].id },
  {body: "I saw 'Wedding Crashers' accidentally. I bought a ticket for 'Grizzly Man' and went into the wrong theater. After an hour, I figured I was in the wrong theater but I kept waiting. Cause that's the thing about bear attacks... they come when you least expect it.", author_id: office_users[3].id },
])

channels_dunderMifflin[4].messages.create!([
  {body: "My boyfriend dumped me, so, I stole his boat. I mean, he told me it was his boat. It was actually his father’s. And I just thought it’d be really romantic, like ‘Thelma and Louise,’ but with, like, a boat. And it was the worst year of my life. And I can’t believe that you guys are making me talk about this on my birthday!", author_id: office_users[12].id },
  {body: "I thought you said yesterday was your birthday!", author_id: office_users[3].id },
  {body: "Hey, you know what? I got you a cake.", author_id: office_users[1].id },
  {body: "You did? I wanna see the cake.", author_id: office_users[12].id },
  {body: "And… ta da.", author_id: office_users[1].id },
  {body: "I hate it.", author_id: office_users[12].id },
  {body: "How do you hate it? It’s a cake.", author_id: office_users[1].id },
  {body: "Well, there’s no flowers… or toys… or— I mean, there’s nothing on it. Where did you even find a cake like this? I mean, it doesn’t have my name on it! Do you guys know what my name is? My name is Kelly!", author_id: office_users[12].id },
  {body: "Right", author_id: office_users[1].id },
  {body: "[To Dwight] Are you kidding?", author_id: office_users[1].id },
  {body: "Well I'm not done yet.", author_id: office_users[3].id },
  {body: "Dwight, this, fits in the palm of my hand. You haven't blown them up enough. Why have you chosen brown and gray balloons?", author_id: office_users[1].id },
  {body: "They match the carpet.", author_id: office_users[3].id },
  {body: "What is that? 'It is your birthday' period.", author_id: office_users[1].id },
  {body: "It's a statement of fact.", author_id: office_users[3].id },
  {body: "Not even an exclamation point?", author_id: office_users[1].id },
])

channels_dunderMifflin[5].messages.create!([
  {body: "The thing about Jim is when he's excited about something, like the Office Olympics, he gets really into it and he does a really great job. But the problem with Jim is that he works here, so that hardly ever happens.", author_id: office_users[2].id },
  {body: "This scented candle... andle... andle, that I found in the men's bathroom... room... room, represents the eternal burning of competition or something.", author_id: office_users[1].id },
  {body: "Yeah, I got a game. It’s called ‘work hard so my kids can go to college’.", author_id: office_users[15].id },
  {body: "I do play games. I sing and I dangle things in front of my cats. I play lots of games.", author_id: office_users[9].id },
  {body: "Okay, we will be competing for gold, silver and bronze yogurt lids.", author_id: office_users[1].id },
  {body: "Now the bronze are really blue, and they're also the back side of the gold. So no flipping, okay? Honor system.", author_id: office_users[2].id },
])

# 1 jim, 3 dwight
channels_dunderMifflin[6].messages.create!([
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


office_direct_messages = DirectMessage.create!([
  { workspace_id: dunderMifflin.id, user_ids: [office_users[1].id, office_users[2].id], creator_id: office_users[1].id },
  { workspace_id: dunderMifflin.id, user_ids: [office_users[3].id, office_users[9].id], creator_id: office_users[3].id },
  { workspace_id: dunderMifflin.id, user_ids: [office_users[4].id, office_users[10].id], creator_id: office_users[4].id },
  { workspace_id: dunderMifflin.id, user_ids: [office_users[9].id, office_users[2].id, office_users[17].id], creator_id: office_users[9].id },
  { workspace_id: dunderMifflin.id, user_ids: [office_users[12].id, office_users[15].id, office_users[16].id], creator_id: office_users[12].id },
  { workspace_id: dunderMifflin.id, user_ids: [office_users[4].id, office_users[6].id], creator_id: office_users[6].id },
])


office_direct_messages[0].messages.create!([
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

office_direct_messages[1].messages.create!([
  {body: "Hello Angela. Did you hear, somebody rocked the house and got me the best present I've ever gotten.", author_id: office_users[3].id },
  {body: "Really? I wouldn't know anything about that, but I'm glad you enjoyed it.", author_id: office_users[9].id },
  {body: "Oh I did. I did.", author_id: office_users[3].id },
  {body: "I didn't get anything for Valentine's Day", author_id: office_users[9].id },
  {body: "Oh, I bet you will before the day is over.", author_id: office_users[3].id },
  {body: "Really? Well, I hope I do.", author_id: office_users[9].id },
])


office_direct_messages[2].messages.create!([
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


office_direct_messages[3].messages.create!([
  {body: "I think it's alright. Jesus drank wine.", author_id: office_users[9].id },
  {body: "Hey Phyllis, come here for a second.", author_id: office_users[2].id },
  {body: "Sure.", author_id: office_users[17].id },
  {body: "Have you heard anything about any secret office romances?", author_id: office_users[2].id },
  {body: "You tell me. Well, you do mean you and Jim right? Oh God. I am so sorry, I thought, you guys hang out all the time and you're talking all the time. I'm sorry!", author_id: office_users[17].id },
  {body: "That's ok. It's ok.", author_id: office_users[2].id },
])

office_direct_messages[4].messages.create!([
  {body: "I didn't think the premium laser color copy batch would sell as well as it did.", author_id: office_users[16].id },
  {body: "Yeah, it surprised us all. I'll tell you why. Because when they-", author_id: office_users[15].id },
  {body: "I'm sorry guys, can we please not talk about paper? There's gotta be something else we can talk about.", author_id: office_users[12].id },
])

# 4 michael, 6 jan
office_direct_messages[5].messages.create!([
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

# GCC
channels_greendale[0].messages.create!([
  {body: "Uh, good morning! Uh, many of you are halfway through your first week at Greendale and, uh, as your Dean I thought I would share a few thoughts of wisdom and inspiration. What is community college? Well, you've heard all kinds of things. You've heard it's 'loser college' for remedial teens, twenty-something drop-outs, middle-aged divorcees, and old people keeping their minds active as they circle the drain of eternity. That's what you heard, however... I wish you luck! Okay, you know, uh-oh...there's actually more to this speech there is a middle card that is missing. Can we all look in our immediate areas...?", author_id: community_users[0].id },
  {body: "You are all better than you think you are, you are just designed not to believe it when you hear it from yourself.", author_id: community_users[1].id },
  {body: "Attention, students, this is Abed.", author_id: community_users[3].id },
  {body: "And the disco spider", author_id: community_users[5].id },
  {body: "A few quick announcements. Announcement number one. All announcements will be cool, starting right now", author_id: community_users[3].id },
  {body: "On security news, you guys gotta start locking the dean's door so guys like us don't get in.", author_id: community_users[5].id },
])

# Study Group
channels_greendale[1].messages.create!([
  {body: "Our first assignment is a documentary. The're like real movies, but with ugly people.", author_id: community_users[3].id },
  {body: "I looked inside Nicolas Cage and I found a secret: People are random and pointless.", author_id: community_users[3].id },
  {body: "$60?! Hello? Rich people, Troy's joining you. Yes, I'll hold.", author_id: community_users[5].id },
  {body: "We are 40 light years outside of the Buttermilk Nebula. Although, it is possible…yeah, it's a sticker.", author_id: community_users[5].id },
  {body: "I lived in New York, Troy. I know what a 'baggle' is.", author_id: community_users[4].id },
  {body: "Abed, have you been racist this whole time while I'm telling everybody at church what a sweet little caramel angel you are?", author_id: community_users[7].id },
  {body: "She was born in the '80s. She still uses her phone as a phone!", author_id: community_users[5].id },
  {body: "TV's rules aren't based on common sense. They're based on the studio wanting to milk their profits dry.", author_id: community_users[3].id },
])

# Save Garrett
channels_greendale[2].messages.create!([
  {body: "Are you saying I've had a locker here for 2 1/2 years?", author_id: community_users[1].id },
  {body: "Whoa, whoa. Wow. ", author_id: community_users[1].id },
  {body: "Halloween dance.' 'Post-Halloween dance.' 'Dance contest.' 'Contest dance.' Oh, come on. What's this? 'Save Garrett'? What's wrong with Garrett?", author_id: community_users[1].id },
  {body: "Nothing now. We saved him.", author_id: community_users[2].id },
  {body: "Wait, that's 'saved' Garrett? ", author_id: community_users[1].id },
])

# GLEE
channels_greendale[3].messages.create!([
  {body: "The Glee club is at Westside Hospital recuperating from a collective nervous breakdown.", author_id: community_users[0].id },
  {body: "Oh please, not liking Glee club doesn't make us bullies and implying that is reverse bully-ism!", author_id: community_users[1].id },
  {body: "Merry Christmas everyone. The Glee club just became the History club.", author_id: community_users[1].id },
  {body: "Hey guys, rapping?", author_id: community_users[2].id },
  {body: "Yep. Wanna join us?", author_id: community_users[3].id },
  {body: "Totally! Wait, you guys never let me rap with you.", author_id: community_users[2].id },
  {body: "Well we’re gonna need all hands on deck if we’re gonna go to regionals.", author_id: community_users[5].id },
  {body: "Cool…I just need to, study, though…in my room. So have fun.", author_id: community_users[2].id },
  {body: "And then this morning, I could hear them in the bathroom doing country western mash-ups. And they won’t stop talking about regionals.", author_id: community_users[2].id },
])

# Troy and Abed
channels_greendale[4].messages.create!([
  {body: "Psst, Troy, it's me!", author_id: community_users[3].id },
  {body: "...Abed?", author_id: community_users[5].id },
  {body: "I made it through, I'm a cartoon now", author_id: community_users[3].id },
  {body: "That's impossible", author_id: community_users[5].id },
  {body: "Nothings impossible in here. Animals can talk, animals can talk, your heart is shaped like a heart and the smell of pies can make you float. You have to believe Troy!", author_id: community_users[3].id },
  {body: "Wait, you don't have to believe!", author_id: community_users[3].id },
  {body: "I didn't... I didn't", author_id: community_users[5].id },
  {body: "I may have done some damage there", author_id: community_users[3].id },
])

# Psychology 101
channels_greendale[5].messages.create!([
  {body: "Psychology tells us there are no accidents.", author_id: community_users[4].id },
  {body: "Calling for help? A classic...call for help.", author_id: community_users[4].id },
  {body: "Everything is terrible.", author_id: community_users[4].id },
  {body: "Have you been watching Dance Moms again?", author_id: community_users[2].id },
  {body: "Do you even know what an analogy is?", author_id: community_users[1].id },
  {body: "It's a a thought... with another thought's hat on.", author_id: community_users[4].id },
])

greendale_direct_messages = DirectMessage.create!([
  { workspace_id: greendale.id, user_ids: [community_users[1].id, community_users[4].id], creator_id: community_users[1].id },
])

greendale_direct_messages[0].messages.create!([
  {body: "What's that complex called when you're wrong about everything?", author_id: office_users[1].id },
  {body: "Ah sarcasm, from the man with the mother of all daddy issues.", author_id: office_users[4].id },
  {body: "His whole personality is based around guarding himself. You don't have to be like that to be a man.", author_id: office_users[4].id },
  {body: "Women have a connection to their bodies you could never understand", author_id: office_users[4].id },
  {body: "You have a booger.", author_id: office_users[1].id },
  {body: "I know. It's a part of me.", author_id: office_users[4].id },
])

channels_app_academy[0].messages.create!([
  {body: "What is meta programming?", author_id: app_academy_users[2].id },
  {body: "Congratulations all on getting perfect scores on Rails Olympics!", author_id: app_academy_users[0].id },
  {body: "Hey, could someone help me with using 3js?", author_id: app_academy_users[7].id },
  {body: "What is meta programming?", author_id: app_academy_users[2].id },

])

channels_app_academy[1].messages.create!([
  {body: "Your projects all look great! Keep it up!", author_id: app_academy_users[0].id },
  {body: "Wait, everythings broken and I have no idea what is going on!?", author_id: app_academy_users[5].id },
  {body: "Never mind I was missing a semicolon", author_id: app_academy_users[5].id },
  {body: "Kyle could we set up a 1-on-1?", author_id: app_academy_users[1].id },
])


office_direct_messages.each { |dm| dm.members << demo_user }
greendale_direct_messages.each { |dm| dm.members << demo_user }
