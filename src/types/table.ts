export enum EDataType {
    STRING = 'string',
    NUMBER = 'number'
}

export type DateCell = {
    dataType: EDataType.STRING,
    name: string,
    value: string,
} | {
    dataType: EDataType.NUMBER,
    name: string,
    value: number
}

export type DataColumn = {
    dataType: EDataType.STRING,
    name: string,
    value: string[]
} | {
    dataType: EDataType.NUMBER,
    name: string,
    value: number[]
}

export type DataRow = DateCell[]