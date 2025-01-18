// DataContext.tsx
import { DataRow, EDataType } from '@/components/types/table';
import React, { createContext, useContext, useState, ReactNode } from 'react';


type VisibleColumnType = { name: string, dataType: EDataType }
type DataContextType = {
    dataTable: DataRow[];
    setDataTable: React.Dispatch<React.SetStateAction<DataRow[]>>;
    visibleColumns: VisibleColumnType[]
    setVisibleColumns: React.Dispatch<React.SetStateAction<VisibleColumnType[]>>
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const SAMPLE_DATA_TABLE: DataRow[] = [
    [
        {
            dataType: EDataType.STRING,
            name: 'name',
            value: 'John Doe',
        },
        {
            dataType: EDataType.NUMBER,
            name: 'age',
            value: 800,
        },
        {
            dataType: EDataType.NUMBER,
            name: 'order',
            value: 1001,
        },
    ],
    [
        {
            dataType: EDataType.STRING,
            name: 'name',
            value: 'Jane Smith',
        },
        {
            dataType: EDataType.NUMBER,
            name: 'age',
            value: 25,
        },
        {
            dataType: EDataType.NUMBER,
            name: 'order',
            value: 600,
        },
    ],
    [
        {
            dataType: EDataType.STRING,
            name: 'name',
            value: 'Alice Johnson',
        },
        {
            dataType: EDataType.NUMBER,
            name: 'age',
            value: 28,
        },
        {
            dataType: EDataType.NUMBER,
            name: 'order',
            value: 120,
        },
    ],
    [
        {
            dataType: EDataType.STRING,
            name: 'name',
            value: 'Bob Brown',
        },
        {
            dataType: EDataType.NUMBER,
            name: 'age',
            value: 500,
        },
        {
            dataType: EDataType.NUMBER,
            name: 'order',
            value: 1004,
        },
    ],
    [
        {
            dataType: EDataType.STRING,
            name: 'name',
            value: 'Charlie Davis',
        },
        {
            dataType: EDataType.NUMBER,
            name: 'age',
            value: 40,
        },
        {
            dataType: EDataType.NUMBER,
            name: 'order',
            value: 700,
        },
    ],
];



export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [dataTable, setDataTable] = useState<DataRow[]>(SAMPLE_DATA_TABLE);
    const [visibleColumns, setVisibleColumns] =
        useState<VisibleColumnType[]>([
            { name: 'name', dataType: EDataType.STRING },
            { name: 'age', dataType: EDataType.NUMBER },
            { name: 'order', dataType: EDataType.NUMBER }]
        );

    return (
        <DataContext.Provider value={{ dataTable, setDataTable, visibleColumns, setVisibleColumns }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
