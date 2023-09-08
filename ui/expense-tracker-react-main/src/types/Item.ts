export type Item = {
    id?: number;
    date: string | Date;
    category: string;
    title: string;
    value: number;
    status?: 'pending' | 'paid';
    
};
