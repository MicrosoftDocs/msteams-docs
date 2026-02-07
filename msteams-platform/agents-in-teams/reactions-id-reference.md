---
title: Teams Reactions ID Reference
description: Complete reference guide for Microsoft Teams reaction IDs, including all reactions with skin tone support for bot development and app integrations.
ms.topic: reference
ms.date: 02/04/2026
---

# Teams Reactions ID Reference

Complete reference for all Microsoft Teams reaction IDs. Use `Ctrl+F` to search by name or ID.

## How to Use

Reference reactions by their unique ID:

```json
{ "reactionId": "like" }
```

**Skin tone support:** Reactions marked with 🎨 support 5 skin tone variants. Append `-tone1` through `-tone5` to the base ID:

| Suffix | Visual | Description | ReactionId |
|--------|--------|-------------|------------|
| `-tone1` | 👍 | Light |`like`|
| `-tone2` | 👍🏼 | Medium-light | `like-tone2`|
| `-tone3` | 👍🏽 | Medium | `like-tone3` |
| `-tone4` | 👍🏾 | Medium-dark | `like-tone4`|
| `-tone5` | 👍🏿 | Dark | `like-tone5` |

**Example:** `like-tone3` for medium skin tone thumbs up 👍🏽

## Categories

[Smileys](#smileys) | [Hand Gestures](#hand-gestures) | [People](#people) | [Animals & Nature](#animals--nature) | [Food & Drink](#food--drink) | [Travel & Places](#travel--places) | [Objects](#objects) | [Activities & Sports](#activities--sports) | [Symbols](#symbols)

---

## Smileys

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 😃 | Grinning face with big eyes | `1f603_grinningfacewithbigeyes` |
| 😃 | Happy face | `happyface` |
| 😄 | Grinning face with smiling eyes | `grinningfacewithsmilingeyes` |
| 😁 | Beaming face with smiling eyes | `1f601_beamingfacewithsmilingeyes` |
| 😆 | Laugh | `laugh` |
| 😅 | Sweat grinning | `sweatgrinning` |
| 🤣 | Rolling on the floor laughing | `rofl` |
| 😂 | Crying with laughter | `cwl` |
| 🙂 | Smile | `smile` |
| 🙃 | Upside down face | `upsidedownface` |
| 🫠 | Melting face | `meltingface` |
| 😉 | Wink | `wink` |
| 😊 | Smile eyes | `smileeyes` |
| 😇 | Angel | `angel` |
| 🥰 | In love | `inlove` |
| 😍 | Heart eyes | `hearteyes` |
| 🤩 | Star eyes | `stareyes` |
| 😘 | Face blowing a kiss | `1f618_facethrowingakiss` |
| 😗 | Kiss | `kiss` |
| ☺️ | Mmmmm… | `mmm` |
| 😚 | Kissing face with closed eyes | `1f61a_kissingfacewithclosedeyes` |
| 😙 | Kissing face with smiling eyes | `1f619_kissingfacewithsmilingeyes` |
| 🥲 | Smiling face with tear | `smilingfacewithtear` |
| 😋 | Cheeky | `tongueout` |
| 😛 | Face with tongue | `1f61b_facewithtongue` |
| 😜 | Winking tongue out | `winktongueout` |
| 🤪 | Zany face | `1f92a_zanyface` |
| 😝 | Squinting face with tongue | `squintingfacewithtongue` |
| 🤑 | Money mouth face | `1f911_moneymouthface` |
| 🤗 | Hugging face | `1f917_huggingface` |
| 🤭 | Giggle | `giggle` |
| 🫢 | Hand over mouth | `handovermouth` |
| 🫣 | Peeking eye | `peekingeye` |
| 🤫 | My lips are sealed | `lipssealed` |
| 🤔 | Thinking | `think` |
| 🫡 | Saluting face | `salute` |
| 🤐 | Zipper mouth face | `1f910_zippermouthface` |
| 🤨 | Wondering | `wonder` |
| 😐 | Speechless | `speechless` |
| 😑 | Expressionless | `expressionless` |
| 😶 | Face without mouth | `blankface` |
| 🫥 | Dotted line face | `dottedlineface` |
| 😶‍🌫️ | Face in clouds | `faceinclouds` |
| 😏 | Smirking | `smirk` |
| 😒 | Unamused | `unamused` |
| 🙄 | Dull | `dull` |
| 😬 | Grimacing face | `1f62c_grimacingface` |
| 😮‍💨 | Face exhaling | `faceexhaling` |
| 🤥 | Lying face | `1f925_lyingface` |
| 🫨 | Shaking Head | `shaking` |
| 🙂‍↕️ | Head shaking vertically | `headshakingvertically2` |
| 🙂‍↔️ | Head shaking horizontally | `headshakinghorizontally2` |
| 😌 | Relieved | `relieved` |
| 😔 | Pensive | `pensive` |
| 😪 | Sleepy | `sleepy` |
| 🤤 | Drooling face | `1f924_droolingface` |
| 😴 | Sleeping face | `sleepingface` |
| 😷 | Face with medical mask | `1f637_facewithmedicalmask` |
| 🤒 | Ill | `ill` |
| 🤕 | Face with head bandage | `1f915_facewithheadbandage` |
| 🤢 | Nauseated face | `1f922_nauseatedface` |
| 🤮 | Vomiting | `puke` |
| 🤧 | Sneezing face | `1f927_sneezingface` |
| 🥵 | Hotface | `1f975_hotface` |
| 🥶 | Cold shivering | `shivering` |
| 🥱 | Morning after party | `hungover` |
| 😵 | Dizzy face | `1f635_dizzyface` |
| 😵‍💫 | Face with spiral eyes | `facewithspiraleyes` |
| 🤯 | Exploding head | `1f92f_explodinghead` |
| 🤠 | Face with cowboy hat | `1f920_facewithcowboyhat` |
| 🥳 | Party | `party` |
| 🥸 | Disguised face | `disguisedface` |
| 😎 | Cool | `cool` |
| 🤓 | Nerdy | `nerdy` |
| 🧐 | Face with monocle | `1f9d0_facewithmonocle` |
| 😕 | Confused | `confused` |
| 🫤 | Face with diagonal mouth | `diagonalmouth` |
| 😧 | Worried | `worry` |
| 🙁 | Sad | `sad` |
| ☹️ | Frowning face | `2639_frowningface` |
| 😮 | Surprised | `surprised` |
| 😯 | Hushed face | `1f62f_hushedface` |
| 😲 | Astonished face | `1f632_astonishedface` |
| 😊 | Blush | `blush` |
| 🥺 | Pleading face | `1f97a_pleadingface` |
| 🥹 | Face holding back tears | `faceholdingbacktears` |
| 😦 | Frowning face with open mouth | `1f626_frowningfacewithopenmouth` |
| 😧 | Anguished face | `1f627_anguishedface` |
| 😨 | Fearful | `fearful` |
| 😰 | Anxious face with sweat | `1f630_anxiousfacewithsweat` |
| 😥 | Sad but relieved face | `1f625_sadbutrelievedface` |
| 😢 | Crying | `cry` |
| 😭 | Loudly crying | `loudlycrying` |
| 😱 | Screaming with fear | `screamingfear` |
| 😖 | Very confused | `veryconfused` |
| 😫 | Doh! | `doh` |
| 😞 | Disappointed | `disappointed` |
| 😓 | Sweating | `sweat` |
| 😩 | Weary | `weary` |
| 😫 | Tired face | `1f62b_tiredface` |
| 🥱 | Yawning face | `1f971_yawningface` |
| 😤 | Face with steam from nose | `1f624_facewithlookoftriumph` |
| 😡 | Angry face | `angryface` |
| 😠 | Angry | `angry` |
| 🤬 | Swearing | `swear` |
| 😈 | Devil | `devil` |
| 👿 | Angry face with horns | `1f47f_angryfacewithhorns` |
| 💀 | Skull | `skull` |
| ☠️ | Skull and crossbones | `2620_skullandcrossbones` |
| 💩 | Pile of poo | `poop` |
| 🤡 | Clown face | `1f921_clownface` |
| 👹 | Ogre | `1f479_japaneseogre` |
| 👺 | Goblin | `1f47a_japanesegoblin` |
| 👻 | Ghost | `ghost` |
| 👽 | Alien | `1f47d_extraterrestrialalien` |
| 👾 | Alien monster | `1f47e_alienmonster` |
| 🤖 | Smile robot | `smilerobot` |
| 😺 | Smile cat | `smilecat` |
| 😺 | Laugh cat | `laughcat` |
| 😹 | Cat with tears of joy | `1f639_catwithtearsofjoy` |
| 😻 | Heart eyes cat | `hearteyescat` |
| 😼 | Cat with wry smile | `1f63c_catwithwrysmile` |
| 😽 | Kissing cat | `1f63d_kissingcat` |
| 🙀 | Weary cat | `1f640_wearycat` |
| 😿 | Sad cat | `sadcat` |
| 😾 | Pouting cat | `1f63e_poutingcat` |
| 🙉 | Monkey hear no evil | `hearnoevil` |
| 🙈 | Monkey see no evil | `seenoevil` |
| 🙊 | Monkey speak no evil | `speaknoevil` |
| 💋 | Kissing lips | `lips` |
| 💌 | Love letter | `loveletter` |
| 💘 | Heart with arrow | `1f498_heartwitharrow` |
| 💝 | Heart with ribbon | `1f49d_heartwithribbon` |
| 💖 | Sparkling heart | `sparklingheart` |
| 💗 | Growing heart | `growingheart` |
| 💓 | Beating heart | `1f493_beatingheart` |
| 💞 | Revolving hearts | `1f49e_revolvinghearts` |
| 💕 | Two hearts | `twohearts` |
| 💟 | Heart button | `1f49f_heartdecoration` |
| ❣️ | Heart exclamation | `2763_heartexclamation` |
| 💔 | Broken heart | `brokenheart` |
| ❤️‍🔥 | Heart on fire | `heartonfire` |
| ❤️‍🩹 | Mending heart | `mendingheart` |
| ❤️ | Heart | `heart` |
| 🩷 | Pink heart | `heartpink` |
| 🧡 | Orange heart | `heartorange` |
| 💛 | Yellow heart | `heartyellow` |
| 💚 | Green heart | `heartgreen` |
| 💙 | Blue heart | `heartblue` |
| 🩵 | Light blue heart | `heartlightblue` |
| 💜 | Purple heart | `heartpurple` |
| 🤎 | Brown heart | `heartbrown` |
| 🖤 | Black heart | `heartblack` |
| 🩶 | Grey heart | `heartgrey` |
| 🤍 | White heart | `heartwhite` |
| ❤️ | Rainbow heart | `rainbowheart2` |
| 💯 | Hundred points | `1f4af_hundredpointssymbol` |
| 💢 | Anger symbol | `1f4a2_angersymbol` |
| 💥 | Explosion | `1f4a5_collisionsymbol` |
| 💫 | Dizzy symbol | `1f4ab_dizzysymbol` |
| 💦 | Droplets | `1f4a6_splashingsweatsymbol` |
| 💨 | Dashing away | `1f4a8_dashsymbol` |
| 🕳️ | Hole | `1f573_hole` |
| 💣 | Bomb | `bomb` |
| 💬 | Speech bubble | `speechbubble` |
| 👁️‍🗨️ | Eye speech bubble | `eyeinspeechbubble` |
| 🗨️ | Left speech bubble | `1f5e8_leftspeechbubble` |
| 🗯️ | Angry speech bubble | `1f5ef_rightangerbubble` |
| 💭 | Thought bubble | `1f4ad_thoughtballoon` |
| 💤 | Zzz | `1f4a4_zzz` |
| 😎 | Cool cat | `coolcat` |
| 🐶 | Cool dog | `cooldog` |
| 😎 | Cool monkey | `coolmonkey` |
| 🤖 | Cool robot | `coolrobot` |
| 🐨 | Cool koala | `coolkoala` |
| 😍 | Heart eyes dog | `hearteyesdog` |
| 😍 | Heart eyes monkey | `hearteyesmonkey` |
| 😍 | Heart eyes robot | `hearteyesrobot` |
| 😍 | Heart eyes koala | `hearteyeskoala` |
| 😄 | Laugh dog | `laughdog` |
| 😄 | Laugh monkey | `laughmonkey` |
| 😄 | Laugh robot | `laughrobot` |
| 😄 | Laugh koala | `laughkoala` |
| 🙁 | Sad dog | `saddog` |
| 🙁 | Sad monkey | `sadmonkey` |
| 🤖 | Sad robot | `sadrobot` |
| 🙁 | Sad koala | `sadkoala` |
| 😌 | Dreaming | `dream` |
| 😤 | Banging head on wall | `headbang` |
| 🎧 | Listening to headphones | `headphones` |
| 🥳 | Holiday spirit | `holidayspirit` |
| 💡 | Idea | `idea` |
| 🧐 | Movember | `movember` |
| 🥊 | Punch | `punch` |
| 🙂 | Rainbow smile | `rainbowsmile` |
| 🙄 | It wasn't me! | `wasntme` |
| 🤙 | Call | `call` |
| ✋ | High five | `highfive` |
| 👋 | Hi | `hi` |
| 👍 | Like | `like` |
| 🤘 | Rock | `rock` |
| 👏 | Sarcastic | `sarcastic` |
| 🤳 | Selfie | `selfie` |
| 🤫 | Too much information | `tmi` |
| 😑 | Emo | `emo` |
| 🙂 | Nodding | `nod` |
| 🙁 | Shake | `shake` |
| 😒 | Talking too much | `ttm` |
| ✋ | Wait | `wait` |
| 😅 | Relieved | `whew` |
| 🤦 | Facepalm | `facepalm` |
| 🤞 | Fingers crossed | `fingerscrossed` |
| 👏 | Clapping | `clap` |
| 🙌 | The Wave 1 | `thewave1` |
| 🙌 | The Wave 2 | `thewave2` |
| 🙌 | The Wave 3 | `thewave3` |
| 🙌 | The Wave 4 | `thewave4` |
| 🙌 | The Wave 5 | `thewave5` |
| (oreoyum) | OREO Yum | `oreoyum` |

---

## Hand Gestures

🎨 = Supports skin tones (`-tone1` through `-tone5`)

| Emoji | Description | Reaction ID | 🎨 |
|-------|-------------|-------------|:--:|
| 👋 | Waving hand | `1f44b_wavinghand` | 🎨 |
| 🤚 | Raised back of hand | `1f91a_raisedbackofhand` | 🎨 |
| 🖐️ | Hand with fingers splayed | `1f590_handwithfingerssplayed` | 🎨 |
| ✋ | Raised hand | `270b_raisedhand` | 🎨 |
| 🖖 | Vulcan salute | `vulcansalute` | 🎨 |
| 🫱 | Rightwards hand | `rightwardshand` | 🎨 |
| 🫲 | Leftwards hand | `leftwardshand` | 🎨 |
| 🫳 | Palm down hand | `palmdownhand` | 🎨 |
| 🫴 | Palm up hand | `palmuphand` | 🎨 |
| 🫸 | Push right | `pushright` | 🎨 |
| 🫷 | Push left | `pushleft` | 🎨 |
| 👌 | OK | `ok` | 🎨 |
| 🤌 | Pinched fingers | `pinchedfingers` | 🎨 |
| 🤏 | Pinching hand | `1f90f_pinchinghand` | 🎨 |
| ✌️ | Victory sign | `victory` | 🎨 |
| 🤞 | Crossed fingers | `crossedfingers` | 🎨 |
| 🫰 | Finger heart | `fingerheart` | 🎨 |
| 🤟 | Love you gesture | `1f91f_loveyougesture` | 🎨 |
| 🤘 | Sign of the horns | `1f918_signofthehorns` | 🎨 |
| 🤙 | Call me hand | `1f919_callmehand` | 🎨 |
| 👈 | Backhand Index Pointing Left | `pointleftindex` | 🎨 |
| 👉 | Backhand index pointing right | `pointrightindex` | 🎨 |
| 👆 | Backhand index pointing up | `1f446_backhandindexpointingup` | 🎨 |
| 👇 | Backhand index pointing down | `pointdownindex` | 🎨 |
| ☝️ | Index pointing up | `pointupindex` | 🎨 |
| 🫵 | Poke | `poke` | 🎨 |
| 👍 | Yes | `yes` | 🎨 |
| 👎 | No | `no` | 🎨 |
| ✊ | Raised fist | `raisedfist` | 🎨 |
| 👊 | Oncoming fist | `1f44a_oncomingfist` | 🎨 |
| 🤛 | Left facing fist | `1f91b_leftfacingfist` | 🎨 |
| 🤜 | Right facing fist | `1f91c_rightfacingfist` | 🎨 |
| 👏 | Clapping hands | `clappinghands` | 🎨 |
| 🙌 | Hands celebrating | `handsinair` | 🎨 |
| 🫶 | Heart hands | `hearthands` | 🎨 |
| 👐 | Open hands | `1f450_openhands` | 🎨 |
| 🤲 | Palms up together | `1f932_palmsuptogether` | 🎨 |
| 🤝 | Handshake | `handshake` | 🎨 |
| 🙏 | Folded hands | `praying` | 🎨 |
| ✍️ | Writing hand | `270d_writinghand` | 🎨 |
| 💅 | Nail polish | `1f485_nailpolish` | 🎨 |
| 🤳 | Selfie | `selfiehand` | 🎨 |
| 💪 | Muscle | `muscle` | 🎨 |
| 🦾 | Mechanical arm | `1f9be_mechanicalarm` | |
| 🦿 | Mechanical leg | `1f9bf_mechanicalleg` | |
| 🦵 | Leg | `1f9b5_leg` | 🎨 |
| 🦶 | Foot | `1f9b6_foot` | 🎨 |
| 👂 | Ear | `1f442_ear` | 🎨 |
| 🦻 | Ear with hearing aid | `1f9bb_earwithhearingaid` | 🎨 |
| 👃 | Nose | `1f443_nose` | 🎨 |
| 🧠 | Brain | `1f9e0_brain` | |
| 🫀 | Anatomical heart | `anatomicalheart` | |
| 🫁 | Lungs | `lungs` | |
| 🦷 | Tooth | `1f9b7_tooth` | |
| 🦴 | Bone | `1f9b4_bone` | |
| 👀 | Eyes | `1f440_eyes` | |
| 👁️ | Eye | `1f441_eye` | |
| 👅 | Tongue | `1f445_tongue` | |
| 👄 | Mouth | `1f444_mouth` | |
| 🫦 | Biting lip | `bitinglip` | |
| 🎤 | Drop the mic | `dropthemic` | 🎨 |
| 🤜🤛 | Fist bump | `fistbump` | 🎨 |
| (support) | Support | `support` | 🎨 |

---

## People

🎨 = Supports skin tones (`-tone1` through `-tone5`)

| Emoji | Description | Reaction ID | 🎨 |
|-------|-------------|-------------|:--:|
| 👶 | Smile baby | `smilebaby` | 🎨 |
| 🧒 | Child | `1f9d2_child` | 🎨 |
| 👦 | Smile boy | `smileboy` | 🎨 |
| 👧 | Smile girl | `smilegirl` | 🎨 |
| 🧑 | Smile person | `person` | 🎨 |
| 👱 | Person blond hair | `1f471_blondehairedperson` | 🎨 |
| 👨 | Smile man | `smileman` | 🎨 |
| 🧔 | Bearded person | `1f9d4_beardedperson` | 🎨 |
| 🧔‍♂️ | Bearded man | `manbeard` | 🎨 |
| 🧔‍♀️ | Bearded woman | `womanbeard` | 🎨 |
| 👨‍🦰 | Man red hair | `1f468_200d_1f9b0_maleredhaired` | 🎨 |
| 👨‍🦱 | Man curly hair | `1f468_200d_1f9b1_mancurlyhaired` | 🎨 |
| 👨‍🦳 | Man white hair | `1f468_200d_1f9b3_malewhitehaired` | 🎨 |
| 👨‍🦲 | Man bald | `1f468_200d_1f9b2_manbald` | 🎨 |
| 👩 | Smile woman | `smilewoman` | 🎨 |
| 👩‍🦰 | Woman red hair | `1f469_200d_1f9b0_femaleredhaired` | 🎨 |
| 🧑‍🦰 | Red haired | `1f9b0_redhaired` | 🎨 |
| 👩‍🦱 | Woman curly hair | `womancurlyhair` | 🎨 |
| 🧑‍🦱 | Curly haired | `1f9b1_curlyhaired` | 🎨 |
| 👩‍🦳 | Woman white hair | `womanwhitehair` | 🎨 |
| 🧑‍🦳 | Person white hair | `personwhitehair` | 🎨 |
| 🧑‍🦲 | Bald | `1f9b2_bald` | 🎨 |
| 👩‍🦲 | Woman bald | `1f469_200d_1f9b2_femalebald` | 🎨 |
| 👱‍♀️ | Woman blond hair | `womanblondhair` | 🎨 |
| 👱‍♂️ | Man blond hair | `manblondhair` | 🎨 |
| 🧓 | Older adult | `1f9d3_olderadult` | 🎨 |
| 👴 | Old man | `1f474_olderman` | 🎨 |
| 👵 | Old woman | `oldwoman` | 🎨 |
| 🙍 | Person frowning | `frowning` | 🎨 |
| 🙍‍♂️ | Man frowning | `man_frowning` | 🎨 |
| 🙍‍♀️ | Woman frowning | `womanfrowning` | 🎨 |
| 🙎 | Pouting face | `pouting_face` | 🎨 |
| 🙎‍♂️ | Man pouting | `man_pouting` | 🎨 |
| 🙎‍♀️ | Woman pouting | `womanpouting` | 🎨 |
| 🙅 | Face with no good gesture | `1f645_facewithnogoodgesture` | 🎨 |
| 🙅‍♂️ | Man gesturing no | `man_gesturing_not_ok` | 🎨 |
| 🙅‍♀️ | Woman gesturing no | `womangesturingno` | 🎨 |
| 🙆 | Person gesturing ok | `1f646_persongesturingok` | 🎨 |
| 🙆‍♂️ | Man gesturing OK | `man_gesturing_ok` | 🎨 |
| 🙆‍♀️ | Woman gesturing OK | `womangesturingok` | 🎨 |
| 💁 | Person tipping hand | `person_tipping_hand` | 🎨 |
| 💁‍♂️ | Man tipping hand | `man_tipping_hand` | 🎨 |
| 💁‍♀️ | Woman tipping hand | `womantippinghand` | 🎨 |
| 🙋 | Person raising hand | `happy_person_raising_one_hand` | 🎨 |
| 🙋‍♂️ | Man raising hand | `man_raising_hand` | 🎨 |
| 🙋‍♀️ | Woman raising hand | `womanraisinghand` | 🎨 |
| 🧏 | Deaf person | `person_deaf` | 🎨 |
| 🧏‍♂️ | Deaf Man | `man_deaf` | 🎨 |
| 🧏‍♀️ | Woman deaf | `woman_deaf` | 🎨 |
| 🙇 | Person bowing | `bowing` | 🎨 |
| 🙇‍♂️ | Man bowing | `bow` | 🎨 |
| 🙇‍♀️ | Woman bowing | `thanks` | 🎨 |
| 🤦 | Person facepalming | `1f926_personfacepalming` | 🎨 |
| 🤦‍♂️ | Man facepalming | `manfacepalming` | 🎨 |
| 🤦‍♀️ | Woman facepalming | `womanfacepalming` | 🎨 |
| 🤷 | Person shrugging | `shrug` | 🎨 |
| 🤷‍♂️ | Man shrug | `manshrug` | 🎨 |
| 🤷‍♀️ | Woman shrug | `womanshrug` | 🎨 |
| 🧑‍⚕️ | Person health worker | `personhealthworker` | 🎨 |
| 👨‍⚕️ | Man health worker | `manhealthworker` | 🎨 |
| 👩‍⚕️ | Woman health worker | `womanhealthworker` | 🎨 |
| 🧑‍🎓 | Student | `student` | 🎨 |
| 👨‍🎓 | Man student | `manstudent` | 🎨 |
| 👩‍🎓 | Woman student | `womanstudent` | 🎨 |
| 🧑‍🏫 | Person teacher | `personteacher` | 🎨 |
| 👨‍🏫 | Man teacher | `manteacher` | 🎨 |
| 👩‍🏫 | Woman teacher | `womanteacher` | 🎨 |
| 🧑‍⚖️ | Person judge | `personjudge` | 🎨 |
| 👨‍⚖️ | Man judge | `manjudge` | 🎨 |
| 👩‍⚖️ | Woman judge | `womanjudge` | 🎨 |
| 🧑‍🌾 | Person farmer | `personfarmer` | 🎨 |
| 👨‍🌾 | Man farmer | `manfarmer` | 🎨 |
| 👩‍🌾 | Woman farmer | `womanfarmer` | 🎨 |
| 🧑‍🍳 | Person chef | `personchef` | 🎨 |
| 👨‍🍳 | Man chef | `manchef` | 🎨 |
| 👩‍🍳 | Woman chef | `womanchef` | 🎨 |
| 🧑‍🔧 | Person mechanic | `personmechanic` | 🎨 |
| 👨‍🔧 | Man mechanic | `manmechanic` | 🎨 |
| 👩‍🔧 | Woman mechanic | `womanmechanic` | 🎨 |
| 🧑‍🏭 | Person welder | `personwelder` | 🎨 |
| 👨‍🏭 | Man welder | `manwelder` | 🎨 |
| 👩‍🏭 | Woman welder | `womanwelder` | 🎨 |
| 🧑‍💼 | Person office worker | `personofficeworker` | 🎨 |
| 👨‍💼 | Office worker male | `officeworkermale` | 🎨 |
| 👩‍💼 | Office worker female | `officeworkerfemale` | 🎨 |
| 🧑‍🔬 | Person scientist | `personscientist` | 🎨 |
| 👨‍🔬 | Man scientist | `manscientist` | 🎨 |
| 👩‍🔬 | Woman scientist | `womanscientist` | 🎨 |
| 🧑‍💻 | Person writing code | `persondeveloper` | 🎨 |
| 👨‍💻 | Man writing code | `mantechie` | 🎨 |
| 👩‍💻 | Woman writing code | `womandeveloper` | 🎨 |
| 🧑‍🎤 | Person singer | `personsinger` | 🎨 |
| 👨‍🎤 | Man singer | `man_singer` | 🎨 |
| 👩‍🎤 | Woman singer | `woman_singer` | 🎨 |
| 🧑‍🎨 | Person artist | `personartist` | 🎨 |
| 👨‍🎨 | Man artist | `manartist` | 🎨 |
| 👩‍🎨 | Woman artist | `womanartist` | 🎨 |
| 🧑‍✈️ | Person pilot | `personpilot` | 🎨 |
| 👨‍✈️ | Man pilot | `manpilot` | 🎨 |
| 👩‍✈️ | Woman pilot | `womanpilot` | 🎨 |
| 🧑‍🚀 | Person astronaut | `personastronaut` | 🎨 |
| 👨‍🚀 | Man astronaut | `manastronaut` | 🎨 |
| 👩‍🚀 | Woman astronaut | `womanastronaut` | 🎨 |
| 🧑‍🚒 | Person firefighter | `personfirefighter` | 🎨 |
| 👨‍🚒 | Man firefighter | `manfirefighter` | 🎨 |
| 👩‍🚒 | Woman firefighter | `womanfirefighter` | 🎨 |
| 👮 | Police officer | `police_officer` | 🎨 |
| 👮‍♂️ | Man police officer | `manpoliceofficer` | 🎨 |
| 👮‍♀️ | Woman police officer | `womanpoliceofficer` | 🎨 |
| 🕵️ | Detective | `detective` | 🎨 |
| 🕵️‍♂️ | Man detective | `man_detective` | 🎨 |
| 🕵️‍♀️ | Woman detective | `woman_detective` | 🎨 |
| 💂 | Guard | `guard` | 🎨 |
| 💂‍♂️ | Man guard | `man_guard` | 🎨 |
| 💂‍♀️ | Woman guard | `woman_guard` | 🎨 |
| 🥷 | Ninja | `ninja` | 🎨 |
| 👷 | Construction worker | `construction_worker` | 🎨 |
| 👷‍♂️ | Man construction worker | `man_construction_worker` | 🎨 |
| 👷‍♀️ | Woman construction worker | `woman_construction_worker` | 🎨 |
| 🫅 | Person with crown | `personcrown` | 🎨 |
| 🤴 | Prince | `prince` | 🎨 |
| 👸 | Princess | `princess` | 🎨 |
| 👳 | Person wearing turban | `1f473_personwearingturban` | 🎨 |
| 👳‍♂️ | Man wearing turban | `man_wearing_turban` | 🎨 |
| 👳‍♀️ | Woman wearing turban | `womanwearingturban` | 🎨 |
| 👲 | Man with chinese cap | `man_with_chinese_cap` | 🎨 |
| 🧕 | Woman with head scarf | `woman_with_head_scarf` | 🎨 |
| 🤵 | Person in tuxedo | `personintuxedo` | 🎨 |
| 🤵‍♂️ |  Man in tuxedo | `manintuxedo` | 🎨 |
| 🤵‍♀️ | Woman in tuxedo | `womanintuxedo` | 🎨 |
| 👰 | Person with veil | `personwithveil` | 🎨 |
| 👰‍♂️ | Man with veil | `manwithveil` | 🎨 |
| 👰‍♀️ |  Woman with veil | `womanwithveil` | 🎨 |
| 🤰 | Woman pregnant | `womanpregnant` | 🎨 |
| 🫃 | Pregnant man | `pregnantman` | 🎨 |
| 🫄 | Pregnant | `pregnant` | 🎨 |
| 🤱 | Breastfeeding | `breastfeeding` | 🎨 |
| 👨‍🍼 | Man bottle feeding | `manbottlefeeding` | 🎨 |
| 🧑‍🍼 | Bottle feeding | `bottlefeeding` | 🎨 |
| 👼 | Baby angel | `1f47c_babyangel` | 🎨 |
| 🎅 | Santa | `santa` | 🎨 |
| 🤶 | Mrs claus | `mother_christmas` | 🎨 |
| 🧑‍🎄 | Mx Claus | `mxclaus` | 🎨 |
| 🦸 | Person superhero | `personsuperhero` | 🎨 |
| 🦸‍♂️ | Man superhero | `mansuperhero` | 🎨 |
| 🦸‍♀️ | Woman superhero | `hero` | 🎨 |
| 🦹 | Supervillain | `1f9b9_supervillain` | 🎨 |
| 🦹‍♂️ | Man supervillain | `man_super_villain` | 🎨 |
| 🦹‍♀️ | Woman supervillain | `woman_super_villain` | 🎨 |
| 🧙‍♂️ | Mage | `wizard` | 🎨 |
| 🧙‍♀️ | Woman mage | `womanmage` | 🎨 |
| 🧚 | Fairy | `fairy` | 🎨 |
| 🧚‍♂️ | Man fairy | `man_fairy` | 🎨 |
| 🧚‍♀️ | Woman fairy | `woman_fairy` | 🎨 |
| 🧛 | Man vampire | `vampire` | 🎨 |
| 🧛‍♂️ | Vampire | `dracula` | 🎨 |
| 🧛‍♀️ | Woman vampire | `ladyvampire` | 🎨 |
| 🧜 | Merperson | `merperson` | 🎨 |
| 🧜‍♂️ | Merman | `merman` | 🎨 |
| 🧜‍♀️ | Mermaid | `mermaid` | 🎨 |
| 🧝 | Elf | `elf` | 🎨 |
| 🧝‍♂️ | Man elf | `manelf` | 🎨 |
| 🧝‍♀️ | Woman elf | `woman_elf` | 🎨 |
| 🧞 | Genie | `1f9de_genie` | |
| 🧞‍♂️ | Man genie | `mangenie` | |
| 🧞‍♀️ | Woman genie | `womangenie` | |
| 🧟 | Person zombie | `personzombie` | |
| 🧟‍♂️ | Man zombie | `manzombie` | |
| 🧟‍♀️ | Zombie | `zombie` | |
| 🧌 | Troll | `troll` | |
| 💆 | Person getting massage | `1f486_facemassage` | 🎨 |
| 💆‍♂️ | Man getting massage | `man_getting_face_massage` | 🎨 |
| 💆‍♀️ | Woman getting massage | `face_massage` | 🎨 |
| 💇 | Getting haircut | `person_getting_haircut` | 🎨 |
| 💇‍♂️ | Man getting haircut | `man_getting_haircut` | 🎨 |
| 💇‍♀️ | Woman getting haircut | `woman_getting_haircut` | 🎨 |
| 🚶‍➡️ | Person walking facing right | `personwalkingfacingright2` | 🎨 |
| 🚶‍♂️ | Man walking | `manwalking` | 🎨 |
| 🚶‍♀️ | Woman walking | `woman_walking` | 🎨 |
| 🧎‍➡️ | Person kneeling facing right | `personkneelingfacingright2` | 🎨 |
| 🧎‍♂️ | Man kneeling | `man_kneeling` | 🎨 |
| 🧎‍♀️ | Woman kneeling | `woman_kneeling` | 🎨 |
| 🧍 | Standing | `nonbinarystanding` | 🎨 |
| 🧍‍♂️ | Man standing | `manstanding` | 🎨 |
| 🧍‍♀️ | Woman standing | `womanstanding` | 🎨 |
| 🧑‍🦯 | Person with probing cane | `personwithprobingcane` | 🎨 |
| 👨‍🦯 | Man probing cane | `man_probing_cane` | 🎨 |
| 👩‍🦯 | Woman probing cane | `woman_probing_cane` | 🎨 |
| 🧑‍🦼‍➡️ | Person in motorized wheelchair facing right | `personmotorwheelchairright2` | 🎨 |
| 👨‍🦼 | Man in motorized wheelchair | `man_in_motorized_wheelchair` | 🎨 |
| 👩‍🦼 | Woman in motorized wheelchair | `woman_in_motorized_wheelchair` | 🎨 |
| 🧑‍🦽‍➡️ | Person in manual wheelchair facing right | `personmanualwheelchairright2` | 🎨 |
| 👨‍🦽 | Man in manual wheelchair | `man_in_manual_wheelchair` | 🎨 |
| 👩‍🦽 | Woman in manual wheelchair | `woman_in_manual_wheelchair` | 🎨 |
| 🏃 | Runner | `runner` | 🎨 |
| 🏃‍♂️ | Got to run | `gottarun` | 🎨 |
| 🏃‍➡️ | Person running facing right | `personrunningfacingright2` | 🎨 |
| 🏃‍♀️ | Running | `running` | 🎨 |
| 💃 | Woman dancing | `1f483_womandancing` | 🎨 |
| 🕺 | Dancing | `dance` | 🎨 |
| 👵 | Dancing gran | `gran` | 🎨 |
| 🕴️ | Man in suit levitating | `man_in_suit_levitating` | 🎨 |
| 🧖 | Person steam room | `steam_room` | 🎨 |
| 🧖‍♂️ | Man in steamy room | `man_steam_room` | 🎨 |
| 🧖‍♀️ | Woman steam room | `woman_steam_room` | 🎨 |
| 🧗 | Person climbing | `climber` | 🎨 |
| 🧗‍♂️ | Man climbing | `man_climbing` | 🎨 |
| 🧗‍♀️ | Woman climbing | `woman_climbing` | 🎨 |
| 🤺 | Fencer | `womanfencer` | |
| 🏇 | Horse racing | `horse_racing` | 🎨 |
| ⛷️ | Skier | `skier` | 🎨 |
| 🏂 | Snowboarder | `snowboarder` | 🎨 |
| 🏌️ | Person golfing | `golfer` | 🎨 |
| 🏌️‍♂️ | Man golfing | `mangolfing` | 🎨 |
| 🏌️‍♀️ | Woman golfer | `woman_golfer` | 🎨 |
| 🏄 | Person surfing | `1f3c4_personsurfing` | 🎨 |
| 🏄‍♂️ | Man surfer | `mansurfer` | 🎨 |
| 🏄‍♀️ | Woman surfer | `womansurfer` | 🎨 |
| 🚣 | Person rowing boat | `personrowingboat` | 🎨 |
| 🚣‍♂️ | Man rowing boat | `manrowingboat` | 🎨 |
| 🚣‍♀️ | Woman rowing boat | `woman_rowing_boat` | 🎨 |
| 🏊 | Person swimming | `personswimming` | 🎨 |
| 🏊‍♂️ | Man swimming | `manswimming` | 🎨 |
| 🏊‍♀️ | Woman swimmer | `woman_swimmer` | 🎨 |
| ⛹️ | Person bouncing ball | `bouncing_ball` | 🎨 |
| ⛹️‍♂️ | Man bouncing ball | `man_bouncing_ball` | 🎨 |
| ⛹️‍♀️ | Woman bouncing ball | `woman_bouncing_ball` | 🎨 |
| ⚽ | Man playing football | `bartlett` | 🎨 |
| ⚽ | Woman playing football | `womanfootball` | 🎨 |
| 🏋️ | Person lifting weights | `weight_lifter` | 🎨 |
| 🏋️‍♂️ | Man lifting weights | `manliftingweights` | 🎨 |
| 🏋️‍♀️ | Woman weight lifter | `woman_weight_lifter` | 🎨 |
| 🚴 | Person biking | `1f6b4_personbiking` | 🎨 |
| 🚴‍♂️ | Bicycle | `bike` | 🎨 |
| 🚴‍♀️ | Woman riding bike | `womanridingbike` | 🎨 |
| 🚵‍♂️ | Man mountain biking | `manmountainbiking` | 🎨 |
| 🚵‍♀️ | Woman mountain biking | `woman_mountain_biking` | 🎨 |
| 🤸 | Person cartwheeling | `1f938_personcartwheeling` | 🎨 |
| 🤸‍♂️ | Man cartwheeling | `man_cartwheeling` | 🎨 |
| 🤸‍♀️ | Woman cartwheeling | `woman_cartwheeling` | 🎨 |
| 🤽‍♂️ | Man playing water polo | `manplayingwaterpolo` | 🎨 |
| 🤽‍♀️ | Woman playing water polo | `woman_playing_water_polo` | 🎨 |
| 🤾‍♂️ | Man playing handball | `manplayinghandball` | 🎨 |
| 🤾‍♀️ | Woman playing handball | `woman_playing_handball` | 🎨 |
| 🤹 | Person juggling | `personjuggling` | 🎨 |
| 🤹‍♂️ | Man juggling | `manjuggling` | 🎨 |
| 🤹‍♀️ | Woman juggling | `woman_juggling` | 🎨 |
| 🧘 | Person in lotus position | `lotus_position` | 🎨 |
| 🧘‍♂️ | Man in lotus position | `maninlotusposition` | 🎨 |
| 🧘‍♀️ | Yoga | `yoga` | 🎨 |
| 🛀 | Woman taking a bath | `womanbath` | 🎨 |
| 🛌 | Person in bed | `person_in_bed` | 🎨 |
| 🗣️ | Speaking head | `1f5e3_speakingheadinsilhouette` | |
| 👤 | Bust in silhouette | `1f464_bustinsilhouette` | |
| 👥 | Busts in silhouette | `1f465_bustsinsilhouette` | |
| 🫂 | People hugging | `peoplehugging` | |
| 👣 | Footprints | `1f463_footprints` | |

---

## Animals & Nature

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 🐵 | Smile monkey | `smilemonkey` |
| 🐒 | Monkey | `monkey` |
| 🦍 | Gorilla | `1f98d_gorilla` |
| 🦧 | Orangutan | `orangutanscratching` |
| 🐶 | Smile dog | `smiledog` |
| 🐕 | Dog | `dog` |
| 🦮 | Guidedog | `1f9ae_guidedog` |
| 🐕‍🦺 | Service dog | `1f415_200d_1f9ba_servicedog` |
| 🐩 | Poodle | `1f429_poodle` |
| 🐺 | Wolf face | `1f43a_wolfface` |
| 🦊 | Fox | `foxhug` |
| 🦝 | Raccoon | `racoon` |
| 😺 | Smile cat | `smilecat` |
| 🐈 | Cat | `cat` |
| 🐈‍⬛ | Black cat | `blackcat` |
| 🦁 | Lion | `lion` |
| 🐯 | Tiger face | `1f42f_tigerface` |
| 🐅 | Tiger | `1f405_tiger` |
| 🐆 | Leopard | `1f406_leopard` |
| 🐴 | Horse face | `1f434_horseface` |
| 🫎 | Moose | `moose` |
| 🫏 | Donkey | `donkey` |
| 🐎 | Horse | `1f40e_horse` |
| 🦄 | Unicorn head | `unicornhead` |
| 🦓 | Zebra | `1f993_zebraface` |
| 🦌 | Reindeer | `reindeer` |
| 🦬 | Bison | `bison` |
| 🐮 | Cow face | `1f42e_cowface` |
| 🐂 | Ox | `1f402_ox` |
| 🐃 | Water buffalo | `1f403_waterbuffalo` |
| 🐄 | Cow | `1f404_cow` |
| 🐷 | Pig face | `1f437_pigface` |
| 🐖 | Pig | `pig` |
| 🐗 | Boar | `1f417_boar` |
| 🐽 | Pig nose | `1f43d_pignose` |
| 🐏 | Ram | `1f40f_ram` |
| 🐑 | Spring lamb | `lamb` |
| 🐐 | Goat | `1f410_goat` |
| 🐪 | Camel | `1f42a_dromedarycamel` |
| 🐫 | Two humped Camel | `1f42b_bactriancamel` |
| 🦙 | Llama | `1f999_llama` |
| 🦒 | Giraffe | `1f992_giraffeface` |
| 🐘 | Elephant | `elephant` |
| 🦣 | Mammoth | `mammoth` |
| 🦏 | Rhinoceros | `1f98f_rhinoceros` |
| 🦛 | Hippopotamus | `1f99b_hippopotamus` |
| 🐭 | Mouse face | `1f42d_mouseface` |
| 🐁 | Mouse | `1f401_mouse` |
| 🐀 | Rat | `1f400_rat` |
| 🐹 | Hamster Face | `1f439_hamsterface` |
| 🐰 | Rabbit | `bunnyhug` |
| 🐇 | Bunny | `bunny` |
| 🐿️ | Chipmunk | `1f43f_chipmunk` |
| 🦫 | Beaver | `beaver` |
| 🦔 | Hedgehog | `hedgehoghug` |
| 🦇 | Bat smile | `batsmile` |
| 🐻 | Bear face | `1f43b_bearface` |
| 🐻‍❄️ | Polar bear | `polarbear` |
| 🐨 | Koala | `koala` |
| 🐼 | Panda | `panda` |
| 🦥 | Sloth | `sloth` |
| 🦦 | Otter | `1f9a6_otter` |
| 🦨 | Skunk | `1f9a8_skunk` |
| 🦘 | Kangaroo | `1f998_kangaroo` |
| 🦡 | Badger | `1f9a1_badger` |
| 🐾 | Paw prints | `1f43e_pawprints` |
| 🦃 | Turkey | `1f983_turkey` |
| 🐔 | Chicken | `1f414_chicken` |
| 🐓 | Rooster | `1f413_rooster` |
| 🐣 | Hatching chick | `1f423_hatchingchick` |
| 🐤 | Baby chick | `1f424_babychick` |
| 🐥 | Front facing baby chick | `1f425_frontfacingbabychick` |
| 🐦 | Bird | `1f426_bird` |
| 🐧 | Dancing penguin | `penguin` |
| 🕊️ | Dove | `1f54a_doveofpeace` |
| 🦅 | Eagle | `1f985_eagle` |
| 🐦‍🔥 | Phoenix | `phoenix3` |
| 🦆 | Duck | `1f986_duck` |
| 🦢 | Swan | `1f9a2_swan` |
| 🦉 | Owl | `1f989_owl` |
| 🦤 | Dodo | `dodo` |
| 🪶 | Feather | `feather` |
| 🦩 | Flamingo | `1f9a9_flamingo` |
| 🦚 | Peacock | `1f99a_peacock` |
| 🦜 | Parrot | `1f99c_parrot` |
| 🪽 | Left wing | `wingleft` |
| 🪽 | Wing | `wing` |
| 🐦‍⬛ | Black bird | `birdblack` |
| 🪿 | Goose | `goose` |
| 🐸 | Frog face | `1f438_frogface` |
| 🐊 | Crocodile | `1f40a_crocodile` |
| 🐢 | Tortoise | `tortoise` |
| 🦎 | Lizard | `lizard` |
| 🐍 | Snake | `snake` |
| 🐲 | Dragon face | `1f432_dragonface` |
| 🐉 | Dragon | `1f409_dragon` |
| 🦕 | Dinosaur | `1f995_sauropod` |
| 🦖 | Trex | `trex` |
| 🐳 | Spouting Whale | `spoutingwhale` |
| 🐋 | Whale | `whale` |
| 🐬 | Dolphin | `dolphin` |
| 🦭 | Seal | `seal` |
| 🐟 | Fish | `fish` |
| 🐠 | Tropical fish | `tropicalfish` |
| 🐡 | Blowfish | `1f421_blowfish` |
| 🦈 | Shark | `1f988_shark` |
| 🐙 | Octopus | `octopus` |
| 🐚 | Spiralshell | `1f41a_spiralshell` |
| 🪸 | Coral | `coral` |
| 🪼 | Jellyfish | `jellyfish` |
| 🐌 | Snail | `snail` |
| 🦋 | Butterfly | `butterfly` |
| 🐛 | Bug | `bug` |
| 🐜 | Ant | `1f41c_ant` |
| 🐝 | Bee | `bee` |
| 🪲 | Beetle | `beetle` |
| 🐞 | Ladybug | `1f41e_ladybeetle` |
| 🦗 | Cricket | `cricket` |
| 🪳 | Cockroach | `cockroach` |
| 🕷️ | Spider | `spider` |
| 🕸️ | Web | `1f578_spiderweb` |
| 🦂 | Scorpion | `1f982_scorpion` |
| 🦟 | Mosquito | `1f99f_mosquito` |
| 🪰 | Fly | `fly` |
| 🪱 | Worm | `worm` |
| 🦠 | Microbe | `1f9a0_microbe` |
| 🐔 | Dancing hen | `hendance` |
| 🐧 | Penguin kiss | `penguinkiss` |
| 🙂 | Stingray | `stingray` |
| 🐺 | Werewolf howl | `werewolfhowl` |
| 🐵 | Snow angel | `snowangel` |
| 💐 | Bouquet | `1f490_bouquet` |
| 🌸 | Cherry blossom | `cherryblossom` |
| 💮 | White flower | `1f4ae_whiteflower` |
| 🪷 | Lotus | `lotus` |
| 🏵️ | Rosette | `1f3f5_rosette` |
| 🌹 | Rose | `rose` |
| 🥀 | Wilted flower | `wiltedflower` |
| 🌺 | Hibiscus | `1f33a_hibiscus` |
| 🌻 | Sunflower | `sunflower` |
| 🌼 | Flower | `flower` |
| 🌷 | Tulip | `tulip` |
| 🪻 | Hyacinth | `hyacinth` |
| 🌱 | Seedling | `seedling` |
| 🪴 | Potted Plant | `pottedplant` |
| 🌲 | Evergreen tree | `evergreentree` |
| 🌳 | Deciduous tree | `deciduoustree` |
| 🌴 | Palm tree | `palmtree` |
| 🌵 | Cactus | `cactus` |
| 🌾 | Sheaf of rice | `1f33e_earofrice` |
| 🌿 | Herb | `1f33f_herb` |
| ☘️ | Shamrock | `2618_shamrock` |
| 🍀 | Good luck | `goodluck` |
| 🍁 | Maple leaf | `1f341_mapleleaf` |
| 🍂 | Fallen leaf | `1f342_fallenleaf` |
| 🍃 | Falling leaf | `fallingleaf` |
| 🪹 | Empty nest | `nest` |
| 🪺 | Nest with eggs | `nestwitheggs` |
| 🍄 | Mushroom | `1f344_mushroom` |

---

## Food & Drink

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 🍇 | Grapes | `grapes` |
| 🍈 | Melon | `1f348_melon` |
| 🍉 | Watermelon | `watermelon` |
| 🍊 | Orange | `orange` |
| 🍋 | Lemon | `lemon` |
| 🍋‍🟩 | Lime | `lime4` |
| 🍌 | Banana | `banana` |
| 🍍 | Pineapple | `pineapple` |
| 🥭 | Mango | `1f96d_mango` |
| 🍎 | Apple | `apple` |
| 🍏 | Green apple | `1f34f_greenapple` |
| 🍐 | Pear | `1f350_pear` |
| 🍑 | Peach | `peach` |
| 🍒 | Cherries | `cherries` |
| 🍓 | Strawberry | `strawberry` |
| 🫐 | Blueberries | `blueberries` |
| 🥝 | Kiwi fruit | `1f95d_kiwifruit` |
| 🍅 | Tomato | `1f345_tomato` |
| 🫒 | Olive | `olive` |
| 🥥 | Coconut | `1f965_coconut` |
| 🍆 | Eggplant | `aubergine` |
| 🥔 | Potato | `1f954_potato` |
| 🍄‍🟫 | Brown mushroom | `brownmushroom4` |
| 🥕 | Carrot | `1f955_carrot` |
| 🌽 | Corn | `1f33d_earofmaize` |
| 🌶️ | Chili pepper | `1f336_hotpepper` |
| 🫑 | Bell Pepper | `bellpepper` |
| 🥒 | Cucumber | `1f952_cucumber` |
| 🥬 | Lettuce | `1f96c_leafygreen` |
| 🥦 | Broccoli | `1f966_broccoli` |
| 🧄 | Garlic | `1f9c4_garlic` |
| 🧅 | Onion | `1f9c5_onion` |
| 🥜 | Peanuts | `1f95c_peanuts` |
| 🫘 | Beans | `beans` |
| 🌰 | Chestnut | `1f330_chestnut` |
| 🫚 | ginger | `ginger` |
| 🫛 | Pea pod | `peapod` |
| 🍞 | Bread | `1f35e_bread` |
| 🥐 | Croissant | `croissant` |
| 🥖 | Baguette | `1f956_baguettebread` |
| 🫓 | Flat Bread | `flatbread` |
| 🥨 | Pretzel | `1f968_pretzel` |
| 🥯 | Bagel | `1f96f_bagel` |
| 🥞 | Pancake | `1f95e_pancake` |
| 🧇 | Waffle | `1f9c7_waffle` |
| 🧀 | Cheese | `cheese` |
| 🍖 | Meat on bone | `1f356_meatonbone` |
| 🍗 | Chicken leg | `chickenleg` |
| 🥩 | Steak | `1f969_cutofmeat` |
| 🥓 | Bacon | `1f953_bacon` |
| 🍔 | Burger | `burger` |
| 🍟 | Fries | `fries` |
| 🍕 | Pizza slice | `pizzaslice` |
| 🌭 | Hot dog | `1f32d_hotdog` |
| 🥪 | Sandwich | `1f96a_sandwich` |
| 🌮 | Taco | `1f32e_taco` |
| 🌯 | Burrito | `1f32f_burrito` |
| 🫔 | Tamale | `tamale` |
| 🥙 | Stuffed flatbread | `1f959_stuffedflatbread` |
| 🧆 | Falafel | `1f9c6_falafel` |
| 🥚 | Egg | `1f95a_egg` |
| 🍳 | Cooking | `1f373_cooking` |
| 🥘 | Paella | `1f958_shallowpanoffood` |
| 🍲 | Stew | `1f372_potoffood` |
| 🫕 | Fondue | `fondue` |
| 🥣 | Bowl with spoon | `1f963_bowlwithspoon` |
| 🥗 | Salad | `1f957_greensalad` |
| 🍿 | Popcorn | `1f37f_popcorn` |
| 🧈 | Butter | `1f9c8_butter` |
| 🧂 | Salt | `1f9c2_salt` |
| 🥫 | Tin can | `1f96b_cannedfood` |
| 🍱 | Bento box | `1f371_bentobox` |
| 🍘 | Rice cracker | `1f358_ricecracker` |
| 🍙 | Rice ball | `1f359_riceball` |
| 🍚 | Rice | `1f35a_cookedrice` |
| 🍛 | Curry | `1f35b_curryandrice` |
| 🍜 | Noodles | `noodles` |
| 🍝 | Spaghetti | `1f35d_spaghetti` |
| 🍠 | Sweet potato | `1f360_roastedsweetpotato` |
| 🍢 | Oden | `1f362_oden` |
| 🍣 | Sushi | `1f363_sushi` |
| 🍤 | Fried shrimp | `1f364_friedshrimp` |
| 🍥 | Fishcake | `1f365_fishcakewithswirldesign` |
| 🥮 | Moon cake | `1f96e_mooncake` |
| 🍡 | Dango | `1f361_dango` |
| 🥟 | Dumpling | `1f95f_dumpling` |
| 🥠 | Fortune cookie | `1f960_fortunecookie` |
| 🥡 | Takeout box | `1f961_takeoutbox` |
| 🦀 | Crab | `1f980_crab` |
| 🦞 | Lobster | `1f99e_lobster` |
| 🦐 | Shrimp | `1f990_shrimp` |
| 🦑 | Squid | `1f991_squid` |
| 🦪 | Oyster | `1f9aa_oyster` |
| 🍦 | Soft ice cream | `1f366_softicecream` |
| 🍧 | Shaved ice | `1f367_shavedice` |
| 🍨 | Ice cream | `1f368_icecream` |
| 🍩 | Doughnut | `1f369_doughnut` |
| 🍪 | Cookies | `cookies` |
| 🎂 | Cake | `cake` |
| 🍰 | Cake slice | `cakeslice` |
| 🧁 | Cupcake | `cupcake` |
| 🥧 | Pie | `pie` |
| 🍫 | Chocolate | `1f36b_chocolatebar` |
| 🍬 | Candy | `1f36c_candy` |
| 🍭 | Lollipop | `1f36d_lollipop` |
| 🍮 | Custard | `1f36e_custard` |
| 🍯 | Honey | `1f36f_honeypot` |
| 🍼 | Baby bottle | `1f37c_babybottle` |
| 🥛 | Milk | `1f95b_milkglass` |
| ☕ | Coffee | `coffee` |
| 🫖 | Teapot | `teapot` |
| 🍵 | Tea | `chai` |
| 🍶 | Sake | `1f376_sakebottleandcup` |
| 🍾 | Champagne | `champagne` |
| 🍷 | Red wine | `redwine` |
| 🍸 | Drink | `drink` |
| 🍹 | Tropical drink | `1f379_tropicaldrink` |
| 🍺 | Beer | `beer` |
| 🍻 | Beer mugs | `1f37b_clinkingbeermugs` |
| 🥂 | Cheers! | `cheers` |
| 🥃 | Tumbler glass | `1f943_tumblerglass` |
| 🫗 | Pouring liquid | `pour` |
| 🥤 | Cup with straw | `1f964_cupwithstraw` |
| 🧋 | Bubble Tea | `bubbletea` |
| 🧃 | Juice box | `1f9c3_beveragebox` |
| 🧉 | Yerba mate | `1f9c9_mate` |
| 🧊 | Ice cube | `1f9ca_icecube` |
| 🥢 | Chopsticks | `1f962_chopsticks` |
| 🍽️ | Dinner | `1f37d_forkandknifewithplate` |
| 🍴 | Cutlery | `1f374_forkandknife` |
| 🥄 | Spoon | `1f944_spoon` |
| 🔪 | Kitchen knife | `1f52a_hocho` |
| 🏺 | Amphora | `1f3fa_amphora` |
| 🫙 | Jar | `jar` |
| 🥑 | Avocado love | `avocadolove` |
| 🦃 | Headless turkey | `turkey` |
| (oreo) | OREO | `oreo` |

---

## Travel & Places

🎨 = Supports skin tones (`-tone1` through `-tone5`)

| Emoji | Description | Reaction ID | 🎨 |
|-------|-------------|-------------|:--:|
| 🌍 | Earth globe Europe Africa | `1f30d_earthglobeeuropeafrica` | |
| 🌎 | Earth globe americas | `1f30e_earthglobeamericas` | |
| 🌏 | Earth globe Asia Australia  | `1f30f_earthglobeasiaaustralia` | |
| 🌐 | Globe with meridians | `1f310_globewithmeridians` | |
| 🗺️ | World map | `1f5fa_worldmap` | |
| 🗾 | Silhouette of Japan | `1f5fe_silhouetteofjapan` | |
| 🧭 | Compass | `1f9ed_compass` | |
| 🏔️ | Snow capped mountain | `1f3d4_snowcappedmountain` | |
| ⛰️ | Mountain | `26f0_mountain` | |
| 🌋 | Volcano | `1f30b_volcano` | |
| 🗻 | Mount Fuji | `1f5fb_mountfuji` | |
| 🏕️ | Camping | `1f3d5_camping` | |
| 🏖️ | Beach with umbrella | `1f3d6_beachwithumbrella` | |
| 🏜️ | Desert | `desert` | |
| 🏝️ | Island | `island` | |
| 🏞️ | National park | `1f3de_nationalpark` | |
| 🏟️ | Stadium | `1f3df_stadium` | |
| 🏛️ | Classical building | `1f3db_classicalbuilding` | |
| 🏗️ | Building construction | `1f3d7_buildingconstruction` | |
| 🧱 | Bricks | `1f9f1_bricks` | |
| 🪨 | Stone | `stone` | |
| 🪵 | Wood | `wood` | |
| 🛖 | Hut | `hut` | |
| 🏘️ | House building | `1f3d8_housebuildings` | |
| 🏚️ | Derelict house | `1f3da_derelicthouse` | |
| 🏠 | House | `house` | |
| 🏡 | House with garden | `1f3e1_housewithgarden` | |
| 🏢 | Office building | `1f3e2_officebuilding` | |
| 🏣 | Post office | `1f3e3_japanesepostoffice` | |
| 🏤 | European post office | `1f3e4_europeanpostoffice` | |
| 🏥 | Hospital | `1f3e5_hospital` | |
| 🏦 | Bank | `1f3e6_bank` | |
| 🏨 | Hotel | `1f3e8_hotel` | |
| 🏪 | Convenience store | `1f3ea_conveniencestore` | |
| 🏫 | School | `1f3eb_school` | |
| 🏬 | Department store | `1f3ec_departmentstore` | |
| 🏭 | Factory | `1f3ed_factory` | |
| 🏯 | Castle | `1f3ef_japanesecastle` | |
| 🏰 | European castle | `1f3f0_europeancastle` | |
| 💒 | Wedding | `1f492_wedding` | |
| 🗼 | Tokyo tower | `1f5fc_tokyotower` | |
| 🗽 | Statue of Liberty | `statueofliberty` | |
| ⛪ | Church | `26ea_church` | |
| 🕌 | Mosque | `1f54c_mosque` | |
| 🛕 | Hindu temple | `1f6d5_hindutemple` | |
| 🕍 | Synagogue | `1f54d_synagogue` | |
| ⛩️ | Shinto shrine | `26e9_shintoshrine` | |
| 🕋 | Kaaba | `1f54b_kaaba` | |
| ⛲ | Fountain | `26f2_fountain` | |
| ⛺ | Tent | `26fa_tent` | |
| 🌁 | Foggy | `1f301_foggy` | |
| 🌃 | Night with stars | `1f303_nightwithstars` | |
| 🏙️ | Cityscape | `1f3d9_cityscape` | |
| 🌄 | Sunrise over mountains | `1f304_sunriseovermountains` | |
| 🌅 | Sunrise | `1f305_sunrise` | |
| 🌆 | City scape at dusk | `1f306_cityscapeatdusk` | |
| 🌇 | Sunset over buildings | `1f307_sunsetoverbuildings` | |
| 🌉 | Bridge at night | `1f309_bridgeatnight` | |
| ♨️ | Hot springs | `2668_hotsprings` | |
| 🎠 | Carousel horse | `1f3a0_carouselhorse` | |
| 🛝 | Slide | `slide` | |
| 🎡 | Ferris wheel | `1f3a1_ferriswheel` | |
| 🎢 | Rollercoaster | `1f3a2_rollercoaster` | |
| 💈 | Barber pole | `1f488_barberpole` | |
| 🎪 | Circus tent | `1f3aa_circustent` | |
| 🚂 | Steam train | `steamtrain` | |
| 🚃 | Railway car | `1f683_railwaycar` | |
| 🚄 | High speed train | `1f684_highspeedtrain` | |
| 🚅 | Bullet train | `1f685_bullettrain` | |
| 🚆 | Train | `1f686_train` | |
| 🚇 | Metro | `1f687_metro` | |
| 🚈 | Light rail | `1f688_lightrail` | |
| 🚉 | Station | `1f689_station` | |
| 🚊 | Tram | `1f68a_tram` | |
| 🚝 | Monorail | `1f69d_monorail` | |
| 🚞 | Mountain railway | `1f69e_mountainrailway` | |
| 🚋 | Tram car | `1f68b_tramcar` | |
| 🚌 | Bus | `1f68c_bus` | |
| 🚍 | Oncoming bus | `1f68d_oncomingbus` | |
| 🚎 | Trolley bus | `1f68e_trolleybus` | |
| 🚐 | Minibus | `1f690_minibus` | |
| 🚑 | Ambulance | `ambulance` | |
| 🚒 | Fire engine | `1f692_fireengine` | |
| 🚓 | Police car | `policecar` | |
| 🚔 | Oncoming police car | `1f694_oncomingpolicecar` | |
| 🚕 | Taxi | `taxi` | |
| 🚖 | Oncoming taxi | `1f696_oncomingtaxi` | |
| 🚗 | Car | `car` | |
| 🚘 | Oncoming automobile | `1f698_oncomingautomobile` | |
| 🚙 | Sports utility vehicle | `1f699_recreationalvehicle` | |
| 🛻 | Pickup truck | `pickuptruck` | |
| 🚚 | Truck | `truck` | |
| 🚛 | Articulated lorry | `1f69b_articulatedlorry` | |
| 🚜 | Tractor | `1f69c_tractor` | |
| 🏎️ | Racing car | `1f3ce_racingcar` | |
| 🏍️ | Motorbike | `motorbike` | |
| 🛵 | Scooter | `scooter` | |
| 🦽 | Manual wheelchair | `1f9bd_manualwheelchair` | |
| 🦼 | Motorized wheelchair | `1f9bc_motorizedwheelchair` | |
| 🛺 | Auto Rickshaw | `rickshaw` | |
| 🚲 | Bicycle | `bicycle` | |
| 🛴 | Kick scooter | `kickscooter` | |
| 🛹 | Skate | `skate` | |
| 🛼 | Roller skate | `rollerskate` | |
| 🚏 | Bus stop | `1f68f_busstop` | |
| 🛣️ | Motorway | `1f6e3_motorway` | |
| 🛤️ | Railway track | `1f6e4_railwaytrack` | |
| 🛢️ | Oil drum | `1f6e2_oildrum` | |
| ⛽ | Fuel pump | `26fd_fuelpump` | |
| 🛞 | Wheel | `wheel` | |
| 🚨 | Police car light | `1f6a8_policecarsrevolvinglight` | |
| 🚥 | Horizontal traffic light | `1f6a5_horizontaltrafficlight` | |
| 🚦 | Vertical traffic light | `1f6a6_verticaltrafficlight` | |
| 🛑 | Stop sign | `stopsign` | |
| 🚧 | Construction sign | `1f6a7_constructionsign` | |
| ⚓ | Anchor | `2693_anchor` | |
| 🛟 | Ring buoy | `buoy` | |
| ⛵ | Sailboat | `26f5_sailboat` | |
| 🛶 | Canoe | `1f6f6_canoe` | |
| 🚤 | Speedboat | `1f6a4_speedboat` | |
| 🛳️ | Passenger ship | `1f6f3_passengership` | |
| ⛴️ | Ferry | `26f4_ferry` | |
| 🛥️ | Motor boat | `1f6e5_motorboat` | |
| 🚢 | Ship | `1f6a2_ship` | |
| ✈️ | Plane | `plane` | |
| 🛩️ | Small airplane | `1f6e9_smallairplane` | |
| 🛫 | Airplane departure | `1f6eb_airplanedeparture` | |
| 🛬 | Airplane arriving | `1f6ec_airplanearriving` | |
| 🪂 | Parachute | `1fa82_parachute` | |
| 💺 | Seat | `1f4ba_seat` | |
| 🚁 | Helicopter | `1f681_helicopter` | |
| 🚟 | Suspension railway | `1f69f_suspensionrailway` | |
| 🚠 | Mountain cableway | `1f6a0_mountaincableway` | |
| 🚡 | Aerial tramway | `1f6a1_aerialtramway` | |
| 🛰️ | Satellite | `1f6f0_satellite` | |
| 🚀 | Rocket launch | `launch` | |
| 🛸 | Flying saucer | `1f6f8_flyingsaucer` | |
| 🛎️ | Bellhop bell | `1f6ce_bellhopbell` | |
| 🧳 | Luggage | `1f9f3_luggage` | |
| ⌛ | Hold on | `holdon` | |
| ⌛ | Hour glass done | `231b_hourglassdone` | |
| ⌚ | Watch | `231a_watch` | |
| ⏰ | Alarm clock | `23f0_alarmclock` | |
| ⏱️ | Stop watch | `23f1_stopwatch` | |
| ⏲️ | Timer clock | `23f2_timerclock` | |
| 🕰️ | Mantel piece clock | `1f570_mantelpiececlock` | |
| 🕛 | Twelve o'clock | `1f55b_twelveoclock` | |
| 🕧 | Twelve-thirty | `1f567_twelvethirty` | |
| 🕐 | One o'clock | `1f550_oneoclock` | |
| 🕜 | One-thirty | `1f55c_onethirty` | |
| 🕑 | Two o'clock | `1f551_twooclock` | |
| 🕝 | Two-thirty | `1f55d_twothirty` | |
| 🕒 | Three o'clock | `1f552_threeoclock` | |
| 🕞 | Three-thirty | `1f55e_threethirty` | |
| 🕓 | Four o'clock | `1f553_fouroclock` | |
| 🕟 | Four thirty | `1f55f_fourthirty` | |
| 🕔 | Five o'clock | `1f554_fiveoclock` | |
| 🕠 | Five-thirty | `1f560_fivethirty` | |
| 🕕 | Six o'clock | `1f555_sixoclock` | |
| 🕡 | Six-thirty | `1f561_sixthirty` | |
| 🕖 | Seven o'clock | `1f556_sevenoclock` | |
| 🕢 | Seven-thirty | `1f562_seventhirty` | |
| 🕗 | Eight o'clock | `1f557_eightoclock` | |
| 🕣 | Eight-thirty | `1f563_eightthirty` | |
| 🕘 | Nine o'clock | `1f558_nineoclock` | |
| 🕤 | Nine-thirty | `1f564_ninethirty` | |
| 🕙 | Ten o'clock | `1f559_tenoclock` | |
| 🕥 | Ten-thirty | `1f565_tenthirty` | |
| 🕚 | Eleven o'clock | `1f55a_elevenoclock` | |
| 🕦 | Eleven-thirty | `1f566_eleventhirty` | |
| 🌑 | New moon symbol | `1f311_newmoonsymbol` | |
| 🌒 | Waxing crescent moon symbol | `1f312_waxingcrescentmoonsymbol` | |
| 🌓 | First quarter moon symbol | `1f313_firstquartermoonsymbol` | |
| 🌔 | Waxing gibbous moon system | `1f314_waxinggibbousmoonsymbol` | |
| 🌕 | Full moon symbol | `1f315_fullmoonsymbol` | |
| 🌖 | Waning gibbous moon symbol | `1f316_waninggibbousmoonsymbol` | |
| 🌗 | Last quarter moon symbol | `1f317_lastquartermoonsymbol` | |
| 🌘 | Waning crescent moon symbol | `1f318_waningcrescentmoonsymbol` | |
| 🌙 | Crescent moon | `1f319_crescentmoon` | |
| 🌚 | New moon with face | `1f31a_newmoonwithface` | |
| 🌛 | First quarter moon with face | `1f31b_firstquartermoonwithface` | |
| 🌜 | Last quarter moon with face | `1f31c_lastquartermoonwithface` | |
| 🌡️ | Thermometer | `1f321_thermometer` | |
| ☀️ | Sun with rays | `2600_sunwithrays` | |
| 🌝 | Full moon face | `1f31d_fullmoonwithface` | |
| 🌞 | Sun | `sun` | |
| 🪐 | Ringed planet | `1fa90_ringedplanet` | |
| ⭐ | Star | `star` | |
| 🌟 | Glowing star | `1f31f_glowingstar` | |
| 🌠 | Shooting star | `1f320_shootingstar` | |
| 🌌 | Milky way | `1f30c_milkyway` | |
| ☁️ | Cloud | `2601_cloud` | |
| 🌥️ | Sun behind large cloud | `1f325_sunbehindlargecloud` | |
| ⛈️ | Cloud with lightning and rain | `26c8_cloudwithlightningandrain` | |
| 🌤️ | Sun behind small cloud | `1f324_sunbehindsmallcloud` | |
| ⛅ | Sun behind cloud | `26c5_sunbehindcloud` | |
| 🌦️ | Sun behind rain cloud | `1f326_sunbehindraincloud` | |
| 🌧️ | Raining | `rain` | |
| 🌨️ | Cloud with snow | `1f328_cloudwithsnow` | |
| 🌩️ | Cloud with lightning | `1f329_cloudwithlightning` | |
| 🌪️ | Tornado | `1f32a_cloudwithtornado` | |
| 🌫️ | Fog | `1f32b_fog` | |
| 🌬️ | Wind face | `1f32c_windblowingface` | |
| 🌀 | Cyclone | `1f300_cyclone` | |
| 🌈 | Rainbow | `rainbow` | |
| 🌂 | Closed umbrella | `1f302_closedumbrella` | |
| ☂️ | Umbrella | `2602_umbrella` | |
| ☔ | Umbrella | `umbrella` | |
| ⛱️ | Beach umbrella | `26f1_umbrellaonground` | |
| ⚡ | High voltage | `26a1_highvoltagesign` | |
| ❄️ | Snowflake | `snowflake` | |
| ⛄ | Snowman without snow | `snowmanwithoutsnow` | |
| ☃️ | Snow buddie | `snegovik` | |
| ☄️ | Comet | `2604_comet` | |
| 🔥 | Fire | `fire` | |
| 💧 | Droplet | `1f4a7_droplet` | |
| 🌊 | Water wave | `1f30a_waterwave` | |
| 🏖️ | Sandcastle | `sandcastle` | |
| ❤ | Cactus love | `cactuslove` | |
| 🏠 | Working from home | `wfh` | |
| ♻ | Wind turbine | `windturbine` | |
| ♻ | Vegetable garden | `vegetablegarden` | |
| ♻ | Electric car | `electriccar` | |
| ♻ | Earth in hand, Europe and Africa | `europeafricainhand` | 🎨 |
| ♻ | Earth in hand, Americas | `americainhand` | 🎨 |
| ♻ | Earth in hand, Asia and Australia | `asiaaustraliainhand` | 🎨 |

---

## Objects

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 👓 | Glasses | `1f453_glasses` |
| 🕶️ | Sunglasses | `1f576_sunglasses` |
| 🥽 | Goggles | `1f97d_goggles` |
| 🥼 | Lab coat | `1f97c_labcoat` |
| 🦺 | Safety vest | `1f9ba_safetyvest` |
| 👔 | Necktie | `1f454_necktie` |
| 👕 | T-shirt | `1f455_tshirt` |
| 👖 | Jeans | `1f456_jeans` |
| 🧣 | Scarf | `1f9e3_scarf` |
| 🧤 | Gloves | `1f9e4_gloves` |
| 🧥 | Coat | `1f9e5_coat` |
| 🧦 | Socks | `1f9e6_socks` |
| 👗 | Dress | `1f457_dress` |
| 👘 | Kimono | `1f458_kimono` |
| 🥻 | Sari | `1f97b_sari` |
| 🩱 | Swimming suit | `1fa71_onepiece` |
| 🩲 | Briefs | `1fa72_briefs` |
| 🩳 | Shorts | `1fa73_shorts` |
| 👙 | Bikini | `1f459_bikini` |
| 👚 | Blouse | `1f45a_womansclothes` |
| 🪭 | Fan | `fan` |
| 👛 | Purse | `1f45b_purse` |
| 👜 | Handbag | `1f45c_handbag` |
| 👝 | Pouch | `1f45d_pouch` |
| 🛍️ | Shopping bags | `shopping` |
| 🎒 | Backpack | `1f392_schoolsatchel` |
| 🩴 | Thong Sandal | `thongsandal` |
| 👞 | Man's shoe | `1f45e_mansshoe` |
| 👟 | Sneaker | `1f45f_athleticshoe` |
| 🥾 | Hiking boot | `1f97e_hikingboot` |
| 🥿 | Womans flat shoe | `1f97f_womansflatshoe` |
| 👠 | High heels | `1f460_highheeledshoe` |
| 👡 | Womans sandal | `1f461_womanssandal` |
| 🩰 | Ballet shoes | `1fa70_balletshoes` |
| 👢 | Womans boot | `1f462_womansboots` |
| 🪮 | Hair pick | `hairpick` |
| 👑 | Crown | `1f451_crown` |
| 👒 | Womans hat | `1f452_womanshat` |
| 🎩 | Top hat | `1f3a9_tophat` |
| 🎓 | Graduate | `1f393_graduationcap` |
| 🧢 | Baseball cap | `1f9e2_billedcap` |
| 🪖 | Military helmet | `militaryhelmet` |
| ⛑️ | Rescue helmet | `26d1_helmetwithwhitecross` |
| 📿 | Prayer beads | `1f4ff_prayerbeads` |
| 💄 | Lipstick | `lipstick` |
| 💍 | Engagement ring | `ring` |
| 💎 | Diamond | `diamond` |
| 🔇 | Mute | `1f507_mutedspeaker` |
| 🔈 | Speaker | `1f508_speaker` |
| 🔉 | Medium volume | `1f509_speakerwithonesoundwave` |
| 🔊 | High volume | `1f50a_speakerwiththreesoundwaves` |
| 📢 | PA loudspeaker | `1f4e2_publicaddressloudspeaker` |
| 📣 | Megaphone | `1f4e3_cheeringmegaphone` |
| 📯 | Postal horn | `1f4ef_postalhorn` |
| 🔔 | Bell | `bell` |
| 🔕 | Muted bell | `1f515_bellwithslash` |
| 🎼 | Musical score | `1f3bc_musicalscore` |
| 🎵 | Music | `music` |
| 🎶 | Multiple musical notes | `1f3b6_multiplemusicalnotes` |
| 🎙️ | Studio microphone | `1f399_studiomicrophone` |
| 🎚️ | Level slider | `1f39a_levelslider` |
| 🎛️ | Control knobs | `1f39b_controlknobs` |
| 🎤 | Microphone | `1f3a4_microphone` |
| 🎧 | Headphone | `headphone` |
| 📻 | Radio | `1f4fb_radio` |
| 🎷 | Saxophone | `1f3b7_saxophone` |
| 🪗 | Accordion | `accordion` |
| 🎸 | Guitar | `guitar` |
| 🎹 | Musical keyboard | `1f3b9_musicalkeyboard` |
| 🎺 | Trumpet | `1f3ba_trumpet` |
| 🎻 | Violin | `1f3bb_violin` |
| 🪕 | Banjo | `1fa95_banjo` |
| 🥁 | Drum | `1f941_drumwithdrumsticks` |
| 🪘 | Long Drum | `longdrum` |
| 🪇 | Maracas | `maracas` |
| 🪈 | Flute | `flute` |
| 📱 | Phone | `phone` |
| 📲 | Mobile phone with arrow | `1f4f2_mobilephonewitharrow` |
| ☎️ | Telephone | `260e_blacktelephone` |
| 📞 | Telephone receiver | `telephonereceiver` |
| 📟 | Pager | `1f4df_pager` |
| 📠 | Fax machine | `1f4e0_faxmachine` |
| 🔋 | Battery | `1f50b_battery` |
| 🪫 | Low battery | `lowbattery` |
| 🔌 | Electric plug | `1f50c_electricplug` |
| 💻 | Computer | `computer` |
| 🖥️ | Computer | `1f5a5_desktopcomputer` |
| 🖨️ | Printer | `1f5a8_printer` |
| ⌨️ | Keyboard | `2328_keyboard` |
| 🖱️ | Mouse | `1f5b1_threebuttonmouse` |
| 🖲️ | Trackball | `1f5b2_trackball` |
| 💽 | Minidisc | `1f4bd_minidisc` |
| 💾 | Floppy disk | `1f4be_floppydisk` |
| 💿 | Optical disk | `1f4bf_opticaldisc` |
| 📀 | DVD | `1f4c0_dvd` |
| 🧮 | Abacus | `1f9ee_abacus` |
| 🎥 | Movie camera | `1f3a5_moviecamera` |
| 🎞️ | Film frames | `1f39e_filmframes` |
| 📽️ | Film projector | `1f4fd_filmprojector` |
| 🎬 | Movie | `movie` |
| 📺 | Television | `1f4fa_television` |
| 📷 | Camera | `1f4f7_camera` |
| 📸 | Camera | `camera` |
| 📹 | Video camera | `1f4f9_videocamera` |
| 📼 | Video cassette | `1f4fc_videocassette` |
| 🔍 | Magnifying glass left | `1f50d_magnifiertiltedleft` |
| 🔎 | Magnifying glass right | `1f50e_magnifiertiltedright` |
| 🕯️ | Candle | `1f56f_candle` |
| 💡 | Electric light bulb | `1f4a1_electriclightbulb` |
| 🔦 | Torch | `1f526_electrictorch` |
| 🏮 | Izakaya lantern | `1f3ee_izakayalantern` |
| 🪔 | Diya lamp | `1fa94_diyalamp` |
| 📔 | Decorative notebook | `1f4d4_decorativenotebook` |
| 📕 | Red book | `1f4d5_closedbook` |
| 📖 | Open book | `1f4d6_openbook` |
| 📗 | Green book | `1f4d7_greenbook` |
| 📘 | Blue book | `1f4d8_bluebook` |
| 📙 | Orange book | `1f4d9_orangebook` |
| 📚 | Books | `1f4da_books` |
| 📓 | Notebook | `1f4d3_notebook` |
| 📒 | Binder | `1f4d2_ledger` |
| 📃 | Curled page | `1f4c3_pagewithcurl` |
| 📜 | Scroll | `1f4dc_scroll` |
| 📄 | Page | `1f4c4_pagefacingup` |
| 📰 | Newspaper | `1f4f0_newspaper` |
| 🗞️ | Rolled up newspaper | `1f5de_rolledupnewspaper` |
| 📑 | Bookmark tabs | `1f4d1_bookmarktabs` |
| 🔖 | Bookmark | `1f516_bookmark` |
| 🏷️ | Label tag | `1f3f7_label` |
| 💰 | Money bag | `1f4b0_moneybag` |
| 🪙 | Coin | `coin` |
| 💴 | Yen | `1f4b4_banknotewithyensign` |
| 💵 | Dollar | `1f4b5_banknotewithdollarsign` |
| 💶 | Euro | `1f4b6_banknotewitheurosign` |
| 💷 | Pound | `1f4b7_banknotewithpoundsign` |
| 💸 | Flying money | `1f4b8_moneywithwings` |
| 💳 | Credit card | `1f4b3_creditcard` |
| 🧾 | Receipt | `1f9fe_receipt` |
| 💹 | Chart increasing with yen | `1f4b9_yengraph` |
| 🧧 | Red envelope | `1f9e7_redenvelope` |
| 📧 | Email | `1f4e7_email` |
| 📨 | Income envelope | `1f4e8_incomingenvelope` |
| 📩 | Envelope with arrow | `1f4e9_envelopewitharrow` |
| 📤 | Outbox | `1f4e4_outboxtray` |
| 📥 | Inbox | `1f4e5_inboxtray` |
| 📦 | Package | `1f4e6_package` |
| 📫 | Closed mailbox with flag | `1f4eb_mailboxclosedflagup` |
| 📪 | Closed mailbox | `1f4ea_mailboxclosedflagdown` |
| 📬 | Open mailbox with flag | `1f4ec_openmailboxwithraisedflag` |
| 📭 | Open mailbox | `1f4ed_openmailboxwithloweredflag` |
| 📮 | Post box | `1f4ee_postbox` |
| 🗳️ | Ballot box | `1f5f3_ballotboxwithballot` |
| ✏️ | Pencil | `270f_pencil` |
| ✒️ | Black nib | `2712_blacknib` |
| 🖋️ | Fountain pen | `1f58b_lowerleftfountainpen` |
| 🖊️ | Ball point pen | `1f58a_lowerleftballpointpen` |
| 🖌️ | Paint brush | `1f58c_lowerleftpaintbrush` |
| 🖍️ | Crayon | `1f58d_lowerleftcrayon` |
| 📝 | Memo | `1f4dd_memo` |
| 💼 | Briefcase | `1f4bc_briefcase` |
| 📁 | Folder | `1f4c1_filefolder` |
| 📂 | Open folder | `1f4c2_openfilefolder` |
| 🗂️ | Folder dividers | `1f5c2_cardindexdividers` |
| 📅 | Calendar | `1f4c5_calendar` |
| 📆 | Spiral calendar | `spiralcalendar` |
| 🗓️ | Tear off calendar | `1f4c6_tearoffcalendar` |
| 🗒️ | Spiral notepad | `1f5d2_spiralnotepad` |
| 📇 | Rolodex | `1f4c7_cardindex` |
| 📈 | Positive graph | `1f4c8_chartwithupwardstrend` |
| 📉 | Negative graph | `1f4c9_chartwithdownwardstrend` |
| 📊 | Bar chart | `1f4ca_barchart` |
| 📋 | Clipboard | `1f4cb_clipboard` |
| 📌 | Pin | `1f4cc_pushpin` |
| 📍 | Pin | `1f4cd_roundpushpin` |
| 📎 | Paperclip | `1f4ce_paperclip` |
| 🖇️ | Paper clips | `1f587_linkedpaperclips` |
| 📏 | Ruler | `1f4cf_straightruler` |
| 📐 | Triangular ruler | `1f4d0_triangularruler` |
| ✂️ | Scissors | `2702_blackscissors` |
| 🗃️ | File box | `1f5c3_cardfilebox` |
| 🗄️ | Filing cabinet | `1f5c4_filecabinet` |
| 🗑️ | Trash bin | `1f5d1_wastebasket` |
| 🔒 | Locked | `1f512_locked` |
| 🔓 | Unlocked | `1f513_unlocked` |
| 🔏 | Locked with pen | `1f50f_lockedwithpen` |
| 🔐 | Lock and key | `1f510_lockedwithkey` |
| 🔑 | Key | `1f511_key` |
| 🗝️ | Old key | `oldkey` |
| 🔨 | Hammer  | `1f528_hammer` |
| 🪓 | Axe | `1fa93_axe` |
| ⛏️ | Pick | `26cf_pick` |
| ⚒️ | Hammer and pick | `2692_hammerandpick` |
| 🛠️ | Hammer and wrench | `1f6e0_hammerandwrench` |
| 🗡️ | Dagger | `1f5e1_daggerknife` |
| 🪃 | Boomerang | `boomerang` |
| ⚔️ | Swords | `2694_crossedswords` |
| 🔫 | Water pistol | `1f52b_pistol` |
| 🏹 | Bow and arrow | `1f3f9_bowandarrow` |
| 🛡️ | Shield | `1f6e1_shield` |
| 🪚 | Carpentry saw | `carpentrysaw` |
| 🔧 | Wrench | `1f527_wrench` |
| 🪛 | Screwdriver | `screwdriver` |
| 🔩 | Bolt | `1f529_nutandbolt` |
| ⚙️ | Cog | `2699_gear` |
| 🗜️ | Clamp | `1f5dc_compression` |
| ⚖️ | Scales | `2696_scales` |
| 🦯 | Probing cane | `1f9af_probingcane` |
| 🔗 | Link | `1f517_linksymbol` |
| ⛓️‍💥 | Broken chain | `brokenchain8` |
| ⛓️ | Chains | `26d3_chains` |
| 🪝 | Hook | `hook` |
| 🧰 | Toolbox | `1f9f0_toolbox` |
| 🧲 | Magnet | `1f9f2_magnet` |
| 🪜 | Ladder | `ladder` |
| ⚗️ | Alembic | `2697_alembic` |
| 🧪 | Test tube | `1f9ea_testtube` |
| 🧫 | Petri dish | `1f9eb_petridish` |
| 🧬 | DNA | `1f9ec_dna` |
| 🔬 | Microscope | `1f52c_microscope` |
| 🔭 | Telescope | `1f52d_telescope` |
| 📡 | Satellite antenna | `1f4e1_satelliteantenna` |
| 💉 | Syringe | `1f489_syringe` |
| 🩸 | Blood drop | `1fa78_blooddrop` |
| 💊 | Pill | `1f48a_pill` |
| 🩹 | Plaster | `1fa79_adhesivebandage` |
| 🩼 | Crutch | `crutch` |
| 🩺 | Stethoscope | `1fa7a_stethoscope` |
| 🩻 | X-ray | `xray` |
| 🚪 | Door | `1f6aa_door` |
| 🛗 | Elevator | `elevator` |
| 🪞 | Mirror | `mirror` |
| 🪟 | Window | `window` |
| 🛏️ | Bed | `1f6cf_bed` |
| 🛋️ | Couch and lamp | `1f6cb_couchandlamp` |
| 🪑 | Chair | `1fa91_chair` |
| 🚽 | Toilet | `toilet` |
| 🪠 | Plunger | `plunger` |
| 🚿 | Shower | `1f6bf_shower` |
| 🛁 | Bath tub | `1f6c1_bathtub` |
| 🪤 | Mouse trap | `mousetrap` |
| 🪒 | Razor | `1fa92_razor` |
| 🧴 | Lotion | `1f9f4_lotionbottle` |
| 🧹 | Broom | `1f9f9_broom` |
| 🧺 | Laundry basket | `1f9fa_basket` |
| 🧻 | Roll of paper | `1f9fb_toiletpaper` |
| 🪣 | Bucket | `bucket` |
| 🧼 | Soap | `1f9fc_soap` |
| 🫧 | Bubbles | `bubbles` |
| 🪥 | Toothbrush | `toothbrush` |
| 🧽 | Sponge | `1f9fd_sponge` |
| 🧯 | Fire extinguisher | `1f9ef_fireextinguisher` |
| 🛒 | Shopping trolley | `1f6d2_shoppingtrolley` |
| 🚬 | Cigarette | `cigarette` |
| ⚰️ | Coffin | `26b0_coffin` |
| 🪦 | Headstone | `headstone` |
| ⚱️ | Funeral urn | `26b1_funeralurn` |
| 🪬 | Hamsa | `hamsa` |
| 🗿 | Moyai | `1f5ff_moyai` |
| 🪧 | Placard | `placard` |
| 🪪 | ID card | `idcard` |

---

## Activities & Sports

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 🎃 | Pumpkin | `pumpkin` |
| 🎄 | Xmas tree | `xmastree` |
| 🎆 | Fireworks | `fireworks` |
| 🎇 | Sparkler | `sparkler` |
| 🧨 | Dynamite | `1f9e8_firecracker` |
| ✨ | Sparkles | `2728_sparkles` |
| 🎈 | Balloon | `1f388_balloon` |
| 🎉 | Party popper | `1f389_partypopper` |
| 🎊 | Confetti ball | `1f38a_confettiball` |
| 🎋 | Tanabata tree | `1f38b_tanabatatree` |
| 🎍 | Pine decoration | `1f38d_pinedecoration` |
| 🎎 | Japanese dolls | `1f38e_japanesedolls` |
| 🎏 | Carp streamer | `1f38f_carpstreamer` |
| 🎐 | Wind chime | `1f390_windchime` |
| 🎑 | Harvest moon | `1f391_moonviewingceremony` |
| 🧧 | Red envelope | `1f9e7_redenvelope` |
| 🎀 | Ribbon | `1f380_ribbon` |
| 🎁 | Gift | `gift` |
| 🎗️ | Reminder ribbon | `reminderribbon` |
| 🎟️ | Admission tickets | `1f39f_admissiontickets` |
| 🎫 | Ticket | `1f3ab_ticket` |
| 🎖️ | Military medal | `1f396_militarymedal` |
| 🏆 | Trophy | `trophy` |
| 🏅 | Sports medal | `1f3c5_sportsmedal` |
| 🥇 | Gold medal | `goldmedal` |
| 🥈 | Silver medal | `silvermedal` |
| 🥉 | Bronze medal | `bronzemedal` |
| ⚽ | Soccer ball | `soccerball` |
| ⚾ | Baseball | `baseball` |
| 🥎 | Softball | `1f94e_softball` |
| 🏀 | Basketball | `basketball` |
| 🏐 | Volley ball | `1f3d0_volleyball` |
| 🏈 | American football | `americanfootball` |
| 🏉 | Rugby football | `rugbyball` |
| 🎾 | Tennis ball | `tennisball` |
| 🥏 | Frisbee | `1f94f_flyingdisc` |
| 🎳 | Bowling ball | `bowlingball` |
| 🏏 | Cricket bat and ball | `cricketbatandball` |
| 🏑 | Field hockey | `1f3d1_fieldhockeystickandball` |
| 🏒 | Ice hockey | `1f3d2_icehockeystickandpuck` |
| 🥍 | Lacrosse | `lacrosse` |
| 🏓 | Table tennis | `1f3d3_tabletennispaddleandball` |
| 🏸 | Badminton | `1f3f8_badminton` |
| 🥊 | Boxing glove | `boxingglove` |
| 🥋 | Martial arts uniform | `1f94b_martialartsuniform` |
| 🥅 | Goal | `1f945_goalnet` |
| ⛳ | Flag in hole | `flaginhole` |
| ⛸️ | Ice skate | `26f8_iceskate` |
| 🎣 | Fishing pole | `1f3a3_fishingpoleandfish` |
| 🤿 | Diving mask | `1f93f_divingmask` |
| 🎽 | Running shirt | `1f3bd_runningshirtwithsash` |
| 🎿 | Ski and skiboot  | `1f3bf_skiandskiboot` |
| 🛷 | Sled | `1f6f7_sled` |
| 🥌 | Curling stone | `1f94c_curlingstone` |
| 🎯 | Archery | `target` |
| 🪀 | Yo-yo | `1fa80_yoyo` |
| 🪁 | Kite | `1fa81_kite` |
| 🎱 | Pool eight ball | `eightball` |
| 🔮 | Crystal ball | `1f52e_crystalball` |
| 🪄 | Magic Wand | `magicwand` |
| 🧿 | Nazar amulet | `1f9ff_nazaramulet` |
| 🎮 | Games | `games` |
| 🕹️ | Joystick | `1f579_joystick` |
| 🎰 | Slot machine | `1f3b0_slotmachine` |
| 🎲 | Dice | `1f3b2_gamedie` |
| 🧩 | Puzzle piece | `1f9e9_jigsaw` |
| 🧸 | Teddy bear | `hug` |
| 🪅 | Piñata | `pinata` |
| 🪩 | Glitter ball | `glitterball` |
| 🪆 | Matreshka | `matreshka` |
| ♠️ | Spades | `2660_blackspadesuit` |
| ♥️ | Hearts | `2665_blackheartsuit` |
| ♦️ | Diamonds | `2666_blackdiamondsuit` |
| ♣️ | Clubs | `2663_blackclubsuit` |
| ♟️ | Chess pawn | `265f_chesspawn` |
| 🃏 | Joker | `1f0cf_playingcardblackjoker` |
| 🀄 | Mahjong | `1f004_mahjong` |
| 🎴 | Flower playing cards | `1f3b4_flowerplayingcards` |
| 🎭 | Performing arts | `1f3ad_performingarts` |
| 🖼️ | Painting | `1f5bc_framewithpicture` |
| 🎨 | Artist palette | `1f3a8_artistpalette` |
| 🧵 | Thread | `1f9f5_thread` |
| 🪡 | Sewing needle | `sewingneedle` |
| 🧶 | Ball of yarn | `1f9f6_yarn` |
| 🪢 | Knot | `knot` |
| 🎗️ | Red ribbon | `ribbonred` |

---

## Symbols

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 🏧 | ATM | `1f3e7_automatedtellermachine` |
| 🚮 | Litter in bin | `1f6ae_putlitterinitsplacesymbol` |
| 🚰 | Water tap | `1f6b0_potablewatersymbol` |
| ♿ | Wheelchair symbol | `267f_wheelchairsymbol` |
| 🚹 | Mens symbol | `1f6b9_menssymbol` |
| 🚺 | Womans symbol | `1f6ba_womenssymbol` |
| 🚻 | Restroom | `1f6bb_restroom` |
| 🚼 | Baby symbol | `1f6bc_babysymbol` |
| 🚾 | Water closet | `1f6be_watercloset` |
| 🛂 | Passport control | `1f6c2_passportcontrol` |
| 🛃 | Customs | `1f6c3_customs` |
| 🛄 | Baggage claim | `1f6c4_baggageclaim` |
| 🛅 | Left luggage | `1f6c5_leftluggage` |
| ⚠️ | Warning | `26a0_warningsign` |
| 🚸 | Children crossing | `1f6b8_childrencrossing` |
| ⛔ | No entry | `26d4_noentry` |
| 🚫 | Banned | `1f6ab_noentrysign` |
| 🚳 | No bicycles | `1f6b3_nobicycles` |
| 🚭 | No smoking | `1f6ad_nosmokingsymbol` |
| 🚯 | No littering | `1f6af_donotlittersymbol` |
| 🚱 | Non-potable water | `1f6b1_nonpotablewatersymbol` |
| 🚷 | No pedestrians | `1f6b7_nopedestrians` |
| 📵 | No mobile phones | `1f4f5_nomobilephones` |
| 🔞 | No one under eighteen | `1f51e_nooneundereighteensymbol` |
| ☢️ | Radioactive | `2622_radioactivesign` |
| ☣️ | Biohazard | `2623_biohazardsign` |
| ⬆️ | Up arrow | `2b06_upwardsblackarrow` |
| ↗️ | Up right arrow | `2197_northeastarrow` |
| ➡️ | Right arrow | `27a1_blackrightwardsarrow` |
| ↘️ | Down right arrow | `2198_southeastarrow` |
| ⬇️ | Down arrow | `2b07_downwardsblackarrow` |
| ↙️ | Down left arrow | `2199_southwestarrow` |
| ⬅️ | Left arrow | `2b05_leftwardsblackarrow` |
| ↖️ | Up left arrow | `2196_northwestarrow` |
| ↕️ | Up down arrow | `2195_updownarrow` |
| ↔️ | Left right arrow | `2194_leftrightarrow` |
| ↩️ | Curving left arrow | `21a9_leftwardsarrowwithhook` |
| ↪️ | Curving right arrow  | `21aa_rightwardsarrowwithhook` |
| ⤴️ | Arrow curving up | `2934_arrowcurvedupright` |
| ⤵️ | Arrow curving down | `2935_arrowcurveddownright` |
| 🔃 | Clockwise vertical arrows | `1f503_arrowsclockwise` |
| 🔄 | Counterclockwise arrows button | `1f504_refresh` |
| 🔙 | Back arrow | `1f519_backarrow` |
| 🔚 | End arrow | `1f51a_endwithleftwardsarrowabove` |
| 🔛 | On! arrow | `1f51b_on` |
| 🔜 | Soon arrow | `1f51c_soon` |
| 🔝 | Top arrow | `1f51d_topwithupwardsarrowabove` |
| 🛐 | Place of worship | `1f6d0_placeofworship` |
| ⚛️ | Atom | `269b_atomsymbol` |
| 🕉️ | Om | `1f549_omsymbol` |
| ✡️ | Star of David | `2721_starofdavid` |
| ☸️ | Wheel of dharma | `2638_wheelofdharma` |
| ☯️ | Yin yang | `262f_yinyang` |
| ✝️ | Latin cross | `271d_latincross` |
| ☦️ | Orthodox cross | `2626_orthodoxcross` |
| ☪️ | Star and crescent | `262a_starandcrescent` |
| ☮️ | Peace | `262e_peacesymbol` |
| 🕎 | Menorah | `1f54e_menorahwithninebranches` |
| 🔯 | Star with dot | `1f52f_starwithdot` |
| 🪯 | Khanda | `khanda` |
| ♈ | Aries | `2648_aries` |
| ♉ | Taurus | `2649_taurus` |
| ♊ | Gemini | `264a_gemini` |
| ♋ | Cancer | `264b_cancer` |
| ♌ | Leo | `264c_leo` |
| ♍ | Virgo | `264d_virgo` |
| ♎ | Libra | `264e_libra` |
| ♏ | Scorpio | `264f_scorpius` |
| ♐ | Sagittarius | `2650_sagittarius` |
| ♑ | Capricorn | `2651_capricorn` |
| ♒ | Aquarius | `2652_aquarius` |
| ♓ | Pisces | `2653_pisces` |
| ⛎ | Ophiuchus | `26ce_ophiuchus` |
| 🔀 | Shuffle button | `1f500_twistedrightwardsarrows` |
| 🔁 | Repeat button | `1f501_repeat` |
| 🔂 | Repeat single button | `1f502_repeatsingle` |
| ▶️ | Play button | `25b6_blackrightpointingtriangle` |
| ⏩ | Fast-forward button | `23e9_fastforwardbutton` |
| ⏭️ | Next track button | `23ed_nexttrack` |
| ⏯️ | Play or pause button | `23ef_playpause` |
| ◀️ | Reverse button | `25c0_blackleftpointingtriangle` |
| ⏪ | Rewind button | `23ea_fastreversebutton` |
| ⏮️ | Last track button | `23ee_lasttrack` |
| 🔼 | Up button | `1f53c_uppointingsmallredtriangle` |
| ⏫ | Fast up button | `23eb_fastupbutton` |
| 🔽 | Button down small | `1f53d_buttondownsmall` |
| ⏬ | Fast down button | `23ec_fastdownbutton` |
| ⏸️ | Pause button | `23f8_doubleverticalbar` |
| ⏹️ | Stop button | `23f9_blacksquareforstop` |
| ⏺️ | Record button | `23fa_blackcircleforrecord` |
| ⏏️ | Eject button | `23cf_ejectsymbol` |
| 🎦 | Cinema | `1f3a6_cinema` |
| 🔅 | Low brightness | `1f505_lowbrightnesssymbol` |
| 🔆 | High brightness | `1f506_highbrightnesssymbol` |
| 📶 | Signal strength | `1f4f6_antennawithbars` |
| 🛜 | Wifi | `wifi` |
| 📳 | Vibration mode | `1f4f3_vibrationmode` |
| 📴 | Mobile phone off | `1f4f4_mobilephoneoff` |
| ♀️ | Female sign | `2640_woman` |
| ♂️ | Male sign | `2642_man` |
| ⚧️ | Transgender symbol | `transgendersymbol` |
| ✖️ | Multiplication sign | `2716_heavymultiplicationx` |
| ➕ | Plus sign | `2795_heavyplussign` |
| ➖ | Minus sign | `2796_heavyminussign` |
| ➗ | Division sign | `2797_heavydivisionsign` |
| 🟰 | Equals sign | `equals` |
| ♾️ | Infinity | `267e_infinity` |
| ‼️ | Double exclamation | `203c_doubleexclamationmark` |
| ⁉️ | Exclamation question mark | `exclamationquestionmark` |
| ❓ | Question mark | `2753_blackquestionmarkornament` |
| ❔ | White question mark | `2754_whitequestionmarkornament` |
| ❕ | White exclamation mark | `2755_whiteexclamationmark` |
| ❗ | Exclamation mark | `2757_heavyexclamationmarksymbol` |
| 〰️ | Wavy dash | `3030_wavydash` |
| 💱 | Currency exchange | `1f4b1_currencyexchange` |
| 💲 | Dollar | `cash` |
| ⚕️ | Medical symbol | `2695_staffofaesculapius` |
| ♻️ | Recycle | `recycle` |
| ⚜️ | Fleur de lis | `269c_fleurdelis` |
| 🔱 | Trident | `1f531_tridentemblem` |
| 📛 | Name badge | `1f4db_namebadge` |
| 🔰 | Beginner | `1f530_japanesesymbolforbeginner` |
| ⭕ | Red ring | `2b55_heavylargecircle` |
| ✅ | Checkmark button | `2705_whiteheavycheckmark` |
| ☑️ | Checkbox | `2611_ballotboxwithcheck` |
| ✔️ | Checkmark | `2714_heavycheckmark` |
| ❌ | Crossmark | `274c_crossmark` |
| ❎ | Cross mark button | `274e_negativesquaredcrossmark` |
| ➰ | Curly loop | `27b0_curlyloop` |
| ➿ | Double curly loop | `27bf_doublecurlyloop` |
| 〽️ | Part alternation mark | `303d_partalternationmark` |
| ✳️ | Asterisk | `2733_eightspokedasterisk` |
| ✴️ | Star button | `2734_eightpointedblackstar` |
| ❇️ | Sparkle | `2747_sparkle` |
| ©️ | Copyright | `00a9_copyrightsign` |
| ®️ | Registered | `00ae_registeredsign` |
| ™️ | Trademark | `2122_trademarksign` |
| #️⃣ | Keycap number | `keycapnumbersign` |
| *️⃣ | Keycap asterisk | `keycapnumberasterisk` |
| 0️⃣ | Keycap zero | `keycapdigitzero` |
| 1️⃣ | Keycap one | `keycapdigitone` |
| 2️⃣ | Keycap two | `keycapdigittwo` |
| 3️⃣ | Keycap three | `keycapdigitthree` |
| 4️⃣ | Keycap four | `keycapdigitfour` |
| 5️⃣ | Keycap five | `keycapdigitfive` |
| 6️⃣ | Keycap six | `keycapdigitsix` |
| 7️⃣ | Keycap seven | `keycapdigitseven` |
| 8️⃣ | Keycap eight | `keycapdigiteight` |
| 9️⃣ | Keycap nine | `keycapdigitnine` |
| 🔟 | Keycap ten | `1f51f_keycapten` |
| 🔠 | Uppercase | `1f520_uppercaseabcd` |
| 🔡 | Lowercase | `1f521_lowercaseabcd` |
| 🔢 | Numbers | `1f522_inputsymbolfornumbers` |
| 🔣 | Symbols | `1f523_inputsymbolforsymbols` |
| 🔤 | Letters | `1f524_inputsymbolforlatinletters` |
| 🅰️ | Blood type A | `1f170_bloodtypea` |
| 🆎 | Blood type AB | `1f18e_negativesquaredab` |
| 🅱️ | Blood type B | `1f171_bloodtypeb` |
| 🆑 | Clear | `1f191_squaredcl` |
| 🆒 | Cool | `1f192_squaredcool` |
| 🆓 | Free | `1f193_squaredfree` |
| ℹ️ | Information | `2139_informationsource` |
| 🆔 | ID | `1f194_squaredid` |
| Ⓜ️ | Circled M | `24c2_circledlatincapitalletterm` |
| 🆕 | New | `1f195_squarednew` |
| 🆖 | NG | `1f196_squaredng` |
| 🅾️ | Blood type O | `1f17e_bloodtype0` |
| 🆗 | OK button | `1f197_squaredok` |
| 🅿️ | Parking | `1f17f_parking` |
| 🆘 | SOS | `1f198_squaredsos` |
| 🆙 | UP! button | `1f199_buttonup` |
| 🆚 | VS | `1f19a_squaredvs` |
| 🈁 | Here | `1f201_squaredkatakanakoko` |
| 🈂️ | Service Charge | `1f202_squaredkatakanasa` |
| 🈷️ | Monthly amount | `1f237_monthlyamount` |
| 🈶 | Not free of charge | `1f236_notfreeofcharge` |
| 🈯 | Reserved | `1f22f_reserved` |
| 🉐 | Bargain | `1f250_circledideographadvantage` |
| 🈹 | Discount | `1f239_discount` |
| 🈚 | Free of charge | `1f21a_freeofcharge` |
| 🈲 | Prohibited | `1f232_prohibited` |
| 🉑 | Accept | `1f251_circledideographaccept` |
| 🈸 | Application | `1f238_application` |
| 🈴 | Agreement | `1f234_agreement` |
| 🈳 | Vacancy | `1f233_vacancy` |
| ㊗️ | Congratulations | `3297_congratulations` |
| ㊙️ | Secret | `3299_circledideographsecret` |
| 🈺 | Open for business | `1f23a_open` |
| 🈵 | No vacancy | `1f235_novacancy` |
| 🔴 | Red circle | `1f534_largeredcircle` |
| 🟠 | Orange circle | `1f7e0_orangecircle` |
| 🟡 | Yellow circle | `1f7e1_yellowcircle` |
| 🟢 | Green circle | `1f7e2_greencircle` |
| 🔵 | Blue circle | `1f535_largebluecircle` |
| 🟣 | Purple circle | `1f7e3_purplecircle` |
| 🟤 | Brown circle | `1f7e4_browncircle` |
| ⚫ | Black circle | `26ab_mediumblackcircle` |
| ⚪ | White circle | `26aa_mediumwhitecircle` |
| 🟥 | Red square | `1f7e5_redsquare` |
| 🟧 | Orange square | `1f7e7_orangesquare` |
| 🟨 | Yellow square | `1f7e8_yellowsquare` |
| 🟩 | Green square | `1f7e9_greensquare` |
| 🟦 | Blue square | `1f7e6_bluesquare` |
| 🟪 | Purple square | `1f7ea_purplesquare` |
| 🟫 | Brown square | `1f7eb_brownsquare` |
| ⬛ | Large black square | `2b1b_blacklargesquare` |
| ⬜ | Large white square | `2b1c_whitelargesquare` |
| ◼️ | Medium black square | `25fc_blackmediumsquare` |
| ◻️ | Medium white square | `25fb_whitemediumsquare` |
| ◾ | Medium small black square | `25fe_blackmediumsmallsquare` |
| ◽ | Medium small white square | `25fd_whitemediumsmallsquare` |
| ▪️ | Small black square | `25aa_blacksmallsquare` |
| ▫️ | Small white square | `25ab_whitesmallsquare` |
| 🔶 | Large orange diamond | `1f536_largeorangediamond` |
| 🔷 | Large blue diamond | `1f537_largebluediamond` |
| 🔸 | Small orange diamond | `1f538_smallorangediamond` |
| 🔹 | Small blue diamond | `1f539_smallbluediamond` |
| 🔺 | Red triangle up | `1f53a_uppointingredtriangle` |
| 🔻 | Red triangle down | `1f53b_downpointingredtriangle` |
| 💠 | Diamond flower | `1f4a0_diamondshapewithadotinside` |
| 🔘 | Radio button | `1f518_radiobutton` |
| 🔳 | White square button | `1f533_whitesquarebutton` |
| 🔲 | Black square button | `1f532_blacksquarebutton` |
| 5️⃣0️⃣ | 50th 50 | `50th_50` |
| 🦋 | 50th Butterfly | `50th_butterfly` |
| 5️⃣0️⃣♥️ | 50th Card | `50th_card` |
| ♟️ | 50th Chess | `50th_chess` |
| ☁️ | 50th Cloud | `50th_cloud` |
| 🖱️ | 50th Cursor | `50th_cursor` |
| 💾 | 50th Floppy | `50th_floppy` |
| ✉️ | 50th Mail | `50th_mail` |
| 🎨 | 50th Paint | `50th_paint` |
| 🌈 | 50th Rainbow | `50th_rainbow` |
| 🎬 | 50th Slate | `50th_slate` |
| 💽 | 50th Win98 | `50th_win98` |
| 🌳 | 50th Tree | `50th_tree` |
| ☀️ | 50th Sun | `50th_sun` |
| 🙂 | 50th Smile | `50th_smile` |
| 🔍 | 50th Search | `50th_search` |
| 🎨 | 50th PaintBucket | `50th_paintbucket` |
| 🦋 | 50th MSN butterfly | `50th_msnbutterfly` |
| 📁 | 50th Folder | `50th_folder` |
| 🌐 | 50th Explorer | `50th_explorer` |
| 📎 | 50th Clippy | `50th_clippy` |
| 💿 | 50th CD | `50th_cd` |
| 📷 | 50th Camera | `50th_camera` |

---

## Data Source

```
https://statics.teams.cdn.office.net/evergreen-assets/personal-expressions/v1/metadata/86e6062e3e6843b4b62bd03d55440544/default.json
```

## Related Resources

- [Microsoft Teams Platform Documentation](../overview.md)
- [Message Reactions API](../bots/how-to/conversations/subscribe-to-conversation-events.md)
- [Microsoft Graph API](/graph/api/resources/chatmessagereaction)
