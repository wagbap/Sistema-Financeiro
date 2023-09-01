import { Item } from '../types/Item';

export const getCurrentMonth = () => {
    let now = new Date();
    let month = (now.getMonth() + 1).toString().padStart(2, '0'); // Isso transformará 1 em 01, 2 em 02, ... 9 em 09
    return `${now.getFullYear()}-${month}`;
}



export const newDateAdjusted = (dateField: string) => {
    let [year, month, day] = dateField.split('-');
    return new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
}



export const filterListByMonth = (list: Item[], date: string): Item[] => {
    let newList: Item[] = [];
    let [year, month] = date.split('-');

    for(let i in list) {
        // Convertendo a string para objeto Date
        const itemDate = new Date(list[i].date);

        if(
            itemDate.getFullYear() === parseInt(year) &&
            (itemDate.getMonth() + 1) === parseInt(month)
        ) {
            newList.push(list[i]);
        }
    }

    return newList;
}


export const formatDate = (date: Date): string => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year}`;
}
const addZeroToDate = (n: number): string => n < 10 ? `0${n}` : `${n}`;

export const formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-');
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${months[parseInt(month) - 1]} de ${year}`;
}

