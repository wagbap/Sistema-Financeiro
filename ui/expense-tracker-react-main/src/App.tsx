import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { categories } from './data/categories';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7189/api/v1/items';

const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [message, setMessage] = useState<string | null>(null);


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
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);  // a mensagem desaparecerá após 3 segundos

      return () => clearTimeout(timer);  // Limpa o timer se o componente for desmontado
    }
  }, [message]);


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
  const handleEditClick = (item: Item) => {
    // Set the editing item state
    setEditingItem(item);
    // Set the show edit modal state
    setShowEditModal(true);
  };

  const handleDeleteClick = (item: Item) => {
    const confirmed = window.confirm("Tem certeza de que deseja deletar este item?");
    
    if (confirmed) {
      handleIDeletetem(item);
    }
  }
  

  const handleModalClose = () => {
    setEditingItem(null);
    setShowEditModal(false);
  }

  const handleItemUpdate = (updatedItem: Item) => {
    handleUpdateItem(updatedItem); // sua função que chama a API para atualizar
    handleModalClose();
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


  const handleUpdateItem = async (item: Item) => {

    if (!item.id) {
      setMessage("Erro ao atualizar: ID do item não fornecido");
      return;
    }

    try {
      const response = await axios.put(`https://localhost:7189/api/v1/items/${item.id}`, item);
      const updatedItem = response.data;

      // Atualizar o item na lista local
      setList(prevList => prevList.map(i => i.id === updatedItem.id ? updatedItem : i));

      // Defina sua mensagem de sucesso aqui
      setMessage("Item atualizado com sucesso!");
    } catch (error) {
      setMessage("Erro ao atualizar item: " + error);
      console.error("Erro ao atualizar item:", error);
    }
  }


  const handleIDeletetem = async (item: Item) => {
    if (!item.id) {
      setMessage("Erro ao deletar: ID do item não fornecido");
      return;
    }

    try {
      const response = await axios.delete(`https://localhost:7189/api/v1/items/${item.id}`);
      
      if (response.status === 200) {
        // Remover o item da lista local
        setList(prevList => prevList.filter(i => i.id !== item.id));

        // Defina sua mensagem de sucesso aqui
        setMessage("Item deletado com sucesso!");
      } else {
        setMessage("Erro ao deletar item.");
      }
    } catch (error) {
      setMessage("Erro ao deletar item: " + error);
      console.error("Erro ao deletar item:", error);
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

        <InputArea
          onAdd={handleAddItem} // Correção aqui para adicionar itens
          itemToEdit={editingItem}
          onEdit={handleItemUpdate}
          onDelete={handleIDeletetem}
          onEditComplete={handleModalClose}
        />

        <TableArea list={filteredList} onEdit={handleEditClick}  onDelete={handleDeleteClick}/>
           
  
        {/*
        showEditModal && (
          <Modal onClose={handleModalClose}>
            <InputArea
              onAdd={handleAddItem}  // Correção aqui para adicionar itens
              itemToEdit={editingItem}
              onEdit={handleItemUpdate}
              onEditComplete={handleModalClose}
            />
          </Modal>)
       */
       }



      </C.Body>
    </C.Container>
  );
}

export default App;
