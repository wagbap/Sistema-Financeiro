import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { categories } from './data/categories';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';
import axios from 'axios';

const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://localhost:7189/api/v1/items');
        if (response.status === 200) {
          setList(response.data);
        } else {
          console.error("Erro ao buscar itens: ", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar itens: ", error);
      }
    }

    fetchItems();
    const interval = setInterval(fetchItems, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  const handleAddItem = async (item: Item) => {
    try {
      const response = await axios.post('https://localhost:7189/api/v1/items', item);
      const returnedItem = response.data;
      setList(prevList => [...prevList, returnedItem]);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  }

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />
        <InputArea onAdd={handleAddItem} />
        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  );
}

export default App;
