# Anti-Insurgency Prototype

A zero-dependency `HTML5 Canvas` horizontal fighting game prototype, aimed at quickly validating the rhythm and feel similar to early Flash action games.

## Running the Game

Simply open [index.html].

## Controls

- `Arrow Keys`: Move
- `Double Tap Left / Right`: Dash
- `Shift + Left / Right`: Steady Dash
- `A`: Light Attack, can chain up to three hits
- `S`: Heavy Attack
- `A + S`: Dragon Uppercut
- `Q`: Leg Sweep
- `Down + S`: Wave Punch
- `While Dashing + A`: Knee Strike
- `F`: Grab Enemy / Pick Up Items / Throw
- `D`: Burst Attack
- `R`: Restart

## Current Features

- Horizontal scrolling levels
- Four-stage area clearing
- Light and heavy attacks with basic combos
- Hit reactions, knockbacks, combo counts, scores, and burst meter
- Hit pauses, hit compression, and clearer action phases for moves
- Player and enemy sprites have switched to sprite sheet rendering, moving away from purely programmed characters
- Regular enemies have been redesigned using clearer free blue uniform character assets, while elite enemies use Hazmat animation assets that resemble biohazard suits
- The final boss now has a dedicated fictional authoritarian design with a black stand-collar outfit, red-and-gold power symbols, and command-seal attack frames
- Enemy grabbing, scene object interaction, and throwing damage
- Two types of regular enemies and a final boss with two phases
- Ground warnings and clearer boss attack range indicators
- Burst effects have been transformed into a golden transformation aura, featuring flame outlines, lightning, vertical energy columns, white flashes, radiating lines, and explosion circle effects
- Added three new attack branches: `Leg Sweep / Wave Punch / Knee Strike`, which are more in line with fighting game rhythms

## Next Steps

- Develop more detailed grab and throw mechanics and aerial follow-ups
- Add a second phase to the boss and clearer move hitboxes
- Incorporate hand-drawn frame-by-frame animations and sound effects
- Break down into a more formal project structure and integrate resource pipelines

## Asset Information

- Player sprites have been changed to `2D Fighter character` from itch.io, created by `Kalponic Studio`, with page notes allowing use in commercial and non-commercial games
- Regular enemy sprites are sourced from CraftPix / Free Game Assets' `Free 2D Police Character Sprites`, trimmed to the required frames and lightly color-adjusted
- Elite enemies temporarily use Kruk2024's `Hazmat guy 2D animations` with color adjustments; it is available for free download but does not explicitly state CC0/open-source licensing, so release rights need confirmation before official release
- The final boss is a project-generated fictional character and is not named after, modeled on, or intended to reproduce the likeness of any real living person
- Burst effect sprites are sourced from `OpenGameArt`'s `FX charge` and `Ring Explosion`, licensed under `CC0`
- Resource files are located in [assets/player_kalponic_structured], [assets/enemies], and [assets/vfx]
