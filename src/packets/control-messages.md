# Control Messages

This section describes the control messages structure, all kind of control messages available and its purpose.

## Structure

Control messages have simple structure packet structure. They have a header and payload in the following way:

```sh
byte[0]     // 6bit flags, 2bit ack
byte[1]     // 8bit ack
byte[2]     // unused - 00
byte[3-6]   // security token
byte[7]     // message id
byte[8-...] // extra data
```

### Extracting Flags and ACK

## Messages

| Message ID    | Name                            |
| ------------- | :-----------------------------: |
| 0             | [KEEP_ALIVE](#keep-alive)         | 
| 1             | [CONNECT](#connect)             |
| 2             | [CONNECT_ACCEPT](#connect-accept) |
| 3             | *Unused*                        |
| 4             | [CLOSE](#close)                 |

### KEEP_ALIVE

### CONNECT

### CONNECT_ACCEPT

### CLOSE
