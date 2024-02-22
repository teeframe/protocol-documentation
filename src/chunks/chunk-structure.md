# Chunk Structure

This page describes the chunk structure (vital and non-vital), its header, and payload. It also lists the chunk flags and explains how to decode and encode the chunk header.

## Chunk Flags

The available chunk flags are:

| Value    | Final Value | Name                      |
| -------- | ----------- | :-----------------------: |
| 1 << 0   | 1           | FLAG_VITAL                |
| 1 << 1   | 2           | FLAG_RESEND               |

## Vital Chunk Structure

Vital chunks have the following bytes structure:

```sh
chunkByte[0]    // 2bit flags, 6bit size
chunkByte[1]    // 4bit size, 4bit sequence
chunkByte[2]    // 8bit sequence
chunkByte[3]    // message id
chunkByte[4...] // payload   
```

## Non-Vital Chunk Structure

Non-vital chunks have the following bytes structure:

```sh
chunkByte[0]    // 2bit flags, 6bit size
chunkByte[1]    // 4bit size, 4bit unused
chunkByte[2]    // message id
chunkByte[3...] // payload
```

## Decoding/Encoding Chunk Header

One more time, there is a situation where the header information is "mixed" into multiple bytes, now with the chunk header with 2-3 bytes.

To decode the chunk header, you can implement the following pseudo-code:

```c
flags = (chunkByte[0] >> 6) & 3
size = (chunkByte[0] & 0x3F) << 4 | (chunkByte[1] & 0xF)

// only for vital chunks
sequence = ((chunkByte[1] & 0xF0) << 2) | chunkByte[2]

// byte position depends on the chunk type (non-vital or vital)
message = chunkByte[2 or 3] >> 1

isSystem = chunkByte[2 or 3] & 1
```

To encode the chunk header, you can implement the following pseudo-code:

```c
chunkByte[0] = ((flags & 3) << 6) | ((size >> 4) & 0x3F)
chunkByte[1] = (size & 0xF)

// only for vital chunks
chunkByte[1] |= (sequence >> 2) & 0xF0
chunkByte[2] = sequence & 0xFF

// byte position depends on the chunk type (non-vital or vital)
chunkByte[2 or 3] = (message << 1) | isSystem
``` 

:::info
You need to use `isSystem` to differentiate between system and game messages, as they have the same IDs. You can do that by checking if the last bit of the message byte is 1 as exemplified. 
:::