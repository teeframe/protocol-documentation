# Chunks Concept

This page describes the concept of chunks, their structure, when they should be sent, and how they are used in the protocol.

## Understanding Chunks

Each chunk has its header with chunk flags, a sequence number, a message ID, and a custom payload structure to follow. There are two types of chunks: **System Messages and Game Messages**. 

Fundamentally, they work in the same way. Theoretically, the System Messages are part of the server engine and do not know anything about the game context.

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