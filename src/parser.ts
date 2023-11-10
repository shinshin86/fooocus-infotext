export type ParsedData = {
  [key: string]:
    | string
    | string[]
    | number
    | number[]
    | {
      [key: string]: string | number;
    }
    | null
    | undefined;
};

const parseKeyValuePair = (
  segment: string,
): [string, string | string[] | number | number[] | undefined] => {
  let key: string, value: string | string[] | number | number[] | undefined;

  const arrayMatch = segment.match(/:\s*\[([^\]]+)\]/);
  const parenthesesMatch = segment.match(/:\s*\(([^\)]+)\)/);

  if (arrayMatch) {
    key = segment.split(":")[0].trim();
    value = arrayMatch[1].match(/'([^']+)'/g)?.map((s) => s.replace(/'/g, ""));
  } else if (parenthesesMatch) {
    key = segment.split(":")[0].trim();
    value = parenthesesMatch[1].split(",").map((v) => parseFloat(v.trim()));
  } else {
    [key, value] = segment.split(":").map((part) => part.trim());
    value = value.replace(/,$/, "");
    if (!isNaN(Number(value))) {
      value = Number(value);
    }
  }

  return [key, value];
};

const parseSeedTextToObject = (text: string): { [key: string]: string } => {
  const pattern = /Seed:\s*(\d+),\s*(LoRA\s*\[.*?\]\s*weight):\s*(\d+(\.\d+)?)/;
  const match = text.match(pattern);

  if (!match) {
    throw new Error("Invalid Seed text format");
  }

  let object: { [key: string]: string } = {};
  object["Seed"] = match[1];
  object[match[2]] = match[3];

  return object;
};

export const parseComplexString = (input: string): ParsedData | null => {
  if (!input) {
    return null;
  }

  const parsedData: ParsedData = {};
  const lines = input.split("\n");

  let currentKey = "";

  lines.forEach((line) => {
    // Detect special keys that may span multiple lines
    if (
      line.startsWith("Prompt") || line.startsWith("Negative Prompt") ||
      line.startsWith("Fooocus V2 Expansion")
    ) {
      const [key, ...rest] = line.split(":");

      currentKey = key.trim();
      parsedData[currentKey] = rest.join(":").trim();
      return;
    } else if (currentKey === "Prompt" || currentKey === "Negative Prompt") { // Prompt or Negative Prompt
      parsedData[currentKey] += "\n" + line;
      return;
    } else if (line.startsWith("Seed:")) {
      const resultObj = parseSeedTextToObject(line);
      for (const key of Object.keys(resultObj)) {
        parsedData[key] = Number(resultObj[key]);
      }

      return;
    }

    currentKey = ""; // Reset current key as we're not in a multi-line value

    const regex =
      /(\w[\w\s]*(?:\s\[\w+\])?):\s*([\w\.\s]*\([^\)]*\)|\[[^\]]*\]|[\w\.\s]*)(?:,|$)/g;
    let match;

    while ((match = regex.exec(line)) !== null) {
      const [key, value] = parseKeyValuePair(match[0].trim());
      parsedData[key] = value;
    }
  });

  return parsedData;
};
