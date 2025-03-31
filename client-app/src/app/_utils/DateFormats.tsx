// This function takes a Date object and formats it as 'dd mmm, yyyy' (e.g., '24 Mar, 2025')
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}
