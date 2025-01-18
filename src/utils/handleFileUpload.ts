export const handleFileUpload = (file: File): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
          try {
              const fileData = JSON.parse(e.target?.result as string);

              const isValid =
                  Array.isArray(fileData) &&
                  fileData.every(
                      (item) =>
                          typeof item === "object" &&
                          "email" in item &&
                          "name" in item &&
                          "age" in item
                  );

              if (isValid) {
                  resolve(fileData);
              } else {
                  reject("The data format is incorrect.");
              }
          } catch (error) {
              reject("Error parsing JSON.");
          }
      };

      reader.onerror = () => {
          reject("Error reading the file.");
      };

      reader.readAsText(file);
  });
};
