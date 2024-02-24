# Default Packets

This page describes the default packet structure (in-game packets), its header, and payload (chunks and snap chunks).

## Structure

Default packets have a header and payload in the following way:

```sh
byte[0]     // 6bit flags, 2bit ack
byte[1]     // 8bit ack
byte[2]     // chunks amount
byte[4-...] // chunks...
```

:::info
To extract Flags and ACK, you can follow the guide in the [Extracting Flags and ACK](../fundamentals.md#extracting-flags-and-ack) section.
:::

## Understanding Chunks

The payload of default packets (in-game packets) is composed of chunks. Each chunk has its header with chunk flags, a sequence number, a message ID, and a custom payload structure to follow.

There are two types of chunks: **System Messages and Game Messages**. Fundamentally, they work in the same way. Theoretically, the System Messages are part of the server engine and do not know anything about the game context.

::: details Quote from heinrich5991 about System vs Game Messages
- **ChillerDragon**: does someone know why there are system and game messages? I do not understand their difference.
- **heinrich5991**: *ChillerDragon*, the system messages are part of the engine and do not really know anything about the game
- **heinrich5991**: both snapshots and inputs are transmitted in a way that makes the engine more or less oblivious of its contents
:::

## Chunks Queueing

Since multiple chunks can be added in a single packet, the server and the client should queue the chunks to be sent. **Some chunks must be sent instantly, and when such a chunk is added to the queue, the entire queue must be processed instantly.**

You can find the chunks listing that must be sent instantly in the [System Messages](./../chunks/system-messages.md) and [Game Messages](./../chunks/game-messages.md) pages.

:::warning
Every default packet has a maximum of 255 chunks regardless of the sum of chunk sizes.
:::

## Re-sending Chunks

Some times the internet connection can fail, and some "VITAL" chunks may not be received by the destination. When that happens, the destination will send a packet with the "RESEND" flag and, as usual, the peer ACK number. 

The source will need to re-send all the chunks with a sequence number greater than the peer ACK number. The response packet will have a "RESEND" flag and all the chunks will also have a chunk flag "RESEND".

**For this to be done smoothly, you, as the client or server, must store all the vital chunks that you have sent.** You can remove the stored chunks according to the latest peer ack received and stored chunk sequence number.

## Input & Input Timing Chunks

"**INPUT**" and "**INPUT_TIMING**" chunks are one of the most important chunks in the game. They are used to send the player's input to the server and to synchronize the game state between the server and the client.

The "**INPUT**" chunk is sent by the client very often and contain all the player's input. The "**INPUT_TIMING**" chunk is sent by the server to the client as an answer. **Below, you can find the explanation of special fields that may be difficult to calculate.**

The "**INPUT**" have the following special values:

- **Ack Game Tick** : the last current tick received from a snap chunk from the server.
- **Prediction Tick** : the tick of the server that the client is predicting (based on the tick difference between last snap and the snap before the last one).

The "**INPUT_TIMING**" chunk have the following special values:

- **Intended Tick** : the prediction tick value sent by the client.
- **Time Left** : the time left to the intended tick (in milliseconds).

As a server, you will need to use a queue to save all the inputs received from the client, and apply them when the server reaches the prediction tick. **You will also need to discard every input that is older than the biggest prediction tick received from the client.**

:::info
By decoding these chunks, you can calculate the latency used by the "player info" snap item.
:::

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

### When to send Snaps

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

### Calculating CRC

To calculate the snap chunk CRC you can use the following pseudo-code:

```c
crc = 0

foreach (snapItems as snapItem) {
    itemPayload = snapItem->getPayload()

    for (i=0; i < countBytes(itemPayload); i++) { 
        crc += itemPayload[i]
    }
}
```