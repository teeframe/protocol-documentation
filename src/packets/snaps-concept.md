# Snaps Concept

## Understanding Snaps

Some of the system message chunks are called Snaps. **They are used by the server to send the Snap Items to the client.** One snap chunk can contain multiple snap items (or no items at all). Snap items represent the state of something in the game world, such as tees and projectiles.

Every snap chunk contains at least a current tick and delta tick value:

- **Current Tick** : the current tick of the server.
- **Delta Tick** : the current tick - (the Ack Game Tick value from the last received "**INPUT**" chunk).

:::info
Delta tick will be current tick - (-1) if the server has not received any previous "**INPUT**" chunk from the client.
:::

## Snap Types

There are three types of snap chunks: **Snap Empty, Snap Single, and Snap Slice**. Snap Empty contains only the current and delta tick and is used when there are no items to send. While the other snaps contains extra data. **The default snap is the Snap Single.**

These data are CRC, a removed items count, a updated items count, and one or multiple snap items. Every snap item has an item ID, ID, and a custom payload structure to follow.

- **CRC** : integer value that is used to check the integrity of the snap chunk. 
- **Size** : the size of the snap chunk.*
- **Removed Items Count** : amount of items that were removed compared to the last snap. 
- **Updated Items Count** : amount of items updated (or added) compared to the last snap. 

:::warning
The maximum size of a snap chunk payload is 900 bytes. **Removed Items Count and Updated Items Count** are part of the snap payload and it sizes must be considered - *also for the Size field.
:::

### Snap Slice

Sometimes you cannot fit all the items in a single snap chunk due to the snap chunk payload size limit, so you need to split them into multiple snap slices (and multiple packets). **This is when the Snap Slice comes in.**

Snap Slice will be sent with the same current tick, delta tick, and CRC. Multiple packets with a snap slice will be sent until full payload (and items) are sent. The Snap Slice has two extra fields: **Total Number** and **Current Number**.

:::warning
1. **Removed Items Count and Updated Items Count** are part of the snap payload and must be sent only in the first Snap Slice.

2. The maximum amount of Snap Slices of a single snap payload is 64.
:::

## When to send Snaps

One crucial thing to understand is when you should send snap chunks. For that, you, as a server, will need to use a Snap State value for every client. The possible Snap State values are "INIT", "FULL" and "RECOVER". **Every new client will start with the "INIT" state.**

After the first "INPUT" chunk received, the Snap State will change to "FULL". If the client do not send a "INPUT" chunk for ***3 seconds***, the Snap State will change to "RECOVER". Below you can find the snap chunk sending frequency for each Snap State:

- **INIT** : Snap chunk every 10 ticks.
- **FULL** : Snap chunk every 1 tick (or every 2 ticks to save bandwidth).
- **RECOVER** : Snap chunk every 50 ticks.

:::info
The Snap State system is a way to not flood the client with snap chunks when it is not necessary. However, its not a rule, and you can implement your own system. 
:::

**Another important thing is to understand when you, as a server, should send certain snap items.** For that, on the [Snap Items](./../snap/snap-items.md) page, for each item there is a specification of when you should send it.

## String Packing To Snap Items

There is only one snap item that contains a string, the "**CLIENT_INFO**". The way you pack strings to this snap is different from the default way. You will need to convert the string with a fixed size into multiple integers.

You can find the implementation of the pack and unpack of [the method here](https://github.com/teeworlds/teeworlds/blob/0.6/src/game/gamecore.h#L72-L104).

## Calculating CRC

To calculate the snap chunk CRC you can use the following pseudo-code:

```c
crc = 0

foreach (snapItems as snapItem) {
    itemPayload = snapItem->getPayload() // clone the payload on memory to not modify the original

    while (true) {
        extractInt = itemPayload->extractInt()

        if (extractInt == -1) {
            break
        }

        crc += extractInt
    }
}
```