import * as C from './styles';
import { Item } from '../../types/Item';
import { TableItem } from '../TableItem';

type Props = {
    list: Item[];
    onEdit: (item: Item) => void;
};



export const TableArea = ({ list, onEdit }: Props) => {
    return (
        <C.Table>
            <thead>
                <tr>
                    <C.TableHeadColumn width={100}>Data</C.TableHeadColumn>
                    <C.TableHeadColumn width={130}>Categoria</C.TableHeadColumn>
                    <C.TableHeadColumn>Título</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Valor</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>Ações</C.TableHeadColumn> {/* Adicionado */}
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (
                    <tr key={item.id}>  {/* Use o ID do item como chave */}
                        <TableItem item={item} />
                        <td>
                            <button onClick={() => onEdit(item)}>Editar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
         
        </C.Table>
    );
}
