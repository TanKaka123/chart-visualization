import { WidgetType } from "@/types/widget"
import { ChartWidget } from "./ChartWidget"
import React from "react"
import { WidgetContainer } from "./WidgetContainer"
import { BlankWidget } from "./BlankWidget"

type WidgetProps = {
    data: WidgetType,
    onAddNewWidget: () => void
    isLastWidget: boolean
}

export const Widget = ({ data, isLastWidget, onAddNewWidget }: WidgetProps) => {
    const WidgetComponent = React.useMemo(() => {
        switch (data.type) {
            case 'chart':
                return (
                    <ChartWidget
                        chartType={data.chartType}
                        data={data.data}
                        title={data.title}
                        description={data.description}
                    />)
            case 'blank':
                return (
                    <BlankWidget widgetId={data.id}/>
                )
        }
    }, [data])
    return (
        <WidgetContainer onAddNewWidget={onAddNewWidget} isLastWidget={isLastWidget}>
            {WidgetComponent}
        </WidgetContainer>
    )
}