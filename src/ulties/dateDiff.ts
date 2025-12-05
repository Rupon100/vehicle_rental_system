
const dateDifferences = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffMonths = endDate.getTime() - startDate.getTime();
    const diffDays = diffMonths / (1000 * 60 * 60 * 24);
    return diffDays;
}

export default dateDifferences;

