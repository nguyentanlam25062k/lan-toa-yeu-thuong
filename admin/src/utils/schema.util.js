function mergeSchema(...schemas) {
  const [first, ...rest] = schemas;
  return rest.reduce((mergedSchemas, schema) => mergedSchemas.concat(schema), first);
}

export { mergeSchema };
