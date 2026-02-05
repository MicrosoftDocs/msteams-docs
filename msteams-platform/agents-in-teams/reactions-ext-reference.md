---
title: Teams Reactions Reference
description: Complete reference guide for Microsoft Teams reaction IDs, including 300+ reactions with skin tone support for bot development and app integrations.
ms.topic: reference
ms.date: 02/04/2026
---

# Teams Reactions Reference

**Complete reference guide for Microsoft Teams reaction IDs**

This comprehensive guide provides all 300+ reaction IDs supported in Microsoft Teams for bot development, app integrations, and platform development.


## 🆕 What's New in This Version

✨ **Complete Skin Tone Support**
- [Complete skin tone IDs](#skin-tone-reference-for-popular-gestures) (`-tone1` through `-tone5`) for popular gestures
- **NEW:** [Visual Skin Tone Reference Guide](#visual-skin-tone-reference-guide) with comprehensive examples and implementation guidelines
- **NEW:** Extended skin tone examples added to People, Activities & Sports sections (10+ new examples)
- [Full list of all 100+ diverse reactions](#complete-list-of-diverse-reactions) that support skin tones
- Visual indicators (🎨) in all tables showing which reactions support skin tones
- Code blocks in every relevant category with the most popular diverse reactions
- Color reference table with hex codes for all 5 Fitzpatrick scale tones

✨ **Enhanced Documentation**
- **NEW:** Visual comparison tables showing emojis across all skin tones
- **NEW:** Implementation guidelines with TypeScript code examples
- **NEW:** Best practices and accessibility considerations for skin tone support
- All character encoding issues fixed for perfect emoji rendering

✨ **Better Navigation & Filtering**
- [Category filter links](#filter-by-category) for quick navigation
- [Search tips](#search--navigation-tips) for finding reactions using browser search
- Improved table of contents with direct category links
- Quick-access tone examples throughout each category

✨ **Developer-Friendly Format**
- TypeScript code snippets in each category
- Organized by use case (positive, negative, celebration, work, etc.)
- All reaction IDs in code blocks for easy selection
- Comprehensive tone examples for Hand Gestures, People, Activities, and Sports

---

## Table of Contents

- [What's New](#-whats-new-in-this-version)
- [Quick Start](#quick-start)
  - [Search & Navigation Tips](#search--navigation-tips)
- [Skin Tone Support](#skin-tone-support)
  - [Skin Tone Reference for Popular Gestures](#skin-tone-reference-for-popular-gestures)
- [Visual Skin Tone Reference Guide](#visual-skin-tone-reference-guide)
  - [Understanding Skin Tone Modifiers](#understanding-skin-tone-modifiers)
  - [Visual Comparison Across Reaction Types](#visual-comparison-across-reaction-types)
- [Quick Reference - Most Popular Reactions](#quick-reference---most-popular-reactions)
- [Filter by Category](#filter-by-category)
- [Complete List of Diverse Reactions](#complete-list-of-diverse-reactions)
- [All Reactions](#all-reactions)
  - [Smileys](#smileys)
  - [Hand Gestures](#hand-gestures)
  - [People](#people)
  - [Hearts & Symbols](#hearts--symbols)
  - [Animals & Nature](#animals--nature)
  - [Food & Drink](#food--drink)
  - [Activities & Sports](#activities--sports)
  - [Objects](#objects)
  - [Travel & Places](#travel--places)
  - [Flags](#flags)
  - [Special Teams Reactions](#special-teams-reactions)
- [API Reference](#data-source)
- [Additional Resources](#additional-resources)

---

## Quick Start

To use reactions in your Teams bot or application, reference the reaction by its unique ID. For example:

```json
{
  "reactionId": "1f44b_wavinghand"
}
```

### How to Use Reaction IDs

1. **Find by name**: Browse the description (e.g., "waving hand")
2. **Find by category**: Filter by Smileys, Hand Gestures, Hearts, etc.
3. **Get the ID**: Each reaction has a unique ID for easy integration
4. **Filter diverse**: Show only reactions that support skin tone variants
5. **Category examples**: Each category now includes popular diverse reactions with all 5 skin tone variants

### Search & Navigation Tips

**Using Browser Search (Ctrl+F / Cmd+F):**
- Search by emoji name: `"thumbs up"`, `"heart"`, `"fire"`
- Search by reaction ID: `"1f44d"`, `"2764"`, `"1f525"`
- Search for diverse reactions: `"🎨"` or `"Diverse"`
- Search by category: `"Hand Gestures"`, `"Smileys"`, `"Food"`

**Quick Navigation:**
- Use the [Category Filter Links](#filter-by-category) to jump to specific sections
- Use the [Quick Reference](#quick-reference---most-popular-reactions) for commonly-used reactions
- Use [Table of Contents](#table-of-contents) for document structure

**Finding Skin Tone Variants:**
1. Use browser search to find the base reaction
2. Check if it has the 🎨 indicator in the "Diverse" column
3. If yes, append `-tone1` through `-tone5` to the ID
4. Or use the [Complete List of Diverse Reactions](#complete-list-of-diverse-reactions) section

---

## Skin Tone Support

Reactions marked with 🎨 **Diverse** support 5 skin tone variants. To use a specific skin tone, append `-tone1` through `-tone5` to the base reaction ID:

| Tone | Suffix | Example ID | Visual | Color |
|------|--------|------------|--------|-------|
| Tone 1 | `-tone1` | `1f44b_wavinghand-tone1` | 👋🏻 | Light (#F5D5A0) |
| Tone 2 | `-tone2` | `1f44b_wavinghand-tone2` | 👋🏼 | Medium-Light (#E3BC8A) |
| Tone 3 | `-tone3` | `1f44b_wavinghand-tone3` | 👋🏽 | Medium (#C18A5A) |
| Tone 4 | `-tone4` | `1f44b_wavinghand-tone4` | 👋🏾 | Medium-Dark (#8B6444) |
| Tone 5 | `-tone5` | `1f44b_wavinghand-tone5` | 👋🏿 | Dark (#5C4033) |

### Example Usage with Skin Tones

```typescript
// Base reaction (default skin tone)
const baseReaction = "1f44b_wavinghand"; // 👋

// With specific skin tone
const mediumTone = "1f44b_wavinghand-tone3"; // 👋🏽
const darkTone = "1f44b_wavinghand-tone5"; // 👋🏿 
```

### Skin Tone Reference for Popular Gestures

Use any of these complete IDs with skin tones directly in your code:

#### 👋 Waving Hand
```typescript
"1f44b_wavinghand"         // 👋 Default
"1f44b_wavinghand-tone1"   // 👋🏻 Light
"1f44b_wavinghand-tone2"   // 👋🏼 Medium-Light
"1f44b_wavinghand-tone3"   // 👋🏽 Medium
"1f44b_wavinghand-tone4"   // 👋🏾 Medium-Dark
"1f44b_wavinghand-tone5"   // 👋🏿 Dark
```

#### 👍 Thumbs Up
```typescript
"1f44d_thumbsup"           // 👍 Default
"1f44d_thumbsup-tone1"     // 👍🏻 Light
"1f44d_thumbsup-tone2"     // 👍🏼 Medium-Light
"1f44d_thumbsup-tone3"     // 👍🏽 Medium
"1f44d_thumbsup-tone4"     // 👍🏾 Medium-Dark
"1f44d_thumbsup-tone5"     // 👍🏿 Dark
```

#### 👎 Thumbs Down
```typescript
"1f44e_thumbsdown"         // 👎 Default
"1f44e_thumbsdown-tone1"   // 👎🏻 Light
"1f44e_thumbsdown-tone2"   // 👎🏼 Medium-Light
"1f44e_thumbsdown-tone3"   // 👎🏽 Medium
"1f44e_thumbsdown-tone4"   // 👎🏾 Medium-Dark
"1f44e_thumbsdown-tone5"   // 👎🏿 Dark
```

#### 👏 Clapping Hands
```typescript
"1f44f_clappinghands"      // 👏 Default
"1f44f_clappinghands-tone1" // 👏🏻 Light
"1f44f_clappinghands-tone2" // 👏🏼 Medium-Light
"1f44f_clappinghands-tone3" // 👏🏽 Medium
"1f44f_clappinghands-tone4" // 👏🏾 Medium-Dark
"1f44f_clappinghands-tone5" // 👏🏿 Dark
```

#### 🙏 Folded Hands
```typescript
"1f64f_foldedhands"        // 🙏 Default
"1f64f_foldedhands-tone1"  // 🙏🏻 Light
"1f64f_foldedhands-tone2"  // 🙏🏼 Medium-Light
"1f64f_foldedhands-tone3"  // 🙏🏽 Medium
"1f64f_foldedhands-tone4"  // 🙏🏾 Medium-Dark
"1f64f_foldedhands-tone5"  // 🙏🏿 Dark
```

#### ✋ Raised Hand
```typescript
"270b_raisedhand"          // ✋ Default
"270b_raisedhand-tone1"    // ✋🏻 Light
"270b_raisedhand-tone2"    // ✋🏼 Medium-Light
"270b_raisedhand-tone3"    // ✋🏽 Medium
"270b_raisedhand-tone4"    // ✋🏾 Medium-Dark
"270b_raisedhand-tone5"    // ✋🏿 Dark
```

#### 💪 Flexed Biceps
```typescript
"1f4aa_flexedbiceps"       // 💪 Default
"1f4aa_flexedbiceps-tone1" // 💪🏻 Light
"1f4aa_flexedbiceps-tone2" // 💪🏼 Medium-Light
"1f4aa_flexedbiceps-tone3" // 💪🏽 Medium
"1f4aa_flexedbiceps-tone4" // 💪🏾 Medium-Dark
"1f4aa_flexedbiceps-tone5" // 💪🏿 Dark
```

#### ✊ Raised Fist
```typescript
"270a_raisedfist"          // ✊ Default
"270a_raisedfist-tone1"    // ✊🏻 Light
"270a_raisedfist-tone2"    // ✊🏼 Medium-Light
"270a_raisedfist-tone3"    // ✊🏽 Medium
"270a_raisedfist-tone4"    // ✊🏾 Medium-Dark
"270a_raisedfist-tone5"    // ✊🏿 Dark
```

#### 🤳 Selfie
```typescript
"1f933_selfie"             // 🤳 Default
"1f933_selfie-tone1"       // 🤳🏻 Light
"1f933_selfie-tone2"       // 🤳🏼 Medium-Light
"1f933_selfie-tone3"       // 🤳🏽 Medium
"1f933_selfie-tone4"       // 🤳🏾 Medium-Dark
"1f933_selfie-tone5"       // 🤳🏿 Dark
```

#### 💅 Nail Polish
```typescript
"1f485_nailpolish"         // 💅 Default
"1f485_nailpolish-tone1"   // 💅🏻 Light
"1f485_nailpolish-tone2"   // 💅🏼 Medium-Light
"1f485_nailpolish-tone3"   // 💅🏽 Medium
"1f485_nailpolish-tone4"   // 💅🏾 Medium-Dark
"1f485_nailpolish-tone5"   // 💅🏿 Dark
```

#### 🤚 Raised Back of Hand
```typescript
"1f91a_raisedbackofhand"       // 🤚 Default
"1f91a_raisedbackofhand-tone1" // 🤚🏻 Light
"1f91a_raisedbackofhand-tone2" // 🤚🏼 Medium-Light
"1f91a_raisedbackofhand-tone3" // 🤚🏽 Medium
"1f91a_raisedbackofhand-tone4" // 🤚🏾 Medium-Dark
"1f91a_raisedbackofhand-tone5" // 🤚🏿 Dark
```

#### 🖐️ Hand with Fingers Splayed
```typescript
"1f590_handwithfingerssplayed"       // 🖐️ Default
"1f590_handwithfingerssplayed-tone1" // 🖐🏻 Light
"1f590_handwithfingerssplayed-tone2" // 🖐🏼 Medium-Light
"1f590_handwithfingerssplayed-tone3" // 🖐🏽 Medium
"1f590_handwithfingerssplayed-tone4" // 🖐🏾 Medium-Dark
"1f590_handwithfingerssplayed-tone5" // 🖐🏿 Dark
```

> 💡 **Pro Tip**: Over 100 reactions support skin tone variants. Look for the 🎨 indicator in the reaction tables below to see which reactions support skin tones. Every category section now includes examples for the most popular diverse reactions!

---

## Visual Skin Tone Reference Guide

This comprehensive guide shows how skin tones work across different reaction types with visual examples.

### Understanding Skin Tone Modifiers

Skin tone modifiers use the Fitzpatrick scale, which is widely used for classifying human skin tones. Each tone is represented by a suffix (`-tone1` through `-tone5`) that you append to the base reaction ID.

#### Tone Color Reference

| Tone | Suffix | Hex Color | Description | Example Emoji |
|------|--------|-----------|-------------|---------------|
| **Tone 1** | `-tone1` | `#F5D5A0` | Light skin tone | 👋🏻 |
| **Tone 2** | `-tone2` | `#E3BC8A` | Medium-light skin tone | 👋🏼 |
| **Tone 3** | `-tone3` | `#C18A5A` | Medium skin tone | 👋🏽 |
| **Tone 4** | `-tone4` | `#8B6444` | Medium-dark skin tone | 👋🏾 |
| **Tone 5** | `-tone5` | `#5C4033` | Dark skin tone | 👋🏿 |

### Visual Comparison Across Reaction Types

#### Hand Gestures
All hand gesture reactions support skin tone variants. Here are the most commonly used:

| Reaction | Default | Tone 1 | Tone 2 | Tone 3 | Tone 4 | Tone 5 |
|----------|---------|--------|--------|--------|--------|--------|
| **Waving Hand** | 👋 | 👋🏻 | 👋🏼 | 👋🏽 | 👋🏾 | 👋🏿 |
| **Thumbs Up** | 👍 | 👍🏻 | 👍🏼 | 👍🏽 | 👍🏾 | 👍🏿 |
| **Thumbs Down** | 👎 | 👎🏻 | 👎🏼 | 👎🏽 | 👎🏾 | 👎🏿 |
| **Clapping Hands** | 👏 | 👏🏻 | 👏🏼 | 👏🏽 | 👏🏾 | 👏🏿 |
| **Folded Hands** | 🙏 | 🙏🏻 | 🙏🏼 | 🙏🏽 | 🙏🏾 | 🙏🏿 |
| **Raised Hand** | ✋ | ✋🏻 | ✋🏼 | ✋🏽 | ✋🏾 | ✋🏿 |
| **Flexed Biceps** | 💪 | 💪🏻 | 💪🏼 | 💪🏽 | 💪🏾 | 💪🏿 |
| **Raised Fist** | ✊ | ✊🏻 | ✊🏼 | ✊🏽 | ✊🏾 | ✊🏿 |
| **Heart Hands** | 🫶 | 🫶🏻 | 🫶🏼 | 🫶🏽 | 🫶🏾 | 🫶🏿 |

**Usage Example:**
```typescript
// Waving hand with different skin tones
const wavingHandDefault = "1f44b_wavinghand";           // 👋
const wavingHandLight = "1f44b_wavinghand-tone1";       // 👋🏻
const wavingHandMedium = "1f44b_wavinghand-tone3";      // 👋🏽
const wavingHandDark = "1f44b_wavinghand-tone5";        // 👋🏿
```

#### People & Professions
People emojis including professions and roles support skin tones:

| Reaction | Default | Tone 1 | Tone 2 | Tone 3 | Tone 4 | Tone 5 |
|----------|---------|--------|--------|--------|--------|--------|
| **Baby** | 👶 | 👶🏻 | 👶🏼 | 👶🏽 | 👶🏾 | 👶🏿 |
| **Woman** | 👩 | 👩🏻 | 👩🏼 | 👩🏽 | 👩🏾 | 👩🏿 |
| **Man** | 👨 | 👨🏻 | 👨🏼 | 👨🏽 | 👨🏾 | 👨🏿 |
| **Police Officer** | 👮 | 👮🏻 | 👮🏼 | 👮🏽 | 👮🏾 | 👮🏿 |
| **Technologist** | 🧑‍💻 | 🧑🏻‍💻 | 🧑🏼‍💻 | 🧑🏽‍💻 | 🧑🏾‍💻 | 🧑🏿‍💻 |
| **Superhero** | 🦸 | 🦸🏻 | 🦸🏼 | 🦸🏽 | 🦸🏾 | 🦸🏿 |
| **Mage** | 🧙 | 🧙🏻 | 🧙🏼 | 🧙🏽 | 🧙🏾 | 🧙🏿 |

**Usage Example:**
```typescript
// Technologist with different skin tones
const techDefault = "1f9d1200d1f4bb_technologist";           // 🧑‍💻
const techLight = "1f9d1200d1f4bb_technologist-tone1";       // 🧑🏻‍💻
const techMedium = "1f9d1200d1f4bb_technologist-tone3";      // 🧑🏽‍💻
const techDark = "1f9d1200d1f4bb_technologist-tone5";        // 🧑🏿‍💻
```

#### Activities & Sports
Active and sport-related emojis support skin tones:

| Reaction | Default | Tone 1 | Tone 2 | Tone 3 | Tone 4 | Tone 5 |
|----------|---------|--------|--------|--------|--------|--------|
| **Person Surfing** | 🏄 | 🏄🏻 | 🏄🏼 | 🏄🏽 | 🏄🏾 | 🏄🏿 |
| **Person Swimming** | 🏊 | 🏊🏻 | 🏊🏼 | 🏊🏽 | 🏊🏾 | 🏊🏿 |
| **Person Biking** | 🚴 | 🚴🏻 | 🚴🏼 | 🚴🏽 | 🚴🏾 | 🚴🏿 |
| **Person Lifting Weights** | 🏋️ | 🏋🏻 | 🏋🏼 | 🏋🏽 | 🏋🏾 | 🏋🏿 |
| **Person Climbing** | 🧗 | 🧗🏻 | 🧗🏼 | 🧗🏽 | 🧗🏾 | 🧗🏿 |
| **Horse Racing** | 🏇 | 🏇🏻 | 🏇🏼 | 🏇🏽 | 🏇🏾 | 🏇🏿 |
| **Person in Lotus Position** | 🧘 | 🧘🏻 | 🧘🏼 | 🧘🏽 | 🧘🏾 | 🧘🏿 |

**Usage Example:**
```typescript
// Person surfing with different skin tones
const surfDefault = "1f3c4_personsurfing";           // 🏄
const surfLight = "1f3c4_personsurfing-tone1";       // 🏄🏻
const surfMedium = "1f3c4_personsurfing-tone3";      // 🏄🏽
const surfDark = "1f3c4_personsurfing-tone5";        // 🏄🏿
```



## Quick Reference - Most Popular Reactions

Frequently-used reaction IDs organized by use case:

### 👍 Positive Reactions
```typescript
"1f44d_thumbsup"           // 👍 Thumbs up
"1f44f_clappinghands"      // 👏 Clapping hands
"1f389_partypopper"        // 🎉 Party popper
"1f3c6_trophy"             // 🏆 Trophy
"2764_redheart"            // ❤️ Red heart
"1f525_fire"               // 🔥 Fire
"2b50_star"                // ⭐ Star
"2705_checkmarkbutton"     // ✅ Check mark button
```

### 😊 Happy & Positive Faces
```typescript
"1f60a_smilingfacewithsmilingeyes"  // 😊 Smiling face
"1f604_grinningfacewithsmilingeyes" // 😄 Grinning face
"1f602_facewithtearsofjoy"          // 😂 Face with tears of joy
"1f929_starstruck"                  // 🤩 Star-struck
"1f970_smilingfacewithhearts"       // 🥰 Smiling face with hearts
```

### 👎 Negative Reactions
```typescript
"1f44e_thumbsdown"         // 👎 Thumbs down
"1f61e_disappointedface"   // 😞 Disappointed face
"1f494_brokenheart"        // 💔 Broken heart
"274c_crossmark"           // ❌ Cross mark
```

### 🤔 Thinking & Questioning
```typescript
"1f914_thinkingface"       // 🤔 Thinking face
"1f928_facewithraisedeyebrow" // 🤨 Face with raised eyebrow
"2753_questionmark"        // ❓ Question mark
"1f615_confusedface"       // 😕 Confused face
```

### 💪 Hand Gestures (with skin tone support)
```typescript
// Default (no tone specified)
"1f44b_wavinghand"         // 👋 Waving hand
"1f64f_foldedhands"        // 🙏 Folded hands
"1f4aa_flexedbiceps"       // 💪 Flexed biceps
"270b_raisedhand"          // ✋ Raised hand
"1f91d_handshake"          // 🤝 Handshake

// With skin tones (append -tone1 through -tone5)
// 👋🏻 Light | 👋🏼 Medium-Light | 👋🏽 Medium | 👋🏾 Medium-Dark | 👋🏿 Dark
"1f44b_wavinghand-tone1"   // 👋🏻 Waving hand (light)
"1f44b_wavinghand-tone2"   // 👋🏼 Waving hand (medium-light)
"1f44b_wavinghand-tone3"   // 👋🏽 Waving hand (medium)
"1f44b_wavinghand-tone4"   // 👋🏾 Waving hand (medium-dark)
"1f44b_wavinghand-tone5"   // 👋🏿 Waving hand (dark)
```

### 🚀 Work & Achievement
```typescript
"1f680_rocket"             // 🚀 Rocket
"1f4a1_lightbulb"          // 💡 Light bulb
"1f4bb_laptop"             // 💻 Laptop
"1f4ca_barchart"           // 📊 Bar chart
"1f4c8_chartincreasing"    // 📈 Chart increasing
"1f3af_directhit"          // 🎯 Direct hit
```

### 🎉 Celebration
```typescript
"1f973_partyingface"       // 🥳 Partying face
"1f386_fireworks"          // 🎆 Fireworks
"1f38a_confettiball"       // 🎊 Confetti ball
"1f947_1stplacemedal"      // 🥇 1st place medal
"1f381_wrappedgift"        // 🎁 Wrapped gift
```

---

## Filter by Category

**Quick Links** - Jump directly to any category:

### 😀 [Smileys & Emotions](#smileys) 
All facial expressions and emotional reactions

### 👋 [Hand Gestures](#hand-gestures) 
Hand signs, gestures with full skin tone support

### 👥 [People & Body](#people)
People, professions, activities with skin tone support

### ❤️ [Hearts & Symbols](#hearts--symbols)
Hearts, symbols, religious icons, zodiac signs

### 🐶 [Animals & Nature](#animals--nature)
Animals, plants, weather, celestial objects

### 🍕 [Food & Drink](#food--drink)
All food and beverage items

### ⚽ [Activities & Sports](#activities--sports)
Sports, games, hobbies, musical instruments

### 💻 [Objects](#objects)
Technology, tools, office supplies

### 🚗 [Travel & Places](#travel--places)
Transportation, buildings, time, events

### 🏁 [Flags](#flags)
Country and regional flags

### 🎨 [Special Teams Reactions](#special-teams-reactions)
Unique Microsoft Teams-exclusive reactions

---

## Complete List of Diverse Reactions

All 100+ reactions that support skin tone variants (`-tone1` through `-tone5`):

> 📋 **Quick Tip:** For examples with all 5 skin tones, jump to the category sections:
> - [Hand Gestures with tone examples](#hand-gestures)
> - [People with tone examples](#people)
> - [Activities & Sports with tone examples](#activities--sports)

### Hand Gestures & Body Parts
```typescript
"1f44b_wavinghand"          // 👋 Waving hand
"1f91a_raisedbackofhand"    // 🤚 Raised back of hand
"1f590_handwithfingerssplayed" // 🖐️ Hand with fingers splayed
"270b_raisedhand"           // ✋ Raised hand
"1f596_vulcansalute"        // 🖖 Vulcan salute
"1faf1_rightwardshand"      // 🫱 Rightwards hand
"1faf2_leftwardshand"       // 🫲 Leftwards hand
"1faf3_palmdownhand"        // 🫳 Palm down hand
"1faf4_palmuphand"          // 🫴 Palm up hand
"1f44d_thumbsup"            // 👍 Thumbs up
"1f44e_thumbsdown"          // 👎 Thumbs down
"270a_raisedfist"           // ✊ Raised fist
"1f44a_oncomingfist"        // 👊 Oncoming fist
"1f91b_leftfacingfist"      // 🤛 Left-facing fist
"1f91c_rightfacingfist"     // 🤜 Right-facing fist
"1f44f_clappinghands"       // 👏 Clapping hands
"1f64c_raisinghands"        // 🙌 Raising hands
"1faf6_hearthands"          // 🫶 Heart hands
"1f450_openhands"           // 👐 Open hands
"1f932_palmsuptogether"     // 🤲 Palms up together
"1f64f_foldedhands"         // 🙏 Folded hands
"270d_writinghand"          // ✍️ Writing hand
"1f485_nailpolish"          // 💅 Nail polish
"1f933_selfie"              // 🤳 Selfie
"1f4aa_flexedbiceps"        // 💪 Flexed biceps
"1f9b5_leg"                 // 🦵 Leg
"1f9b6_foot"                // 🦶 Foot
"1f442_ear"                 // 👂 Ear
"1f9bb_earwithhearingaid"   // 🦻 Ear with hearing aid
"1f443_nose"                // 👃 Nose
```

### People & Professions
```typescript
"1f476_baby"                // 👶 Baby
"1f467_girl"                // 👧 Girl
"1f9d2_child"               // 🧒 Child
"1f466_boy"                 // 👦 Boy
"1f469_woman"               // 👩 Woman
"1f9d1_person"              // 🧑 Person
"1f468_man"                 // 👨 Man
"1f475_oldwoman"            // 👵 Old woman
"1f9d3_olderperson"         // 🧓 Older person
"1f474_oldman"              // 👴 Old man
"1f472_personwithskullcap"  // 👲 Person with skullcap
"1f9d5_womanwithheadscarf"  // 🧕 Woman with headscarf
"1f46e_policeofficer"       // 👮 Police officer
"1f477_constructionworker"  // 👷 Construction worker
"1f482_guard"               // 💂 Guard
"1f575_detective"           // 🕵️ Detective
"1f9d1200d2695_healthworker" // 🧑‍⚕️ Health worker
"1f9d1200d1f33e_farmer"     // 🧑‍🌾 Farmer
"1f9d1200d1f373_cook"       // 🧑‍🍳 Cook
"1f9d1200d1f393_student"    // 🧑‍🎓 Student
"1f9d1200d1f3a4_singer"     // 🧑‍🎤 Singer
"1f9d1200d1f3eb_teacher"    // 🧑‍🏫 Teacher
"1f9d1200d1f3ed_factoryworker" // 🧑‍🏭 Factory worker
"1f9d1200d1f4bb_technologist" // 🧑‍💻 Technologist
"1f9d1200d1f4bc_officeworker" // 🧑‍💼 Office worker
"1f9d1200d1f527_mechanic"   // 🧑‍🔧 Mechanic
"1f9d1200d1f52c_scientist"  // 🧑‍🔬 Scientist
"1f9d1200d1f3a8_artist"     // 🧑‍🎨 Artist
"1f9d1200d1f692_firefighter" // 🧑‍🚒 Firefighter
"1f9d1200d2708_pilot"       // 🧑‍✈️ Pilot
"1f9d1200d1f680_astronaut"  // 🧑‍🚀 Astronaut
"1f9d1200d2696_judge"       // 🧑‍⚖️ Judge
"1f470_personwithveil"      // 👰 Person with veil
"1f935_personintuxedo"      // 🤵 Person in tuxedo
"1f478_princess"            // 👸 Princess
"1fac5_personwithcrown"     // 🫅 Person with crown
"1f934_prince"              // 🤴 Prince
"1f977_ninja"               // 🥷 Ninja
"1f9b8_superhero"           // 🦸 Superhero
"1f9b9_supervillain"        // 🦹 Supervillain
"1f9d9_mage"                // 🧙 Mage
"1f9da_fairy"               // 🧚 Fairy
"1f9db_vampire"             // 🧛 Vampire
"1f9dc_merperson"           // 🧜 Merperson
"1f9dd_elf"                 // 🧝 Elf
```

### Activities & Gestures
```typescript
"1f486_persongettingmassage" // 💆 Person getting massage
"1f487_persongettinghaircut" // 💇 Person getting haircut
"1f6b6_personwalking"       // 🚶 Person walking
"1f9cd_personstanding"      // 🧍 Person standing
"1f9ce_personkneeling"      // 🧎 Person kneeling
"1f9d1200d1f9af_personwithwhitecane" // 🧑‍🦯 Person with white cane
"1f9d1200d1f9bc_personinmotorizedwheelchair" // 🧑‍🦼 Person in motorized wheelchair
"1f9d1200d1f9bd_personinmanualwheelchair" // 🧑‍🦽 Person in manual wheelchair
"1f3c3_personrunning"       // 🏃 Person running
"1f483_womandancing"        // 💃 Woman dancing
"1f57a_mandancing"          // 🕺 Man dancing
"1f574_personinsuitlevitating" // 🕴️ Person in suit levitating
"1f9d6_personinsteamyroom"  // 🧖 Person in steamy room
"1f9d7_personclimbing"      // 🧗 Person climbing
"1f3cb_personliftingweights" // 🏋️ Person lifting weights
"1f938_personcartwheeling"  // 🤸 Person cartwheeling
"26f9_personbouncingball"   // ⛹️ Person bouncing ball
"1f93a_personfencing"       // 🤺 Person fencing
"1f93e_personplayinghandball" // 🤾 Person playing handball
"1f3cc_persongolfing"       // 🏌️ Person golfing
"1f3c7_horseracing"         // 🏇 Horse racing
"1f9d8_personinlotusposition" // 🧘 Person in lotus position
"1f3c4_personsurfing"       // 🏄 Person surfing
"1f3ca_personswimming"      // 🏊 Person swimming
"1f93d_personplayingwaterpolo" // 🤽 Person playing water polo
"1f6a3_personrowingboat"    // 🚣 Person rowing boat
"1f6b5_personmountainbiking" // 🚵 Person mountain biking
"1f6b4_personbiking"        // 🚴 Person biking
"1f939_personjuggling"      // 🤹 Person juggling
"1f3c2_snowboarder"         // 🏂 Snowboarder
"26f7_skier"                // ⛷️ Skier
```

> 📋 **Usage**: Append `-tone1`, `-tone2`, `-tone3`, `-tone4`, or `-tone5` to any of these base IDs to specify a skin tone variant.

---

## Complete Skin Tone Variant Table

This comprehensive table shows all 100+ diverse reactions with their complete skin tone variant IDs. Each reaction includes the base ID and all 5 tone variations.

### Quick Navigation
- [Hand Gestures & Body Parts Variants](#hand-gestures--body-parts-skin-tone-variants)
- [People & Professions Variants](#people--professions-skin-tone-variants)
- [Activities & Sports Variants](#activities--sports-skin-tone-variants)

---

### Hand Gestures & Body Parts Skin Tone Variants

Complete skin tone IDs for all hand gesture and body part reactions:

| Emoji | Description | Base ID | Tone 1 (🟡 Light) | Tone 2 (🟠 Med-Light) | Tone 3 (🟤 Medium) | Tone 4 (🟤 Med-Dark) | Tone 5 (🟤 Dark) |
|-------|-------------|---------|-------------------|----------------------|-------------------|---------------------|------------------|
| 👋 | Waving hand | `1f44b_wavinghand` | `1f44b_wavinghand-tone1` | `1f44b_wavinghand-tone2` | `1f44b_wavinghand-tone3` | `1f44b_wavinghand-tone4` | `1f44b_wavinghand-tone5` |
| 🤚 | Raised back of hand | `1f91a_raisedbackofhand` | `1f91a_raisedbackofhand-tone1` | `1f91a_raisedbackofhand-tone2` | `1f91a_raisedbackofhand-tone3` | `1f91a_raisedbackofhand-tone4` | `1f91a_raisedbackofhand-tone5` |
| 🖐️ | Hand with fingers splayed | `1f590_handwithfingerssplayed` | `1f590_handwithfingerssplayed-tone1` | `1f590_handwithfingerssplayed-tone2` | `1f590_handwithfingerssplayed-tone3` | `1f590_handwithfingerssplayed-tone4` | `1f590_handwithfingerssplayed-tone5` |
| ✋ | Raised hand | `270b_raisedhand` | `270b_raisedhand-tone1` | `270b_raisedhand-tone2` | `270b_raisedhand-tone3` | `270b_raisedhand-tone4` | `270b_raisedhand-tone5` |
| 🖖 | Vulcan salute | `1f596_vulcansalute` | `1f596_vulcansalute-tone1` | `1f596_vulcansalute-tone2` | `1f596_vulcansalute-tone3` | `1f596_vulcansalute-tone4` | `1f596_vulcansalute-tone5` |
| 🫱 | Rightwards hand | `1faf1_rightwardshand` | `1faf1_rightwardshand-tone1` | `1faf1_rightwardshand-tone2` | `1faf1_rightwardshand-tone3` | `1faf1_rightwardshand-tone4` | `1faf1_rightwardshand-tone5` |
| 🫲 | Leftwards hand | `1faf2_leftwardshand` | `1faf2_leftwardshand-tone1` | `1faf2_leftwardshand-tone2` | `1faf2_leftwardshand-tone3` | `1faf2_leftwardshand-tone4` | `1faf2_leftwardshand-tone5` |
| 🫳 | Palm down hand | `1faf3_palmdownhand` | `1faf3_palmdownhand-tone1` | `1faf3_palmdownhand-tone2` | `1faf3_palmdownhand-tone3` | `1faf3_palmdownhand-tone4` | `1faf3_palmdownhand-tone5` |
| 🫴 | Palm up hand | `1faf4_palmuphand` | `1faf4_palmuphand-tone1` | `1faf4_palmuphand-tone2` | `1faf4_palmuphand-tone3` | `1faf4_palmuphand-tone4` | `1faf4_palmuphand-tone5` |
| 👍 | Thumbs up | `1f44d_thumbsup` | `1f44d_thumbsup-tone1` | `1f44d_thumbsup-tone2` | `1f44d_thumbsup-tone3` | `1f44d_thumbsup-tone4` | `1f44d_thumbsup-tone5` |
| 👎 | Thumbs down | `1f44e_thumbsdown` | `1f44e_thumbsdown-tone1` | `1f44e_thumbsdown-tone2` | `1f44e_thumbsdown-tone3` | `1f44e_thumbsdown-tone4` | `1f44e_thumbsdown-tone5` |
| ✊ | Raised fist | `270a_raisedfist` | `270a_raisedfist-tone1` | `270a_raisedfist-tone2` | `270a_raisedfist-tone3` | `270a_raisedfist-tone4` | `270a_raisedfist-tone5` |
| 👊 | Oncoming fist | `1f44a_oncomingfist` | `1f44a_oncomingfist-tone1` | `1f44a_oncomingfist-tone2` | `1f44a_oncomingfist-tone3` | `1f44a_oncomingfist-tone4` | `1f44a_oncomingfist-tone5` |
| 🤛 | Left-facing fist | `1f91b_leftfacingfist` | `1f91b_leftfacingfist-tone1` | `1f91b_leftfacingfist-tone2` | `1f91b_leftfacingfist-tone3` | `1f91b_leftfacingfist-tone4` | `1f91b_leftfacingfist-tone5` |
| 🤜 | Right-facing fist | `1f91c_rightfacingfist` | `1f91c_rightfacingfist-tone1` | `1f91c_rightfacingfist-tone2` | `1f91c_rightfacingfist-tone3` | `1f91c_rightfacingfist-tone4` | `1f91c_rightfacingfist-tone5` |
| 👏 | Clapping hands | `1f44f_clappinghands` | `1f44f_clappinghands-tone1` | `1f44f_clappinghands-tone2` | `1f44f_clappinghands-tone3` | `1f44f_clappinghands-tone4` | `1f44f_clappinghands-tone5` |
| 🙌 | Raising hands | `1f64c_raisinghands` | `1f64c_raisinghands-tone1` | `1f64c_raisinghands-tone2` | `1f64c_raisinghands-tone3` | `1f64c_raisinghands-tone4` | `1f64c_raisinghands-tone5` |
| 🫶 | Heart hands | `1faf6_hearthands` | `1faf6_hearthands-tone1` | `1faf6_hearthands-tone2` | `1faf6_hearthands-tone3` | `1faf6_hearthands-tone4` | `1faf6_hearthands-tone5` |
| 👐 | Open hands | `1f450_openhands` | `1f450_openhands-tone1` | `1f450_openhands-tone2` | `1f450_openhands-tone3` | `1f450_openhands-tone4` | `1f450_openhands-tone5` |
| 🤲 | Palms up together | `1f932_palmsuptogether` | `1f932_palmsuptogether-tone1` | `1f932_palmsuptogether-tone2` | `1f932_palmsuptogether-tone3` | `1f932_palmsuptogether-tone4` | `1f932_palmsuptogether-tone5` |
| 🙏 | Folded hands | `1f64f_foldedhands` | `1f64f_foldedhands-tone1` | `1f64f_foldedhands-tone2` | `1f64f_foldedhands-tone3` | `1f64f_foldedhands-tone4` | `1f64f_foldedhands-tone5` |
| ✍️ | Writing hand | `270d_writinghand` | `270d_writinghand-tone1` | `270d_writinghand-tone2` | `270d_writinghand-tone3` | `270d_writinghand-tone4` | `270d_writinghand-tone5` |
| 💅 | Nail polish | `1f485_nailpolish` | `1f485_nailpolish-tone1` | `1f485_nailpolish-tone2` | `1f485_nailpolish-tone3` | `1f485_nailpolish-tone4` | `1f485_nailpolish-tone5` |
| 🤳 | Selfie | `1f933_selfie` | `1f933_selfie-tone1` | `1f933_selfie-tone2` | `1f933_selfie-tone3` | `1f933_selfie-tone4` | `1f933_selfie-tone5` |
| 💪 | Flexed biceps | `1f4aa_flexedbiceps` | `1f4aa_flexedbiceps-tone1` | `1f4aa_flexedbiceps-tone2` | `1f4aa_flexedbiceps-tone3` | `1f4aa_flexedbiceps-tone4` | `1f4aa_flexedbiceps-tone5` |
| 🦵 | Leg | `1f9b5_leg` | `1f9b5_leg-tone1` | `1f9b5_leg-tone2` | `1f9b5_leg-tone3` | `1f9b5_leg-tone4` | `1f9b5_leg-tone5` |
| 🦶 | Foot | `1f9b6_foot` | `1f9b6_foot-tone1` | `1f9b6_foot-tone2` | `1f9b6_foot-tone3` | `1f9b6_foot-tone4` | `1f9b6_foot-tone5` |
| 👂 | Ear | `1f442_ear` | `1f442_ear-tone1` | `1f442_ear-tone2` | `1f442_ear-tone3` | `1f442_ear-tone4` | `1f442_ear-tone5` |
| 🦻 | Ear with hearing aid | `1f9bb_earwithhearingaid` | `1f9bb_earwithhearingaid-tone1` | `1f9bb_earwithhearingaid-tone2` | `1f9bb_earwithhearingaid-tone3` | `1f9bb_earwithhearingaid-tone4` | `1f9bb_earwithhearingaid-tone5` |
| 👃 | Nose | `1f443_nose` | `1f443_nose-tone1` | `1f443_nose-tone2` | `1f443_nose-tone3` | `1f443_nose-tone4` | `1f443_nose-tone5` |

[Back to Navigation](#quick-navigation)

---

### People & Professions Skin Tone Variants

Complete skin tone IDs for people and profession reactions:

| Emoji | Description | Base ID | Tone 1 (🟡 Light) | Tone 2 (🟠 Med-Light) | Tone 3 (🟤 Medium) | Tone 4 (🟤 Med-Dark) | Tone 5 (🟤 Dark) |
|-------|-------------|---------|-------------------|----------------------|-------------------|---------------------|------------------|
| 👶 | Baby | `1f476_baby` | `1f476_baby-tone1` | `1f476_baby-tone2` | `1f476_baby-tone3` | `1f476_baby-tone4` | `1f476_baby-tone5` |
| 👧 | Girl | `1f467_girl` | `1f467_girl-tone1` | `1f467_girl-tone2` | `1f467_girl-tone3` | `1f467_girl-tone4` | `1f467_girl-tone5` |
| 🧒 | Child | `1f9d2_child` | `1f9d2_child-tone1` | `1f9d2_child-tone2` | `1f9d2_child-tone3` | `1f9d2_child-tone4` | `1f9d2_child-tone5` |
| 👦 | Boy | `1f466_boy` | `1f466_boy-tone1` | `1f466_boy-tone2` | `1f466_boy-tone3` | `1f466_boy-tone4` | `1f466_boy-tone5` |
| 👩 | Woman | `1f469_woman` | `1f469_woman-tone1` | `1f469_woman-tone2` | `1f469_woman-tone3` | `1f469_woman-tone4` | `1f469_woman-tone5` |
| 🧑 | Person | `1f9d1_person` | `1f9d1_person-tone1` | `1f9d1_person-tone2` | `1f9d1_person-tone3` | `1f9d1_person-tone4` | `1f9d1_person-tone5` |
| 👨 | Man | `1f468_man` | `1f468_man-tone1` | `1f468_man-tone2` | `1f468_man-tone3` | `1f468_man-tone4` | `1f468_man-tone5` |
| 👵 | Old woman | `1f475_oldwoman` | `1f475_oldwoman-tone1` | `1f475_oldwoman-tone2` | `1f475_oldwoman-tone3` | `1f475_oldwoman-tone4` | `1f475_oldwoman-tone5` |
| 🧓 | Older person | `1f9d3_olderperson` | `1f9d3_olderperson-tone1` | `1f9d3_olderperson-tone2` | `1f9d3_olderperson-tone3` | `1f9d3_olderperson-tone4` | `1f9d3_olderperson-tone5` |
| 👴 | Old man | `1f474_oldman` | `1f474_oldman-tone1` | `1f474_oldman-tone2` | `1f474_oldman-tone3` | `1f474_oldman-tone4` | `1f474_oldman-tone5` |
| 👲 | Person with skullcap | `1f472_personwithskullcap` | `1f472_personwithskullcap-tone1` | `1f472_personwithskullcap-tone2` | `1f472_personwithskullcap-tone3` | `1f472_personwithskullcap-tone4` | `1f472_personwithskullcap-tone5` |
| 🧕 | Woman with headscarf | `1f9d5_womanwithheadscarf` | `1f9d5_womanwithheadscarf-tone1` | `1f9d5_womanwithheadscarf-tone2` | `1f9d5_womanwithheadscarf-tone3` | `1f9d5_womanwithheadscarf-tone4` | `1f9d5_womanwithheadscarf-tone5` |
| 👮 | Police officer | `1f46e_policeofficer` | `1f46e_policeofficer-tone1` | `1f46e_policeofficer-tone2` | `1f46e_policeofficer-tone3` | `1f46e_policeofficer-tone4` | `1f46e_policeofficer-tone5` |
| 👷 | Construction worker | `1f477_constructionworker` | `1f477_constructionworker-tone1` | `1f477_constructionworker-tone2` | `1f477_constructionworker-tone3` | `1f477_constructionworker-tone4` | `1f477_constructionworker-tone5` |
| 💂 | Guard | `1f482_guard` | `1f482_guard-tone1` | `1f482_guard-tone2` | `1f482_guard-tone3` | `1f482_guard-tone4` | `1f482_guard-tone5` |
| 🕵️ | Detective | `1f575_detective` | `1f575_detective-tone1` | `1f575_detective-tone2` | `1f575_detective-tone3` | `1f575_detective-tone4` | `1f575_detective-tone5` |
| 🧑‍⚕️ | Health worker | `1f9d1200d2695_healthworker` | `1f9d1200d2695_healthworker-tone1` | `1f9d1200d2695_healthworker-tone2` | `1f9d1200d2695_healthworker-tone3` | `1f9d1200d2695_healthworker-tone4` | `1f9d1200d2695_healthworker-tone5` |
| 🧑‍🌾 | Farmer | `1f9d1200d1f33e_farmer` | `1f9d1200d1f33e_farmer-tone1` | `1f9d1200d1f33e_farmer-tone2` | `1f9d1200d1f33e_farmer-tone3` | `1f9d1200d1f33e_farmer-tone4` | `1f9d1200d1f33e_farmer-tone5` |
| 🧑‍🍳 | Cook | `1f9d1200d1f373_cook` | `1f9d1200d1f373_cook-tone1` | `1f9d1200d1f373_cook-tone2` | `1f9d1200d1f373_cook-tone3` | `1f9d1200d1f373_cook-tone4` | `1f9d1200d1f373_cook-tone5` |
| 🧑‍🎓 | Student | `1f9d1200d1f393_student` | `1f9d1200d1f393_student-tone1` | `1f9d1200d1f393_student-tone2` | `1f9d1200d1f393_student-tone3` | `1f9d1200d1f393_student-tone4` | `1f9d1200d1f393_student-tone5` |
| 🧑‍🎤 | Singer | `1f9d1200d1f3a4_singer` | `1f9d1200d1f3a4_singer-tone1` | `1f9d1200d1f3a4_singer-tone2` | `1f9d1200d1f3a4_singer-tone3` | `1f9d1200d1f3a4_singer-tone4` | `1f9d1200d1f3a4_singer-tone5` |
| 🧑‍🏫 | Teacher | `1f9d1200d1f3eb_teacher` | `1f9d1200d1f3eb_teacher-tone1` | `1f9d1200d1f3eb_teacher-tone2` | `1f9d1200d1f3eb_teacher-tone3` | `1f9d1200d1f3eb_teacher-tone4` | `1f9d1200d1f3eb_teacher-tone5` |
| 🧑‍🏭 | Factory worker | `1f9d1200d1f3ed_factoryworker` | `1f9d1200d1f3ed_factoryworker-tone1` | `1f9d1200d1f3ed_factoryworker-tone2` | `1f9d1200d1f3ed_factoryworker-tone3` | `1f9d1200d1f3ed_factoryworker-tone4` | `1f9d1200d1f3ed_factoryworker-tone5` |
| 🧑‍💻 | Technologist | `1f9d1200d1f4bb_technologist` | `1f9d1200d1f4bb_technologist-tone1` | `1f9d1200d1f4bb_technologist-tone2` | `1f9d1200d1f4bb_technologist-tone3` | `1f9d1200d1f4bb_technologist-tone4` | `1f9d1200d1f4bb_technologist-tone5` |
| 🧑‍💼 | Office worker | `1f9d1200d1f4bc_officeworker` | `1f9d1200d1f4bc_officeworker-tone1` | `1f9d1200d1f4bc_officeworker-tone2` | `1f9d1200d1f4bc_officeworker-tone3` | `1f9d1200d1f4bc_officeworker-tone4` | `1f9d1200d1f4bc_officeworker-tone5` |
| 🧑‍🔧 | Mechanic | `1f9d1200d1f527_mechanic` | `1f9d1200d1f527_mechanic-tone1` | `1f9d1200d1f527_mechanic-tone2` | `1f9d1200d1f527_mechanic-tone3` | `1f9d1200d1f527_mechanic-tone4` | `1f9d1200d1f527_mechanic-tone5` |
| 🧑‍🔬 | Scientist | `1f9d1200d1f52c_scientist` | `1f9d1200d1f52c_scientist-tone1` | `1f9d1200d1f52c_scientist-tone2` | `1f9d1200d1f52c_scientist-tone3` | `1f9d1200d1f52c_scientist-tone4` | `1f9d1200d1f52c_scientist-tone5` |
| 🧑‍🎨 | Artist | `1f9d1200d1f3a8_artist` | `1f9d1200d1f3a8_artist-tone1` | `1f9d1200d1f3a8_artist-tone2` | `1f9d1200d1f3a8_artist-tone3` | `1f9d1200d1f3a8_artist-tone4` | `1f9d1200d1f3a8_artist-tone5` |
| 🧑‍🚒 | Firefighter | `1f9d1200d1f692_firefighter` | `1f9d1200d1f692_firefighter-tone1` | `1f9d1200d1f692_firefighter-tone2` | `1f9d1200d1f692_firefighter-tone3` | `1f9d1200d1f692_firefighter-tone4` | `1f9d1200d1f692_firefighter-tone5` |
| 🧑‍✈️ | Pilot | `1f9d1200d2708_pilot` | `1f9d1200d2708_pilot-tone1` | `1f9d1200d2708_pilot-tone2` | `1f9d1200d2708_pilot-tone3` | `1f9d1200d2708_pilot-tone4` | `1f9d1200d2708_pilot-tone5` |
| 🧑‍🚀 | Astronaut | `1f9d1200d1f680_astronaut` | `1f9d1200d1f680_astronaut-tone1` | `1f9d1200d1f680_astronaut-tone2` | `1f9d1200d1f680_astronaut-tone3` | `1f9d1200d1f680_astronaut-tone4` | `1f9d1200d1f680_astronaut-tone5` |
| 🧑‍⚖️ | Judge | `1f9d1200d2696_judge` | `1f9d1200d2696_judge-tone1` | `1f9d1200d2696_judge-tone2` | `1f9d1200d2696_judge-tone3` | `1f9d1200d2696_judge-tone4` | `1f9d1200d2696_judge-tone5` |
| 👰 | Person with veil | `1f470_personwithveil` | `1f470_personwithveil-tone1` | `1f470_personwithveil-tone2` | `1f470_personwithveil-tone3` | `1f470_personwithveil-tone4` | `1f470_personwithveil-tone5` |
| 🤵 | Person in tuxedo | `1f935_personintuxedo` | `1f935_personintuxedo-tone1` | `1f935_personintuxedo-tone2` | `1f935_personintuxedo-tone3` | `1f935_personintuxedo-tone4` | `1f935_personintuxedo-tone5` |
| 👸 | Princess | `1f478_princess` | `1f478_princess-tone1` | `1f478_princess-tone2` | `1f478_princess-tone3` | `1f478_princess-tone4` | `1f478_princess-tone5` |
| 🫅 | Person with crown | `1fac5_personwithcrown` | `1fac5_personwithcrown-tone1` | `1fac5_personwithcrown-tone2` | `1fac5_personwithcrown-tone3` | `1fac5_personwithcrown-tone4` | `1fac5_personwithcrown-tone5` |
| 🤴 | Prince | `1f934_prince` | `1f934_prince-tone1` | `1f934_prince-tone2` | `1f934_prince-tone3` | `1f934_prince-tone4` | `1f934_prince-tone5` |
| 🥷 | Ninja | `1f977_ninja` | `1f977_ninja-tone1` | `1f977_ninja-tone2` | `1f977_ninja-tone3` | `1f977_ninja-tone4` | `1f977_ninja-tone5` |
| 🦸 | Superhero | `1f9b8_superhero` | `1f9b8_superhero-tone1` | `1f9b8_superhero-tone2` | `1f9b8_superhero-tone3` | `1f9b8_superhero-tone4` | `1f9b8_superhero-tone5` |
| 🦹 | Supervillain | `1f9b9_supervillain` | `1f9b9_supervillain-tone1` | `1f9b9_supervillain-tone2` | `1f9b9_supervillain-tone3` | `1f9b9_supervillain-tone4` | `1f9b9_supervillain-tone5` |
| 🧙 | Mage | `1f9d9_mage` | `1f9d9_mage-tone1` | `1f9d9_mage-tone2` | `1f9d9_mage-tone3` | `1f9d9_mage-tone4` | `1f9d9_mage-tone5` |
| 🧚 | Fairy | `1f9da_fairy` | `1f9da_fairy-tone1` | `1f9da_fairy-tone2` | `1f9da_fairy-tone3` | `1f9da_fairy-tone4` | `1f9da_fairy-tone5` |
| 🧛 | Vampire | `1f9db_vampire` | `1f9db_vampire-tone1` | `1f9db_vampire-tone2` | `1f9db_vampire-tone3` | `1f9db_vampire-tone4` | `1f9db_vampire-tone5` |
| 🧜 | Merperson | `1f9dc_merperson` | `1f9dc_merperson-tone1` | `1f9dc_merperson-tone2` | `1f9dc_merperson-tone3` | `1f9dc_merperson-tone4` | `1f9dc_merperson-tone5` |
| 🧝 | Elf | `1f9dd_elf` | `1f9dd_elf-tone1` | `1f9dd_elf-tone2` | `1f9dd_elf-tone3` | `1f9dd_elf-tone4` | `1f9dd_elf-tone5` |

[Back to Navigation](#quick-navigation)

---

### Activities & Sports Skin Tone Variants

Complete skin tone IDs for activity and sports reactions:

| Emoji | Description | Base ID | Tone 1 (🟡 Light) | Tone 2 (🟠 Med-Light) | Tone 3 (🟤 Medium) | Tone 4 (🟤 Med-Dark) | Tone 5 (🟤 Dark) |
|-------|-------------|---------|-------------------|----------------------|-------------------|---------------------|------------------|
| 💆 | Person getting massage | `1f486_persongettingmassage` | `1f486_persongettingmassage-tone1` | `1f486_persongettingmassage-tone2` | `1f486_persongettingmassage-tone3` | `1f486_persongettingmassage-tone4` | `1f486_persongettingmassage-tone5` |
| 💇 | Person getting haircut | `1f487_persongettinghaircut` | `1f487_persongettinghaircut-tone1` | `1f487_persongettinghaircut-tone2` | `1f487_persongettinghaircut-tone3` | `1f487_persongettinghaircut-tone4` | `1f487_persongettinghaircut-tone5` |
| 🚶 | Person walking | `1f6b6_personwalking` | `1f6b6_personwalking-tone1` | `1f6b6_personwalking-tone2` | `1f6b6_personwalking-tone3` | `1f6b6_personwalking-tone4` | `1f6b6_personwalking-tone5` |
| 🧍 | Person standing | `1f9cd_personstanding` | `1f9cd_personstanding-tone1` | `1f9cd_personstanding-tone2` | `1f9cd_personstanding-tone3` | `1f9cd_personstanding-tone4` | `1f9cd_personstanding-tone5` |
| 🧎 | Person kneeling | `1f9ce_personkneeling` | `1f9ce_personkneeling-tone1` | `1f9ce_personkneeling-tone2` | `1f9ce_personkneeling-tone3` | `1f9ce_personkneeling-tone4` | `1f9ce_personkneeling-tone5` |
| 🧑‍🦯 | Person with white cane | `1f9d1200d1f9af_personwithwhitecane` | `1f9d1200d1f9af_personwithwhitecane-tone1` | `1f9d1200d1f9af_personwithwhitecane-tone2` | `1f9d1200d1f9af_personwithwhitecane-tone3` | `1f9d1200d1f9af_personwithwhitecane-tone4` | `1f9d1200d1f9af_personwithwhitecane-tone5` |
| 🧑‍🦼 | Person in motorized wheelchair | `1f9d1200d1f9bc_personinmotorizedwheelchair` | `1f9d1200d1f9bc_personinmotorizedwheelchair-tone1` | `1f9d1200d1f9bc_personinmotorizedwheelchair-tone2` | `1f9d1200d1f9bc_personinmotorizedwheelchair-tone3` | `1f9d1200d1f9bc_personinmotorizedwheelchair-tone4` | `1f9d1200d1f9bc_personinmotorizedwheelchair-tone5` |
| 🧑‍🦽 | Person in manual wheelchair | `1f9d1200d1f9bd_personinmanualwheelchair` | `1f9d1200d1f9bd_personinmanualwheelchair-tone1` | `1f9d1200d1f9bd_personinmanualwheelchair-tone2` | `1f9d1200d1f9bd_personinmanualwheelchair-tone3` | `1f9d1200d1f9bd_personinmanualwheelchair-tone4` | `1f9d1200d1f9bd_personinmanualwheelchair-tone5` |
| 🏃 | Person running | `1f3c3_personrunning` | `1f3c3_personrunning-tone1` | `1f3c3_personrunning-tone2` | `1f3c3_personrunning-tone3` | `1f3c3_personrunning-tone4` | `1f3c3_personrunning-tone5` |
| 💃 | Woman dancing | `1f483_womandancing` | `1f483_womandancing-tone1` | `1f483_womandancing-tone2` | `1f483_womandancing-tone3` | `1f483_womandancing-tone4` | `1f483_womandancing-tone5` |
| 🕺 | Man dancing | `1f57a_mandancing` | `1f57a_mandancing-tone1` | `1f57a_mandancing-tone2` | `1f57a_mandancing-tone3` | `1f57a_mandancing-tone4` | `1f57a_mandancing-tone5` |
| 🕴️ | Person in suit levitating | `1f574_personinsuitlevitating` | `1f574_personinsuitlevitating-tone1` | `1f574_personinsuitlevitating-tone2` | `1f574_personinsuitlevitating-tone3` | `1f574_personinsuitlevitating-tone4` | `1f574_personinsuitlevitating-tone5` |
| 🧖 | Person in steamy room | `1f9d6_personinsteamyroom` | `1f9d6_personinsteamyroom-tone1` | `1f9d6_personinsteamyroom-tone2` | `1f9d6_personinsteamyroom-tone3` | `1f9d6_personinsteamyroom-tone4` | `1f9d6_personinsteamyroom-tone5` |
| 🧗 | Person climbing | `1f9d7_personclimbing` | `1f9d7_personclimbing-tone1` | `1f9d7_personclimbing-tone2` | `1f9d7_personclimbing-tone3` | `1f9d7_personclimbing-tone4` | `1f9d7_personclimbing-tone5` |
| 🏋️ | Person lifting weights | `1f3cb_personliftingweights` | `1f3cb_personliftingweights-tone1` | `1f3cb_personliftingweights-tone2` | `1f3cb_personliftingweights-tone3` | `1f3cb_personliftingweights-tone4` | `1f3cb_personliftingweights-tone5` |
| 🤸 | Person cartwheeling | `1f938_personcartwheeling` | `1f938_personcartwheeling-tone1` | `1f938_personcartwheeling-tone2` | `1f938_personcartwheeling-tone3` | `1f938_personcartwheeling-tone4` | `1f938_personcartwheeling-tone5` |
| ⛹️ | Person bouncing ball | `26f9_personbouncingball` | `26f9_personbouncingball-tone1` | `26f9_personbouncingball-tone2` | `26f9_personbouncingball-tone3` | `26f9_personbouncingball-tone4` | `26f9_personbouncingball-tone5` |
| 🤾 | Person playing handball | `1f93e_personplayinghandball` | `1f93e_personplayinghandball-tone1` | `1f93e_personplayinghandball-tone2` | `1f93e_personplayinghandball-tone3` | `1f93e_personplayinghandball-tone4` | `1f93e_personplayinghandball-tone5` |
| 🏌️ | Person golfing | `1f3cc_persongolfing` | `1f3cc_persongolfing-tone1` | `1f3cc_persongolfing-tone2` | `1f3cc_persongolfing-tone3` | `1f3cc_persongolfing-tone4` | `1f3cc_persongolfing-tone5` |
| 🏇 | Horse racing | `1f3c7_horseracing` | `1f3c7_horseracing-tone1` | `1f3c7_horseracing-tone2` | `1f3c7_horseracing-tone3` | `1f3c7_horseracing-tone4` | `1f3c7_horseracing-tone5` |
| 🧘 | Person in lotus position | `1f9d8_personinlotusposition` | `1f9d8_personinlotusposition-tone1` | `1f9d8_personinlotusposition-tone2` | `1f9d8_personinlotusposition-tone3` | `1f9d8_personinlotusposition-tone4` | `1f9d8_personinlotusposition-tone5` |
| 🏄 | Person surfing | `1f3c4_personsurfing` | `1f3c4_personsurfing-tone1` | `1f3c4_personsurfing-tone2` | `1f3c4_personsurfing-tone3` | `1f3c4_personsurfing-tone4` | `1f3c4_personsurfing-tone5` |
| 🏊 | Person swimming | `1f3ca_personswimming` | `1f3ca_personswimming-tone1` | `1f3ca_personswimming-tone2` | `1f3ca_personswimming-tone3` | `1f3ca_personswimming-tone4` | `1f3ca_personswimming-tone5` |
| 🤽 | Person playing water polo | `1f93d_personplayingwaterpolo` | `1f93d_personplayingwaterpolo-tone1` | `1f93d_personplayingwaterpolo-tone2` | `1f93d_personplayingwaterpolo-tone3` | `1f93d_personplayingwaterpolo-tone4` | `1f93d_personplayingwaterpolo-tone5` |
| 🚣 | Person rowing boat | `1f6a3_personrowingboat` | `1f6a3_personrowingboat-tone1` | `1f6a3_personrowingboat-tone2` | `1f6a3_personrowingboat-tone3` | `1f6a3_personrowingboat-tone4` | `1f6a3_personrowingboat-tone5` |
| 🚵 | Person mountain biking | `1f6b5_personmountainbiking` | `1f6b5_personmountainbiking-tone1` | `1f6b5_personmountainbiking-tone2` | `1f6b5_personmountainbiking-tone3` | `1f6b5_personmountainbiking-tone4` | `1f6b5_personmountainbiking-tone5` |
| 🚴 | Person biking | `1f6b4_personbiking` | `1f6b4_personbiking-tone1` | `1f6b4_personbiking-tone2` | `1f6b4_personbiking-tone3` | `1f6b4_personbiking-tone4` | `1f6b4_personbiking-tone5` |
| 🤹 | Person juggling | `1f939_personjuggling` | `1f939_personjuggling-tone1` | `1f939_personjuggling-tone2` | `1f939_personjuggling-tone3` | `1f939_personjuggling-tone4` | `1f939_personjuggling-tone5` |
| 🏂 | Snowboarder | `1f3c2_snowboarder` | `1f3c2_snowboarder-tone1` | `1f3c2_snowboarder-tone2` | `1f3c2_snowboarder-tone3` | `1f3c2_snowboarder-tone4` | `1f3c2_snowboarder-tone5` |
| ⛷️ | Skier | `26f7_skier` | `26f7_skier-tone1` | `26f7_skier-tone2` | `26f7_skier-tone3` | `26f7_skier-tone4` | `26f7_skier-tone5` |

[Back to Navigation](#quick-navigation)

---

## All Reactions

> 📋 **Note**: This section contains the complete list of all 300+ reactions. 

### Category Navigation

- [Smileys](#smileys)
- [Hand Gestures](#hand-gestures)
- [People](#people)
- [Hearts & Symbols](#hearts--symbols)
- [Animals & Nature](#animals--nature)
- [Food & Drink](#food--drink)
- [Activities & Sports](#activities--sports)
- [Objects](#objects)
- [Travel & Places](#travel--places)
- [Flags](#flags)
- [Special Teams Reactions](#special-teams-reactions)

---

## Smileys

All emoji reactions in the Smileys category for expressing emotions and facial expressions.

| Emoji | Description | Reaction ID |
|-------|-------------|----------------|
| 😃 | Grinning face with big eyes | `1f603_grinningfacewithbigeyes` |
| 😀 | Grinning face | `1f600_grinningface` |
| 😊 | Smiling face with smiling eyes | `1f60a_smilingfacewithsmilingeyes` |
| 😁 | Beaming face with smiling eyes | `1f601_beamingfacewithsmilingeyes` |
| 😄 | Grinning face with smiling eyes | `1f604_grinningfacewithsmilingeyes` |
| 😅 | Grinning face with sweat | `1f605_grinningfacewithsweat` |
| 🤣 | Rolling on the floor laughing | `1f923_rollingonthefloorlaughing` |
| 😂 | Face with tears of joy | `1f602_facewithtearsofjoy` |
| 🙂 | Slightly smiling face | `1f642_slightlysmilingface` |
| 🙃 | Upside-down face | `1f643_upsidedownface` |
| 🫠 | Melting face | `1fae0_meltingface` |
| 😉 | Winking face | `1f609_winkingface` |
| 😇 | Smiling face with halo | `1f607_smilingfacewithhalo` |
| 🥰 | Smiling face with hearts | `1f970_smilingfacewithhearts` |
| 😍 | Smiling face with heart-eyes | `1f60d_smilingfacewithhearteyes` |
| 🤩 | Star-struck | `1f929_starstruck` |
| 😘 | Face blowing a kiss | `1f618_faceblowingakiss` |
| 😗 | Kissing face | `1f617_kissingface` |
| 😚 | Kissing face with closed eyes | `1f61a_kissingfacewithclosedeyes` |
| 🥲 | Smiling face with tear | `1f972_smilingfacewithtear` |
| 😛 | Face with tongue | `1f61b_facewithtongue` |
| 😜 | Winking face with tongue | `1f61c_winkingfacewithtongue` |
| 🤪 | Zany face | `1f92a_zanyface` |
| 😝 | Squinting face with tongue | `1f61d_squintingfacewithtongue` |
| 🤑 | Money-mouth face | `1f911_moneymouthface` |
| 🤗 | Smiling face with open hands | `1f917_smilingfacewithopenhands` |
| 🤭 | Face with hand over mouth | `1f92d_facewithhandovermouth` |
| 🫢 | Face with open eyes and hand over mouth | `1fae2_facewithopeneyesandhandovermouth` |
| 🫣 | Face with peeking eye | `1fae3_facewithpeekingeye` |
| 🤫 | Shushing face | `1f92b_shushingface` |
| 🤔 | Thinking face | `1f914_thinkingface` |
| 🫡 | Saluting face | `1fae1_salutingface` |
| 🤐 | Zipper-mouth face | `1f910_zippermouthface` |
| 🤨 | Face with raised eyebrow | `1f928_facewithraisedeyebrow` |
| 😐 | Neutral face | `1f610_neutralface` |
| 😑 | Expressionless face | `1f611_expressionlessface` |
| 😶 | Face without mouth | `1f636_facewithoutmouth` |
| 🫥 | Dotted line face | `1fae5_dottedlineface` |
| 😶‍🌫️ | Face in clouds | `1f636200d1f32b_faceinclouds` |
| 😏 | Smirking face | `1f60f_smirkingface` |
| 😒 | Unamused face | `1f612_unamusedface` |
| 🙄 | Face with rolling eyes | `1f644_facewithrollingeyes` |
| 😬 | Grimacing face | `1f62c_grimacingface` |
| 😮‍💨 | Face exhaling | `1f62e200d1f4a8_faceexhaling` |
| 🤥 | Lying face | `1f925_lyingface` |
| 🫨 | Shaking face | `1fae8_shakingface` |
| 😌 | Relieved face | `1f60c_relievedface` |
| 😔 | Pensive face | `1f614_pensiveface` |
| 😪 | Sleepy face | `1f62a_sleepyface` |
| 🤤 | Drooling face | `1f924_droolingface` |
| 😴 | Sleeping face | `1f634_sleepingface` |
| 😷 | Face with medical mask | `1f637_facewithmedicalmask` |
| 🤒 | Face with thermometer | `1f912_facewiththermometer` |
| 🤕 | Face with head-bandage | `1f915_facewithheadbandage` |
| 🤢 | Nauseated face | `1f922_nauseatedface` |
| 🤮 | Face vomiting | `1f92e_facevomiting` |
| 🤧 | Sneezing face | `1f927_sneezingface` |
| 🥵 | Hot face | `1f975_hotface` |
| 🥶 | Cold face | `1f976_coldface` |
| 🥴 | Woozy face | `1f974_woozyface` |
| 😵 | Face with crossed-out eyes | `1f635_facewithcrossedouteyes` |
| 😵‍💫 | Face with spiral eyes | `1f635200d1f4ab_facewithspiraleyes` |
| 🤯 | Exploding head | `1f92f_explodinghead` |
| 🤠 | Cowboy hat face | `1f920_cowboyhatface` |
| 🥳 | Partying face | `1f973_partyingface` |
| 🥸 | Disguised face | `1f978_disguisedface` |
| 😎 | Smiling face with sunglasses | `1f60e_smilingfacewithsunglasses` |
| 🤓 | Nerd face | `1f913_nerdface` |
| 🧐 | Face with monocle | `1f9d0_facewithmonocle` |
| 😕 | Confused face | `1f615_confusedface` |
| 🫤 | Face with diagonal mouth | `1fae4_facewithdiagonalmouth` |
| 😟 | Worried face | `1f61f_worriedface` |
| 🙁 | Slightly frowning face | `1f641_slightlyfrowningface` |
| ☹️ | Frowning face | `2639_frowningface` |
| 😮 | Face with open mouth | `1f62e_facewithopenmouth` |
| 😯 | Hushed face | `1f62f_hushedface` |
| 😲 | Astonished face | `1f632_astonishedface` |
| 😳 | Flushed face | `1f633_flushedface` |
| 🥺 | Pleading face | `1f97a_pleadingface` |
| 🥹 | Face holding back tears | `1f979_faceholdingbacktears` |
| 😦 | Frowning face with open mouth | `1f626_frowningfacewithopenmouth` |
| 😧 | Anguished face | `1f627_anguishedface` |
| 😨 | Fearful face | `1f628_fearfulface` |
| 😰 | Anxious face with sweat | `1f630_anxiousfacewithsweat` |
| 😥 | Sad but relieved face | `1f625_sadbutrelievedface` |
| 😢 | Crying face | `1f622_cryingface` |
| 😭 | Loudly crying face | `1f62d_loudlycryingface` |
| 😱 | Face screaming in fear | `1f631_facescreaminginfear` |
| 😖 | Confounded face | `1f616_confoundedface` |
| 😣 | Persevering face | `1f623_perseveringface` |
| 😞 | Disappointed face | `1f61e_disappointedface` |
| 😓 | Downcast face with sweat | `1f613_downcastfacewithsweat` |
| 😩 | Weary face | `1f629_wearyface` |
| 😫 | Tired face | `1f62b_tiredface` |
| 🥱 | Yawning face | `1f971_yawningface` |
| 😤 | Face with steam from nose | `1f624_facewithsteamfromnose` |
| 😡 | Enraged face | `1f621_enragedface` |
| 😠 | Angry face | `1f620_angryface` |
| 🤬 | Face with symbols on mouth | `1f92c_facewithsymbolsonmouth` |
| 😈 | Smiling face with horns | `1f608_smilingfacewithhorns` |
| 👿 | Angry face with horns | `1f47f_angryfacewithhorns` |
| 💀 | Skull | `1f480_skull` |
| ☠️ | Skull and crossbones | `2620_skullandcrossbones` |

[Back to Category Navigation](#category-navigation)

---

## Hand Gestures

All hand gesture reactions with full skin tone support indicated by 🎨 in the Diverse column.

| Emoji | Description | Reaction ID | Diverse | Skin Tone IDs |
|-------|-------------|----------------|---------|---------------|
| 👋 | Waving hand | `1f44b_wavinghand` | 🎨 | `-tone1` through `-tone5` |
| 🤚 | Raised back of hand | `1f91a_raisedbackofhand` | 🎨 | `-tone1` through `-tone5` |
| 🖐️ | Hand with fingers splayed | `1f590_handwithfingerssplayed` | 🎨 | `-tone1` through `-tone5` |
| ✋ | Raised hand | `270b_raisedhand` | 🎨 | `-tone1` through `-tone5` |
| 🖖 | Vulcan salute | `1f596_vulcansalute` | 🎨 | `-tone1` through `-tone5` |
| 🫱 | Rightwards hand | `1faf1_rightwardshand` | 🎨 | `-tone1` through `-tone5` |
| 🫲 | Leftwards hand | `1faf2_leftwardshand` | 🎨 | `-tone1` through `-tone5` |
| 🫳 | Palm down hand | `1faf3_palmdownhand` | 🎨 | `-tone1` through `-tone5` |
| 🫴 | Palm up hand | `1faf4_palmuphand` | 🎨 | `-tone1` through `-tone5` |
| 👍 | Thumbs up | `1f44d_thumbsup` | 🎨 | `-tone1` through `-tone5` |
| 👎 | Thumbs down | `1f44e_thumbsdown` | 🎨 | `-tone1` through `-tone5` |
| ✊ | Raised fist | `270a_raisedfist` | 🎨 | `-tone1` through `-tone5` |
| 👊 | Oncoming fist | `1f44a_oncomingfist` | 🎨 | `-tone1` through `-tone5` |
| 🤛 | Left-facing fist | `1f91b_leftfacingfist` | 🎨 | `-tone1` through `-tone5` |
| 🤜 | Right-facing fist | `1f91c_rightfacingfist` | 🎨 | `-tone1` through `-tone5` |
| 👏 | Clapping hands | `1f44f_clappinghands` | 🎨 | `-tone1` through `-tone5` |
| 🙌 | Raising hands | `1f64c_raisinghands` | 🎨 | `-tone1` through `-tone5` |
| 🫶 | Heart hands | `1faf6_hearthands` | 🎨 | `-tone1` through `-tone5` |
| 👐 | Open hands | `1f450_openhands` | 🎨 | `-tone1` through `-tone5` |
| 🤲 | Palms up together | `1f932_palmsuptogether` | 🎨 | `-tone1` through `-tone5` |
| 🤝 | Handshake | `1f91d_handshake` | | |
| 🙏 | Folded hands | `1f64f_foldedhands` | 🎨 | `-tone1` through `-tone5` |
| ✍️ | Writing hand | `270d_writinghand` | 🎨 | `-tone1` through `-tone5` |
| 💅 | Nail polish | `1f485_nailpolish` | 🎨 | `-tone1` through `-tone5` |
| 🤳 | Selfie | `1f933_selfie` | 🎨 | `-tone1` through `-tone5` |
| 💪 | Flexed biceps | `1f4aa_flexedbiceps` | 🎨 | `-tone1` through `-tone5` |
| 🦾 | Mechanical arm | `1f9be_mechanicalarm` | | |
| 🦿 | Mechanical leg | `1f9bf_mechanicalleg` | | |
| 🦵 | Leg | `1f9b5_leg` | 🎨 | `-tone1` through `-tone5` |
| 🦶 | Foot | `1f9b6_foot` | 🎨 | `-tone1` through `-tone5` |
| 👂 | Ear | `1f442_ear` | 🎨 | `-tone1` through `-tone5` |
| 🦻 | Ear with hearing aid | `1f9bb_earwithhearingaid` | 🎨 | `-tone1` through `-tone5` |
| 👃 | Nose | `1f443_nose` | 🎨 | `-tone1` through `-tone5` |
| 🫀 | Anatomical heart | `1fac0_anatomicalheart` | | |
| 🫁 | Lungs | `1fac1_lungs` | | |
| 🧠 | Brain | `1f9e0_brain` | | |
| 🦷 | Tooth | `1f9b7_tooth` | | |
| 🦴 | Bone | `1f9b4_bone` | | |
| 👀 | Eyes | `1f440_eyes` | | |
| 👁️ | Eye | `1f441_eye` | | |
| 👅 | Tongue | `1f445_tongue` | | |
| 👄 | Mouth | `1f444_mouth` | | |
| 🫦 | Biting lip | `1fae6_bitinglip` | | |

**Usage Example for Skin Tones:**
```typescript
// Default waving hand
const waveDefault = "1f44b_wavinghand";

// Waving hand with different skin tones
const waveTone1 = "1f44b_wavinghand-tone1"; // 👋🏻 Light
const waveTone2 = "1f44b_wavinghand-tone2"; // 👋🏼 Medium-Light
const waveTone3 = "1f44b_wavinghand-tone3"; // 👋🏽 Medium
const waveTone4 = "1f44b_wavinghand-tone4"; // 👋🏾 Medium-Dark
const waveTone5 = "1f44b_wavinghand-tone5"; // 👋🏿 Dark
```

### 🎨 Popular Hand Gestures with Skin Tone Examples

Copy these complete IDs with skin tone variants directly into your code:

#### 👏 Clapping Hands
```typescript
"1f44f_clappinghands"         // 👏 Default
"1f44f_clappinghands-tone1"   // 👏🏻 Light
"1f44f_clappinghands-tone2"   // 👏🏼 Medium-Light
"1f44f_clappinghands-tone3"   // 👏🏽 Medium
"1f44f_clappinghands-tone4"   // 👏🏾 Medium-Dark
"1f44f_clappinghands-tone5"   // 👏🏿 Dark
```

#### ✋ Raised Hand
```typescript
"270b_raisedhand"             // ✋ Default
"270b_raisedhand-tone1"       // ✋🏻 Light
"270b_raisedhand-tone2"       // ✋🏼 Medium-Light
"270b_raisedhand-tone3"       // ✋🏽 Medium
"270b_raisedhand-tone4"       // ✋🏾 Medium-Dark
"270b_raisedhand-tone5"       // ✋🏿 Dark
```

#### 🙌 Raising Hands
```typescript
"1f64c_raisinghands"          // 🙌 Default
"1f64c_raisinghands-tone1"    // 🙌🏻 Light
"1f64c_raisinghands-tone2"    // 🙌🏼 Medium-Light
"1f64c_raisinghands-tone3"    // 🙌🏽 Medium
"1f64c_raisinghands-tone4"    // 🙌🏾 Medium-Dark
"1f64c_raisinghands-tone5"    // 🙌🏿 Dark
```

#### ✊ Raised Fist
```typescript
"270a_raisedfist"             // ✊ Default
"270a_raisedfist-tone1"       // ✊🏻 Light
"270a_raisedfist-tone2"       // ✊🏼 Medium-Light
"270a_raisedfist-tone3"       // ✊🏽 Medium
"270a_raisedfist-tone4"       // ✊🏾 Medium-Dark
"270a_raisedfist-tone5"       // ✊🏿 Dark
```

#### 🫶 Heart Hands
```typescript
"1faf6_hearthands"            // 🫶 Default
"1faf6_hearthands-tone1"      // 🫶🏻 Light
"1faf6_hearthands-tone2"      // 🫶🏼 Medium-Light
"1faf6_hearthands-tone3"      // 🫶🏽 Medium
"1faf6_hearthands-tone4"      // 🫶🏾 Medium-Dark
"1faf6_hearthands-tone5"      // 🫶🏿 Dark
```

[Back to Category Navigation](#category-navigation)

---

## People

All people and body-related reactions with skin tone support where applicable.

| Emoji | Description | Reaction ID | Diverse | Skin Tone IDs |
|-------|-------------|----------------|---------|---------------|
| 👶 | Baby | `1f476_baby` | 🎨 | `-tone1` through `-tone5` |
| 👧 | Girl | `1f467_girl` | 🎨 | `-tone1` through `-tone5` |
| 🧒 | Child | `1f9d2_child` | 🎨 | `-tone1` through `-tone5` |
| 👦 | Boy | `1f466_boy` | 🎨 | `-tone1` through `-tone5` |
| 👩 | Woman | `1f469_woman` | 🎨 | `-tone1` through `-tone5` |
| 🧑 | Person | `1f9d1_person` | 🎨 | `-tone1` through `-tone5` |
| 👨 | Man | `1f468_man` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🦱 | Woman: curly hair | `1f469200d1f9b1_womancurlyhair` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🦱 | Person: curly hair | `1f9d1200d1f9b1_personcurlyhair` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🦱 | Man: curly hair | `1f468200d1f9b1_mancurlyhair` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🦰 | Woman: red hair | `1f469200d1f9b0_womanredhair` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🦰 | Person: red hair | `1f9d1200d1f9b0_personredhair` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🦰 | Man: red hair | `1f468200d1f9b0_manredhair` | 🎨 | `-tone1` through `-tone5` |
| 👱‍♀️ | Woman: blond hair | `1f471200d2640_womanblondhair` | 🎨 | `-tone1` through `-tone5` |
| 👱 | Person: blond hair | `1f471_personblondhair` | 🎨 | `-tone1` through `-tone5` |
| 👱‍♂️ | Man: blond hair | `1f471200d2642_manblondhair` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🦳 | Woman: white hair | `1f469200d1f9b3_womanwhitehair` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🦳 | Person: white hair | `1f9d1200d1f9b3_personwhitehair` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🦳 | Man: white hair | `1f468200d1f9b3_manwhitehair` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🦲 | Woman: bald | `1f469200d1f9b2_womanbald` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🦲 | Person: bald | `1f9d1200d1f9b2_personbald` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🦲 | Man: bald | `1f468200d1f9b2_manbald` | 🎨 | `-tone1` through `-tone5` |
| 🧔‍♀️ | Woman: beard | `1f9d4200d2640_womanbeard` | 🎨 | `-tone1` through `-tone5` |
| 🧔 | Person: beard | `1f9d4_personbeard` | 🎨 | `-tone1` through `-tone5` |
| 🧔‍♂️ | Man: beard | `1f9d4200d2642_manbeard` | 🎨 | `-tone1` through `-tone5` |
| 👵 | Old woman | `1f475_oldwoman` | 🎨 | `-tone1` through `-tone5` |
| 🧓 | Older person | `1f9d3_olderperson` | 🎨 | `-tone1` through `-tone5` |
| 👴 | Old man | `1f474_oldman` | 🎨 | `-tone1` through `-tone5` |
| 👲 | Person with skullcap | `1f472_personwithskullcap` | 🎨 | `-tone1` through `-tone5` |
| 👳‍♀️ | Woman wearing turban | `1f473200d2640_womanwearingturban` | 🎨 | `-tone1` through `-tone5` |
| 👳 | Person wearing turban | `1f473_personwearingturban` | 🎨 | `-tone1` through `-tone5` |
| 👳‍♂️ | Man wearing turban | `1f473200d2642_manwearingturban` | 🎨 | `-tone1` through `-tone5` |
| 🧕 | Woman with headscarf | `1f9d5_womanwithheadscarf` | 🎨 | `-tone1` through `-tone5` |
| 👮‍♀️ | Woman police officer | `1f46e200d2640_womanpoliceofficer` | 🎨 | `-tone1` through `-tone5` |
| 👮 | Police officer | `1f46e_policeofficer` | 🎨 | `-tone1` through `-tone5` |
| 👮‍♂️ | Man police officer | `1f46e200d2642_manpoliceofficer` | 🎨 | `-tone1` through `-tone5` |
| 👷‍♀️ | Woman construction worker | `1f477200d2640_womanconstructionworker` | 🎨 | `-tone1` through `-tone5` |
| 👷 | Construction worker | `1f477_constructionworker` | 🎨 | `-tone1` through `-tone5` |
| 👷‍♂️ | Man construction worker | `1f477200d2642_manconstructionworker` | 🎨 | `-tone1` through `-tone5` |
| 💂‍♀️ | Woman guard | `1f482200d2640_womanguard` | 🎨 | `-tone1` through `-tone5` |
| 💂 | Guard | `1f482_guard` | 🎨 | `-tone1` through `-tone5` |
| 💂‍♂️ | Man guard | `1f482200d2642_manguard` | 🎨 | `-tone1` through `-tone5` |
| 🕵️‍♀️ | Woman detective | `1f575200d2640_womandetective` | 🎨 | `-tone1` through `-tone5` |
| 🕵️ | Detective | `1f575_detective` | 🎨 | `-tone1` through `-tone5` |
| 🕵️‍♂️ | Man detective | `1f575200d2642_mandetective` | 🎨 | `-tone1` through `-tone5` |
| 👩‍⚕️ | Woman health worker | `1f469200d2695_womanhealthworker` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍⚕️ | Health worker | `1f9d1200d2695_healthworker` | 🎨 | `-tone1` through `-tone5` |
| 👨‍⚕️ | Man health worker | `1f468200d2695_manhealthworker` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🌾 | Woman farmer | `1f469200d1f33e_womanfarmer` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🌾 | Farmer | `1f9d1200d1f33e_farmer` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🌾 | Man farmer | `1f468200d1f33e_manfarmer` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🍳 | Woman cook | `1f469200d1f373_womancook` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🍳 | Cook | `1f9d1200d1f373_cook` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🍳 | Man cook | `1f468200d1f373_mancook` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🎓 | Woman student | `1f469200d1f393_womanstudent` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🎓 | Student | `1f9d1200d1f393_student` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🎓 | Man student | `1f468200d1f393_manstudent` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🎤 | Woman singer | `1f469200d1f3a4_womansinger` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🎤 | Singer | `1f9d1200d1f3a4_singer` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🎤 | Man singer | `1f468200d1f3a4_mansinger` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🏫 | Woman teacher | `1f469200d1f3eb_womanteacher` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🏫 | Teacher | `1f9d1200d1f3eb_teacher` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🏫 | Man teacher | `1f468200d1f3eb_manteacher` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🏭 | Woman factory worker | `1f469200d1f3ed_womanfactoryworker` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🏭 | Factory worker | `1f9d1200d1f3ed_factoryworker` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🏭 | Man factory worker | `1f468200d1f3ed_manfactoryworker` | 🎨 | `-tone1` through `-tone5` |
| 👩‍💻 | Woman technologist | `1f469200d1f4bb_womantechnologist` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍💻 | Technologist | `1f9d1200d1f4bb_technologist` | 🎨 | `-tone1` through `-tone5` |
| 👨‍💻 | Man technologist | `1f468200d1f4bb_mantechnologist` | 🎨 | `-tone1` through `-tone5` |
| 👩‍💼 | Woman office worker | `1f469200d1f4bc_womanofficeworker` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍💼 | Office worker | `1f9d1200d1f4bc_officeworker` | 🎨 | `-tone1` through `-tone5` |
| 👨‍💼 | Man office worker | `1f468200d1f4bc_manofficeworker` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🔧 | Woman mechanic | `1f469200d1f527_womanmechanic` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🔧 | Mechanic | `1f9d1200d1f527_mechanic` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🔧 | Man mechanic | `1f468200d1f527_manmechanic` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🔬 | Woman scientist | `1f469200d1f52c_womanscientist` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🔬 | Scientist | `1f9d1200d1f52c_scientist` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🔬 | Man scientist | `1f468200d1f52c_manscientist` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🎨 | Woman artist | `1f469200d1f3a8_womanartist` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🎨 | Artist | `1f9d1200d1f3a8_artist` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🎨 | Man artist | `1f468200d1f3a8_manartist` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🚒 | Woman firefighter | `1f469200d1f692_womanfirefighter` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🚒 | Firefighter | `1f9d1200d1f692_firefighter` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🚒 | Man firefighter | `1f468200d1f692_manfirefighter` | 🎨 | `-tone1` through `-tone5` |
| 👩‍✈️ | Woman pilot | `1f469200d2708_womanpilot` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍✈️ | Pilot | `1f9d1200d2708_pilot` | 🎨 | `-tone1` through `-tone5` |
| 👨‍✈️ | Man pilot | `1f468200d2708_manpilot` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🚀 | Woman astronaut | `1f469200d1f680_womanastronaut` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🚀 | Astronaut | `1f9d1200d1f680_astronaut` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🚀 | Man astronaut | `1f468200d1f680_manastronaut` | 🎨 | `-tone1` through `-tone5` |
| 👩‍⚖️ | Woman judge | `1f469200d2696_womanjudge` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍⚖️ | Judge | `1f9d1200d2696_judge` | 🎨 | `-tone1` through `-tone5` |
| 👨‍⚖️ | Man judge | `1f468200d2696_manjudge` | 🎨 | `-tone1` through `-tone5` |
| 👰‍♀️ | Woman with veil | `1f470200d2640_womanwithveil` | 🎨 | `-tone1` through `-tone5` |
| 👰 | Person with veil | `1f470_personwithveil` | 🎨 | `-tone1` through `-tone5` |
| 👰‍♂️ | Man with veil | `1f470200d2642_manwithveil` | 🎨 | `-tone1` through `-tone5` |
| 🤵‍♀️ | Woman in tuxedo | `1f935200d2640_womanintuxedo` | 🎨 | `-tone1` through `-tone5` |
| 🤵 | Person in tuxedo | `1f935_personintuxedo` | 🎨 | `-tone1` through `-tone5` |
| 🤵‍♂️ | Man in tuxedo | `1f935200d2642_manintuxedo` | 🎨 | `-tone1` through `-tone5` |
| 👸 | Princess | `1f478_princess` | 🎨 | `-tone1` through `-tone5` |
| 🫅 | Person with crown | `1fac5_personwithcrown` | 🎨 | `-tone1` through `-tone5` |
| 🤴 | Prince | `1f934_prince` | 🎨 | `-tone1` through `-tone5` |
| 🥷 | Ninja | `1f977_ninja` | 🎨 | `-tone1` through `-tone5` |
| 🦸‍♀️ | Woman superhero | `1f9b8200d2640_womansuperhero` | 🎨 | `-tone1` through `-tone5` |
| 🦸 | Superhero | `1f9b8_superhero` | 🎨 | `-tone1` through `-tone5` |
| 🦸‍♂️ | Man superhero | `1f9b8200d2642_mansuperhero` | 🎨 | `-tone1` through `-tone5` |
| 🦹‍♀️ | Woman supervillain | `1f9b9200d2640_womansupervillain` | 🎨 | `-tone1` through `-tone5` |
| 🦹 | Supervillain | `1f9b9_supervillain` | 🎨 | `-tone1` through `-tone5` |
| 🦹‍♂️ | Man supervillain | `1f9b9200d2642_mansupervillain` | 🎨 | `-tone1` through `-tone5` |
| 🧙‍♀️ | Woman mage | `1f9d9200d2640_womanmage` | 🎨 | `-tone1` through `-tone5` |
| 🧙 | Mage | `1f9d9_mage` | 🎨 | `-tone1` through `-tone5` |
| 🧙‍♂️ | Man mage | `1f9d9200d2642_manmage` | 🎨 | `-tone1` through `-tone5` |
| 🧚‍♀️ | Woman fairy | `1f9da200d2640_womanfairy` | 🎨 | `-tone1` through `-tone5` |
| 🧚 | Fairy | `1f9da_fairy` | 🎨 | `-tone1` through `-tone5` |
| 🧚‍♂️ | Man fairy | `1f9da200d2642_manfairy` | 🎨 | `-tone1` through `-tone5` |
| 🧛‍♀️ | Woman vampire | `1f9db200d2640_womanvampire` | 🎨 | `-tone1` through `-tone5` |
| 🧛 | Vampire | `1f9db_vampire` | 🎨 | `-tone1` through `-tone5` |
| 🧛‍♂️ | Man vampire | `1f9db200d2642_manvampire` | 🎨 | `-tone1` through `-tone5` |
| 🧜‍♀️ | Mermaid | `1f9dc200d2640_mermaid` | 🎨 | `-tone1` through `-tone5` |
| 🧜 | Merperson | `1f9dc_merperson` | 🎨 | `-tone1` through `-tone5` |
| 🧜‍♂️ | Merman | `1f9dc200d2642_merman` | 🎨 | `-tone1` through `-tone5` |
| 🧝‍♀️ | Woman elf | `1f9dd200d2640_womanelf` | 🎨 | `-tone1` through `-tone5` |
| 🧝 | Elf | `1f9dd_elf` | 🎨 | `-tone1` through `-tone5` |
| 🧝‍♂️ | Man elf | `1f9dd200d2642_manelf` | 🎨 | `-tone1` through `-tone5` |
| 🧞‍♀️ | Woman genie | `1f9de200d2640_womangenie` | |
| 🧞 | Genie | `1f9de_genie` | |
| 🧞‍♂️ | Man genie | `1f9de200d2642_mangenie` | |
| 🧟‍♀️ | Woman zombie | `1f9df200d2640_womanzombie` | |
| 🧟 | Zombie | `1f9df_zombie` | |
| 🧟‍♂️ | Man zombie | `1f9df200d2642_manzombie` | |
| 🧌 | Troll | `1f9cc_troll` | |
| 💆‍♀️ | Woman getting massage | `1f486200d2640_womangettingmassage` | 🎨 | `-tone1` through `-tone5` |
| 💆 | Person getting massage | `1f486_persongettingmassage` | 🎨 | `-tone1` through `-tone5` |
| 💆‍♂️ | Man getting massage | `1f486200d2642_mangettingmassage` | 🎨 | `-tone1` through `-tone5` |
| 💇‍♀️ | Woman getting haircut | `1f487200d2640_womangettinghaircut` | 🎨 | `-tone1` through `-tone5` |
| 💇 | Person getting haircut | `1f487_persongettinghaircut` | 🎨 | `-tone1` through `-tone5` |
| 💇‍♂️ | Man getting haircut | `1f487200d2642_mangettinghaircut` | 🎨 | `-tone1` through `-tone5` |
| 🚶‍♀️ | Woman walking | `1f6b6200d2640_womanwalking` | 🎨 | `-tone1` through `-tone5` |
| 🚶 | Person walking | `1f6b6_personwalking` | 🎨 | `-tone1` through `-tone5` |
| 🚶‍♂️ | Man walking | `1f6b6200d2642_manwalking` | 🎨 | `-tone1` through `-tone5` |
| 🧍‍♀️ | Woman standing | `1f9cd200d2640_womanstanding` | 🎨 | `-tone1` through `-tone5` |
| 🧍 | Person standing | `1f9cd_personstanding` | 🎨 | `-tone1` through `-tone5` |
| 🧍‍♂️ | Man standing | `1f9cd200d2642_manstanding` | 🎨 | `-tone1` through `-tone5` |
| 🧎‍♀️ | Woman kneeling | `1f9ce200d2640_womankneeling` | 🎨 | `-tone1` through `-tone5` |
| 🧎 | Person kneeling | `1f9ce_personkneeling` | 🎨 | `-tone1` through `-tone5` |
| 🧎‍♂️ | Man kneeling | `1f9ce200d2642_mankneeling` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🦯 | Woman with white cane | `1f469200d1f9af_womanwithwhitecane` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🦯 | Person with white cane | `1f9d1200d1f9af_personwithwhitecane` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🦯 | Man with white cane | `1f468200d1f9af_manwithwhitecane` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🦼 | Woman in motorized wheelchair | `1f469200d1f9bc_womaninmotorizedwheelchair` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🦼 | Person in motorized wheelchair | `1f9d1200d1f9bc_personinmotorizedwheelchair` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🦼 | Man in motorized wheelchair | `1f468200d1f9bc_maninmotorizedwheelchair` | 🎨 | `-tone1` through `-tone5` |
| 👩‍🦽 | Woman in manual wheelchair | `1f469200d1f9bd_womaninmanualwheelchair` | 🎨 | `-tone1` through `-tone5` |
| 🧑‍🦽 | Person in manual wheelchair | `1f9d1200d1f9bd_personinmanualwheelchair` | 🎨 | `-tone1` through `-tone5` |
| 👨‍🦽 | Man in manual wheelchair | `1f468200d1f9bd_maninmanualwheelchair` | 🎨 | `-tone1` through `-tone5` |
| 🏃‍♀️ | Woman running | `1f3c3200d2640_womanrunning` | 🎨 | `-tone1` through `-tone5` |
| 🏃 | Person running | `1f3c3_personrunning` | 🎨 | `-tone1` through `-tone5` |
| 🏃‍♂️ | Man running | `1f3c3200d2642_manrunning` | 🎨 | `-tone1` through `-tone5` |
| 💃 | Woman dancing | `1f483_womandancing` | 🎨 | `-tone1` through `-tone5` |
| 🕺 | Man dancing | `1f57a_mandancing` | 🎨 | `-tone1` through `-tone5` |
| 🕴️ | Person in suit levitating | `1f574_personinsuitlevitating` | 🎨 | `-tone1` through `-tone5` |
| 👯‍♀️ | Women with bunny ears | `1f46f200d2640_womenwithbunnyears` | |
| 👯 | People with bunny ears | `1f46f_peoplewithbunnyears` | |
| 👯‍♂️ | Men with bunny ears | `1f46f200d2642_menwithbunnyears` | |
| 🧖‍♀️ | Woman in steamy room | `1f9d6200d2640_womaninsteamyroom` | 🎨 | `-tone1` through `-tone5` |
| 🧖 | Person in steamy room | `1f9d6_personinsteamyroom` | 🎨 | `-tone1` through `-tone5` |
| 🧖‍♂️ | Man in steamy room | `1f9d6200d2642_maninsteamyroom` | 🎨 | `-tone1` through `-tone5` |
| 🧗‍♀️ | Woman climbing | `1f9d7200d2640_womanclimbing` | 🎨 | `-tone1` through `-tone5` |
| 🧗 | Person climbing | `1f9d7_personclimbing` | 🎨 | `-tone1` through `-tone5` |
| 🧗‍♂️ | Man climbing | `1f9d7200d2642_manclimbing` | 🎨 | `-tone1` through `-tone5` |

### 🎨 Popular People Reactions with Skin Tone Examples

Copy these complete IDs with skin tone variants directly into your code:

#### 👶 Baby
```typescript
"1f476_baby"                  // 👶 Default
"1f476_baby-tone1"            // 👶🏻 Light
"1f476_baby-tone2"            // 👶🏼 Medium-Light
"1f476_baby-tone3"            // 👶🏽 Medium
"1f476_baby-tone4"            // 👶🏾 Medium-Dark
"1f476_baby-tone5"            // 👶🏿 Dark
```

#### 👨‍💻 Technologist
```typescript
"1f9d1200d1f4bb_technologist"       // 🧑‍💻 Default
"1f9d1200d1f4bb_technologist-tone1" // 🧑🏻‍💻 Light
"1f9d1200d1f4bb_technologist-tone2" // 🧑🏼‍💻 Medium-Light
"1f9d1200d1f4bb_technologist-tone3" // 🧑🏽‍💻 Medium
"1f9d1200d1f4bb_technologist-tone4" // 🧑🏾‍💻 Medium-Dark
"1f9d1200d1f4bb_technologist-tone5" // 🧑🏿‍💻 Dark
```

#### 👩‍🎓 Student
```typescript
"1f469200d1f393_womanstudent"       // 👩‍🎓 Default
"1f469200d1f393_womanstudent-tone1" // 👩🏻‍🎓 Light
"1f469200d1f393_womanstudent-tone2" // 👩🏼‍🎓 Medium-Light
"1f469200d1f393_womanstudent-tone3" // 👩🏽‍🎓 Medium
"1f469200d1f393_womanstudent-tone4" // 👩🏾‍🎓 Medium-Dark
"1f469200d1f393_womanstudent-tone5" // 👩🏿‍🎓 Dark
```

#### 👨‍⚕️ Health Worker
```typescript
"1f468200d2695_manhealthworker"       // 👨‍⚕️ Default
"1f468200d2695_manhealthworker-tone1" // 👨🏻‍⚕️ Light
"1f468200d2695_manhealthworker-tone2" // 👨🏼‍⚕️ Medium-Light
"1f468200d2695_manhealthworker-tone3" // 👨🏽‍⚕️ Medium
"1f468200d2695_manhealthworker-tone4" // 👨🏾‍⚕️ Medium-Dark
"1f468200d2695_manhealthworker-tone5" // 👨🏿‍⚕️ Dark
```

#### 🦸 Superhero
```typescript
"1f9b8_superhero"             // 🦸 Default
"1f9b8_superhero-tone1"       // 🦸🏻 Light
"1f9b8_superhero-tone2"       // 🦸🏼 Medium-Light
"1f9b8_superhero-tone3"       // 🦸🏽 Medium
"1f9b8_superhero-tone4"       // 🦸🏾 Medium-Dark
"1f9b8_superhero-tone5"       // 🦸🏿 Dark
```

#### 💃 Woman Dancing
```typescript
"1f483_womandancing"          // 💃 Default
"1f483_womandancing-tone1"    // 💃🏻 Light
"1f483_womandancing-tone2"    // 💃🏼 Medium-Light
"1f483_womandancing-tone3"    // 💃🏽 Medium
"1f483_womandancing-tone4"    // 💃🏾 Medium-Dark
"1f483_womandancing-tone5"    // 💃🏿 Dark
```

#### 👮 Police Officer
```typescript
"1f46e_policeofficer"         // 👮 Default
"1f46e_policeofficer-tone1"   // 👮🏻 Light
"1f46e_policeofficer-tone2"   // 👮🏼 Medium-Light
"1f46e_policeofficer-tone3"   // 👮🏽 Medium
"1f46e_policeofficer-tone4"   // 👮🏾 Medium-Dark
"1f46e_policeofficer-tone5"   // 👮🏿 Dark
```

#### 👷 Construction Worker
```typescript
"1f477_constructionworker"         // 👷 Default
"1f477_constructionworker-tone1"   // 👷🏻 Light
"1f477_constructionworker-tone2"   // 👷🏼 Medium-Light
"1f477_constructionworker-tone3"   // 👷🏽 Medium
"1f477_constructionworker-tone4"   // 👷🏾 Medium-Dark
"1f477_constructionworker-tone5"   // 👷🏿 Dark
```

#### 🧙 Mage
```typescript
"1f9d9_mage"                  // 🧙 Default
"1f9d9_mage-tone1"            // 🧙🏻 Light
"1f9d9_mage-tone2"            // 🧙🏼 Medium-Light
"1f9d9_mage-tone3"            // 🧙🏽 Medium
"1f9d9_mage-tone4"            // 🧙🏾 Medium-Dark
"1f9d9_mage-tone5"            // 🧙🏿 Dark
```

#### 🧚 Fairy
```typescript
"1f9da_fairy"                 // 🧚 Default
"1f9da_fairy-tone1"           // 🧚🏻 Light
"1f9da_fairy-tone2"           // 🧚🏼 Medium-Light
"1f9da_fairy-tone3"           // 🧚🏽 Medium
"1f9da_fairy-tone4"           // 🧚🏾 Medium-Dark
"1f9da_fairy-tone5"           // 🧚🏿 Dark
```

[Back to Category Navigation](#category-navigation)

---

## Hearts & Symbols

All heart reactions and symbols for expressing love and emotions.

> 💡 **Note**: Hearts & Symbols reactions do not support skin tone variants. For reactions with skin tone support, see [Hand Gestures](#hand-gestures), [People](#people), and [Activities & Sports](#activities--sports).

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 🧡 | Orange heart | `1f9e1_orangeheart` |
| 💛 | Yellow heart | `1f49b_yellowheart` |
| 💚 | Green heart | `1f49a_greenheart` |
| 💙 | Blue heart | `1f499_blueheart` |
| 💜 | Purple heart | `1f49c_purpleheart` |
| 🖤 | Black heart | `1f5a4_blackheart` |
| 🤍 | White heart | `1f90d_whiteheart` |
| 🤎 | Brown heart | `1f90e_brownheart` |
| 💔 | Broken heart | `1f494_brokenheart` |
| ❤️‍🔥 | Heart on fire | `2764200d1f525_heartonfire` |
| ❤️‍🩹 | Mending heart | `2764200d1fa79_mendingheart` |
| ❣️ | Heart exclamation | `2763_heartexclamation` |
| 💕 | Two hearts | `1f495_twohearts` |
| 💞 | Revolving hearts | `1f49e_revolvinghearts` |
| 💓 | Beating heart | `1f493_beatingheart` |
| 💗 | Growing heart | `1f497_growingheart` |
| 💖 | Sparkling heart | `1f496_sparklingheart` |
| 💘 | Heart with arrow | `1f498_heartwitharrow` |
| 💝 | Heart with ribbon | `1f49d_heartwithribbon` |
| 💟 | Heart decoration | `1f49f_heartdecoration` |
| ☮️ | Peace symbol | `262e_peacesymbol` |
| ✝️ | Latin cross | `271d_latincross` |
| ☪️ | Star and crescent | `262a_starandcrescent` |
| 🕉️ | Om | `1f549_om` |
| ☸️ | Wheel of dharma | `2638_wheelofdharma` |
| ✡️ | Star of David | `2721_starofdavid` |
| 🔯 | Dotted six-pointed star | `1f52f_dottedsixpointedstar` |
| 🕎 | Menorah | `1f54e_menorah` |
| ☯️ | Yin yang | `262f_yinyang` |
| ☦️ | Orthodox cross | `2626_orthodoxcross` |
| 🛐 | Place of worship | `1f6d0_placeofworship` |
| ⛎ | Ophiuchus | `26ce_ophiuchus` |
| ♈ | Aries | `2648_aries` |
| ♉ | Taurus | `2649_taurus` |
| ♊ | Gemini | `264a_gemini` |
| ♋ | Cancer | `264b_cancer` |
| ♌ | Leo | `264c_leo` |
| ♍ | Virgo | `264d_virgo` |
| ♎ | Libra | `264e_libra` |
| ♏ | Scorpio | `264f_scorpio` |
| ♐ | Sagittarius | `2650_sagittarius` |
| ♑ | Capricorn | `2651_capricorn` |
| ♒ | Aquarius | `2652_aquarius` |
| ♓ | Pisces | `2653_pisces` |
| 🆔 | ID button | `1f194_idbutton` |
| ⚛️ | Atom symbol | `269b_atomsymbol` |
| 🉑 | Japanese "acceptable" button | `1f251_japaneseacceptablebutton` |
| ☢️ | Radioactive | `2622_radioactive` |
| ☣️ | Biohazard | `2623_biohazard` |
| 📴 | Mobile phone off | `1f4f4_mobilephoneoff` |
| 📳 | Vibration mode | `1f4f3_vibrationmode` |
| 🈶 | Japanese "not free of charge" button | `1f236_japanesenotfreeofchargebutton` |
| 🈚 | Japanese "free of charge" button | `1f21a_japanesefreeofchargebutton` |
| 📳 | Vibration mode | `1f4f3_vibrationmode` |
| 🈺 | Japanese "open for business" button | `1f23a_japaneseopenforbusinessbutton` |
| 🈷️ | Japanese "monthly amount" button | `1f237_japanesemonthlyamountbutton` |
| ✴️ | Eight-pointed star | `2734_eightpointedstar` |
| 🆚 | VS button | `1f19a_vsbutton` |
| 💮 | White flower | `1f4ae_whiteflower` |
| 🉐 | Japanese "bargain" button | `1f250_japanesebargainbutton` |
| ㊙️ | Japanese "secret" button | `3299_japanesesecretbutton` |
| ㊗️ | Japanese "congratulations" button | `3297_japanesecongratulationsbutton` |
| 🈴 | Japanese "passing grade" button | `1f234_japanesepassinggradebutton` |
| 🈵 | Japanese "no vacancy" button | `1f235_japanesenovacancybutton` |
| 🈹 | Japanese "discount" button | `1f239_japanesediscountbutton` |
| 🈲 | Japanese "prohibited" button | `1f232_japaneseprohibitedbutton` |
| 🅰️ | A button (blood type) | `1f170_abutton` |
| 🅱️ | B button (blood type) | `1f171_bbutton` |
| 🆎 | AB button (blood type) | `1f18e_abbutton` |
| 🆑 | CL button | `1f191_clbutton` |
| 🅾️ | O button (blood type) | `1f17e_obutton` |
| 🆘 | SOS button | `1f198_sosbutton` |
| ❌ | Cross mark | `274c_crossmark` |
| ⭕ | Hollow red circle | `2b55_hollowredcircle` |
| 🛑 | Stop sign | `1f6d1_stopsign` |
| ⛔ | No entry | `26d4_noentry` |
| 📛 | Name badge | `1f4db_namebadge` |
| 🚫 | Prohibited | `1f6ab_prohibited` |
| 💯 | Hundred points | `1f4af_hundredpoints` |
| 💢 | Anger symbol | `1f4a2_angersymbol` |
| ♨️ | Hot springs | `2668_hotsprings` |
| 🚷 | No pedestrians | `1f6b7_nopedestrians` |
| 🚯 | No littering | `1f6af_nolittering` |
| 🚳 | No bicycles | `1f6b3_nobicycles` |
| 🚱 | Non-potable water | `1f6b1_nonpotablewater` |
| 🔞 | No one under eighteen | `1f51e_nooneundereighteen` |
| 📵 | No mobile phones | `1f4f5_nomobilephones` |
| 🚭 | No smoking | `1f6ad_nosmoking` |
| ❗ | Exclamation mark | `2757_exclamationmark` |
| ❕ | White exclamation mark | `2755_whiteexclamationmark` |
| ❓ | Question mark | `2753_questionmark` |
| ❔ | White question mark | `2754_whitequestionmark` |
| ‼️ | Double exclamation mark | `203c_doubleexclamationmark` |
| ⁉️ | Exclamation question mark | `2049_exclamationquestionmark` |
| 🔅 | Dim button | `1f505_dimbutton` |
| 🔆 | Bright button | `1f506_brightbutton` |
| 〽️ | Part alternation mark | `303d_partalternationmark` |
| ⚠️ | Warning | `26a0_warning` |
| 🚸 | Children crossing | `1f6b8_childrencrossing` |
| 🔱 | Trident emblem | `1f531_tridentemblem` |
| ⚜️ | Fleur-de-lis | `269c_fleurdelis` |
| 🔰 | Japanese symbol for beginner | `1f530_japanesesymbolforbeginner` |
| ♻️ | Recycling symbol | `267b_recyclingsymbol` |
| ✅ | Check mark button | `2705_checkmarkbutton` |
| 🈯 | Japanese "reserved" button | `1f22f_japanesereservedbutton` |
| 💹 | Chart increasing with yen | `1f4b9_chartincreasingwithyen` |
| ❇️ | Sparkle | `2747_sparkle` |
| ✳️ | Eight-spoked asterisk | `2733_eightspokedasterisk` |
| ❎ | Cross mark button | `274e_crossmarkbutton` |
| 🌐 | Globe with meridians | `1f310_globewithmeridians` |
| 💠 | Diamond with a dot | `1f4a0_diamondwithadot` |
| Ⓜ️ | Circled M | `24c2_circledm` |
| 🌀 | Cyclone | `1f300_cyclone` |
| 💤 | Zzz | `1f4a4_zzz` |
| 🏧 | ATM sign | `1f3e7_atmsign` |
| 🚾 | Water closet | `1f6be_watercloset` |
| ♿ | Wheelchair symbol | `267f_wheelchairsymbol` |
| 🅿️ | P button | `1f17f_pbutton` |
| 🈳 | Japanese "vacancy" button | `1f233_japanesevacancybutton` |
| 🈂️ | Japanese "service charge" button | `1f202_japaneseservicechargebutton` |
| 🛂 | Passport control | `1f6c2_passportcontrol` |
| 🛃 | Customs | `1f6c3_customs` |
| 🛄 | Baggage claim | `1f6c4_baggageclaim` |
| 🛅 | Left luggage | `1f6c5_leftluggage` |

[Back to Category Navigation](#category-navigation)

---

## Animals & Nature

Popular animal and nature reactions available in Microsoft Teams.

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 🐶 | Dog face | `1f436_dogface` |
| 🐱 | Cat face | `1f431_catface` |
| 🐭 | Mouse face | `1f42d_mouseface` |
| 🐹 | Hamster | `1f439_hamster` |
| 🐰 | Rabbit face | `1f430_rabbitface` |
| 🦊 | Fox | `1f98a_fox` |
| 🐻 | Bear | `1f43b_bear` |
| 🐼 | Panda | `1f43c_panda` |
| 🐨 | Koala | `1f428_koala` |
| 🐯 | Tiger face | `1f42f_tigerface` |
| 🦁 | Lion | `1f981_lion` |
| 🐮 | Cow face | `1f42e_cowface` |
| 🐷 | Pig face | `1f437_pigface` |
| 🐽 | Pig nose | `1f43d_pignose` |
| 🐸 | Frog | `1f438_frog` |
| 🐵 | Monkey face | `1f435_monkeyface` |
| 🙈 | See-no-evil monkey | `1f648_seenoevilmonkey` |
| 🙉 | Hear-no-evil monkey | `1f649_hearnoevilmonkey` |
| 🙊 | Speak-no-evil monkey | `1f64a_speaknoevilmonkey` |
| 🐒 | Monkey | `1f412_monkey` |
| 🐔 | Chicken | `1f414_chicken` |
| 🐧 | Penguin | `1f427_penguin` |
| 🐦 | Bird | `1f426_bird` |
| 🐤 | Baby chick | `1f424_babychick` |
| 🐣 | Hatching chick | `1f423_hatchingchick` |
| 🐥 | Front-facing baby chick | `1f425_frontfacingbabychick` |
| 🦆 | Duck | `1f986_duck` |
| 🦅 | Eagle | `1f985_eagle` |
| 🦉 | Owl | `1f989_owl` |
| 🦇 | Bat | `1f987_bat` |
| 🐺 | Wolf | `1f43a_wolf` |
| 🐗 | Boar | `1f417_boar` |
| 🐴 | Horse face | `1f434_horseface` |
| 🫑 | Bell pepper | `1fad1_bellpepper` |
| 🐝 | Honeybee | `1f41d_honeybee` |
| 🪱 | Worm | `1fab1_worm` |
| 🐛 | Bug | `1f41b_bug` |
| 🦋 | Butterfly | `1f98b_butterfly` |
| 🐌 | Snail | `1f40c_snail` |
| 🐞 | Lady beetle | `1f41e_ladybeetle` |
| 🐜 | Ant | `1f41c_ant` |
| 🪰 | Fly | `1fab0_fly` |
| 🪲 | Beetle | `1fab2_beetle` |
| 🪳 | Cockroach | `1fab3_cockroach` |
| 🦟 | Mosquito | `1f99f_mosquito` |
| 🦗 | Cricket | `1f997_cricket` |
| 🕷️ | Spider | `1f577_spider` |
| 🕸️ | Spider web | `1f578_spiderweb` |
| 🦂 | Scorpion | `1f982_scorpion` |
| 🐢 | Turtle | `1f422_turtle` |
| 🐍 | Snake | `1f40d_snake` |
| 🦎 | Lizard | `1f98e_lizard` |
| 🦖 | T-Rex | `1f996_trex` |
| 🦕 | Sauropod | `1f995_sauropod` |
| 🐙 | Octopus | `1f419_octopus` |
| 🦑 | Squid | `1f991_squid` |
| 🦐 | Shrimp | `1f990_shrimp` |
| 🦞 | Lobster | `1f99e_lobster` |
| 🦀 | Crab | `1f980_crab` |
| 🐡 | Blowfish | `1f421_blowfish` |
| 🐠 | Tropical fish | `1f420_tropicalfish` |
| 🐟 | Fish | `1f41f_fish` |
| 🐬 | Dolphin | `1f42c_dolphin` |
| 🐳 | Spouting whale | `1f433_spoutingwhale` |
| 🐋 | Whale | `1f40b_whale` |
| 🦈 | Shark | `1f988_shark` |
| 🐊 | Crocodile | `1f40a_crocodile` |
| 🐅 | Tiger | `1f405_tiger` |
| 🐆 | Leopard | `1f406_leopard` |
| 🦓 | Zebra | `1f993_zebra` |
| 🦍 | Gorilla | `1f98d_gorilla` |
| 🦧 | Orangutan | `1f9a7_orangutan` |
| 🦣 | Mammoth | `1f9a3_mammoth` |
| 🐘 | Elephant | `1f418_elephant` |
| 🦛 | Hippopotamus | `1f99b_hippopotamus` |
| 🦏 | Rhinoceros | `1f98f_rhinoceros` |
| 🐪 | Camel | `1f42a_camel` |
| 🐫 | Two-hump camel | `1f42b_twohumpcamel` |
| 🦒 | Giraffe | `1f992_giraffe` |
| 🦘 | Kangaroo | `1f998_kangaroo` |
| 🦬 | Bison | `1f9ac_bison` |
| 🐃 | Water buffalo | `1f403_waterbuffalo` |
| 🐂 | Ox | `1f402_ox` |
| 🐄 | Cow | `1f404_cow` |
| 🐎 | Horse | `1f40e_horse` |
| 🐖 | Pig | `1f416_pig` |
| 🐏 | Ram | `1f40f_ram` |
| 🐑 | Ewe | `1f411_ewe` |
| 🦙 | Llama | `1f999_llama` |
| 🐐 | Goat | `1f410_goat` |
| 🦌 | Deer | `1f98c_deer` |
| 🐕 | Dog | `1f415_dog` |
| 🐩 | Poodle | `1f429_poodle` |
| 🦮 | Guide dog | `1f9ae_guidedog` |
| 🐕‍🦺 | Service dog | `1f415200d1f9ba_servicedog` |
| 🐈 | Cat | `1f408_cat` |
| 🐈‍⬛ | Black cat | `1f408200d2b1b_blackcat` |
| 🪶 | Feather | `1fab6_feather` |
| 🐓 | Rooster | `1f413_rooster` |
| 🦃 | Turkey | `1f983_turkey` |
| 🦤 | Dodo | `1f9a4_dodo` |
| 🦚 | Peacock | `1f99a_peacock` |
| 🦜 | Parrot | `1f99c_parrot` |
| 🦢 | Swan | `1f9a2_swan` |
| 🦩 | Flamingo | `1f9a9_flamingo` |
| 🕊️ | Dove | `1f54a_dove` |
| 🐇 | Rabbit | `1f407_rabbit` |
| 🦝 | Raccoon | `1f99d_raccoon` |
| 🦨 | Skunk | `1f9a8_skunk` |
| 🦡 | Badger | `1f9a1_badger` |
| 🦫 | Beaver | `1f9ab_beaver` |
| 🦦 | Otter | `1f9a6_otter` |
| 🦥 | Sloth | `1f9a5_sloth` |
| 🐁 | Mouse | `1f401_mouse` |
| 🐀 | Rat | `1f400_rat` |
| 🐿️ | Chipmunk | `1f43f_chipmunk` |
| 🦔 | Hedgehog | `1f994_hedgehog` |
| 🐾 | Paw prints | `1f43e_pawprints` |
| 🐉 | Dragon | `1f409_dragon` |
| 🐲 | Dragon face | `1f432_dragonface` |
| 🌵 | Cactus | `1f335_cactus` |
| 🎄 | Christmas tree | `1f384_christmastree` |
| 🌲 | Evergreen tree | `1f332_evergreentree` |
| 🌳 | Deciduous tree | `1f333_deciduoustree` |
| 🌴 | Palm tree | `1f334_palmtree` |
| 🪵 | Wood | `1fab5_wood` |
| 🌱 | Seedling | `1f331_seedling` |
| 🌿 | Herb | `1f33f_herb` |
| ☘️ | Shamrock | `2618_shamrock` |
| 🍀 | Four leaf clover | `1f340_fourleafclover` |
| 🎍 | Pine decoration | `1f38d_pinedecoration` |
| 🪴 | Potted plant | `1fab4_pottedplant` |
| 🪹 | Empty nest | `1fab9_emptynest` |
| 🍃 | Leaf fluttering in wind | `1f343_leafflutteringinwind` |
| 🍂 | Fallen leaf | `1f342_fallenleaf` |
| 🍁 | Maple leaf | `1f341_mapleleaf` |
| 🪺 | Nest with eggs | `1faba_nestwitheggs` |
| 🪹 | Empty nest | `1fab9_emptynest` |
| 🍄 | Mushroom | `1f344_mushroom` |
| 🌾 | Sheaf of rice | `1f33e_sheafofrice` |
| 💐 | Bouquet | `1f490_bouquet` |
| 🌷 | Tulip | `1f337_tulip` |
| 🌹 | Rose | `1f339_rose` |
| 🥀 | Wilted flower | `1f940_wiltedflower` |
| 🪻 | Hyacinth | `1fabb_hyacinth` |
| 🌺 | Hibiscus | `1f33a_hibiscus` |
| 🌸 | Cherry blossom | `1f338_cherryblossom` |
| 🌻 | Sunflower | `1f33b_sunflower` |
| 🌚 | New moon face | `1f31a_newmoonface` |
| 🌝 | Full moon face | `1f31d_fullmoonface` |
| 🌛 | First quarter moon face | `1f31b_firstquartermoonface` |
| 🌜 | Last quarter moon face | `1f31c_lastquartermoonface` |
| 🌚 | New moon face | `1f31a_newmoonface` |
| 🌕 | Full moon | `1f315_fullmoon` |
| 🌖 | Waning gibbous moon | `1f316_waninggibbousmoon` |
| 🌗 | Last quarter moon | `1f317_lastquartermoon` |
| 🌘 | Waning crescent moon | `1f318_waningcrescentmoon` |
| 🌑 | New moon | `1f311_newmoon` |
| 🌒 | Waxing crescent moon | `1f312_waxingcrescentmoon` |
| 🌓 | First quarter moon | `1f313_firstquartermoon` |
| 🌔 | Waxing gibbous moon | `1f314_waxinggibbousmoon` |
| 🌙 | Crescent moon | `1f319_crescentmoon` |
| 🌎 | Globe showing Americas | `1f30e_globeshowingamericas` |
| 🌍 | Globe showing Europe-Africa | `1f30d_globeshowingeuropeafrica` |
| 🌏 | Globe showing Asia-Australia | `1f30f_globeshowingasiaaustralia` |
| 🪐 | Ringed planet | `1fa90_ringedplanet` |
| 💫 | Dizzy | `1f4ab_dizzy` |
| ⭐ | Star | `2b50_star` |
| 🌟 | Glowing star | `1f31f_glowingstar` |
| ✨ | Sparkles | `2728_sparkles` |
| ⚡ | High voltage | `26a1_highvoltage` |
| ☄️ | Comet | `2604_comet` |
| 💥 | Collision | `1f4a5_collision` |
| 🔥 | Fire | `1f525_fire` |
| 🌪️ | Tornado | `1f32a_tornado` |
| 🌈 | Rainbow | `1f308_rainbow` |
| ☀️ | Sun | `2600_sun` |
| 🌤️ | Sun behind small cloud | `1f324_sunbehindsmallcloud` |
| ⛅ | Sun behind cloud | `26c5_sunbehindcloud` |
| 🌥️ | Sun behind large cloud | `1f325_sunbehindlargecloud` |
| ☁️ | Cloud | `2601_cloud` |
| 🌦️ | Sun behind rain cloud | `1f326_sunbehindraincloud` |
| 🌧️ | Cloud with rain | `1f327_cloudwithrain` |
| ⛈️ | Cloud with lightning and rain | `26c8_cloudwithlightningandrain` |
| 🌩️ | Cloud with lightning | `1f329_cloudwithlightning` |
| 🌨️ | Cloud with snow | `1f328_cloudwithsnow` |
| ❄️ | Snowflake | `2744_snowflake` |
| ☃️ | Snowman | `2603_snowman` |
| ⛄ | Snowman without snow | `26c4_snowmanwithoutsnow` |
| 🌬️ | Wind face | `1f32c_windface` |
| 💨 | Dashing away | `1f4a8_dashingaway` |
| 💧 | Droplet | `1f4a7_droplet` |
| 💦 | Sweat droplets | `1f4a6_sweatdroplets` |
| ☔ | Umbrella with rain drops | `2614_umbrellawithraindrops` |
| ☂️ | Umbrella | `2602_umbrella` |
| 🌊 | Water wave | `1f30a_waterwave` |
| 🌫️ | Fog | `1f32b_fog` |

[Back to Category Navigation](#category-navigation)

---

## Food & Drink

All food and beverage reactions for meal times and celebrations.

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 🍕 | Pizza | `1f355_pizza` |
| 🍔 | Hamburger | `1f354_hamburger` |
| 🍟 | French fries | `1f35f_frenchfries` |
| 🌭 | Hot dog | `1f32d_hotdog` |
| 🍿 | Popcorn | `1f37f_popcorn` |
| 🧋 | Bubble tea | `1f9cb_bubbletea` |
| ☕ | Hot beverage | `2615_hotbeverage` |
| 🍺 | Beer mug | `1f37a_beermug` |
| 🍻 | Clinking beer mugs | `1f37b_clinkingbeermugs` |
| 🥂 | Clinking glasses | `1f942_clinkingglasses` |
| 🍷 | Wine glass | `1f377_wineglass` |
| 🥃 | Tumbler glass | `1f943_tumblerglass` |
| 🍸 | Cocktail glass | `1f378_cocktailglass` |
| 🍹 | Tropical drink | `1f379_tropicaldrink` |
| 🧃 | Beverage box | `1f9c3_beveragebox` |
| 🧉 | Mate | `1f9c9_mate` |
| 🧊 | Ice | `1f9ca_ice` |
| 🥄 | Spoon | `1f944_spoon` |
| 🍴 | Fork and knife | `1f374_forkandknife` |
| 🍽️ | Fork and knife with plate | `1f37d_forkandknifewithplate` |
| 🥣 | Bowl with spoon | `1f963_bowlwithspoon` |
| 🥡 | Takeout box | `1f961_takeoutbox` |
| 🥢 | Chopsticks | `1f962_chopsticks` |
| 🧂 | Salt | `1f9c2_salt` |
| 🍇 | Grapes | `1f347_grapes` |
| 🍈 | Melon | `1f348_melon` |
| 🍉 | Watermelon | `1f349_watermelon` |
| 🍊 | Tangerine | `1f34a_tangerine` |
| 🍋 | Lemon | `1f34b_lemon` |
| 🍌 | Banana | `1f34c_banana` |
| 🍍 | Pineapple | `1f34d_pineapple` |
| 🥭 | Mango | `1f96d_mango` |
| 🍎 | Red apple | `1f34e_redapple` |
| 🍏 | Green apple | `1f34f_greenapple` |
| 🍐 | Pear | `1f350_pear` |
| 🍑 | Peach | `1f351_peach` |
| 🍒 | Cherries | `1f352_cherries` |
| 🍓 | Strawberry | `1f353_strawberry` |
| 🫐 | Blueberries | `1fad0_blueberries` |
| 🥝 | Kiwi fruit | `1f95d_kiwifruit` |
| 🍅 | Tomato | `1f345_tomato` |
| 🫒 | Olive | `1fad2_olive` |
| 🥥 | Coconut | `1f965_coconut` |
| 🥑 | Avocado | `1f951_avocado` |
| 🍆 | Eggplant | `1f346_eggplant` |
| 🥔 | Potato | `1f954_potato` |
| 🥕 | Carrot | `1f955_carrot` |
| 🌽 | Ear of corn | `1f33d_earofcorn` |
| 🌶️ | Hot pepper | `1f336_hotpepper` |
| 🫑 | Bell pepper | `1fad1_bellpepper` |
| 🥒 | Cucumber | `1f952_cucumber` |
| 🥬 | Leafy green | `1f96c_leafygreen` |
| 🥦 | Broccoli | `1f966_broccoli` |
| 🧄 | Garlic | `1f9c4_garlic` |
| 🧅 | Onion | `1f9c5_onion` |
| 🍄 | Mushroom | `1f344_mushroom` |
| 🥜 | Peanuts | `1f95c_peanuts` |
| 🫘 | Beans | `1fad8_beans` |
| 🌰 | Chestnut | `1f330_chestnut` |
| 🍞 | Bread | `1f35e_bread` |
| 🥐 | Croissant | `1f950_croissant` |
| 🥖 | Baguette bread | `1f956_baguettebread` |
| 🫓 | Flatbread | `1fad3_flatbread` |
| 🥨 | Pretzel | `1f968_pretzel` |
| 🥯 | Bagel | `1f96f_bagel` |
| 🥞 | Pancakes | `1f95e_pancakes` |
| 🧇 | Waffle | `1f9c7_waffle` |
| 🧀 | Cheese wedge | `1f9c0_cheesewedge` |
| 🍖 | Meat on bone | `1f356_meatonbone` |
| 🍗 | Poultry leg | `1f357_poultryleg` |
| 🥩 | Cut of meat | `1f969_cutofmeat` |
| 🥓 | Bacon | `1f953_bacon` |
| 🍳 | Cooking | `1f373_cooking` |
| 🍲 | Pot of food | `1f372_potoffood` |
| 🫕 | Fondue | `1fad5_fondue` |
| 🥘 | Shallow pan of food | `1f958_shallowpanoffood` |
| 🍝 | Spaghetti | `1f35d_spaghetti` |
| 🥗 | Green salad | `1f957_greensalad` |
| 🥙 | Stuffed flatbread | `1f959_stuffedflatbread` |
| 🌮 | Taco | `1f32e_taco` |
| 🌯 | Burrito | `1f32f_burrito` |
| 🫔 | Tamale | `1fad4_tamale` |
| 🥪 | Sandwich | `1f96a_sandwich` |
| 🥙 | Falafel | `1f959_falafel` |
| 🧆 | Falafel | `1f9c6_falafel` |
| 🥚 | Egg | `1f95a_egg` |
| 🍱 | Bento box | `1f371_bentobox` |
| 🍘 | Rice cracker | `1f358_ricecracker` |
| 🍙 | Rice ball | `1f359_riceball` |
| 🍚 | Cooked rice | `1f35a_cookedrice` |
| 🍛 | Curry rice | `1f35b_curryrice` |
| 🍜 | Steaming bowl | `1f35c_steamingbowl` |
| 🍠 | Roasted sweet potato | `1f360_roastedsweetpotato` |
| 🍢 | Oden | `1f362_oden` |
| 🍣 | Sushi | `1f363_sushi` |
| 🍤 | Fried shrimp | `1f364_friedshrimp` |
| 🍥 | Fish cake with swirl | `1f365_fishcakewithswirl` |
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
| 🍪 | Cookie | `1f36a_cookie` |
| 🎂 | Birthday cake | `1f382_birthdaycake` |
| 🍰 | Shortcake | `1f370_shortcake` |
| 🧁 | Cupcake | `1f9c1_cupcake` |
| 🥧 | Pie | `1f967_pie` |
| 🍫 | Chocolate bar | `1f36b_chocolatebar` |
| 🍬 | Candy | `1f36c_candy` |
| 🍭 | Lollipop | `1f36d_lollipop` |
| 🍮 | Custard | `1f36e_custard` |
| 🍯 | Honey pot | `1f36f_honeypot` |
| 🍼 | Baby bottle | `1f37c_babybottle` |
| 🥛 | Glass of milk | `1f95b_glassofmilk` |
| 🫗 | Pouring liquid | `1fad7_pouringliquid` |
| 🫙 | Jar | `1fad9_jar` |
| 🧋 | Bubble tea | `1f9cb_bubbletea` |
| 🧃 | Beverage box | `1f9c3_beveragebox` |
| 🧉 | Mate | `1f9c9_mate` |
| 🧊 | Ice | `1f9ca_ice` |
| 🍵 | Teacup without handle | `1f375_teacupwithouthandle` |
| 🍶 | Sake | `1f376_sake` |
| 🍾 | Bottle with popping cork | `1f37e_bottlewithpoppingcork` |
| 🧉 | Mate | `1f9c9_mate` |

[Back to Category Navigation](#category-navigation)

---

## Activities & Sports

Sports and activity reactions for celebrating achievements and hobbies.

| Emoji | Description | Reaction ID | Diverse | Skin Tone IDs |
|-------|-------------|----------------|---------|---------------|
| ⚽ | Soccer ball | `26bd_soccerball` | | |
| 🏀 | Basketball | `1f3c0_basketball` | | |
| 🏈 | American football | `1f3c8_americanfootball` | | |
| ⚾ | Baseball | `26be_baseball` | | |
| 🥎 | Softball | `1f94e_softball` | | |
| 🎾 | Tennis | `1f3be_tennis` | | |
| 🏐 | Volleyball | `1f3d0_volleyball` | | |
| 🏉 | Rugby football | `1f3c9_rugbyfootball` | | |
| 🥏 | Flying disc | `1f94f_flyingdisc` | | |
| 🎱 | Pool 8 ball | `1f3b1_pool8ball` | | |
| 🪀 | Yo-yo | `1fa80_yoyo` | | |
| 🏓 | Ping pong | `1f3d3_pingpong` | | |
| 🏸 | Badminton | `1f3f8_badminton` | | |
| 🏒 | Ice hockey | `1f3d2_icehockey` | | |
| 🏑 | Field hockey | `1f3d1_fieldhockey` | | |
| 🥍 | Lacrosse | `1f94d_lacrosse` | | |
| 🏏 | Cricket game | `1f3cf_cricketgame` | | |
| 🪃 | Boomerang | `1fa83_boomerang` | | |
| 🥅 | Goal net | `1f945_goalnet` | | |
| ⛳ | Flag in hole | `26f3_flaginhole` | | |
| 🪁 | Kite | `1fa81_kite` | | |
| 🏹 | Bow and arrow | `1f3f9_bowandarrow` | | |
| 🎣 | Fishing pole | `1f3a3_fishingpole` | | |
| 🤿 | Diving mask | `1f93f_divingmask` | | |
| 🥊 | Boxing glove | `1f94a_boxingglove` | | |
| 🥋 | Martial arts uniform | `1f94b_martialartsuniform` | | |
| 🎽 | Running shirt | `1f3bd_runningshirt` | | |
| 🛹 | Skateboard | `1f6f9_skateboard` | | |
| 🛼 | Roller skate | `1f6fc_rollerskate` | | |
| 🛷 | Sled | `1f6f7_sled` | | |
| ⛸️ | Ice skate | `26f8_iceskate` | | |
| 🥌 | Curling stone | `1f94c_curlingstone` | | |
| 🎿 | Skis | `1f3bf_skis` | | |
| ⛷️ | Skier | `26f7_skier` | 🎨 | `-tone1` through `-tone5` |
| 🏂 | Snowboarder | `1f3c2_snowboarder` | 🎨 | `-tone1` through `-tone5` |
| 🪂 | Parachute | `1fa82_parachute` | | |
| 🏋️ | Person lifting weights | `1f3cb_personliftingweights` | 🎨 | `-tone1` through `-tone5` |
| 🤼 | People wrestling | `1f93c_peoplewrestling` | | |
| 🤸 | Person cartwheeling | `1f938_personcartwheeling` | 🎨 | `-tone1` through `-tone5` |
| ⛹️ | Person bouncing ball | `26f9_personbouncingball` | 🎨 | `-tone1` through `-tone5` |
| 🤺 | Person fencing | `1f93a_personfencing` | | |
| 🤾 | Person playing handball | `1f93e_personplayinghandball` | 🎨 | `-tone1` through `-tone5` |
| 🏌️ | Person golfing | `1f3cc_persongolfing` | 🎨 | `-tone1` through `-tone5` |
| 🏇 | Horse racing | `1f3c7_horseracing` | 🎨 | `-tone1` through `-tone5` |
| 🧘 | Person in lotus position | `1f9d8_personinlotusposition` | 🎨 | `-tone1` through `-tone5` |
| 🏄 | Person surfing | `1f3c4_personsurfing` | 🎨 | `-tone1` through `-tone5` |
| 🏊 | Person swimming | `1f3ca_personswimming` | 🎨 | `-tone1` through `-tone5` |
| 🤽 | Person playing water polo | `1f93d_personplayingwaterpolo` | 🎨 | `-tone1` through `-tone5` |
| 🚣 | Person rowing boat | `1f6a3_personrowingboat` | 🎨 | `-tone1` through `-tone5` |
| 🧗 | Person climbing | `1f9d7_personclimbing` | 🎨 | `-tone1` through `-tone5` |
| 🚵 | Person mountain biking | `1f6b5_personmountainbiking` | 🎨 | `-tone1` through `-tone5` |
| 🚴 | Person biking | `1f6b4_personbiking` | 🎨 | `-tone1` through `-tone5` |
| 🏆 | Trophy | `1f3c6_trophy` | | |
| 🥇 | 1st place medal | `1f947_1stplacemedal` | | |
| 🥈 | 2nd place medal | `1f948_2ndplacemedal` | | |
| 🥉 | 3rd place medal | `1f949_3rdplacemedal` | | |
| 🏅 | Sports medal | `1f3c5_sportsmedal` | | |
| 🎖️ | Military medal | `1f396_militarymedal` | | |
| 🏵️ | Rosette | `1f3f5_rosette` | | |
| 🎗️ | Reminder ribbon | `1f397_reminderribbon` | | |
| 🎫 | Ticket | `1f3ab_ticket` | | |
| 🎟️ | Admission tickets | `1f39f_admissiontickets` | | |
| 🎪 | Circus tent | `1f3aa_circustent` | | |
| 🤹 | Person juggling | `1f939_personjuggling` | 🎨 | `-tone1` through `-tone5` |
| 🎭 | Performing arts | `1f3ad_performingarts` | | |
| 🩰 | Ballet shoes | `1fa70_balletshoes` | | |
| 🎨 | Artist palette | `1f3a8_artistpalette` | | |
| 🎬 | Clapper board | `1f3ac_clapperboard` | | |
| 🎤 | Microphone | `1f3a4_microphone` | | |
| 🎧 | Headphone | `1f3a7_headphone` | | |
| 🎼 | Musical score | `1f3bc_musicalscore` | | |
| 🎹 | Musical keyboard | `1f3b9_musicalkeyboard` | | |
| 🥁 | Drum | `1f941_drum` | | |
| 🪘 | Long drum | `1fa98_longdrum` | | |
| 🎷 | Saxophone | `1f3b7_saxophone` | | |
| 🎺 | Trumpet | `1f3ba_trumpet` | | |
| 🪗 | Accordion | `1fa97_accordion` | | |
| 🎸 | Guitar | `1f3b8_guitar` | | |
| 🪕 | Banjo | `1fa95_banjo` | | |
| 🎻 | Violin | `1f3bb_violin` | | |
| 🪇 | Maracas | `1fa87_maracas` | | |
| 🥁 | Drum | `1f941_drum` | | |
| 🪈 | Flute | `1fa88_flute` | | |
| 🎲 | Game die | `1f3b2_gamedie` | | |
| ♟️ | Chess pawn | `265f_chesspawn` | | |
| 🎯 | Direct hit | `1f3af_directhit` | | |
| 🎳 | Bowling | `1f3b3_bowling` | | |
| 🎮 | Video game | `1f3ae_videogame` | | |
| 🎰 | Slot machine | `1f3b0_slotmachine` | | |
| 🧩 | Puzzle piece | `1f9e9_puzzlepiece` | | |

### 🎨 Popular Activity Reactions with Skin Tone Examples

Many activity and sports reactions support skin tones. Copy these complete IDs with skin tone variants:

#### 🏋️ Person Lifting Weights
```typescript
"1f3cb_personliftingweights"       // 🏋️ Default
"1f3cb_personliftingweights-tone1" // 🏋🏻 Light
"1f3cb_personliftingweights-tone2" // 🏋🏼 Medium-Light
"1f3cb_personliftingweights-tone3" // 🏋🏽 Medium
"1f3cb_personliftingweights-tone4" // 🏋🏾 Medium-Dark
"1f3cb_personliftingweights-tone5" // 🏋🏿 Dark
```

#### 🏄 Person Surfing
```typescript
"1f3c4_personsurfing"          // 🏄 Default
"1f3c4_personsurfing-tone1"    // 🏄🏻 Light
"1f3c4_personsurfing-tone2"    // 🏄🏼 Medium-Light
"1f3c4_personsurfing-tone3"    // 🏄🏽 Medium
"1f3c4_personsurfing-tone4"    // 🏄🏾 Medium-Dark
"1f3c4_personsurfing-tone5"    // 🏄🏿 Dark
```

#### 🏊 Person Swimming
```typescript
"1f3ca_personswimming"         // 🏊 Default
"1f3ca_personswimming-tone1"   // 🏊🏻 Light
"1f3ca_personswimming-tone2"   // 🏊🏼 Medium-Light
"1f3ca_personswimming-tone3"   // 🏊🏽 Medium
"1f3ca_personswimming-tone4"   // 🏊🏾 Medium-Dark
"1f3ca_personswimming-tone5"   // 🏊🏿 Dark
```

#### 🚴 Person Biking
```typescript
"1f6b4_personbiking"           // 🚴 Default
"1f6b4_personbiking-tone1"     // 🚴🏻 Light
"1f6b4_personbiking-tone2"     // 🚴🏼 Medium-Light
"1f6b4_personbiking-tone3"     // 🚴🏽 Medium
"1f6b4_personbiking-tone4"     // 🚴🏾 Medium-Dark
"1f6b4_personbiking-tone5"     // 🚴🏿 Dark
```

#### 🧘 Person in Lotus Position
```typescript
"1f9d8_personinlotusposition"       // 🧘 Default
"1f9d8_personinlotusposition-tone1" // 🧘🏻 Light
"1f9d8_personinlotusposition-tone2" // 🧘🏼 Medium-Light
"1f9d8_personinlotusposition-tone3" // 🧘🏽 Medium
"1f9d8_personinlotusposition-tone4" // 🧘🏾 Medium-Dark
"1f9d8_personinlotusposition-tone5" // 🧘🏿 Dark
```

#### 🏇 Horse Racing
```typescript
"1f3c7_horseracing"            // 🏇 Default
"1f3c7_horseracing-tone1"      // 🏇🏻 Light
"1f3c7_horseracing-tone2"      // 🏇🏼 Medium-Light
"1f3c7_horseracing-tone3"      // 🏇🏽 Medium
"1f3c7_horseracing-tone4"      // 🏇🏾 Medium-Dark
"1f3c7_horseracing-tone5"      // 🏇🏿 Dark
```

#### 🚣 Person Rowing Boat
```typescript
"1f6a3_personrowingboat"         // 🚣 Default
"1f6a3_personrowingboat-tone1"   // 🚣🏻 Light
"1f6a3_personrowingboat-tone2"   // 🚣🏼 Medium-Light
"1f6a3_personrowingboat-tone3"   // 🚣🏽 Medium
"1f6a3_personrowingboat-tone4"   // 🚣🏾 Medium-Dark
"1f6a3_personrowingboat-tone5"   // 🚣🏿 Dark
```

#### 🧗 Person Climbing
```typescript
"1f9d7_personclimbing"           // 🧗 Default
"1f9d7_personclimbing-tone1"     // 🧗🏻 Light
"1f9d7_personclimbing-tone2"     // 🧗🏼 Medium-Light
"1f9d7_personclimbing-tone3"     // 🧗🏽 Medium
"1f9d7_personclimbing-tone4"     // 🧗🏾 Medium-Dark
"1f9d7_personclimbing-tone5"     // 🧗🏿 Dark
```

#### 🚵 Person Mountain Biking
```typescript
"1f6b5_personmountainbiking"         // 🚵 Default
"1f6b5_personmountainbiking-tone1"   // 🚵🏻 Light
"1f6b5_personmountainbiking-tone2"   // 🚵🏼 Medium-Light
"1f6b5_personmountainbiking-tone3"   // 🚵🏽 Medium
"1f6b5_personmountainbiking-tone4"   // 🚵🏾 Medium-Dark
"1f6b5_personmountainbiking-tone5"   // 🚵🏿 Dark
```

#### 🤸 Person Cartwheeling
```typescript
"1f938_personcartwheeling"         // 🤸 Default
"1f938_personcartwheeling-tone1"   // 🤸🏻 Light
"1f938_personcartwheeling-tone2"   // 🤸🏼 Medium-Light
"1f938_personcartwheeling-tone3"   // 🤸🏽 Medium
"1f938_personcartwheeling-tone4"   // 🤸🏾 Medium-Dark
"1f938_personcartwheeling-tone5"   // 🤸🏿 Dark
```

#### ⛹️ Person Bouncing Ball
```typescript
"26f9_personbouncingball"         // ⛹️ Default
"26f9_personbouncingball-tone1"   // ⛹🏻 Light
"26f9_personbouncingball-tone2"   // ⛹🏼 Medium-Light
"26f9_personbouncingball-tone3"   // ⛹🏽 Medium
"26f9_personbouncingball-tone4"   // ⛹🏾 Medium-Dark
"26f9_personbouncingball-tone5"   // ⛹🏿 Dark
```

[Back to Category Navigation](#category-navigation)

---

## Objects

Common objects and everyday items reactions.

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 💻 | Laptop | `1f4bb_laptop` |
| ⌚ | Watch | `231a_watch` |
| 📱 | Mobile phone | `1f4f1_mobilephone` |
| 💡 | Light bulb | `1f4a1_lightbulb` |
| 🔦 | Flashlight | `1f526_flashlight` |
| 🕯️ | Candle | `1f56f_candle` |
| 🪔 | Diya lamp | `1fa94_diyalamp` |
| 📚 | Books | `1f4da_books` |
| 📖 | Open book | `1f4d6_openbook` |
| 📝 | Memo | `1f4dd_memo` |
| 📓 | Notebook | `1f4d3_notebook` |
| 📔 | Notebook with decorative cover | `1f4d4_notebookwithdecorativecover` |
| 📕 | Closed book | `1f4d5_closedbook` |
| 📗 | Green book | `1f4d7_greenbook` |
| 📘 | Blue book | `1f4d8_bluebook` |
| 📙 | Orange book | `1f4d9_orangebook` |
| 📔 | Notebook with decorative cover | `1f4d4_notebookwithdecorativecover` |
| 📒 | Ledger | `1f4d2_ledger` |
| 📃 | Page with curl | `1f4c3_pagewithcurl` |
| 📜 | Scroll | `1f4dc_scroll` |
| 📄 | Page facing up | `1f4c4_pagefacingup` |
| 📰 | Newspaper | `1f4f0_newspaper` |
| 🗞️ | Rolled-up newspaper | `1f5de_rolledupnewspaper` |
| 📑 | Bookmark tabs | `1f4d1_bookmarktabs` |
| 🔖 | Bookmark | `1f516_bookmark` |
| 🏷️ | Label | `1f3f7_label` |
| 💰 | Money bag | `1f4b0_moneybag` |
| 🪙 | Coin | `1fa99_coin` |
| 💴 | Yen banknote | `1f4b4_yenbanknote` |
| 💵 | Dollar banknote | `1f4b5_dollarbanknote` |
| 💶 | Euro banknote | `1f4b6_eurobanknote` |
| 💷 | Pound banknote | `1f4b7_poundbanknote` |
| 💸 | Money with wings | `1f4b8_moneywithwings` |
| 💳 | Credit card | `1f4b3_creditcard` |
| 🧾 | Receipt | `1f9fe_receipt` |
| 💹 | Chart increasing with yen | `1f4b9_chartincreasingwithyen` |
| ✉️ | Envelope | `2709_envelope` |
| 📧 | E-mail | `1f4e7_email` |
| 📨 | Incoming envelope | `1f4e8_incomingenvelope` |
| 📩 | Envelope with arrow | `1f4e9_envelopewitharrow` |
| 📤 | Outbox tray | `1f4e4_outboxtray` |
| 📥 | Inbox tray | `1f4e5_inboxtray` |
| 📫 | Closed mailbox with raised flag | `1f4eb_closedmailboxwithraisedflag` |
| 📤 | Outbox tray | `1f4e4_outboxtray` |
| 📬 | Open mailbox with raised flag | `1f4ec_openmailboxwithraisedflag` |
| 📭 | Open mailbox with lowered flag | `1f4ed_openmailboxwithloweredflag` |
| 📮 | Postbox | `1f4ee_postbox` |
| 🗳️ | Ballot box with ballot | `1f5f3_ballotboxwithballot` |
| ✏️ | Pencil | `270f_pencil` |
| ✒️ | Black nib | `2712_blacknib` |
| 🖋️ | Fountain pen | `1f58b_fountainpen` |
| 🖊️ | Pen | `1f58a_pen` |
| 🖌️ | Paintbrush | `1f58c_paintbrush` |
| 🖍️ | Crayon | `1f58d_crayon` |
| 📁 | File folder | `1f4c1_filefolder` |
| 📂 | Open file folder | `1f4c2_openfilefolder` |
| 🗂️ | Card index dividers | `1f5c2_cardindexdividers` |
| 📅 | Calendar | `1f4c5_calendar` |
| 📆 | Tear-off calendar | `1f4c6_tearoffcalendar` |
| 🗒️ | Spiral notepad | `1f5d2_spiralnotepad` |
| 🗓️ | Spiral calendar | `1f5d3_spiralcalendar` |
| 📇 | Card index | `1f4c7_cardindex` |
| 📈 | Chart increasing | `1f4c8_chartincreasing` |
| 📉 | Chart decreasing | `1f4c9_chartdecreasing` |
| 📊 | Bar chart | `1f4ca_barchart` |
| 📋 | Clipboard | `1f4cb_clipboard` |
| 📌 | Pushpin | `1f4cc_pushpin` |
| 📍 | Round pushpin | `1f4cd_roundpushpin` |
| 📎 | Paperclip | `1f4ce_paperclip` |
| 🖇️ | Linked paperclips | `1f587_linkedpaperclips` |
| 📏 | Straight ruler | `1f4cf_straightruler` |
| 📐 | Triangular ruler | `1f4d0_triangularruler` |
| ✂️ | Scissors | `2702_scissors` |
| 🗃️ | Card file box | `1f5c3_cardfilebox` |
| 🗄️ | File cabinet | `1f5c4_filecabinet` |
| 🗑️ | Wastebasket | `1f5d1_wastebasket` |
| 🔒 | Locked | `1f512_locked` |
| 🔓 | Unlocked | `1f513_unlocked` |
| 🔏 | Locked with pen | `1f50f_lockedwithpen` |
| 🔐 | Locked with key | `1f510_lockedwithkey` |
| 🔑 | Key | `1f511_key` |
| 🗝️ | Old key | `1f5dd_oldkey` |
| 🔨 | Hammer | `1f528_hammer` |
| 🪓 | Axe | `1fa93_axe` |
| ⛏️ | Pick | `26cf_pick` |
| ⚒️ | Hammer and pick | `2692_hammerandpick` |
| 🛠️ | Hammer and wrench | `1f6e0_hammerandwrench` |
| 🗡️ | Dagger | `1f5e1_dagger` |
| ⚔️ | Crossed swords | `2694_crossedswords` |
| 🔫 | Water pistol | `1f52b_waterpistol` |
| 🪃 | Boomerang | `1fa83_boomerang` |
| 🏹 | Bow and arrow | `1f3f9_bowandarrow` |
| 🛡️ | Shield | `1f6e1_shield` |
| 🪚 | Carpentry saw | `1fa9a_carpentrysaw` |
| 🔧 | Wrench | `1f527_wrench` |
| 🪛 | Screwdriver | `1fa9b_screwdriver` |
| 🔩 | Nut and bolt | `1f529_nutandbolt` |
| ⚙️ | Gear | `2699_gear` |
| 🗜️ | Clamp | `1f5dc_clamp` |
| ⚖️ | Balance scale | `2696_balancescale` |
| 🦯 | White cane | `1f9af_whitecane` |
| 🔗 | Link | `1f517_link` |
| ⛓️ | Chains | `26d3_chains` |
| 🪝 | Hook | `1fa9d_hook` |
| 🧰 | Toolbox | `1f9f0_toolbox` |
| 🧲 | Magnet | `1f9f2_magnet` |
| 🪜 | Ladder | `1fa9c_ladder` |
| ⚗️ | Alembic | `2697_alembic` |
| 🧪 | Test tube | `1f9ea_testtube` |
| 🧫 | Petri dish | `1f9eb_petridish` |
| 🧬 | DNA | `1f9ec_dna` |
| 🔬 | Microscope | `1f52c_microscope` |
| 🔭 | Telescope | `1f52d_telescope` |
| 📡 | Satellite antenna | `1f4e1_satelliteantenna` |

[Back to Category Navigation](#category-navigation)

---

## Travel & Places

Transportation and location-related reactions.

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 🚗 | Automobile | `1f697_automobile` |
| 🚕 | Taxi | `1f695_taxi` |
| 🚙 | Sport utility vehicle | `1f699_sportutilityvehicle` |
| 🚌 | Bus | `1f68c_bus` |
| 🚎 | Trolleybus | `1f68e_trolleybus` |
| 🏎️ | Racing car | `1f3ce_racingcar` |
| 🚓 | Police car | `1f693_policecar` |
| 🚑 | Ambulance | `1f691_ambulance` |
| 🚒 | Fire engine | `1f692_fireengine` |
| 🚐 | Minibus | `1f690_minibus` |
| 🛻 | Pickup truck | `1f6fb_pickuptruck` |
| 🚚 | Delivery truck | `1f69a_deliverytruck` |
| 🚛 | Articulated lorry | `1f69b_articulatedlorry` |
| 🚜 | Tractor | `1f69c_tractor` |
| 🏍️ | Motorcycle | `1f3cd_motorcycle` |
| 🛵 | Motor scooter | `1f6f5_motorscooter` |
| 🦽 | Manual wheelchair | `1f9bd_manualwheelchair` |
| 🦼 | Motorized wheelchair | `1f9bc_motorizedwheelchair` |
| 🛺 | Auto rickshaw | `1f6fa_autorickshaw` |
| 🚲 | Bicycle | `1f6b2_bicycle` |
| 🛴 | Kick scooter | `1f6f4_kickscooter` |
| 🛹 | Skateboard | `1f6f9_skateboard` |
| 🛼 | Roller skate | `1f6fc_rollerskate` |
| 🚏 | Bus stop | `1f68f_busstop` |
| 🛣️ | Motorway | `1f6e3_motorway` |
| 🛤️ | Railway track | `1f6e4_railwaytrack` |
| 🛢️ | Oil drum | `1f6e2_oildrum` |
| ⛽ | Fuel pump | `26fd_fuelpump` |
| 🛞 | Wheel | `1f6de_wheel` |
| 🚨 | Police car light | `1f6a8_policecarlight` |
| 🚥 | Horizontal traffic light | `1f6a5_horizontaltrafficlight` |
| 🚦 | Vertical traffic light | `1f6a6_verticaltrafficlight` |
| 🛑 | Stop sign | `1f6d1_stopsign` |
| 🚧 | Construction | `1f6a7_construction` |
| ⚓ | Anchor | `2693_anchor` |
| 🛟 | Ring buoy | `1f6df_ringbuoy` |
| ⛵ | Sailboat | `26f5_sailboat` |
| 🛶 | Canoe | `1f6f6_canoe` |
| 🚤 | Speedboat | `1f6a4_speedboat` |
| 🛳️ | Passenger ship | `1f6f3_passengership` |
| ⛴️ | Ferry | `26f4_ferry` |
| 🛥️ | Motor boat | `1f6e5_motorboat` |
| 🚢 | Ship | `1f6a2_ship` |
| ✈️ | Airplane | `2708_airplane` |
| 🛩️ | Small airplane | `1f6e9_smallairplane` |
| 🛫 | Airplane departure | `1f6eb_airplanedeparture` |
| 🛬 | Airplane arrival | `1f6ec_airplanearrival` |
| 🪂 | Parachute | `1fa82_parachute` |
| 💺 | Seat | `1f4ba_seat` |
| 🚁 | Helicopter | `1f681_helicopter` |
| 🚟 | Suspension railway | `1f69f_suspensionrailway` |
| 🚠 | Mountain cableway | `1f6a0_mountaincableway` |
| 🚡 | Aerial tramway | `1f6a1_aerialtramway` |
| 🛰️ | Satellite | `1f6f0_satellite` |
| 🚀 | Rocket | `1f680_rocket` |
| 🛸 | Flying saucer | `1f6f8_flyingsaucer` |
| 🛎️ | Bellhop bell | `1f6ce_bellhopbell` |
| 🧳 | Luggage | `1f9f3_luggage` |
| ⌛ | Hourglass done | `231b_hourglassdone` |
| ⏳ | Hourglass not done | `23f3_hourglassnotdone` |
| ⌚ | Watch | `231a_watch` |
| ⏰ | Alarm clock | `23f0_alarmclock` |
| ⏱️ | Stopwatch | `23f1_stopwatch` |
| ⏲️ | Timer clock | `23f2_timerclock` |
| 🕰️ | Mantelpiece clock | `1f570_mantelpiecewclock` |
| 🕛 | Twelve o'clock | `1f55b_twelveoclock` |
| 🕧 | Twelve-thirty | `1f567_twelvethirty` |
| 🕐 | One o'clock | `1f550_oneoclock` |
| 🕜 | One-thirty | `1f55c_onethirty` |
| 🕑 | Two o'clock | `1f551_twooclock` |
| 🕝 | Two-thirty | `1f55d_twothirty` |
| 🕒 | Three o'clock | `1f552_threeoclock` |
| 🕞 | Three-thirty | `1f55e_threethirty` |
| 🕓 | Four o'clock | `1f553_fouroclock` |
| 🕟 | Four-thirty | `1f55f_fourthirty` |
| 🕔 | Five o'clock | `1f554_fiveoclock` |
| 🕠 | Five-thirty | `1f560_fivethirty` |
| 🕕 | Six o'clock | `1f555_sixoclock` |
| 🕡 | Six-thirty | `1f561_sixthirty` |
| 🕖 | Seven o'clock | `1f556_sevenoclock` |
| 🕢 | Seven-thirty | `1f562_seventhirty` |
| 🕗 | Eight o'clock | `1f557_eightoclock` |
| 🕣 | Eight-thirty | `1f563_eightthirty` |
| 🕘 | Nine o'clock | `1f558_nineoclock` |
| 🕤 | Nine-thirty | `1f564_ninethirty` |
| 🕙 | Ten o'clock | `1f559_tenoclock` |
| 🕥 | Ten-thirty | `1f565_tenthirty` |
| 🕚 | Eleven o'clock | `1f55a_elevenoclock` |
| 🕦 | Eleven-thirty | `1f566_eleventhirty` |
| 🌑 | New moon | `1f311_newmoon` |
| 🌒 | Waxing crescent moon | `1f312_waxingcrescentmoon` |
| 🌓 | First quarter moon | `1f313_firstquartermoon` |
| 🌔 | Waxing gibbous moon | `1f314_waxinggibbousmoon` |
| 🌕 | Full moon | `1f315_fullmoon` |
| 🌖 | Waning gibbous moon | `1f316_waninggibbousmoon` |
| 🌗 | Last quarter moon | `1f317_lastquartermoon` |
| 🌘 | Waning crescent moon | `1f318_waningcrescentmoon` |
| 🌚 | New moon face | `1f31a_newmoonface` |
| 🌝 | Full moon face | `1f31d_fullmoonface` |
| 🌛 | First quarter moon face | `1f31b_firstquartermoonface` |
| 🌜 | Last quarter moon face | `1f31c_lastquartermoonface` |
| ☀️ | Sun | `2600_sun` |
| 🌤️ | Sun behind small cloud | `1f324_sunbehindsmallcloud` |
| ⛅ | Sun behind cloud | `26c5_sunbehindcloud` |
| 🌥️ | Sun behind large cloud | `1f325_sunbehindlargecloud` |
| ☁️ | Cloud | `2601_cloud` |
| 🌦️ | Sun behind rain cloud | `1f326_sunbehindraincloud` |
| 🌧️ | Cloud with rain | `1f327_cloudwithrain` |
| ⛈️ | Cloud with lightning and rain | `26c8_cloudwithlightningandrain` |
| 🌩️ | Cloud with lightning | `1f329_cloudwithlightning` |
| 🌨️ | Cloud with snow | `1f328_cloudwithsnow` |
| 🌟 | Glowing star | `1f31f_glowingstar` |
| ✨ | Sparkles | `2728_sparkles` |
| ⚡ | High voltage | `26a1_highvoltage` |
| 🔥 | Fire | `1f525_fire` |
| 💥 | Collision | `1f4a5_collision` |
| ❄️ | Snowflake | `2744_snowflake` |
| ⛄ | Snowman without snow | `26c4_snowmanwithoutsnow` |
| ☃️ | Snowman | `2603_snowman` |
| 🎃 | Jack-o-lantern | `1f383_jackolantern` |
| 🎄 | Christmas tree | `1f384_christmastree` |
| 🎆 | Fireworks | `1f386_fireworks` |
| 🎇 | Sparkler | `1f387_sparkler` |
| 🧨 | Firecracker | `1f9e8_firecracker` |
| ✨ | Sparkles | `2728_sparkles` |
| 🎈 | Balloon | `1f388_balloon` |
| 🎉 | Party popper | `1f389_partypopper` |
| 🎊 | Confetti ball | `1f38a_confettiball` |
| 🎋 | Tanabata tree | `1f38b_tanabatatree` |
| 🎍 | Pine decoration | `1f38d_pinedecoration` |
| 🎎 | Japanese dolls | `1f38e_japanesedolls` |
| 🎏 | Carp streamer | `1f38f_carpstreamer` |
| 🎐 | Wind chime | `1f390_windchime` |
| 🎑 | Moon viewing ceremony | `1f391_moonviewingceremony` |
| 🧧 | Red envelope | `1f9e7_redenvelope` |
| 🎀 | Ribbon | `1f380_ribbon` |
| 🎁 | Wrapped gift | `1f381_wrappedgift` |
| 🎗️ | Reminder ribbon | `1f397_reminderribbon` |
| 🏆 | Trophy | `1f3c6_trophy` |
| 🏅 | Sports medal | `1f3c5_sportsmedal` |
| 🥇 | 1st place medal | `1f947_1stplacemedal` |
| 🥈 | 2nd place medal | `1f948_2ndplacemedal` |
| 🥉 | 3rd place medal | `1f949_3rdplacemedal` |

[Back to Category Navigation](#category-navigation)

---

## Flags

Country and regional flag reactions (select examples).

> 💡 **Note**: Flag reactions do not support skin tone variants. For reactions with skin tone support, see [Hand Gestures](#hand-gestures), [People](#people), and [Activities & Sports](#activities--sports).

| Emoji | Description | Reaction ID |
|-------|-------------|-------------|
| 🏁 | Chequered flag | `1f3c1_chequeredflag` |
| 🚩 | Triangular flag | `1f6a9_triangularflag` |
| 🎌 | Crossed flags | `1f38c_crossedflags` |
| 🏴 | Black flag | `1f3f4_blackflag` |
| 🏳️ | White flag | `1f3f3_whiteflag` |
| 🏳️‍⚧️ | Transgender flag | `1f3f3200d26a7_transgenderflag` |


> 📌 **Note**: Microsoft Teams supports 200+ country and regional flags.

[Back to Category Navigation](#category-navigation)

---

## Special Teams Reactions

Unique Microsoft Teams-branded reactions and special text-based reactions.

| Display | Description | Reaction ID |
|---------|-------------|-------------|
| (oreo) | Oreo | `oreo_oreo` |
| (oreoyum) | Oreo Yum | `oreoyum_oreoyum` |
| (support) | Support | `support_support` |

> 💡 **Note**: These special reactions display as text strings rather than emoji and are exclusive to Microsoft Teams.

[Back to Category Navigation](#category-navigation)

---


## Data Source

```
https://statics.teams.cdn.office.net/evergreen-assets/personal-expressions/v1/metadata/86e6062e3e6843b4b62bd03d55440544/default.json
```



## Skin Tone Variants

For reactions where `diverse: true`, append the skin tone suffix to the base ID:

| Suffix | Visual | Description |
|--------|--------|-------------|
| `-tone1` | 🏻 | Light skin tone (#F5D5A0) |
| `-tone2` | 🏼 | Medium-light skin tone (#E3BC8A) |
| `-tone3` | 🏽 | Medium skin tone (#C18A5A) |
| `-tone4` | 🏾 | Medium-dark skin tone (#8B6444) |
| `-tone5` | 🏿 | Dark skin tone (#5C4033) |

**Example:**
- Base: `1f44b_wavinghand`
- With tone: `1f44b_wavinghand-tone1`, `1f44b_wavinghand-tone2`, etc.

<br>

---

## Additional Resources

- 📘 [Microsoft Teams Platform Documentation](../overview.md)
- 🤖 [Bot Framework SDK](/azure/bot-service/)
- 💬 [Message Reactions API](../bots/how-to/conversations/subscribe-to-conversation-events.md)
- 📊 [Microsoft Graph API](/graph/api/resources/chatmessagereaction)
- 🔧 [Microsoft 365 Agents Toolkit](../toolkit/teams-toolkit-fundamentals.md)

- 📋 [This Reference (Markdown)](https://github.com/VikrantSingh01/teams-reactions-reference) - Complete markdown reference

### Community & Support

- 💬 [Microsoft Teams Developer Community](https://techcommunity.microsoft.com/t5/microsoft-teams-development/ct-p/MicrosoftTeamsDevelopment)
- 🐙 [Teams Samples Repository](https://github.com/OfficeDev/Microsoft-Teams-Samples)
- 📚 [Stack Overflow - Microsoft Teams](https://stackoverflow.com/questions/tagged/microsoft-teams)

### Related APIs

- [Adaptive Cards](https://adaptivecards.io/)
- [Bot Framework](https://dev.botframework.com/)
- [Microsoft Graph](https://developer.microsoft.com/en-us/graph)

---

---

## Contributing & Feedback

This reference is maintained to help Microsoft Teams developers quickly find and use reaction IDs in their applications.

**Found an issue or have a suggestion?**


---

---

**Last Updated:** February 4, 2026  
**Data Source Version:** v33 (from Teams CDN)  

---

**Authored by [Vikrant Singh](https://github.com/VikrantSingh01)**  
🔗 [GitHub](https://github.com/VikrantSingh01)

---

## Quick Reference Summary

✅ **300+ reactions** available across 10+ categories  
✅ **100+ reactions** support 5 skin tone variants  
✅ **Skin tones** accessible via `-tone1` through `-tone5` suffix  
✅ **Categories**: Smileys, Hand Gestures, People, Hearts, Animals, Food, Sports, Objects, Travel, Flags  
✅ **Special reactions**: Microsoft Teams-exclusive text-based reactions  

---

[Back to Top](#teams-reactions-reference)