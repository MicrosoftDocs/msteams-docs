The agent message size limit is 100 KB. This is an approximate limit because it includes the message itself (text, image links, etc.), @-mentions, and reactions encoded as UTF-16. The 100 KB size limitation doesn't include base64 encoded images. During implementation, ensure that the size of the message itself is within 80 KB to guarantee successful message delivery.

If the agent message exceeds the size limit, the agent receives a `413` status code (`RequestEntityTooLarge`), which contains the error code `MessageSizeTooBig`.
