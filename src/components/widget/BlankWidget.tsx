import { useDataContext } from "@/hook/useData";
import { Button, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router";

export const BlankWidget = ({ widgetId }: { widgetId: string }) => {
    const { setEditingWidgetId } = useDataContext();
    const router = useRouter();
    const onImportDataToTable = () => {
        setEditingWidgetId(widgetId)
        router.push("/");
    }

    return (
        <Button
            onClick={onImportDataToTable}
            colorScheme="blue"
            variant="solid"
            size="md"
        >
            Import Data
        </Button>

    )
}