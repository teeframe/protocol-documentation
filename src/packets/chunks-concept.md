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

## Vital & Non-Vital Chunks

Whether a chunk is a game or system message, it can be vital or non-vital. **Vital chunks have a sequence number and must be received by the destination (and in order)**, while non-vital chunks are chunks that do not have a sequence number, and reaching the destination is not crucial.

You can find the chunks listing that are vital or non-vital in the [System Messages](./../chunks/system-messages.md) and [Game Messages](./../chunks/game-messages.md) pages.

:::info
***1.*** The sequence value is the number of vital chunks sent by the source to the destination + chunk position. 

***2.*** The sequence number of the last sent vital chunk should be the peer ACK (the ACK the destination uses to track how much vital chunks it received from you).
:::

## Chunks Queueing

Since multiple chunks can be added in a single packet, the server and the client should queue the chunks to be sent. When the chunk queue reaches the [packet size limit](./../fundamentals.md#size-limits), the queue must be processed. 

**Some chunks must be sent instantly, and when such a chunk is added to the queue, the entire queue must be processed.** You can find the chunks listing that must be sent instantly in the [System Messages](./../chunks/system-messages.md) and [Game Messages](./../chunks/game-messages.md) pages.

:::info
Every default packet has a maximum of 255 chunks regardless of the packet size limit.
:::

## Re-sending Chunks

Some times the internet connection can fail, and some [vital chunks](#vital-non-vital-chunks) may not be received by the destination. When that happens, the destination must send a packet with the [RESEND flag](./../fundamentals.md#packet-flags) and, as usual, the peer ACK number. 

The source will need to re-send all the chunks with a sequence number greater than the peer ACK number. The response packet must have a [RESEND flag](./../fundamentals.md#packet-flags) and all the chunks must also have a [RESEND chunk flag](./../chunks/chunk-structure.md#chunk-flags).

**For this to be done smoothly, you, as the client or server, must store all the vital chunks that you have sent.** You can remove the stored chunks according to the latest peer ack received and stored chunk sequence number.

## Input & Input Timing Chunks

[Input](./../chunks/system-messages.md#_16-netmsg-input) and [Input Timing](./../chunks/system-messages.md##_9-netmsg-inputtiming) chunks are one of the most important chunks in the game and therefore will be covered separately in this topic. 

The [Input](./../chunks/system-messages.md#_16-netmsg-input) chunk is sent by the client to the server and contains the tick value of the latest [snap chunk](./snaps-concept.md) received from the server (and, prediction tick, and player input's). **This value will be crucial used to calculate the [snap items difference](./snaps-concept.md#snap-payload).**

The [Input Timing](./../chunks/system-messages.md##_9-netmsg-inputtiming) chunk is sent by the server to the client as an answer to the [Input](./../chunks/system-messages.md#_16-netmsg-input) chunk. It contains the intended tick value sent by the client and the time left to the intended tick. **This chunk is used to adjust the client's prediction margin.**

As a server, you must use a queue to save all the inputs received from the client, and apply them when the server reaches the prediction tick. **You will also need to discard every input that is older than the biggest prediction tick received from the client.**

Below, you can find the explanation of particular values of both chunks that may be difficult to understand or calculate.

### Input particular values

- **Ack Game Tick** : the tick value from the last received snap chunk from the server.
- **Prediction Tick** : the tick of the server that the client is predicting.

### Input Timing particular values

- **Intended Tick** : the prediction tick value sent by the client.
- **Time Left** : the time left to the intended tick (in milliseconds).
<br><br>
:::info
By decoding these chunks, you can calculate the latency used by the "player info" snap item.
:::