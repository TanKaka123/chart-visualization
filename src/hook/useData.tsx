import { EChartType } from '@/types/chart';
import { DataRow, EDataType } from '@/types/table';
import { BlankWidgetType, WidgetType } from '@/types/widget';
import { generateRandomId } from '@/utils/id';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type DataContextType = {
    widgetsData: WidgetType[]
    setWidgetsData: React.Dispatch<React.SetStateAction<WidgetType[]>>
    editingWidgetId?: string
    setEditingWidgetId: React.Dispatch<React.SetStateAction<string | undefined>>
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const BLANK_WIDGET: BlankWidgetType = {
    type: 'blank',
    id: generateRandomId(),
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [widgetsData, setWidgetsData] = React.useState<WidgetType[]>([BLANK_WIDGET])
    const [editingWidgetId, setEditingWidgetId] = React.useState<string>()

    return (
        <DataContext.Provider value={{ editingWidgetId, setEditingWidgetId, widgetsData, setWidgetsData }}>
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
