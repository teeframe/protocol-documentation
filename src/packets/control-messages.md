# Control Messages

This page describes the control messages packet structure, all kind of control messages available and its purpose.

## Structure

Control messages packet have a simple structure structure. They have a header and payload in the following way:

```sh
byte[0]     // 6bit flags, 2bit ack
byte[1]     // 8bit ack
byte[2]     // unused - 00
byte[3]     // message id
byte[4-...] // extra data
```
Extra data is a optional string that may be present in some control messages, like reason for disconnection (ex. player banned).

:::info
To extract Flags and ACK, you can follow the guide in the [Extracting Flags and ACK](../fundamentals.md#extracting-flags-and-ack) section.
:::

## Messages

| Message ID    | Name                            |
| ------------- | :-----------------------------: |
| 0             | [KEEP_ALIVE](#0-keep-alive)         | 
| 1             | [CONNECT](#1-connect)             |
| 2             | [CONNECT_ACCEPT](#2-connect-accept) |
| 3             | *Unused*                        |
| 4             | [CLOSE](#4-close)                 |

### 0 - KEEP_ALIVE

This message is used to keep the connection alive. The client sends it to the server to avoid the connection being dropped. It contains no extra data. It is usually sent every 250ms by the client **if no other packet is sent.**

### 1 - CONNECT

This message is the very first packet the is sent by the client to initiate a new connection with the server. It contains no relevant information and no extra data, is just the first step to establish the connection.

### 2 - CONNECT_ACCEPT

This message is the response to the "CONNECT" message and confirms the server received the initial message. There is also no extra data in this message.

### 4 - CLOSE

This message is used to cleanly terminate connections. This can be sent by the client on disconnect or by server the on shutdown (or ban). The extra field can be used to send a reason for disconnection, like "Banned" or "Server shutting down".
