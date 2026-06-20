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
| 10            | [NETMSG_RCON_AUTH_ON](#10-netmsg-rcon-auth-on) |
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

The first message sent by the client. It gives the server the client's version and optional password.

- **Vital** : ✅
- **Instant Sending** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Version       | **String** | The client version string. |
| Password      | **String** | The server password, if needed. May be empty. |
| Client Version | **Integer** | A numeric client version identifier. |

## 2 - NETMSG_MAP_CHANGE

Sent by the server when the client should switch to a different map.

- **Vital** : ✅
- **Instant Sending** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Map Name      | **String** | The name of the map. |
| Map CRC       | **Integer** | The CRC checksum of the map. |
| Map Size      | **Integer** | Total map size in bytes. |
| Chunks Per Request | **Integer** | Number of map chunks the server sends per `NETMSG_REQUEST_MAP_DATA` request. |
| Chunk Size    | **Integer** | Size of each map chunk in bytes. |
| Map SHA256    | **Binary (32 bytes)** | SHA256 digest of the map. |

## 3 - NETMSG_MAP_DATA

Sent by the server to transfer a raw chunk of the map file.

- **Vital** : ✅
- **Instant Sending** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Data          | **Binary** | Raw map chunk data. |

## 4 - NETMSG_CON_READY

Sent by the server when the connection is ready and the client should send its start info.

- **Vital** : ✅
- **Instant Sending** : ✅
- **Sending Path** : Server -> Client

Structure: 

***Empty payload***

## 5 - NETMSG_SNAP

This message sends a slice of a snap with part of the items.

- **Vital** : ❌
- **Instant Sending** : ✅
- **Sending Path** : Server -> Client

:::info
Snap is a complex type of chunk. You can find more information about it on [Snap Structure](./../snap/snap-structure.md) page.
:::

## 6 - NETMSG_SNAPEMPTY

This message sends an empty snap with no items.

- **Vital** : ❌
- **Instant Sending** : ✅
- **Sending Path** : Server -> Client

:::info
Snap is a complex type of chunk. You can find more information about it on [Snap Structure](./../snap/snap-structure.md) page.
:::

## 7 - NETMSG_SNAPSINGLE

This message sends a full snap with all items in a single packet.

- **Vital** : ❌
- **Instant Sending** : ✅
- **Sending Path** : Server -> Client

:::info
Snap is a complex type of chunk. You can find more information about it on [Snap Structure](./../snap/snap-structure.md) page.
:::

## 9 - NETMSG_INPUTTIMING

This message is a response from the server to the client "INPUT" chunk, reporting how early or late the input was handled.

- **Vital** : ❌
- **Instant Sending** : ❌
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Intended Tick | **Integer** | The game tick the client intended its input for. |
| Time Left     | **Integer** | Time left before the intended tick, in milliseconds. Negative values mean the input was late. |

:::info
Check the [Input & Input Timing Chunks](./../packets/chunks-concept.md#input-input-timing-chunks) section for more information about this chunk.
:::

## 10 - NETMSG_RCON_AUTH_ON

Sent by the server to indicate that the client has been authenticated for rcon.

- **Vital** : ✅
- **Instant Sending** : ❌
- **Sending Path** : Server -> Client

Structure:

***Empty payload***

## 11 - NETMSG_RCON_LINE

Sent by the server to print a line to the remote console on the client.

- **Vital** : ✅
- **Instant Sending** : ❌
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Line          | **String** | The text line to print in the client's remote console. |

## 14 - NETMSG_READY

Sent by the client after it has loaded the map and is ready.

- **Vital** : ✅
- **Instant Sending** : ✅
- **Sending Path** : Client -> Server

Structure:

***Empty payload***

## 15 - NETMSG_ENTERGAME

Sent by the client to tell the server to start sending snapshots.

- **Vital** : ❌
- **Instant Sending** : ✅
- **Sending Path** : Client -> Server

Structure:

***Empty payload***

## 16 - NETMSG_INPUT

This message is sent by the client to the server with the player's input.

- **Vital** : ❌
- **Instant Sending** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Ack Game Tick      | **Integer** | The last acknowledged server game tick. |
| Prediction Tick    | **Integer** | The game tick the client is predicting with this input. |
| Input Size         | **Integer** | Total size of the raw input data in bytes. |
| Input -> Direction | **Integer** | Direction the player is moving: `-1` = left, `0` = neutral, `1` = right. |
| Input -> Target X  | **Integer** | X coordinate of the crosshair / target position. |
| Input -> Target Y  | **Integer** | Y coordinate of the crosshair / target position. |
| Input -> Jump      | **Integer** | Jump input state. |
| Input -> Fire      | **Integer** | Fire input state. |
| Input -> Hook      | **Integer** | Hook input state. |
| Input -> PlayerFlags | **Integer** | Player flags for this input (e.g. chatting, scoreboard). |
| Input -> WantedWeapon | **Integer** | Direct weapon slot selection. `0` = no desired weapon, `1+weapon` = desired weapon. |
| Input -> NextWeapon | **Integer** | Next weapon cycle input. |
| Input -> PrevWeapon | **Integer** | Previous weapon cycle input. |
| Ping Correction     | **Integer** | Client-reported ping correction for latency calculation. |

:::info
Check the [Input & Input Timing Chunks](./../packets/chunks-concept.md#input-input-timing-chunks) section for more information about this chunk.
:::

## 17 - NETMSG_RCON_CMD

Sent by the client to execute a command on the server through the remote console.

- **Vital** : ✅
- **Instant Sending** : ❌
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Command       | **String** | The command to be executed. |

## 18 - NETMSG_RCON_AUTH

Sent by the client to authenticate for rcon access, containing the password.

- **Vital** : ✅
- **Instant Sending** : ❌
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Password      | **String** | The rcon password used to authenticate. |

## 19 - NETMSG_REQUEST_MAP_DATA

Sent by the client to request the next chunk of map data.

- **Vital** : ✅
- **Instant Sending** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Chunk         | **Integer** | The map chunk index being requested. |

## 22 - NETMSG_PING

Sent by either side to request a pong response.

- **Vital** : ❌
- **Instant Sending** : ❌
- **Sending Path** : Both ways

Structure:

***Empty payload***

## 23 - NETMSG_PING_REPLY

Sent by either side as a reply to a NETMSG_PING.

- **Vital** : ❌
- **Instant Sending** : ❌
- **Sending Path** : Both ways

Structure:

***Empty payload***

## 25 - NETMSG_RCON_CMD_ADD

Sent by the server to inform an authenticated client about a newly available rcon command.

- **Vital** : ✅
- **Instant Sending** : ❌
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Name          | **String** | Command name. |
| Help          | **String** | Help text describing the command. |
| Params        | **String** | Parameter format string for the command. |

## 26 - NETMSG_RCON_CMD_REM

Sent by the server to inform an authenticated client that a rcon command is no longer available.

- **Vital** : ✅
- **Instant Sending** : ❌
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Name          | **String** | Name of the command to remove. |

---

<!--## DDNet-Specific System Messages

The following messages use UUID-based identifiers and are only available in DDNet-based servers. They use the same wire format as standard system messages (`NETMSG_EX` = 0 followed by a 16-byte UUID in the message payload).

:::info
For details on how UUID strings are hashed into UUIDv3 values and how the UUID registration system works, see the [DDNet Specific Messages & Snap Items](./../fundamentals.md#ddnet-specific-messages-snap-items) section in the Fundamentals page.
:::

### NETMSG_WHATIS

Sent by a peer to ask what type name corresponds to a given UUID.

- **UUID:** `what-is@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Both ways

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| UUID          | **Binary (16 bytes)** | The UUID being queried. |

### NETMSG_ITIS

Response to `NETMSG_WHATIS`, providing the type name for a UUID.

- **UUID:** `it-is@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Both ways

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| UUID          | **Binary (16 bytes)** | The UUID being identified. |
| Name          | **String** | The type name string for this UUID. |

### NETMSG_IDONTKNOW

Response to `NETMSG_WHATIS`, indicating the peer does not recognize the given UUID.

- **UUID:** `i-dont-know@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Both ways

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| UUID          | **Binary (16 bytes)** | The unrecognized UUID. |

### NETMSG_RCONTYPE

Sent by the server to inform the client whether rcon authentication requires a username.

- **UUID:** `rcon-type@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Username Required | **Integer** | Bit 0 set if a username is required for rcon auth. |

### NETMSG_MAP_DETAILS

Sent by the server to give the client map metadata (name, SHA256, CRC, size) and an optional download URL.

- **UUID:** `map-details@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Map Name      | **String** | The base name of the map. |
| Map SHA256    | **Binary (32 bytes)** | SHA256 digest of the map. |
| Map CRC       | **Integer** | The CRC checksum of the map. |
| Map Size      | **Integer** | Total map size in bytes. |
| Download URL  | **String** | Optional URL for downloading the map. Empty string if not provided. |

### NETMSG_CAPABILITIES

Sent by the server at connection time to inform the client of server capabilities (version and feature flags).

- **UUID:** `capabilities@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Version       | **Integer** | Server capability version. |
| Flags         | **Integer** | Server capability flags (bitmask): `1<<0` = DDNet, `1<<1` = chat timeout code, `1<<2` = any player flag, `1<<3` = ping extension, `1<<4` = allow dummy, `1<<5` = sync weapon input. |

### NETMSG_CLIENTVER

Sent by the client at connection time to inform the server of its DDNet version.

- **UUID:** `clientver@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Connection ID | **Binary (16 bytes)** | Unique connection identifier. |
| DDNet Version | **Integer** | Numeric DDNet client version. |
| Version String | **String** | Human-readable DDNet version string. |

### NETMSG_PINGEX

Extended ping message. Carries a UUID for matching the corresponding pong response.

- **UUID:** `ping@ddnet.tw`
- **Vital** : ❌
- **Sending Path** : Both ways

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Ping UUID     | **Binary (16 bytes)** | Unique UUID for this ping, echoed back in `NETMSG_PONGEX`. |

### NETMSG_PONGEX

Extended pong response to `NETMSG_PINGEX`. Carries the same UUID that was sent in the ping.

- **UUID:** `pong@ddnet.tw`
- **Vital** : ❌
- **Sending Path** : Both ways

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Ping UUID     | **Binary (16 bytes)** | The UUID from the corresponding `NETMSG_PINGEX`. |

### NETMSG_CHECKSUM_REQUEST

Sent by the server to request a checksum verification from the client.

- **UUID:** `checksum-request@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Checksum UUID | **Binary (16 bytes)** | Unique UUID to identify this checksum request. |

### NETMSG_CHECKSUM_RESPONSE

Sent by the client in response to `NETMSG_CHECKSUM_REQUEST`, containing the computed SHA256 checksum.

- **UUID:** `checksum-response@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Checksum UUID | **Binary (16 bytes)** | The UUID from the corresponding `NETMSG_CHECKSUM_REQUEST`. |
| SHA256        | **Binary (32 bytes)** | The SHA256 checksum of the requested data. |

### NETMSG_CHECKSUM_ERROR

Sent by the client in response to `NETMSG_CHECKSUM_REQUEST` when an error occurred computing the checksum.

- **UUID:** `checksum-error@ddnet.tw`
- **Vital** : ✅
- **Sending Path** : Client -> Server

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Checksum UUID | **Binary (16 bytes)** | The UUID from the corresponding `NETMSG_CHECKSUM_REQUEST`. |
| Error Code    | **Integer** | Numeric error code. |

### NETMSG_REDIRECT

Sent by the server to redirect the client to a different server port.

- **UUID:** `redirect@ddnet.org`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Port          | **Integer** | Target port number for the redirect. |

### NETMSG_RCON_CMD_GROUP_START

Sent by the server to begin a group of rcon commands being sent to the client.

- **UUID:** `rcon-cmd-group-start@ddnet.org`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

***Empty payload***

### NETMSG_RCON_CMD_GROUP_END

Sent by the server to signal the end of a group of rcon commands.

- **UUID:** `rcon-cmd-group-end@ddnet.org`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

***Empty payload***

### NETMSG_MAP_RELOAD

Sent by the server to instruct the client to reload the current map.

- **UUID:** `map-reload@ddnet.org`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

***Empty payload***

### NETMSG_RECONNECT

Sent by the server to instruct the client to reconnect.

- **UUID:** `reconnect@ddnet.org`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

***Empty payload***

### NETMSG_MAPLIST_ADD

Sent by the server to add map names to the client's map list.

- **UUID:** `sv-maplist-add@ddnet.org`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Map Name 0    | **String** | First map name. |
| Map Name 1    | **String** | Second map name. |
| ...           | ...    | ... |

### NETMSG_MAPLIST_GROUP_START

Sent by the server to begin a group of map list entries.

- **UUID:** `sv-maplist-start@ddnet.org`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| Expected Entries | **Integer** | Total number of map list entries to expect. |

### NETMSG_MAPLIST_GROUP_END

Sent by the server to signal the end of a group of map list entries.

- **UUID:** `sv-maplist-end@ddnet.org`
- **Vital** : ✅
- **Sending Path** : Server -> Client

Structure:

***Empty payload***-->
