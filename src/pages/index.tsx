import DynamicTable from "@/components/DynamicTable";
import { Box, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box maxW="7xl" mx="auto" p={4}>
      <Heading
        as="h1"
        size="2xl"
        textAlign="center"
        fontWeight="bold"
        mb={4}
        color="blue.600"
        userSelect="none"
      >
        Import Data
      </Heading>
      <DynamicTable />
    </Box>
  );
}
