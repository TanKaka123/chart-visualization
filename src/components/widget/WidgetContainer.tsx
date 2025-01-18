import { IoIosAddCircle } from "react-icons/io";
import { Box, IconButton, VStack } from "@chakra-ui/react"

type WidgetContainerProps = {
    children: React.ReactNode,
    onAddNewWidget: () => void
    isLastWidget: boolean
}

export const WidgetContainer = ({ children, isLastWidget, onAddNewWidget }: WidgetContainerProps) => {
    return (
        <VStack>
            <VStack my="10px" p={4} boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" borderRadius="md" gap={"20px"} justifyContent="center" alignItems={'center'} w='full' h="550px">
                {children}
            </VStack>
            {isLastWidget ? <IconButton
                icon={<IoIosAddCircle size={'30px'} color="#000000" />}
                aria-label={""}
                onClick={onAddNewWidget}
            /> : null}
        </VStack>
    )
}