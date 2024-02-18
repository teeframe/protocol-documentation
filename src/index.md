# Introduction

This documentation describes the Protocol used at TeeFrame. It's based on the Teeworlds Protocol 0.6 + DDNet Extensions. Here, you will learn how all network-level communication is encoded and exchanged.

## The Protocol

The Teeworlds 0.6 protocol is a set of rules for the Teeworlds game to exchange data between the client and server over UDP. DDNet is the maintained fork of Teeworlds 0.6 and extends this protocol for extra features, such as extended GUI, extended server data and player listing, and others.

## What to Expect

All content written here aims to describe and exemplify how all communication works in a simplified and practical way. This documentation avoids technical terminology terms as much as possible.

It skips deprecated features and notes about past changes to the protocol. Also, if DDNet has implemented an enhanced way to send some data, the documentation will describe the enhanced one as the only way.

Although this documentation is based on an existing protocol and maintains its compatibility, the logic and naming of values are based on TeeFrame and may differ from the original Teeworlds 0.6 or DDNet.

## Credits

This documentation was created by [Miguilim](https://github.com/miguilimzero). The content is based on [ChillerDragon Teeworlds Protocol](https://chillerdragon.github.io/teeworlds-protocol/), [libtw2 docs](https://github.com/heinrich5991/libtw2/tree/master/doc), [Teeworlds 0.6 Source](https://github.com/teeworlds/teeworlds/tree/0.6), and [DDNet Source](https://github.com/ddnet/ddnet).