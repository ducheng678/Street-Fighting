# Anti-Insurgency Prototype

A zero-dependency `HTML5 Canvas` horizontal fighting game prototype, aimed at quickly validating the rhythm and feel similar to early Flash action games.

## Running the Game

Double-click `start-game.bat`. It starts a local game server and opens the browser automatically, so `PageDown` can save a PNG screenshot of the canvas.

## Controls

- `Arrow Keys`: Move
- `Double Tap Left / Right`: Dash
- `Shift + Left / Right`: Steady Dash
- `A`: Light Attack, can chain up to three hits
- `S`: Heavy Attack
- `A + S`: Rising Dragon Strike
- `Q`: Leg Sweep
- `Down + S`: Wave Punch
- `F`: Grab Enemy / Pick Up Items / Throw
- `D`: Burst Attack
- `PageDown`: Save a PNG screenshot of the game canvas
- `R`: Restart

## Current Features

- Horizontal scrolling levels
- Five-stage area clearing
- Light and heavy attacks with basic combos
- Hit reactions, knockbacks, combo counts, scores, and burst meter
- Hit pauses, hit compression, and clearer action phases for moves
- Player and enemy sprites have switched to sprite sheet rendering, moving away from purely programmed characters
- Enemy stages are ordered as red armband guards, tank, police, Hazmat workers, and the final dictator boss
- The tank stage uses a stylized Tiananmen gate / square backdrop
- The final boss now uses user-provided/generated transparent sprite sheets with a pink virus-shaped head, green commander uniform, medals, epaulettes, cape, and corrected full-body attack frames
- Enemy grabbing, scene object interaction, and throwing damage
- Four types of regular enemies and a final boss with two phases
- Ground warnings and clearer boss attack range indicators
- Tank enemies now have cannon fire and a close-range crushing charge attack
- Burst effects have been transformed into a golden transformation aura, featuring flame outlines, lightning, vertical energy columns, white flashes, radiating lines, and explosion circle effects
- Added two new attack branches: `Leg Sweep / Wave Punch`, which are more in line with fighting game rhythms

## Next Steps

- Develop more detailed grab and throw mechanics and aerial follow-ups
- Add a second phase to the boss and clearer move hitboxes
- Incorporate hand-drawn frame-by-frame animations and sound effects
- Break down into a more formal project structure and integrate resource pipelines

## Asset Information

- Player sprites have been changed to `2D Fighter character` from itch.io, created by `Kalponic Studio`, with page notes allowing use in commercial and non-commercial games
- Regular enemy sprites are sourced from CraftPix / Free Game Assets' `Free 2D Police Character Sprites`, trimmed to the required frames and lightly color-adjusted
- Red armband guard enemy sprites are user-provided/generated transparent sprite sheets from `red_guard_little_red_book_bundle.zip`; confirm usage rights before public release
- Tank enemy sprites are user-provided/generated transparent sprite sheets from `tank_sheets_standard_v2_bundle.zip`; confirm usage rights before public release
- Elite enemies temporarily use Kruk2024's `Hazmat guy 2D animations` with color adjustments; it is available for free download but does not explicitly state CC0/open-source licensing, so release rights need confirmation before official release
- Final boss sprite sheets are user-provided/generated satire assets; confirm usage rights before public release
- Burst effect sprites are sourced from `OpenGameArt`'s `FX charge` and `Ring Explosion`, licensed under `CC0`
- Resource files are located in [assets/player_kalponic_structured], [assets/enemies], and [assets/vfx]
