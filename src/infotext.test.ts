import { describe, expect, it } from "vitest";
import { convertInfotextObject, getInfotext } from "./infotext";

describe("infotext", () => {
  it("convertInfotextObject", () => {
    const input = {
      "Prompt": "xxxx,(xxxx xxxx:1.1),(xxxx:1.2)",
      "Negative Prompt": "xxxx,(xxxx xxxx:1.1),(xxxx:1.2)",
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

    const expectedOutput = {
      "Prompt": "xxxx,(xxxx xxxx:1.1),(xxxx:1.2)",
      "Negative prompt": "xxxx,(xxxx xxxx:1.1),(xxxx:1.2)",
      "Sampler": "xxxxx",
      "Model": "xxxxxx",
      "Refiner": "Xxxx",
      "CFG scale": 7,
      "Seed": 123456,
      "Size": "123x456",
    };

    expect(convertInfotextObject(input)).toEqual(expectedOutput);
  });

  it("getInfotext", () => {
    const input = {
      "Prompt": "xxxx,(xxxx xxxx:1.1),(xxxx:1.2)",
      "Negative prompt": "xxxx,(xxxx xxxx:1.1),(xxxx:1.2)",
      "Sampler": "xxxxx",
      "Model": "xxxxxx",
      "Refiner": "Xxxx",
      "CFG scale": 7,
      "Seed": 123456,
      "Size": "123x456",
    };

    const expectedInfotext = `xxxx,(xxxx xxxx:1.1),(xxxx:1.2)
Negative prompt: xxxx,(xxxx xxxx:1.1),(xxxx:1.2)
Sampler: xxxxx, Model: xxxxxx, Refiner: Xxxx, CFG scale: 7, Seed: 123456, Size: 123x456`;

    expect(getInfotext(input)).toEqual(expectedInfotext);
  });
});
