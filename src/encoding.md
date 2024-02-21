# Encoding

Before deep diving in the fundamentals and protocol logic, it's important to understand how the data is encoded and decoded. This page explains how that works for integer, strings and explain the compression method used.

## Integer Packing

All numbers (integers) sent via the network are packed using a custom Teeworlds-specific packer. The numbers 0 to 63 remain unchanged. The encoding will differ if it exceeds 63 by switching to a variable-length format, meaning that the number has a variable number of bytes, and you will need to read multiple bytes to find it.

The encoding uses the second bit of the **first byte** to say if it is a positive or negative number. `1` indicates a negative number, while a `0` signifies a positive one. Furthermore, the first bit in **each byte** works as an extension indicator. A `1` in this position signals the presence of a subsequent byte, whereas a `0` marks the concluding byte of the sequence. 

Additionally, it's essential to recognize that the protocol employs a little-endian byte order, meaning the least significant bytes (LSB) are transmitted first and **you should read the bytes from right to left.** For instance, the number 64, the minimal positive integer necessitating two bytes, is encoded as `10000000 00000001`, which can be analyzed as:


```
10000000 00000001
^^^    ^ ^^     ^
||\   /  | \   /
|| \ / not  \ /
||  \ extended
||   \      /
||    \    /
||     \  /
||      \/
||      /\
||     /  \
||    /    \
|| 0000001 000000
||       |
||       v
||       64
||
|positive
extended
```

Here are some more examples of encoded numbers:

```sh
0   -> 00000000          // unchanged
1   -> 00000001          // unchanged
63  -> 00111111          // unchanged
64  -> 10000000 00000001 // extended
65  -> 10000001 00000001 // extended
-1  -> 01000000          // negative
-63 -> 01111110          // negative
-64 -> 01111111          // negative
-65 -> 11000000 00000001 // negative, extended
-66 -> 11000001 00000001 // negative, extended
```

You can observe that `01000000` is -1 and not -0, as negative zero does not exist. With that in mind, you can assume the packer encodes -64 to 63 in a single byte.

::: info
You can find a more technical explanation in the [ChillerDragon Teeworlds Protocol](https://chillerdragon.github.io/teeworlds-protocol/shared/int_packing.html).
:::

## String Packing

When strings are sent via the network, you don't need to worry about bits like numbers, only the bytes. They are sent as plain C strings. They do not contain a length and to identify their end, they must be null-terminated.

You can see an example of a encoded string "Hello" in hexadecimal:
```sh
48656c6c6f00 // 00 is the null terminator

H // 48
e // 65
l // 6c
l // 6c
o // 6f
```


## Huffman Compression

Packets can be compressed using Huffman compression. The Teeworlds packet header is never compressed, only its payload. The packet header sets a "COMPRESSION" flag if the payload is compressed. Technically every packet could be compressed or uncompressed.

Huffman compression is an algorithm that is not specific to Teeworlds. You can learn from any documentation, [like this Youtube video](https://www.youtube.com/watch?v=iiGZ947Tcck), to understand its fundamentals.

Huffman compression depends on a weight tree. So, to re-implement the Huffman yourself, you will need to use the same weight tree as the official Teeworlds. The official frequency table can be [found here](https://github.com/teeworlds/teeworlds/blob/26d24ec061d44e6084b2d77a9b8a0a48e354eba6/src/engine/shared/huffman.cpp#L7-L20).

:::info
You can learn more packet header and it payload in the [Fundamentals](./fundamentals.md) page.
:::