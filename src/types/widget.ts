import { ChartWidget } from "./chart";

export type BlankWidgetType = {
    type: 'blank',
    id: string
}

export type WidgetType = ChartWidget | BlankWidgetType