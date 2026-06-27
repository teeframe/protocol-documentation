# Snap Items

This page describes the snap items structure, all kinds of snap items, and their purpose.

| Item ID       | Name                                |
| ------------- | :---------------------------------: |
| 0             | *Unused* |
| 1             | *Unused* |
| 2             | [NETOBJTYPE_PROJECTILE](#2---netobjtype_projectile) |
| 3             | [NETOBJTYPE_LASER](#3---netobjtype_laser) |
| 4             | [NETOBJTYPE_PICKUP](#4---netobjtype_pickup) |
| 5             | [NETOBJTYPE_FLAG](#5---netobjtype_flag) |
| 6             | [NETOBJTYPE_GAMEINFO](#6---netobjtype_gameinfo) |
| 7             | [NETOBJTYPE_GAMEDATA](#7---netobjtype_gamedata) |
| 8             | *Unused* |
| 9             | [NETOBJTYPE_CHARACTER](#9---netobjtype_character) |
| 10            | [NETOBJTYPE_PLAYERINFO](#10---netobjtype_playerinfo) |
| 11            | [NETOBJTYPE_CLIENTINFO](#11---netobjtype_clientinfo) |
| 12            | [NETOBJTYPE_SPECTATORINFO](#12---netobjtype_spectatorinfo) |
| 13            | *Unused* |
| 14            | [NETEVENTTYPE_EXPLOSION](#14---neteventtype_explosion) |
| 15            | [NETEVENTTYPE_SPAWN](#15---neteventtype_spawn) |
| 16            | [NETEVENTTYPE_HAMMERHIT](#16---neteventtype_hammerhit) |
| 17            | [NETEVENTTYPE_DEATH](#17---neteventtype_death) |
| 18            | [NETEVENTTYPE_SOUNDGLOBAL](#18---neteventtype_soundglobal) *(DDNet Only)* |
| 19            | [NETEVENTTYPE_SOUNDWORLD](#19---neteventtype_soundworld) |
| 20            | [NETEVENTTYPE_DAMAGEIND](#20---neteventtype_damageind) |
## 2 - NETOBJTYPE_PROJECTILE

This item represents a projectile entity (bullet, grenade, or shotgun pellet) in the game world.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X             | **Integer** | Projectile X position in the world. |
| Y             | **Integer** | Projectile Y position in the world. |
| VelocityX     | **Integer** | Horizontal velocity of the projectile, scaled by 100. |
| VelocityY     | **Integer** | Vertical velocity of the projectile, scaled by 100. |
| Type          | **Integer** | Weapon type that fired this projectile: `1` = gun, `2` = shotgun, `3` = grenade. |
| StartTick     | **Integer** | Game tick at which the projectile was created. Used by the client to compute its current position using physics formulas. |

## 3 - NETOBJTYPE_LASER

This item represents a laser beam in the game world.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X             | **Integer** | Laser endpoint X position. |
| Y             | **Integer** | Laser endpoint Y position. |
| FromX         | **Integer** | Laser origin X position (where the tee fired from). |
| FromY         | **Integer** | Laser origin Y position (where the tee fired from). |
| StartTick     | **Integer** | Game tick at which the laser was fired. Used by the client to render the laser beam correctly over time. |

## 4 - NETOBJTYPE_PICKUP

This item represents a pickup (health, armor, or weapon) in the game world.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X             | **Integer** | Pickup X position in the world. |
| Y             | **Integer** | Pickup Y position in the world. |
| Type          | **Integer** | Pickup type: `0` = health, `1` = armor, `2` = grenade, `3` = shotgun, `4` = laser, `5` = ninja, `6` = gun, `7` = hammer. |

## 5 - NETOBJTYPE_FLAG

This item represents a CTF flag in the game world.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X             | **Integer** | Flag X position in the world. |
| Y             | **Integer** | Flag Y position in the world. |
| Team          | **Integer** | Flag team: `0` = red team flag, `1` = blue team flag. |

## 6 - NETOBJTYPE_GAMEINFO

This item contains game information about team scores and flag carriers for CTF mode.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| TeamScoreRed  | **Integer** | Current score of the red team. |
| TeamScoreBlue | **Integer** | Current score of the blue team. |
| FlagCarrierRed | **Integer** | Client ID of the red flag carrier, or `-3` if lost, `-2` if at base, `-1` if taken. |
| FlagCarrierBlue | **Integer** | Client ID of the blue flag carrier, or `-3` if lost, `-2` if at base, `-1` if taken. |

## 7 - NETOBJTYPE_GAMEDATA

This item contains global game state data.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| GameFlags     | **Integer** | Game mode flags (bitmask): `1` = teams mode, `2` = CTF flags enabled, `4` = survival mode, `8` = race mode. |
| GameStateFlags | **Integer** | Game state flags (bitmask): `1` = warmup, `2` = sudden death, `4` = round over, `8` = game over, `16` = paused, `32` = start countdown. |
| RoundStartTick | **Integer** | Game tick when the current round started. |
| WarmupTimer   | **Integer** | Remaining warmup time, or a special value indicating the game state. |
| ScoreLimit    | **Integer** | Score limit for the current match. |
| TimeLimit     | **Integer** | Time limit for the current match. |
| RoundNum      | **Integer** | Total number of rounds in the match. |
| RoundCurrent  | **Integer** | Current round number (`1` based). |
## 9 - NETOBJTYPE_CHARACTER

This item represents a character (tee) in the game world, including its core physics and state.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Core -> Tick     | **Integer** | The game tick at which the core data was recorded, for dead reckoning purposes. |
| Core -> X        | **Integer** | Core X position in the world. |
| Core -> Y        | **Integer** | Core Y position in the world. |
| Core -> VelX     | **Integer** | Core horizontal velocity. |
| Core -> VelY     | **Integer** | Core vertical velocity. |
| Core -> Angle    | **Integer** | Core rotation angle, used for character rendering and aiming. |
| Core -> Direction| **Integer** | Core movement direction: `-1` = left, `0` = neutral, `1` = right. |
| Core -> Jumped   | **Integer** | Core jump counter: `0` = grounded, `1` = ground jumped, `2` = air jumped, `3` = both used. |
| Core -> HookedPlayer | **Integer** | Client ID of the player this tee is hooking, or `-1` if not hooking a player. |
| Core -> HookState | **Integer** | Hook state: `-1` = idle, `0` = flying, `1` = attached to a non-hookable tile, `2`-`5` = attached to a hookable tile direction. |
| Core -> HookTick  | **Integer** | Game tick at which the hook state last changed. |
| Core -> HookX    | **Integer** | Hook collision X position. |
| Core -> HookY    | **Integer** | Hook collision Y position. |
| Core -> HookDx   | **Integer** | Hook collision delta X. |
| Core -> HookDy   | **Integer** | Hook collision delta Y. |
| Health | **Integer** | Current health of the character (0-10). Only visible to the owning player and spectators of the owning player. |
| Armor | **Integer** | Current armor of the character (0-10). Only visible to the owning player and spectators of the owning player. |
| AmmoCount | **Integer** | Ammunition count for the active weapon. For ninja: remaining ninja duration. Visible only to the owning player and spectators of the owning player. |
| Weapon | **Integer** | Currently active weapon: `0` = hammer, `1` = gun, `2` = shotgun, `3` = grenade, `4` = laser, `5` = ninja. |
| Emote | **Integer** | Current emote: `0` = normal, `1` = pain, `2` = happy, `3` = surprise, `4` = angry, `5` = blink. |
| AttackTick | **Integer** | Game tick of the last attack, used by the client for attack prediction. |
| PlayerFlags | **Integer** | Player state flags (bitmask): `1` = admin, `2` = chatting, `4` = scoreboard open, `8` = ready, `16` = dead, `32` = watching. |
| TriggeredEvents | **Integer** | Events triggered during this tick (bitmask): `1` = ground jump, `2` = air jump, `4` = hook attached to player, `8` = hook attached to ground, `16` = hook hit non-hookable. Cleared each tick after snap. |

## 10 - NETOBJTYPE_PLAYERINFO

This item contains information about a player's score and latency.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Local | **Integer** | Whether this player is the local client (`1` for the client itself, `0` for other players). |
| ClientID | **Integer** | Client ID of this player. |
| Team | **Integer** | Team the player is on: `-1` = spectators, `0` = red team, `1` = blue team. |
| Score | **Integer** | Player's current score. |
| Latency | **Integer** | Player's current latency/ping in milliseconds. |

## 11 - NETOBJTYPE_CLIENTINFO

This item contains identity and skin information about a client.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Name | **String[16]** | Player name (packed as integers for snap items). |
| Clan | **String[12]** | Player clan (packed as integers for snap items). |
| Country | **Integer** | Country code for the player. |
| Skin | **String[20]** | Skin name (packed as integers for snap items). |
| Use Custom Color | **Integer** | Whether the player uses custom skin colors. |
| Color Body | **Integer** | Body color value. |
| Color Feet | **Integer** | Feet color value. |

:::info
Check the [String Packing To Snap Items](./../packets/default-packets.md#string-packing-to-snap-items) section for more information about the string packing for snap items.
:::

## 12 - NETOBJTYPE_SPECTATORINFO

This item contains the spectator state of a player. It is only sent to the local spectator (the snapping client itself) when their team is `TEAM_SPECTATORS`.

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| SpectatorID | **Integer** | Client ID being spectated, or `-1` (`SPEC_FREEVIEW`) when in free view mode. |
| X | **Integer** | Spectator camera X position in the world. |
| Y | **Integer** | Spectator camera Y position in the world. |

## 14 - NETEVENTTYPE_EXPLOSION

This event creates an explosion effect at the given position. It is a transient event that does not persist across snapshots.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | X position of the explosion center in the world. |
| Y | **Integer** | Y position of the explosion center in the world. |

## 15 - NETEVENTTYPE_SPAWN

This event creates a spawn effect at the given position when a player respawns.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | X position of the spawn effect in the world. |
| Y | **Integer** | Y position of the spawn effect in the world. |

## 16 - NETEVENTTYPE_HAMMERHIT

This event creates a hammer hit effect at the given position.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | X position of the hammer hit effect in the world. |
| Y | **Integer** | Y position of the hammer hit effect in the world. |

## 17 - NETEVENTTYPE_DEATH

This event signals a player death at the given position.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | X position of the death event in the world. |
| Y | **Integer** | Y position of the death event in the world. |
| ClientID | **Integer** | Client ID of the player that died. |

## 18 - NETEVENTTYPE_SOUNDGLOBAL

This event triggers a global sound (not tied to a world position).
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| SoundID | **Integer** | Sound ID to play globally. |

## 19 - NETEVENTTYPE_SOUNDWORLD

This event triggers a world sound at the given position.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | X position of the sound source in the world. |
| Y | **Integer** | Y position of the sound source in the world. |
| SoundID | **Integer** | Sound ID to play at this position. |

## 20 - NETEVENTTYPE_DAMAGEIND

This event creates a damage indicator at the given position, showing damage direction and amount.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | X position of the damage effect in the world. |
| Y | **Integer** | Y position of the damage effect in the world. |
| Angle | **Integer** | Angle of the damage source, used to orient the damage indicator. |

---

<!--## DDNet-Specific Snap Items

The following items use UUID-based identifiers and are only available in DDNet-based servers. They do not occupy fixed numeric IDs in the 0-22 range.

The string identifier (e.g. `character@netobj.ddnet.tw`) is converted to a UUIDv3 and packed as raw binary in the network message. On the wire, extended objects use message ID `0` (NETOBJTYPE_EX) followed by the UUID to identify the object type.

:::info
For details on how UUID strings are hashed into UUIDv3 values and how the UUID registration system works, see the [DDNet Specific Messages & Snap Items](./../fundamentals.md#ddnet-specific-messages-snap-items) section in the Fundamentals page.
:::

### NETOBJTYPE_DDNETCHARACTER

**UUID:** `character@netobj.ddnet.tw`

Extended character data for DDNet features.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Flags | **Integer** | Character flags (bitmask): `1<<0` = solo, `1<<1` = jetpack, `1<<2` = collision disabled, `1<<3` = endless hook, `1<<4` = endless jump, `1<<5` = super, `1<<6` = hammer hit disabled, `1<<7` = shotgun hit disabled, `1<<8` = grenade hit disabled, `1<<9` = laser hit disabled, `1<<10` = hook hit disabled, `1<<11` = telegun gun, `1<<12` = telegun grenade, `1<<13` = telegun laser, `1<<14` = weapon hammer, `1<<15` = weapon gun, `1<<16` = weapon shotgun, `1<<17` = weapon grenade, `1<<18` = weapon laser, `1<<19` = weapon ninja, `1<<20` = movements disabled, `1<<21` = in freeze, `1<<22` = practice mode, `1<<23` = lock mode, `1<<24` = team0 mode, `1<<25` = invincible. |
| FreezeEnd | **Integer** | Tick when the freeze effect ends. |
| Jumps | **Integer** | Total number of jumps available. `-1` = infinite. |
| TeleCheckpoint | **Integer** | Teleporter checkpoint number. `-1` = none. |
| StrongWeakId | **Integer** | Client ID of the strong/weak partner (`0` to `63`). |
| JumpedTotal | **Integer** | Total jumps performed (for jump display). `-1` = not used. |
| NinjaActivationTick | **Integer** | Tick when ninja was activated (for ninja bar). `-1` = not used. |
| FreezeStart | **Integer** | Tick when freeze started (for freeze bar). `-1` = not used. |
| TargetX | **Integer** | Improved target X coordinate. |
| TargetY | **Integer** | Improved target Y coordinate. |
| TuneZoneOverride | **Integer** | Tune zone override ID. |

### NETOBJTYPE_DDNETPLAYER

**UUID:** `player@netobj.ddnet.tw`

Extended player data for DDNet features.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Flags | **Integer** | Extended player flags (bitmask): `1<<0` = AFK, `1<<1` = paused, `1<<2` = spectating. |
| AuthLevel | **Integer** | Authentication level: `0` = none, `1` = helper, `2` = moderator, `3` = admin. |
| FinishTimeSeconds | **Integer** | Finish time in seconds. |
| FinishTimeMillis | **Integer** | Finish time milliseconds component (`0` to `999`). |

### NETOBJTYPE_GAMEINFOEX

**UUID:** `gameinfo@netobj.ddnet.tw`

Extended game info flags for DDNet game types.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Flags | **Integer** | Game info flags (bitmask): `1<<0` = timescore, `1<<1` = race, `1<<2` = fastcap, `1<<3` = FNG, `1<<4` = DDRace, `1<<5` = DDNet, `1<<6` = BlockWorlds, `1<<7` = vanilla, `1<<8` = plus, `1<<9` = flag starts race, `1<<10` = race, `1<<11` = unlimited ammo, `1<<12` = DDRace record message, `1<<13` = race record message, `1<<14` = allow eye wheel, `1<<15` = allow hook collision, `1<<16` = allow zoom, `1<<17` = bug DDRace ghost, `1<<18` = bug DDRace input, `1<<19` = bug FNG laser range, `1<<20` = bug vanilla bounce, `1<<21` = predict FNG, `1<<22` = predict DDRace, `1<<23` = predict DDRace tiles, `1<<24` = predict vanilla, `1<<25` = entities DDNet, `1<<26` = entities DDRace, `1<<27` = entities race, `1<<28` = entities FNG, `1<<29` = entities vanilla, `1<<30` = don't mask entities, `1<<31` = entities BW. |
| Version | **Integer** | Game info version. |
| Flags2 | **Integer** | Extended game info flags 2 (bitmask): `1<<0` = allow x skins, `1<<1` = city, `1<<2` = FDDrace, `1<<3` = entities FDDrace, `1<<4` = HUD health/armor, `1<<5` = HUD ammo, `1<<6` = HUD DDRace, `1<<7` = no weak hook, `1<<8` = no skin change for frozen, `1<<9` = DDRace team, `1<<10` = predict events. |

### NETOBJTYPE_DDRACEPROJECTILE

**UUID:** `projectile@netobj.ddnet.tw`

DDNet race projectile with angle-based velocity.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | Projectile X position. |
| Y | **Integer** | Projectile Y position. |
| Angle | **Integer** | Projectile angle. |
| Data | **Integer** | Extra projectile data. |
| Type | **Integer** | Weapon type (`0` to `5`). |
| StartTick | **Integer** | Game tick when the projectile was created. |

### NETOBJTYPE_DDNETLASER

**UUID:** `laser@netobj.ddnet.tw`

DDNet laser with extended properties (owner, type, subtype, flags).
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| ToX | **Integer** | Laser endpoint X position. |
| ToY | **Integer** | Laser endpoint Y position. |
| FromX | **Integer** | Laser origin X position. |
| FromY | **Integer** | Laser origin Y position. |
| StartTick | **Integer** | Game tick when the laser was fired. |
| Owner | **Integer** | Client ID of the laser owner, or `-1` if none. |
| Type | **Integer** | Laser type: `0` = rifle, `1` = shotgun, `2` = door, `3` = freeze, `4` = dragger, `5` = gun, `6` = plasma. |
| SwitchNumber | **Integer** | Switch number for door lasers. `-1` = none. |
| Subtype | **Integer** | Laser subtype. For dragger: `0` = weak, `1` = weak no wall, `2` = normal, `3` = normal no wall, `4` = strong, `5` = strong no wall. For gun: `0` = unfreeze, `1` = explosive, `2` = freeze, `3` = expfreeze. |
| Flags | **Integer** | Laser flags (bitmask): `1<<0` = no predict. |

### NETOBJTYPE_DDNETPROJECTILE

**UUID:** `ddnet-projectile@netobj.ddnet.tw`

DDNet projectile with extended properties (owner, switch number, tune zone, flags).
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | Projectile X position. |
| Y | **Integer** | Projectile Y position. |
| VelX | **Integer** | Horizontal velocity, scaled by 100. |
| VelY | **Integer** | Vertical velocity, scaled by 100. |
| Type | **Integer** | Weapon type (`0` to `5`). |
| StartTick | **Integer** | Game tick when the projectile was created. |
| Owner | **Integer** | Client ID of the projectile owner, or `-1` if none. |
| SwitchNumber | **Integer** | Switch number for door projectiles. |
| TuneZone | **Integer** | Tune zone ID. |
| Flags | **Integer** | Projectile flags (bitmask): `1<<0` = bounce horizontal, `1<<1` = bounce vertical, `1<<2` = explosive, `1<<3` = freeze, `1<<4` = normalize velocity. |

### NETOBJTYPE_DDNETPICKUP

**UUID:** `pickup@netobj.ddnet.tw`

DDNet pickup with extended properties (subtype, switch number, flags).
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | Pickup X position. |
| Y | **Integer** | Pickup Y position. |
| Type | **Integer** | Pickup type. |
| Subtype | **Integer** | Pickup subtype. |
| SwitchNumber | **Integer** | Switch number for door pickups. |
| Flags | **Integer** | Pickup flags (bitmask): `1<<0` = X flip, `1<<1` = Y flip, `1<<2` = rotate, `1<<3` = no predict. |

### NETOBJTYPE_DDNETSPECTATORINFO

**UUID:** `spectator-info@netobj.ddnet.org`

DDNet extended spectator info with camera settings and spectator count.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| HasCameraInfo | **Integer** | Whether camera info fields are present (boolean). |
| Zoom | **Integer** | Camera zoom level. |
| Deadzone | **Integer** | Camera deadzone. |
| FollowFactor | **Integer** | Camera follow factor. |
| SpectatorCount | **Integer** | Number of spectators watching this player. |

### NETOBJTYPE_SPECTATORCOUNT

**UUID:** `spectator-count@netobj.ddnet.org`

Number of spectators watching a player.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| NumSpectators | **Integer** | Number of spectators. |

### NETOBJTYPE_SPECCHAR

**UUID:** `spec-char@netobj.ddnet.tw`

Spectator character position for rendering.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | Character X position. |
| Y | **Integer** | Character Y position. |

### NETOBJTYPE_SWITCHSTATE

**UUID:** `switch-state@netobj.ddnet.tw`

Switch state for a player team.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| HighestSwitchNumber | **Integer** | Highest switch number in use. |
| Status[0..7] | **Integer[8]** | Switch status bitmask (256 switches packed into 8 integers). |
| SwitchNumbers[0..3] | **Integer[4]** | Switch numbers for timed switchers. |
| EndTicks[0..3] | **Integer[4]** | End ticks for timed switchers. |

### NETOBJTYPE_ENTITYEX

**UUID:** `entity-ex@netobj.ddnet.tw`

Extended entity data for map items with switch numbers.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| SwitchNumber | **Integer** | Switch number for this entity. |
| Layer | **Integer** | Layer the entity belongs to. |
| EntityClass | **Integer** | Entity class: `0` = projectile, `1` = door, `2` = dragger weak, `3` = dragger normal, `4` = dragger strong, `5` = gun normal, `6` = gun explosive, `7` = gun freeze, `8` = gun unfreeze, `9` = light, `10` = pickup. |

### NETOBJTYPE_MAPBESTTIME

**UUID:** `map-best-time@netobj.ddnet.org`

Current best time on the server for the map.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| MapBestTimeSeconds | **Integer** | Best time in seconds. |
| MapBestTimeMillis | **Integer** | Best time milliseconds component (`0` to `999`). |

### NETEVENTTYPE_MAPSOUNDWORLD

**UUID:** `map-sound-world@netevent.ddnet.org`

Map-triggered world sound event.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | X position of the sound source. |
| Y | **Integer** | Y position of the sound source. |
| SoundID | **Integer** | Sound ID to play. |

### NETEVENTTYPE_BIRTHDAY

**UUID:** `birthday@netevent.ddnet.org`

Creates a birthday celebration effect at the given position.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | X position of the birthday effect in the world. |
| Y | **Integer** | Y position of the birthday effect in the world. |

### NETEVENTTYPE_FINISH

**UUID:** `finish@netevent.ddnet.org`

Creates a finish line effect at the given position.
Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | X position of the finish effect in the world. |
| Y | **Integer** | Y position of the finish effect in the world. |-->
