import { DataFrame, Field } from '@grafana/data';

// Define a generic type for the data items
export interface DataItem {
  index: number;
  [key: string]: any;
}

/**
 * Generic function to retrieve and map data from Grafana series.
 *
 * @param series - The array of data series from Grafana.
 * @param refId - The reference ID to filter the series.
 * @param fieldMapping - An array of field names to extract from each series.
 * @param baseIndex - A base index to ensure unique indexing.
 * @returns An array of mapped data items.
 */
export function retrieveData<T extends DataItem>(
  series: DataFrame[],
  refId: string,
  fieldMapping: string[],
  baseIndex: number = 1000
): T[] {
  return series
    .filter(s => s.refId === refId)
    .flatMap((s, seriesIndex) => {
      const fieldsMap: Record<string, Field<any>> = {};

      // Build the field mapping, case-insensitive
      fieldMapping.forEach(fieldName => {
        const field = s.fields.find(f => f.name.toLowerCase() === fieldName.toLowerCase());
        if (field) {
          fieldsMap[fieldName] = field;
        }
      });

      // Find the value field, accept '_value' or 'Value' (case-insensitive)
      const valueField = s.fields.find(f => ['_value', 'value'].includes(f.name.toLowerCase()));

      // Ensure the primary field is present
      const primaryFieldName = fieldMapping[0];
      const primaryField = fieldsMap[primaryFieldName];

      if (!primaryField || !valueField) {
        console.log("Missing required fields:", { primaryField, valueField });
        return []; // Required fields are missing
      }

      const length = primaryField.values.length;
      const items: T[] = [];

      for (let index = 0; index < length; index++) {
        const uniqueIndex = (seriesIndex + 1) * baseIndex + index;
        const item: any = { index: uniqueIndex };

        fieldMapping.forEach(fieldName => {
          const field = fieldsMap[fieldName];
          if (field) {
            item[fieldName] = field.values.get(index);
          }
        });

        // Include the value field in the item
        item['_value'] = valueField.values.get(index);

        items.push(item as T);
      }

      return items;
    });
}
