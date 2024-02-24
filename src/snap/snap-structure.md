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
chunkByte[3-*]   // current tick        - integer
chunkByte[*]     // delta tick          - integer
chunkByte[*]     // crc                 - integer
chunkByte[*]     // size                - integer
chunkByte[*]     // removed items count - integer
chunkByte[*]     // updated items count - integer
chunkByte[*]     // unused              - integer (0)  
chunkByte[*-...] // snap items
```

:::info
It is recommended to check the [Snap Types](./../packets/default-packets.md#snap-types) section for more information about these values.
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
chunkByte[*-...] // snap items
```

:::info
Snap Slice has a particular way to send the Snap Items. Check the [Snap Slice](./../packets/default-packets.md#snap-slice) section for more information.
:::

## Snap Item Structure

Snap Item have the following bytes structure:

```sh
itemByte[0]     // Item ID
itemByte[1]     // ID
itemByte[2-...] // Payload
```