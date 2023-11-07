export type FooocusLogObject = {
  "Prompt": string;
  "Negative Prompt": string;
  "Fooocus V2 Expansion": string;
  "Styles": string[];
  "Performance": string;
  "Resolution": number[];
  "Sharpness": number;
  "Guidance Scale": number;
  "ADM Guidance": number[];
  "Base Model": string;
  "Refiner Model": string;
  "Sampler": string;
  "Scheduler": string;
  "Seed": number;
  "LoRA [xxxxxxxxx] weight": number;
};

type InfotextObject = {
  "Prompt": string;
  "Negative prompt": string;
  "Sampler": string;
  "Model": string;
  "Refiner": string;
  "CFG scale": number;
  "Seed": number;
  "Size": string;
};

export const convertInfotextObject = (
  input: FooocusLogObject,
): InfotextObject => {
  const output: InfotextObject = {
    "Prompt": input["Prompt"],
    "Negative prompt": input["Negative Prompt"],
    "Sampler": input["Sampler"],
    "Model": input["Base Model"],
    "Refiner": input["Refiner Model"],
    "CFG scale": input["Guidance Scale"],
    "Seed": input["Seed"],
    "Size": `${input["Resolution"][0]}x${input["Resolution"][1]}`,
  };

  return output;
};

export const getInfotext = (input: InfotextObject): string => {
  const lines = [
    input["Prompt"],
    `Negative prompt: ${input["Negative prompt"]}`,
    `Sampler: ${input["Sampler"]}, Model: ${input["Model"]}, Refiner: ${
      input["Refiner"]
    }, CFG scale: ${input["CFG scale"]}, Seed: ${input["Seed"]}, Size: ${
      input["Size"]
    }`,
  ];

  return lines.join("\n");
};
