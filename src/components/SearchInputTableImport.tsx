import { Flex, Input } from "@chakra-ui/react";

import React from "react";

type SearchInputTableImportProps = {
    setSearchTerm: (term: string) => void;
    setCurrentPage: (page: number) => void;
};

export const SearchInputTableImport = ({
    setSearchTerm,
    setCurrentPage,
}: SearchInputTableImportProps) => {
    return (
        <>
            <Flex justify="center" mb={10} >
                <Input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    variant="outline"
                    size="md"
                    focusBorderColor="blue.200"
                    borderColor="blue.300"
                    _hover={{ bg: "slate.100" }}
                    borderRadius="md"
                    w={{ base: "400px !important", sm: "1/2", md: "3/4", lg: "1/4"}}
                />
            </Flex>

        </>

    )
}