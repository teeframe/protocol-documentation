# System Messages

This page describes the system messages structure, all kind of system messages available and its purpose.

| Message ID    | Name                                |
| ------------- | :---------------------------------: |
| 0             | *Unused* |
| 1             | [NETMSG_INFO](#1-netmsg-info)       |
| 2             | [NETMSG_MAP_CHANGE](#2-netmsg-map-change) |
| 3             | [NETMSG_MAP_DATA](#3-netmsg-map-data) |
| 4             | [NETMSG_CON_READY](#4-netmsg-con-ready) |
| 5             | [NETMSG_SNAP](#5-netmsg-snap) |
| 6             | [NETMSG_SNAPEMPTY](#6-netmsg-snapempty) |
| 7             | [NETMSG_SNAPSINGLE](#7-netmsg-snapsingle) |
| 8             | *Unused* |
| 9             | [NETMSG_INPUTTIMING](#9-netmsg-inputtiming) |
| 10            | [NETMSG_RCON_AUTH_STATUS](#10-netmsg-rcon-auth-status) |
| 11            | [NETMSG_RCON_LINE](#11-netmsg-rcon-line) |
| 12            | *Unused* |
| 13            | *Unused* |
| 14            | [NETMSG_READY](#14-netmsg-ready) |
| 15            | [NETMSG_ENTERGAME](#15-netmsg-entergame) |
| 16            | [NETMSG_INPUT](#16-netmsg-input) |
| 17            | [NETMSG_RCON_CMD](#17-netmsg-rcon-cmd) |
| 18            | [NETMSG_RCON_AUTH](#18-netmsg-rcon-auth) |
| 19            | [NETMSG_REQUEST_MAP_DATA](#19-netmsg-request-map-data) |
| 20            | *Unused* |
| 21            | *Unused* |
| 22            | [NETMSG_PING](#22-netmsg-ping) |
| 23            | [NETMSG_PING_REPLY](#23-netmsg-ping-reply) |
| 24            | *Unused* |
| 25            | [NETMSG_RCON_CMD_ADD](#25-netmsg-rcon-cmd-add) |
| 26            | [NETMSG_RCON_CMD_REM](#26-netmsg-rcon-cmd-rem) |

## 1 - NETMSG_INFO

This message 

- **Vital** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Version       | **String** | The client version |
| Password      | **String** | The server password (optional) |

## 2 - NETMSG_MAP_CHANGE

This message

- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Map Name      | **String** | The map name |
| Map CRC       | **Integer** | The map CRC |
| Map Size      | **Integer** | The map size (bytes?) |

## 3 - NETMSG_MAP_DATA

This message

- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Last          | **Integer** | TODO |
| Current Map CRC | **Integer** | TODO |
| Chunk         | **Integer** | TODO |
| Chunk Size    | **Integer** | TODO |
| Data          | **Binary** | TODO |

## 4 - NETMSG_CON_READY

This message

- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure: 

***Empty payload***

## 5 - NETMSG_SNAP

This message sends a slice of a snap with part of the items.

- **Vital** : ❌
- **Sending Path** : Server -> Client

:::info
Snap is a complex type of chunk. You can find more information about it on [Snap Structure](./../snap/snap-structure.md) page.
:::

## 6 - NETMSG_SNAPEMPTY

This message sends an empty snap with no items.

- **Vital** : ❌
- **Sending Path** : Server -> Client

:::info
Snap is a complex type of chunk. You can find more information about it on [Snap Structure](./../snap/snap-structure.md) page.
:::

## 7 - NETMSG_SNAPSINGLE

This message sends a full snap with all items.

- **Vital** : ❌
- **Sending Path** : Server -> Client

:::info
Snap is a complex type of chunk. You can find more information about it on [Snap Structure](./../snap/snap-structure.md) page.
:::

## 9 - NETMSG_INPUTTIMING

This message

- **Vital** : ❌
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Intended Tick | **Integer** | TODO |
| Time Left     | **Integer** | TODO |

## 10 - NETMSG_RCON_AUTH_STATUS

This message

- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Authed        | **Boolean** | TODO |
| CmdList       | **Boolean** | TODO |

## 11 - NETMSG_RCON_LINE

This message

- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Line          | **String** | TODO |

## 14 - NETMSG_READY

This message

- **Vital** : ✅
- **Sending Path** : Client -> Server

Structure:

***Empty payload***

## 15 - NETMSG_ENTERGAME

This message

- **Vital** : ❌
- **Sending Path** : Client -> Server

Structure:

***Empty payload***

## 16 - NETMSG_INPUT

This message

- **Vital** : ❌
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Ack Game Tick      | **Integer** | TODO |
| Prediction Tick    | **Integer** | TODO |
| Input -> Direction | **Integer** | TODO |
| Input -> Target X  | **Integer** | TODO |
| Input -> Target Y  | **Integer** | TODO |
| Input -> Jump      | **Boolean** | TODO |
| Input -> Fire      | **Boolean** | TODO |
| Input -> Hook      | **Boolean** | TODO |
| Input -> PlayerFlags | **Integer** | TODO |
| Input -> WantedWeapon | **Integer** | TODO |
| Input -> NextWeapon | **Integer** | TODO |
| Input -> PrevWeapon | **Integer** | TODO |

## 17 - NETMSG_RCON_CMD

This message

- **Vital** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Command       | **String** | The command to be executed |

## 18 - NETMSG_RCON_AUTH

This message

- **Vital** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Send Commands | **Boolean** | This is always 1 (true) |

## 19 - NETMSG_REQUEST_MAP_DATA

This message

- **Vital** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Chunk         | **Integer** | TODO |

## 22 - NETMSG_PING

This message

- **Vital** : ❌
- **Sending Path** : Both ways

Structure:

***Empty payload***

## 23 - NETMSG_PING_REPLY

This message

- **Vital** : ❌
- **Sending Path** : Both ways

Structure:

***Empty payload***

## 25 - NETMSG_RCON_CMD_ADD

This message

- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Name          | **String** | TODO |
| Help          | **String** | TODO |
| Params        | **String** | TODO |

## 26 - NETMSG_RCON_CMD_REM

This message

- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Name          | **String** | TODO |