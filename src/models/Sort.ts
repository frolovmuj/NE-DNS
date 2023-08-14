export interface ISort{
    name: 'популярности' | 'алфавиту' | 'cамым дешевым' | 'cамым дорогим';
    property: 'rating' | 'price' | 'title';
    order: 'desc' | 'asc'
}

