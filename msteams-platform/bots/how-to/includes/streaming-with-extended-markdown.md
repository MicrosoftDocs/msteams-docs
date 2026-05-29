When streaming with extended Markdown, your bot can progressively send content that includes:

- **Callouts** (notes, warnings, tips): Render after the complete `> [!TYPE]` block is received
- **Math equations** (LaTeX/KaTeX): Inline math renders after the closing `$`, block math renders after the closing `$$`
- **Fenced blocks** (including custom fenced content): Render only after the closing ` ``` ` fence is received on its own line
- **Images and image URLs**: Render after the closing parenthesis of the image URL passes validation
- **Inline Adaptive Cards** (interactive elements): Render only when the complete card JSON fenced block is received; partial JSON is buffered
