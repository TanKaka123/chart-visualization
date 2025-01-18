import { DataColumn, DataRow, EDataType } from "@/components/types/table";

export function convertDataRowsToColumns(dataRows: DataRow[]): DataColumn[] {
    const columnMap: Record<string, { dataType: EDataType; name: string; values: (string | number)[] }> = {};

    // Iterate through each row
    for (const row of dataRows) {
        for (const cell of row) {
            const key = `${cell.dataType}-${cell.name}`; //\]
            //  Unique key for grouping by dataType and name
            
            if (!columnMap[key]) {
                columnMap[key] = {
                    dataType: cell.dataType,
                    name: cell.name,
                    values: [],
                };
            }

            columnMap[key].values.push(cell.value);
        }
    }

    return Object.values(columnMap).map(({ dataType, name, values }) => {
        if (dataType === EDataType.STRING) {
            return { dataType, name, value: values as string[] };
        } else {
            return { dataType, name, value: values as number[] };
        }
    });
}
