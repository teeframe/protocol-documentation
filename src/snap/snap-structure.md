# Snap Structure

This page describes the snap structure, all kinds of snap structures, and their purpose. It also shows how to encode and decode strings in the snap structure.

## Snap Empty Structure

Snap Empty chunk have the following bytes structure:

```sh
// chunk header...
chunkByte[3-*] // current tick - integer
chunkByte[*]   // delta tick   - integer
```

## Snap Single Structure

Snap Single chunk have the following bytes structure:

```sh
// chunk header...
chunkByte[3-*]   // current tick - integer
chunkByte[*]     // delta tick   - integer
chunkByte[*]     // crc          - integer
chunkByte[*]     // payload size - integer
chunkByte[*-...] // snap payload (variable-int compressed)
```

The snap payload, after variable-int decompression, contains:

```sh
int[0]           // removed items count - integer
int[1]           // updated items count - integer
int[2]           // unused              - integer (always 0)
int[3-*]         // removed item keys   - integers (one per removed item)
int[*-...]       // item deltas
```

### Removed Items

Each removed item is identified by its **item key** — a single packed integer computed as `(type_id << 16) | id`.

### Item Deltas

Each item delta (new or updated) has the following structure:

```sh
int[0]           // type_id - packed integer
int[1]           // id      - packed integer
int[2]           // _size   - packed integer (only present if type has no pre-agreed size)
int[3-*]         // data    - packed integers (item-specific fields)
```

For updated items, the data contains the **difference** (delta) between the new and old item values, computed element-wise using wrapping 32-bit integer subtraction. For new items, the data contains the full item values.

:::info
It is recommended to check the [Snap Types](./../packets/snaps-concept.md#snap-types) section for more information about these values.
:::

## Snap Slice Structure

Snap Slice chunk have the following bytes structure:

```sh
// chunk header...
chunkByte[3-*]   // current tick        - integer
chunkByte[*]     // delta tick          - integer
chunkByte[*]     // crc                 - integer
chunkByte[*]     // total number        - integer
chunkByte[*]     // current number      - integer
chunkByte[*]     // size                - integer
chunkByte[*]     // removed items count - integer
chunkByte[*]     // updated items count - integer
chunkByte[*]     // unused              - integer (0) 
chunkByte[*-...] // snap payload
```

:::info
Snap Slice has a particular way to send the Snap Items. Check the [Snap Slice](./../packets/snaps-concept.md#snap-slice) section for more information.
:::

## Snap Item Structure

Each snap item uses variable-length integer packing for all fields:

```sh
itemByte[*-...]  // item type - packed integer
itemByte[*-...]  // item id   - packed integer
itemByte[*-...]  // item-specific payload - packed integers
```

<!--## Snap Item Structure (DDNet Specific)

DDNet extends the snap protocol with UUID-based item types that go beyond the fixed numeric range. These items use a two-item pattern in the snap payload: a type-definition item that carries the 16-byte UUID, followed by the actual data item that references it.

### Type Byte Ranges

| Byte Range       | Meaning |
| ---------------- | :------ |
| `0` to `0x3FFF` | Fixed vanilla item types (e.g. `NETOBJTYPE_PROJECTILE`, `NETOBJTYPE_CHARACTER`). |
| `0x4000` to `0x7FFF` | Per-snapshot internal type IDs. Assigned dynamically by the server each time it builds a snapshot. These are not shared between snapshots and do not correspond to any fixed type. |
| `OFFSET_UUID` (`0x10000`) and above | External UUID-based type IDs. These are globally known to both client and server and are mapped at connection time. |

### Two-Item Pattern

Each UUID-based item in the snap payload consists of two consecutive items:

**1. Type-definition item**

```sh
itemByte[0]  // type - integer (0 = NETOBJTYPE_EX)
itemByte[1]  // id   - integer
itemByte[2]  // uuid part 0
itemByte[3]  // uuid part 1
itemByte[4]  // uuid part 2
itemByte[5]  // uuid part 3
             //      └─ 16-byte UUID packed as 4 x int32 ─┘
```

**2. Data item**

```sh
itemByte[0]  // type - integer (the same internal id from step 1)
itemByte[1]  // id   - integer (the item instance id)
itemByte[2-*] // item-specific payload (integers)
```

### Example

Sending a `NETOBJTYPE_DDNETCHARACTER` item for client `5`:

```sh
// --- Type-definition item ---
itemByte[0]  // type = 0 (NETOBJTYPE_EX)
itemByte[1]  // id   = 0x4001 (assigned internal type id)
itemByte[2]  // uuid bytes 0-3  (big-endian int32)
itemByte[3]  // uuid bytes 4-7  (big-endian int32)
itemByte[4]  // uuid bytes 8-11 (big-endian int32)
itemByte[5]  // uuid bytes 12-15 (big-endian int32)

// --- Data item ---
itemByte[0]  // type = 0x4001 (same internal type id)
itemByte[1]  // id   = 5 (client id)
itemByte[2-*] // DDNetCharacter payload fields
```

### UUID Generation

Each UUID string is hashed into a 16-byte UUIDv3 and used to identify item types on the wire.

:::info
For details on how UUID strings are hashed into UUIDv3 values and how the UUID registration system works, see the [DDNet Specific Messages & Snap Items](./../fundamentals.md#ddnet-specific-messages-snap-items) section in the Fundamentals page.
:::

### Decoding Process

To resolve extended items from a snap on the client side:

1. Scan all items where `type == 0` and `id >= OFFSET_UUID_TYPE` — these carry UUIDs.
2. For each one, reassemble the 4 payload integers into a 16-byte big-endian UUID.
3. Look up the UUID in the UUID manager to obtain the external numeric type.
4. All subsequent items whose `type` matches the internal id found in step 1 are of the resolved external type. Decode their payload using that type's item structure.-->
