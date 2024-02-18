# Introduction

This documentation describes the Protocol used at TeeFrame. It's based on the Teeworlds Protocol 0.6 + DDNet Extensions. Here you will learn how all network-level communication are encoded and exchanged.

## The Protocol

The Teeworlds 0.6 protocol is a set of rules for the Teeworlds game to exchange data between the client and server over UDP. DDNet is the maintained fork of Teeworlds 0.6 and extends this protocol for extra features, such as extended gui, extended server data and player listing, and others.

## What to Expect

All content written here aims to describe and exemplify in a high-level and practical way how all the communication works. This documentation avoid technical terminology terms as much as possible.

The documentation skips deprecated features and notes about past changes to the protocol. This also means if DDNet implemented a enhanced way to send some data, the documentation will describe the enhanced one as the only way.

Although this documentation is based on an existing protocol and maintains it compatibility, the logic and naming of values is based on the TeeFrame and may be different from the original Teeworlds 0.6 or DDNet.

## Credits

This documentation was created by [Miguilim](https://github.com/miguilimzero). The content is based on [ChillerDragon Teeworlds Protocol](https://chillerdragon.github.io/teeworlds-protocol/), [libtw2 docs](https://github.com/heinrich5991/libtw2/tree/master/doc), [Teeworlds 0.6 Source](https://github.com/teeworlds/teeworlds/tree/0.6), and [DDNet Source](https://github.com/ddnet/ddnet).