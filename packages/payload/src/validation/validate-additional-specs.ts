import type { BlocksFieldValidation } from "payload";

export const validateAdditionalSpecs: BlocksFieldValidation = (value) => {
  if (!Array.isArray(value)) {
    return true;
  }
  const blockTypes = value.map((block) => block.blockType);

  const duplicates = blockTypes.filter(
    (type, index) => blockTypes.indexOf(type) !== index,
  );

  if (duplicates.length > 0) {
    const blockTypeNames = {
      packagingBlock: "Packaging",
      datasheetBlock: "Datasheet",
      manualBlock: "Manual",
      warrantyBlock: "Warranty",
      certsBlock: "Certifications",
    };

    const duplicateNames = [...new Set(duplicates)].map(
      (type) => blockTypeNames[type as keyof typeof blockTypeNames] || type,
    );

    return `Duplicate blocks found: ${duplicateNames.join(", ")}. Each specification type can only be used once.`;
  }

  return true;
};
