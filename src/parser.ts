export type ParsedData = {
  [key: string]:
    | string
    | string[]
    | number
    | number[]
    | { [key: string]: string | number }
    | null;
};

const parseKeyValuePair = (
  segment: string,
): [string, string | string[] | number] => {
  // Additional processing for cases involving arrays or bracketed values
  const arrayMatch = segment.match(/:\s*\[([^\]]+)\]/);
  const parenthesesMatch = segment.match(/:\s*\(([^\)]+)\)/);

  let key: string, value: string | string[] | number;

  if (arrayMatch) {
    key = segment.split(":")[0].trim();
    value = arrayMatch[1].split("'").filter((_, i) => i % 2 !== 0); // Extract only items enclosed in single quotes
  } else if (parenthesesMatch) {
    key = segment.split(":")[0].trim();
    // @ts-ignore
    value = parenthesesMatch[1].split(",").map((v) => parseFloat(v.trim()));
  } else {
    [key, value] = segment.split(":").map((part) => part.trim());
    // Parse number
    if (!isNaN(Number(value))) {
      value = Number(value);
    }
  }

  return [key, value];
};

export const parseComplexString = (input: string): ParsedData | null => {
  if (!input) {
    return null;
  }

  const parsedData: ParsedData = {};
  const lines = input.split("\n");

  lines.forEach((line) => {
    // Keywords requiring special parsing
    const specialKeywords = [
      "Prompt",
      "Negative Prompt",
      "Fooocus V2 Expansion",
    ];
    const isSpecial = specialKeywords.some((keyword) =>
      line.startsWith(keyword)
    );

    if (isSpecial) {
      // Get in key: value format
      const [key, value] = line.split(":");
      parsedData[key.trim()] = value.trim();
    } else if (line.startsWith("Seed:")) {
      // Lines beginning with "Seed:"" also require special parsing
      const parts = line.split(", ");

      for (const part of parts) {
        const [key, value] = part.split(": ");
        if (key === "Seed") {
          parsedData[key] = parseInt(value);
        } else if (key === "LoRA [xxxxxxxxx] weight") {
          parsedData[key] = parseFloat(value);
        }
      }
    } else {
      // Separate key/value pairs using regular expressions
      const regex =
        /(\w[\w\s]*):\s*([\w\.\s]*\([^\)]*\)|\[[^\]]*\]|[\w\.\s]*)(?:|$)/g;

      let match;
      while ((match = regex.exec(line)) !== null) {
        const [key, value] = parseKeyValuePair(match[0].trim());
        parsedData[key] = value;
      }
    }
  });

  return parsedData;
};
