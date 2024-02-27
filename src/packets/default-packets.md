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

## Chunks & Snap Chunks

The payload of default packets is composed of chunks and snap chunks. Every chunk is a piece of data. Snap Chunks are special chunks containing multiple snap items, which are game state information. **These are the main pillars of the protocol.**



As there was a lot of information to consider, it was divided into two pages: [Chunks Concept](./chunks-concept.md) and [Snaps Concept](./snaps-concept.md).