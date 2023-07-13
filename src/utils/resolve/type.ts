type EnumItemObject = {
  name?: string;
  value: string | number | undefined;
  description?: string | undefined;
};

export type EnumObjectType = {
  [k: string]: EnumItemObject;
};

export type EnumObject = {
  [k: string]: EnumObjectType;
};

export type FormFieldType = {
  [k: string]: BaseStructure | string;
};

export type BaseStructure =
  | "number"
  | "string"
  | "boolean"
  | "array"
  | "object";

export type TypeAliasItemObject = {
  name: string;
  type: string;
  description: string;
  isOptional?: boolean;
};

export type TypeAliasType = {
  [k: string]: TypeAliasItemObject;
};

export type TypeAliasObject = {
  [k: string]: TypeAliasType;
};
