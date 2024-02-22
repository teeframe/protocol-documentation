# Naming Changes

This page lists the differences between the original Teeworlds 0.6 + DDNet Extensions implementation and the TeeFrame implementation.

## Terms Differences

| Original | TeeFrame |
| :------------: | :------------: |
| Snap Empty | Snap Empty |
| Snap Single | Snap Single |
| Snap | Snap Slice |

## Packet Flags

| Original Name | TeeFrame Name |
| :------------: | :------------: |
| NET_PACKETFLAG_CONTROL | FLAG_TYPE_CONTROL |
| NET_PACKETFLAG_CONNLESS | FLAG_TYPE_CONNECTION_LESS |
| NET_PACKETFLAG_RESEND | FLAG_RESEND |
| NET_PACKETFLAG_COMPRESSION | FLAG_COMPRESSION |

## Chunk Flags

| Original Name | TeeFrame Name |
| :------------: | :------------: |
| NET_CHUNKFLAG_VITAL | FLAG_VITAL |
| NET_CHUNKFLAG_RESEND | FLAG_RESEND |
