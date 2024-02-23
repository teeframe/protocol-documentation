# Game Messages

This page describes the game messages structure, all kinds of game messages available, and their purpose.

| Message ID    | Name                                |
| ------------- | :---------------------------------: |
| 0             | *Unused* |
| 1             | [NETMSG_SV_MOTD](#1---netmsgtype_sv_motd) |
| 2             | [NETMSG_SV_BROADCAST](#2---netmsg-sv-broadcast) |
| 3             | [NETMSG_SV_CHAT](#3---netmsg-sv-chat) |
| 4             | [NETMSG_SV_KILLMSG](#4---netmsg-sv-killmsg) |
| 5             | [NETMSG_SV_SOUNDGLOBAL](#5---netmsg-sv-soundglobal) |
| 6             | [NETMSG_SV_TUNEPARAMS](#6---netmsg-sv-tuneparams) |
| 7             | *Unused* |
| 8             | [NETMSG_SV_READYTOENTER](#8---netmsg-sv-readytoenter) |
| 9             | [NETMSG_SV_WEAPONPICKUP](#9---netmsg-sv-weaponpickup) |
| 10            | [NETMSG_SV_EMOTICON](#10---netmsg-sv-emoticon) |
| 11            | [NETMSG_SV_VOTECLEAROPTIONS](#11---netmsg-sv-voteclearoptions) |
| 12            | [NETMSG_SV_VOTEOPTIONLISTADD](#12---netmsg-sv-voteoptionlistadd) |
| 13            | [NETMSG_SV_VOTEOPTIONADD](#13---netmsg-sv-voteoptionadd) |
| 14            | [NETMSG_SV_VOTEOPTIONREMOVE](#14-netmsg-sv-voteoptionremove) |
| 15            | [NETMSG_SV_VOTESET](#15---netmsg-sv-voteset) |
| 16            | [NETMSG_SV_VOTESTATUS](#16---netmsg-sv-votestatus) |
| 17            | [NETMSG_CL_SAY](#17---netmsg-cl-say) |
| 18            | [NETMSG_CL_SETTEAM](#18---netmsg-cl-setteam) |
| 19            | [NETMSG_CL_SETSPECTATORMODE](#19---netmsg-cl-setspectatormode) |
| 20            | [NETMSG_CL_STARTINFO](#20---netmsg-cl-startinfo) |
| 21            | [NETMSG_CL_CHANGEINFO](#21---netmsg-cl-changeinfo) |
| 22            | [NETMSG_CL_KILL](#22---netmsg-cl-kill) |
| 23            | [NETMSG_CL_EMOTICON](#23---netmsg-cl-emoticon) |
| 24            | [NETMSG_CL_VOTE](#24---netmsg-cl-vote) |
| 25            | [NETMSGTYPE_CL_CALLVOTE](#25---netmsgtype_cl_callvote) |

:::info
- **SV** : Server sending to client
- **CL** : Client sending to server
:::

## 1 - NETMSGTYPE_SV_MOTD

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Message       | **String** | TODO |

## 2 - NETMSGTYPE_SV_BROADCAST

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Message       | **String** | TODO |

## 3 - NETMSGTYPE_SV_CHAT

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Team       | **Integer** | TODO |
| Client ID       | **Integer** | TODO |
| Message       | **String** | TODO |

## 4 - NETMSGTYPE_SV_KILLMSG

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Killer        | **Integer** | TODO |
| Victim        | **Integer** | TODO |
| Weapon        | **Integer** | TODO |
| Mode Special? | **Integer** | TODO |

## 5 - NETMSGTYPE_SV_SOUNDGLOBAL

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Sound         | **Integer** | TODO |

## 6 - NETMSGTYPE_SV_TUNEPARAMS

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| TODO          | **TODO** | TODO |

## 8 - NETMSGTYPE_SV_READYTOENTER

This message

- **Vital** : ✅

Structure:

***Empty payload***

## 9 - NETMSGTYPE_SV_WEAPONPICKUP

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Weapon        | **Integer** | TODO |

## 10 - NETMSGTYPE_SV_EMOTICON

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Client ID     | **Integer** | TODO |
| Emoticon   | **Integer** | TODO |

## 11 - NETMSGTYPE_SV_VOTECLEAROPTIONS

This message

- **Vital** : ✅

Structure:

***Empty payload***

## 12 - NETMSGTYPE_SV_VOTEOPTIONLISTADD

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Num. Options  | **Integer** | TODO |
| Description 0 | **String** | TODO |
| ...            | ... | ... |
| Description 14 | **String** | TODO |

## 13 - NETMSGTYPE_SV_VOTEOPTIONADD

This message

**NOTE:** Not used by DDNet servers.

- **Vital** : ?

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Description   | **String** | TODO |

## 14 - NETMSGTYPE_SV_VOTEOPTIONREMOVE

This message

**NOTE:** Not used by DDNet servers.

- **Vital** : ?

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Description  | **String** | TODO |

## 15 - NETMSGTYPE_SV_VOTESET

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Timeout  | **Integer** | TODO |
| Description  | **String** | TODO |
| Reason  | **String** | TODO |

## 16 - NETMSGTYPE_SV_VOTESTATUS

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Yes  | **Integer** | TODO |
| No  | **Integer** | TODO |
| Pass  | **Integer** | TODO |
| Total  | **Integer** | TODO |

## 17 - NETMSGTYPE_CL_SAY

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Team  | **Integer** | TODO |
| Message  | **String** | TODO |

## 18 - NETMSGTYPE_CL_SETTEAM

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Team  | **Integer** | TODO |

## 19 - NETMSGTYPE_CL_SETSPECTATORMODE

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Spectator  | **Integer** | TODO |

## 20 - NETMSGTYPE_CL_STARTINFO

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Name  | **String** | TODO |
| Clan  | **String** | TODO |
| Country  | **Integer** | TODO |
| Skin  | **String** | TODO |
| use Custom Color  | **Boolean** | TODO |
| Color Body  | **Integer** | TODO |
| Color Feet  | **Integer** | TODO |

## 21 - NETMSGTYPE_CL_CHANGEINFO

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Name  | **String** | TODO |
| Clan  | **String** | TODO |
| Country  | **Integer** | TODO |
| Skin  | **String** | TODO |
| use Custom Color  | **Boolean** | TODO |
| Color Body  | **Integer** | TODO |
| Color Feet  | **Integer** | TODO |

## 22 - NETMSGTYPE_CL_KILL

This message

- **Vital** : ✅

Structure:

***Empty payload***

## 23 - NETMSGTYPE_CL_EMOTICON

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Emoticon  | **Integer** | TODO |

## 24 - NETMSGTYPE_CL_VOTE

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Vote  | **Integer** | TODO |

## 25 - NETMSGTYPE_CL_CALLVOTE

This message

- **Vital** : ✅

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Type  | **String** | TODO |
| Value  | **String** | TODO |
| Reason  | **String** | TODO |