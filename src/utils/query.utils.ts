import z from "zod";

export function getQueryParam<T>(value: unknown, schema?: z.ZodType<T>){
    if(!value) return;

    let stringValue = String(value);
    if(!schema) return stringValue;

    const result = validateSchema<T>(stringValue,schema);

    return result;
}

export function validateSchema<T>(value: unknown, schema: z.ZodType<T>) {
  if (!value) return;

  const result = schema.safeParse(value);

  return result.success ? result.data : undefined;
}
