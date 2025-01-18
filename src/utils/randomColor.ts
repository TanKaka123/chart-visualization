export const getRandomColor = () => {
    const random = () => Math.floor(Math.random() * 256); 
    return `rgba(${random()},${random()},${random()},1)`; 
};

export const getRandomRgb = () => {
    const random = () => Math.floor(Math.random() * 256); 
    return [random(), random(), random()] 
};