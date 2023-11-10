import { describe, expect, it } from "vitest";

import { parseComplexString } from "./parser";

describe("parser", () => {
  it("parseComplexString", () => {
    const inputText = `Prompt: xxxx,(xxxx xxxx:1.1),(xxxx:1.2)
BREAK
xxxx,
Negative Prompt: xxxx,xxxxx,xxx
Fooocus V2 Expansion: xxxx,xxxxx,xxx
Styles: ['xxxxx', 'xxxxx'], Performance: xxxx
Resolution: (123, 456), Sharpness: 2
Guidance Scale: 7, ADM Guidance: (1.2, 3.4)
Base Model: xxxxxx, Refiner Model: Xxxx
Sampler: xxxxx, Scheduler: xxxxx
Seed: 123456, LoRA [xxxxxxxxx] weight: 0.1`;

    const expectedResult = {
      "Prompt": `xxxx,(xxxx xxxx:1.1),(xxxx:1.2)
BREAK
xxxx,`,
      "Negative Prompt": "xxxx,xxxxx,xxx",
      "Fooocus V2 Expansion": "xxxx,xxxxx,xxx",
      "Styles": ["xxxxx", "xxxxx"],
      "Performance": "xxxx",
      "Resolution": [123, 456],
      "Sharpness": 2,
      "Guidance Scale": 7,
      "ADM Guidance": [1.2, 3.4],
      "Base Model": "xxxxxx",
      "Refiner Model": "Xxxx",
      "Sampler": "xxxxx",
      "Scheduler": "xxxxx",
      "Seed": 123456,
      "LoRA [xxxxxxxxx] weight": 0.1,
    };

    expect(parseComplexString(inputText)).toEqual(expectedResult);
  });
});
