# Snap Structure

This page describes the snap structure, all kinds of snap structures, and their purpose. It also shows how to encode and decode strings in the snap structure.

## Snap Empty Structure

Snap Empty chunk have the following bytes structure:

```sh
// chunk header..
chunkByte[3-*] // Current Tick
chunkByte[*]   // Delta Tick
```

## Snap Single Structure

Snap Single chunk have the following bytes structure:

```sh
// chunk header..
chunkByte[3-*]   // Current Tick        - integer
chunkByte[*]     // Delta Tick          - integer
chunkByte[*]     // CRC                 - integer
chunkByte[*]     // Size                - integer
chunkByte[*]     // Removed Items Count - integer
chunkByte[*]     // Delta Items Count   - integer
chunkByte[*]     // Unused              - 00 
chunkByte[*-...] // Snap Items
```

:::info
Its recommended to check the [Snap Types](./../packets/default-packets.md#snap-types) section for more information about how these values.
:::

## Snap Slice Structure

Snap Slice chunk have the following bytes structure:

```sh
// chunk header..
chunkByte[3-*]   // Current Tick        - integer
chunkByte[*]     // Delta Tick          - integer
chunkByte[*]     // CRC                 - integer
chunkByte[*]     // Total Number        - integer
chunkByte[*]     // Current Number      - integer
chunkByte[*]     // Size                - integer
chunkByte[*]     // Removed Items Count - integer
chunkByte[*]     // Delta Items Count   - integer
chunkByte[*]     // Unused              - 00 
chunkByte[*-...] // Snap Items
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

## Encoding Strings To Snap Items

There is only one snap item that contains a string, the "**CLIENT INFO**". The way you encode strings to this snap is different from the default way to encode strings. You must first convert the string with a fixed size into multiple numbers.

You can find the implementation of the encoding and decoding of [the method here](https://github.com/teeworlds/teeworlds/blob/0.6/src/game/gamecore.h#L72-L104).