# Base Alchemy

### Features

1. Signed vs Unsigned Toggle (2's Complement): `11111111` is `-1` in signed and `255` in unsigned format.
2. Step by Step conversion breakdown:
   ```
   0x2F
   = 2 × 16¹ + 15 × 16⁰
   = 32 + 15
   = 47
   ```
   - make it optional (collapsable)
3. Error-Aware Input - ex: `Digit '8' is not allowed in base-8`.
4. Type Once - see binary, octal, decimal and hex update instantly. (change one everyother updates)

5. BIIWISE Playground -
   AND / OR / XOR
   Shift left / right
   Rotate bits
   Shift left /Documents and SettingsLive preview in all bases.

> Suddenly it’s a bit lab, not a converter.

6. Sharable links: tool’s entire state (number, base, options) is encoded into the URL.

```
?hex=FF
?bin=101101
?dec=255
```

If URL has invalid data: `?bin=102101`

Show: “Invalid binary digit at position 3”, No silent failures.

Advanced: `?value=FF&base=16&bits=32&signed=true&theme=dark`

> NOTE: It's going to be vanilla JS project, NO react bs. (when it's not needed)
