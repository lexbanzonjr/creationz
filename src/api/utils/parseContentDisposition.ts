export default function parseContentDisposition(
  header: string
): Record<string, string> {
  const result: Record<string, string> = {};

  // Split by semicolon to get the parts
  const parts = header.split(";").map((part) => part.trim());

  // The first part is typically the disposition type (e.g., "form-data")
  result["type"] = parts.shift() || "";

  // Process remaining parts as key-value pairs
  for (const part of parts) {
    const [key, value] = part.split("=").map((str) => str.trim());
    if (key && value) {
      // Remove surrounding quotes from the value if present
      result[key] = value.replace(/^"(.*)"$/, "$1");
    }
  }

  return result;
}
