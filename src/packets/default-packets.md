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
Every default packet has a maximum of 65 chunks regardless of the sum of chunk sizes.
:::

## Understanding Snaps

Some of the system message chunks are called Snaps. **They are used by the server to send the Snap Items to the client.** One snap chunk can contain multiple snap items. Snap items represent the state of something in the game world, such as tees and projectiles.

Every snap chunk contains CRC, removed items count, and an items count. Every snap item has an item ID, ID, and a custom payload structure to follow.

:::info
CRC is a integer value that is used to check the integrity of the snap chunk.
:::