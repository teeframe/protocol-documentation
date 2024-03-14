# Snaps Concept

This page describes the concept of snaps, their structure, when snap items should be sent, and how they are used in the protocol.

## Understanding Snaps

Some of the system message chunks are called Snaps. **They are used by the server to send the Snap Items to the client.** One snap chunk can contain multiple snap items (or no items at all). 

Snap items represent the state of something in the game world, such as tees, projectiles, player info, game status, etc... **Every snap item has an item ID, ID, and a custom payload structure to follow. The item payload is ALWAYS made up of integers.**

## Delta Snap

Delta snap is a crucial concept for sending snap chunks correctly; that's why it will be explained first. The first snap chunk will send all snap items, **and when there is a delta snap, the server will send only the difference between the last snap and the delta snap (current game state).**  The delta snap will be set (by the server) when the client sends the [Input Chunk](./../packets/chunks-concept.md#input-input-timing-chunks) with the Ack Game Tick of some already sent snap.

Every snap chunk contains at least a current tick and delta tick value:

- **Current Tick** : the current tick of the server (returned by the client on input to set as delta snap).
- **Delta Tick** : the current tick - (the Ack Game Tick value from the last received [Input Chunk](./../packets/chunks-concept.md#input-input-timing-chunks), to the client which snap the server is using as delta).

:::info
Delta tick will be current tick - (-1) if there is no delta snap confirmed by the client.
:::

## Snap Types

There are three snap chunks: ***Snap Empty***, ***Snap Single***, and ***Snap Slice***. Snap Empty contains only the current and delta tick and is used when there are no items to send. At the same time, the other snaps contain extra data. **The default snap is the Snap Single**.

These data are CRC, removed items count, updated items count, and the snap payload:

- **CRC** : integer value that is used to check the integrity of the snap payload. 
- **Size** : the size of the snap chunk.¹
- **Removed Items Count** : amount of items that were removed compared to the [delta snap](#delta-snap). 
- **Updated Items Count** : amount of items updated (or added) compared to the [delta snap](#delta-snap). 

:::warning
The maximum size of a snap chunk payload is 900 bytes. **Removed Items Count and Updated Items Count** are part of the snap payload and it sizes must be considered - ¹also for the Size field.
:::

## Snap Payload

The snap payload sent by the server is not the list of items, as it depends on the context, the removed items count and updated items count.

When there are removed items, at the beginning of the snap payload, it will send all removed items `Item ID, ID` (not sending the item payload). When there are new items (counted as updated items), the server will send all items `Item Id, ID, Item Payload` right after the removed items data.

When there are updated items (not new items), the server will use the same format `Item Id, ID, Item Payload`. **However, the item payload will be the difference between the current state and the item state in the delta snap.** The server will loop all item payload integers to make the following difference:

```c
payloadInt[X] = payloadInt[X] - deltaPayloadInt[X]
```

:::info
***1.*** Note that to calculate the payload difference, the server will loop all item payload packet integers and NOT the item payload bytes.

***2.*** Difference Example : 
- Delta Item X Position : 50
- Current Item X Position : 10
- Final Payload X Position : -40 *(10 - 50)*
:::

## Snap Slice

Sometimes, you cannot fit all the payload in a Snap Single chunk due to the snap chunk payload size limit, so you need to split them into multiple snap slices (and multiple packets). **This is when the Snap Slice comes in.**

Snap Slice will be sent with the same current tick, delta tick, and CRC (but a different size). Multiple packets with a snap slice will be sent until the full payload (and items) are sent. The Snap Slice has two extra fields: **Total Number** and **Current Number**.

:::warning
1. **Removed Items Count and Updated Items Count** are part of the snap payload and must be sent only in the first Snap Slice.

2. The maximum amount of Snap Slices of a single snap payload is 64.
:::

## When to send Snaps

One crucial thing to understand is when you should send snap chunks. For that, you, as a server, will need to use a Snap State value for every client. The possible Snap State values are ***INIT***, ***FULL***, and ***RECOVER***. **Every new client will start with the ***INIT*** state.**

After the first received [Input Chunk](./../packets/chunks-concept.md#input-input-timing-chunks), the Snap State will change to ***FULL***. If the client does not send an [Input Chunk](./../packets/chunks-concept.md#input-input-timing-chunks) for ***3 seconds***, the Snap State will change to ***RECOVER***. Below, you can find the snap chunk sending frequency for each Snap State:

- **INIT** : Snap chunk every 10 ticks.
- **FULL** : Snap chunk every 1 tick (or every 2 ticks to save bandwidth).
- **RECOVER** : Snap chunk every 50 ticks.

:::info
The Snap State system is a way to not flood the client with snap chunks when it is not necessary. However, its not a rule, and you can implement your own system. 
:::

<!-- **Another important thing is to understand when you, as a server, should send certain snap items.** For that, on the [Snap Items](./../snap/snap-items.md) page, for each item there is a specification of when you should send it. -->

## Snap IDs

Every snap item, in addition to the item ID, has it own ID. **The ID is a unique identifier for the item in the current game context.** It is important to understand that every snap item will have a different way to have an ID assigned.

There are the following ways for a snap item to have an ID assigned:

- **None** : the ID will always be 0.
- **Connection** : the ID will be the connection index of the player (0 to 63).
- **Event** : the ID will be the index of the item in the event queue of the current snap. From 0 to 128 (this maximum value is not a rule).
- **Snap ID Pool** : the ID will obtained through a pool that controls busy and available ids from 0 to a maximum number of 16384 (16 * 1024).

:::info
You can find which way each snap item uses to have an ID assigned on the [Snap Items](./../snap/snap-items.md) page.
:::

## Calculating CRC

CRC (Cyclic Redundancy Check) is the value used to check the integrity of the snap payload. To calculate the snap CRC, you can implement the following pseudo-code:

```c
crc = 0

foreach (snapItems as snapItem) {
    itemPayload = snapItem->getPayload() // clone the payload on memory to not modify the original

    while (true) {
        extractInt = itemPayload->extractInt()

        if (extractInt == null) {
            break
        }

        crc += extractInt
    }
}

crc = toInt32(crc)
```

:::warning
The CRC result must be a signed 32-bit integer. You must ensure the correct overflow, as explained in the [Integer Overflow](./../fundamentals.md#integer-overflow) section.
:::

## String Packing To Snap Items

There is one snap item that contains a string, the ***CLIENT INFO***. The way you pack strings to this snap differs from the default since the snap payload can only contain integers.

You will need to convert the string with a fixed size into multiple integers using a specific method. You can find the implementation of the pack and unpack of [the method here](https://github.com/teeworlds/teeworlds/blob/0.6/src/game/gamecore.h#L72-L104). Or you can use the following pack pseudo-code:

```c
function convertCharsToIntArray(chars, intNum)
{
    integers   = array_fill(0, intNum, 0) // Creates a new array with intNum elements, filled with 0
    charsCount = count(chars)
    index      = 0

    for (i = 0; i < intNum; i++) {
        buffer = [0, 0, 0, 0]

        for (
            c = 0;
            c < 4 && index < charsCount;
            c++, index++
        ) {
            buffer[c] = chars[index + 1]
        }

        integers[i] = toInt32(
            ((buffer[0] + 128) << 24) | ((buffer[1] + 128) << 16) | ((buffer[2] + 128) << 8) | ((buffer[3] + 128) << 0)
        )
    }

    integers[num - 1] = toInt32(integers[num - 1] & 0xFFFF_FF00)

    return integers
}
```
:::info
**1.** Every integer can contain 4 characters of the string. With the exception of the last character of the last integer, that must be empty.

**2.** *Example:* if you pass intNum as 5, the maximum string size will be 19 (20 - 1) characters.
:::

:::warning
Every converted integer must be a signed 32-bit integer. You must ensure the correct overflow, as explained in the [Integer Overflow](./../fundamentals.md#integer-overflow) section.
:::