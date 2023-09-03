import { useState, useEffect} from 'react';
import * as C from './styles';
import { Item } from '../../types/Item';
import moment from 'moment';
import { categories } from '../../data/categories';
import { newDateAdjusted } from '../../helpers/dateFilter';

// ... (importações mantidas)

type Props = {
  onAdd: (item: Item) => void;
  itemToEdit: Item | null;
  onEdit: (item: Item) => void;
  onEditComplete: () => void;
};



export const InputArea = ({ onAdd, itemToEdit, onEdit, onEditComplete }: Props) => {

  const [dateField, setDateField] = useState('');
  const [categoryField, setCategoryField] = useState('');
  const [titleField, setTitleField] = useState('');
  const [valueField, setValueField] = useState(0);


  

  let categoryKeys: string[] = Object.keys(categories);

  const handleAddEvent = () => {
    let errors: string[] = [];

    if (isNaN(new Date(dateField).getTime())) {
      errors.push('Data inválida!');
    }
    if (!categoryKeys.includes(categoryField)) {
      errors.push('Categoria inválida!');
    }
    if (titleField === '') {
      errors.push('Título vazio!');
    }
    if (valueField <= 0) {
      errors.push('Valor inválido!');
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      // Se temos um itemToEdit, então estamos no modo de edição
      if (itemToEdit) {
        onEdit({
          ...itemToEdit,
          date: newDateAdjusted(dateField),
          category: categoryField,
          title: titleField,
          value: valueField
        });
        onEditComplete(); // Feche o modal após editar
      } else {
        // Modo de adição
        onAdd({
          date: newDateAdjusted(dateField),
          category: categoryField,
          title: titleField,
          value: valueField
        });
        clearFields();
      }
    }
  }

  const clearFields = () => {
    setDateField('');
    setCategoryField('');
    setTitleField('');
    setValueField(0);
}

useEffect(() => {
  if (itemToEdit) {
    if (itemToEdit.date instanceof Date) {
      const formattedDate = `${itemToEdit.date.getFullYear()}-${(itemToEdit.date.getMonth() + 1).toString().padStart(2, '0')}-${itemToEdit.date.getDate().toString().padStart(2, '0')}`;
      setDateField(formattedDate);
    } else {
      // Use a linha aqui dentro do useEffect
      const formattedDate = moment(itemToEdit.date).format('YYYY-MM-DD');
      setDateField(formattedDate);
    }
    
    setCategoryField(itemToEdit.category);
    setTitleField(itemToEdit.title);
    setValueField(itemToEdit.value);
  } 
}, [itemToEdit]);





  return (
    <C.Container>
      <C.InputLabel>
        <C.InputTitle>Data</C.InputTitle>
        <C.Input type="date" value={dateField} onChange={e => setDateField(e.target.value)} />
      </C.InputLabel>
      <C.InputLabel>
        <C.InputTitle>Categoria</C.InputTitle>
        <C.Select value={categoryField} onChange={e => setCategoryField(e.target.value)}>
          <>
            <option></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>{categories[key].title}</option>
            ))}
          </>
        </C.Select>
      </C.InputLabel>
      <C.InputLabel>
        <C.InputTitle>Título</C.InputTitle>
        <C.Input type="text" value={titleField} onChange={e => setTitleField(e.target.value)} />
      </C.InputLabel>
      <C.InputLabel>
        <C.InputTitle>Valor</C.InputTitle>
        <C.Input type="number" value={valueField} onChange={e => setValueField(parseFloat(e.target.value))} />
      </C.InputLabel>
      <C.InputLabel>
        <C.InputTitle>&nbsp;</C.InputTitle>
        <C.Button onClick={handleAddEvent}>
          {itemToEdit ? 'Atualizar' : 'Adicionar'}
        </C.Button>

      </C.InputLabel>
    </C.Container>
  );
}