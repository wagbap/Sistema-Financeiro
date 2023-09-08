import * as C from './styles';
import { Item } from '../../types/Item';
import { TableItem } from '../TableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';


type Props = {
    list: Item[];
    onEdit: (item: Item) => void;
    onDelete: (item: Item) => void;
};


export const TableArea = ({ list, onEdit, onDelete }: Props) => {
    return (
        <C.Table>
            <thead>
                <tr>
                    <C.TableHeadColumn width={100}>Data</C.TableHeadColumn>
                    <C.TableHeadColumn width={130}>Categoria</C.TableHeadColumn>
                    <C.TableHeadColumn width={100}>Estado</C.TableHeadColumn>
                    <C.TableHeadColumn>Título</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Valor</C.TableHeadColumn>
                    <C.TableHeadColumn width={50}>Ações</C.TableHeadColumn> {/* Adicionado */}
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (
                    <tr key={item.id}>  {/* Use o ID do item como chave */}
                        <TableItem key={index} item={item} />
                        <td>
           
           
                           <FontAwesomeIcon
                                icon={faPencilAlt}
                                onClick={() => onEdit(item)}
                                style={{ color:"#5F9EA0", cursor: "pointer", marginRight: "10px" }}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => onDelete(item)}
                                style={{ color:"#2F4F4F", cursor: "pointer" }}
                            />

                        </td>
                    </tr>
                ))}
            </tbody>

        </C.Table>
    );
}
