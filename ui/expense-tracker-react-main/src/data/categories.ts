import { Category } from '../types/Category';

export const categories: Category = {
    food: { title: 'Alimentação', color: 'blue', expense: true },
    rent: { title: 'Renda', color: 'brown', expense: true },
    salary: { title: 'Salário', color: 'green', expense: false },
    passe: { title: 'Passe', color: '#556B2F', expense: true },
    cabelo: { title: 'Cabelo', color: 'black', expense: true },
    fastfood: { title: 'FastFood', color: 'orange', expense: true },
    meo: { title: 'Tarifário MEO', color: '#008080', expense: true },
    divida: { title: 'Dividas', color: 'red', expense: true }
}