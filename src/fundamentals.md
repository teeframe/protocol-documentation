# Fundamentals

By learning how the data is encoded and decoded, you can understand how the fundamentals of packets work. Here, you will understand the basic structure of the packets and the main points in sending and receiving them. **By understanding these two pages, things will get easier.**

## Packet Flags

Flags are used to define the type of packet and extra information. The flag value is present in the packet header of every kind of packet. Every flag can be [combined with others](#combining-flags).

The available flags are:

| Value    | Final Value | Name                      |
| -------- | ----------- | :-----------------------: |
| 1 << 0   | 1           | FLAG_TYPE_CONTROL         | 
| 1 << 1   | 2           | *Unused¹* |
| 1 << 2   | 4           | FLAG_RESEND               |
| 1 << 3   | 8           | FLAG_COMPRESSION          |
<!-- | 16       | FLAG_SECURITY_TOKEN       | -->

:::info
***1.*** The flag of final value "2" is to identify connection-less messages, but TeeFrame does not implement them and discards all connection-less packets.
:::

## Sequence Number

The protocol uses a sequence number on the packet header to ensure that packets are received in the correct order. **You will see this number as ACK (Acknowledged sequence number) on this documentation from now on.**

The ACK number defines how many [vital chunks](#default-packets) were successfully received. As a server, you will have an ACK number to track how many vital chunks you received from the client, and the client will have an ACK number to track how many vital chunks it received from you (the server).

**The ACK number has a maximum value of 1024. The number value must be reset to 0 every time it reaches its maximum.** As this number resets, you must implement a method that checks whether a certain value compared to the ACK is currently in the backroom.

:::info
Backroom is a method to handle sequence number rollover, ensuring accurate tracking and acknowledgment of packets when ACK reset after reaching their maximum value.
:::

<!-- ## Security Token

Every game related packet has a packet header with a security token field. When the client sends the first packet to connect to the server, the serve will send a response with a new generated security token. From now on, **the client and the server** will use this security token to send and receive packets. This token is used to prevent spoofing attacks.

The security token is a 4-byte value randomly generated. You can just generate 4 random bytes, or 4 random numbers from 0 to 255 and encode them later.-->


## Packet Types

The protocol has two types of packets: control messages and default packets. Each of them has its purpose and its own header and structure.

<!-- ### Connection-less Messages

These packets are used to send information to the server without establishing a connection. They are used for server discovery and server information. The connection can send a connection-less packet to check if a server is online, and the server can send a connection-less packet to answer with its information (name, map name, player list, etc.). -->

### Control Messages

These packets are used to establish and maintain the connection. They are utilized to connect, disconnect, and keep the connection alive. Control Messages are a type of packet with a simple structure and are not related to the game itself but the connection.

### Default Packets

These packets are used to send game-related information. They are utilized to send and receive game data, such as player input, game state, and other game-related information. **Every default packet may contain multiple data, and each data is called "chunk".**

:::info
Each chunk have it chunk flags. "VITAL" is one of the chunk flags. This is explained on [Default Packets](./packets/default-packets.md), [Chunk Concept](./packets/chunk-concepts.md). and [Chunk Structure](./chunks/chunk-structure.md) page.
:::

## Tick System

Like any type of game, your implementation must have a tick system. **The only supported tick rate is 50 ticks per second.** 

The minimum and maximum tick number supported is 0 and 0x6FFFFFFF (1879048191). After reaching the maximum, you will need to restart your implementation entirely.

## Size Limits

The protocol has some size limits. The maximum size of any kind of packet is 1400 bytes. **This size includes the packet header and the packet payload.**

## Combining Flags

Since flags are not mutually exclusive states, you can combine flags using bitwise operations. For example, to combine the `FLAG_TYPE_CONTROL` and `FLAG_COMPRESSION` flags, you can implement the following pseudo-code:

```c
FLAG_TYPE_CONTROL = 1 << 0
FLAG_COMPRESSION = 1 << 3

flags = FLAG_TYPE_CONTROL | FLAG_COMPRESSION
```

## Extracting Flags and ACK

Control Messages and Default Packets have in common the presence of Flags and ACK. However, this information is "mixed" into two bytes of the packet header, as follows:

```sh
byte[0]     // 6bit flags, 2bit ack
byte[1]     // 8bit ack
byte[2-...] // packet...
```

The first byte contains the flags and the first 2 bits of the ACK number. The second byte contains the remaining 8 bits of the ACK number (totalizing 10 bits). To extract the flags and the ACK number, you can implement the following pseudo-code:

```c
flags = byte[0] >> 4
ack = (byte[0] & 0x0F) << 8 | byte[1]
```