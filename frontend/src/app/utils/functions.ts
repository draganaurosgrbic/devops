export const fieldFormat = (field: string) => {
    if (!field.length) {
        return field;
    }
    while (field.includes('_')) {
        field = field.replace('_', ' ');
    }
    return field[0].toUpperCase() + field.substring(1);
};
