# Fundamentals

By learning how the data is encoded and decoded, you can understand how the fundamentals of packets work. Here, you will understand the basic structure of the packets and the main points in sending and receiving them. **By understanding these two pages, things will get easier.**

## Packet Flags

Flags are used to define the type of packet and extra information. The flag value is present in the packet header of every kind of packet. Every flag can be combined with other flags, and the packet header will have a single byte to store all flags.

The available flags are:

| Value    | Name                      |
| -------- | :-----------------------: |
| 1        | FLAG_TYPE_CONTROL         | 
| 2        | FLAG_TYPE_CONNECTION_LESS |
| 4        | FLAG_RESEND               |
| 8        | FLAG_COMPRESSION          |
<!-- | 16       | FLAG_SECURITY_TOKEN       | -->

## Sequence Number

The protocol uses a sequence number on the packet header to ensure that packets are received in the correct order. You will see this number as ACK (Acknowledged sequence number) on this documentation from now on.

The ACK number defines how many [vital chunks](#default-packets) were successfully received. As a server, you will have an ACK number to track how many vital chunks you received from the client, and the client will have an ACK number to track how many vital chunks it received from you (the server).

:::info
Sequence Number does not apply for [Connection-less Packets](#connection-less-messages).
:::
:::warning
ACK is reset to 0 every time it reaches the maximum value (1024).
:::

<!-- ## Security Token

Every game related packet has a packet header with a security token field. When the client sends the first packet to connect to the server, the serve will send a response with a new generated security token. From now on, **the client and the server** will use this security token to send and receive packets. This token is used to prevent spoofing attacks.

The security token is a 4-byte value randomly generated. You can just generate 4 random bytes, or 4 random numbers from 0 to 255 and encode them later.

:::info
Security token does not apply for [Connection-less Packets](#connection-less-messages).
::: -->


## Packet Types

The protocol has three types of packets: control messages, connection-less messages, and default packets. Each of them has its purpose and its own header and structure.

### Connection-less Messages

These packets are used to send information to the server without establishing a connection. They are used for server discovery and server information. The connection can send a connection-less packet to check if a server is online, and the server can send a connection-less packet to answer with its information (name, map name, player list, etc.).

### Control Messages

These packets are used to establish and maintain the connection. They are utilized to connect, disconnect, and keep the connection alive. Control Messages are a type of packet with a simple structure and are not related to the game itself but to the connection.

### Default Packets

These packets are used to send game-related information. They are utilized to send and receive game data, such as player input, game state, and other game-related information. **Every default packet may contain multiple data, and each data is called "chunk".**

:::info
Each chunk have it chunk flags, message id, sequence number, and payload. "VITAL" is one of the chunk flags. You can read more about in the [Chunk Structure](./chunks/chunk-structure.md) page.
:::

## Size Limits

The protocol has some size limits. The maximum size of any kind of packet is 1400 bytes. **This size includes the packet header and the packet payload.**

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