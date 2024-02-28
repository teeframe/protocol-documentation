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
| 18            | *Unused* |
| 19            | [NETEVENTTYPE_SOUNDWORLD](#19---neteventtype_soundworld) |
| 20            | [NETEVENTTYPE_DAMAGEIND](#20---neteventtype_damageind) |


## 2 - NETOBJTYPE_PROJECTILE

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X             | **Integer** | TODO |
| Y             | **Integer** | TODO |
| VelocityX     | **Integer** | TODO |
| VelocityY     | **Integer** | TODO |
| Type          | **Integer** | TODO |
| StartTick     | **Integer** | TODO |

## 3 - NETOBJTYPE_LASER

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X             | **Integer** | TODO |
| Y             | **Integer** | TODO |
| FromX         | **Integer** | TODO |
| FromY         | **Integer** | TODO |
| StartTick     | **Integer** | TODO |

## 4 - NETOBJTYPE_PICKUP

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X             | **Integer** | TODO |
| Y             | **Integer** | TODO |
| Type          | **Integer** | TODO |

## 5 - NETOBJTYPE_FLAG

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X             | **Integer** | TODO |
| Y             | **Integer** | TODO |
| Team          | **Integer** | TODO |

## 6 - NETOBJTYPE_GAMEINFO

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| TeamScoreRed    | **Integer** | TODO |
| TeamScoreBlue   | **Integer** | TODO |
| FlagCarrierRed  | **Integer** | TODO |
| FlagCarrierBlue | **Integer** | TODO |

## 7 - NETOBJTYPE_GAMEDATA

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| GameFlags     | **Integer** | TODO |
| GameStateFlags | **Integer** | TODO |
| RoundStartTick | **Integer** | TODO |
| WarmupTimer | **Integer** | TODO |
| ScoreLimit | **Integer** | TODO |
| TimeLimit | **Integer** | TODO |
| RoundNum | **Integer** | TODO |
| RoundCurrent | **Integer** | TODO |


## 9 - NETOBJTYPE_CHARACTER

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Core -> Tick     | **Integer** | TODO |
| Core -> X        | **Integer** | TODO |
| Core -> Y        | **Integer** | TODO |
| Core -> VelX     | **Integer** | TODO |
| Core -> VelY     | **Integer** | TODO |
| Core -> Angle    | **Integer** | TODO |
| Core -> Direction | **Integer** | TODO |
| Core -> Jumped   | **Integer** | TODO |
| Core -> HookedPlayer | **Integer** | TODO |
| Core -> HookState | **Integer** | TODO |
| Core -> HookX    | **Integer** | TODO |
| Core -> HookY    | **Integer** | TODO |
| Core -> HookDx   | **Integer** | TODO |
| Core -> HookDy   | **Integer** | TODO |
| PlayerFlags | **Integer** | TODO |
| Health | **Integer** | TODO |
| Armor | **Integer** | TODO |
| AmmoCount | **Integer** | TODO |
| Weapon | **Integer** | TODO |
| Emote | **Integer** | TODO |
| AttackTick | **Integer** | TODO |

## 10 - NETOBJTYPE_PLAYERINFO

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Local | **Integer** | TODO |
| ClientID | **Integer** | TODO |
| Team | **Integer** | TODO |
| Score | **Integer** | TODO |
| Latency | **Integer** | TODO |

## 11 - NETOBJTYPE_CLIENTINFO

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Name | **String[16]** | TODO |
| Clan | **String[12]** | TODO |
| Country | **Integer** | TODO |
| Skin | **String[20]** | TODO |
| Use Custom Color | **Integer** | TODO |
| Color Body | **Integer** | TODO |
| Color Feet | **Integer** | TODO |

:::info
Check the [String Packing To Snap Items](./../packets/default-packets.md#string-packing-to-snap-items) section for more information about the string packing for snap items.
:::

## 12 - NETOBJTYPE_SPECTATORINFO

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| SpectatorID | **Integer** | TODO |
| X | **Integer** | TODO |
| Y | **Integer** | TODO |

## 14 - NETEVENTTYPE_EXPLOSION

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | TODO |
| Y | **Integer** | TODO |

## 15 - NETEVENTTYPE_SPAWN

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | TODO |
| Y | **Integer** | TODO |

## 16 - NETEVENTTYPE_HAMMERHIT

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | TODO |
| Y | **Integer** | TODO |

## 17 - NETEVENTTYPE_DEATH

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | TODO |
| Y | **Integer** | TODO |
| ClientID | **Integer** | TODO |

## 19 - NETEVENTTYPE_SOUNDWORLD

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | TODO |
| Y | **Integer** | TODO |
| SoundID | **Integer** | TODO |

## 20 - NETEVENTTYPE_DAMAGEIND

This item

- **Sends** : 

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| X | **Integer** | TODO |
| Y | **Integer** | TODO |
| Angle | **Integer** | TODO |