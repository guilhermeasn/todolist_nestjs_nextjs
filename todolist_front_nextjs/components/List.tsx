import { useState } from "react";
import { FaCheckSquare, FaRegSquare, FaTimes } from "react-icons/fa";

export type ListProps = {
  itens: Array<{
    created: string;
    description: string;
    done: boolean;
    id: number;
  }>;
  onUpdate: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function List({ itens, onUpdate, onDelete } : ListProps) {

  const [ wait, setWait ] = useState<boolean>(false);

  const action = (action : 'update' | 'delete', id: number) => async () => {
    if(wait) return;
    setWait(true);
    if(action === 'update') await onUpdate(id);
    if(action === 'delete') await onDelete(id);
    setWait(false);
  };

  return (

    <div className="min-w-72 flex items-center justify-center p-5">
      <ul className="text-gray-700 border border-gray-300 md:min-w-[500px] min-w-full max-w-full">

        { itens.length === 0 ? (

          <li className="border border-gray-200 text-gray-500 p-4 shadow-sm hover:shadow-md transition-shadow">
            The list is empty.
          </li>

        ) : itens.map((item, index) => {

          const Icon = item.done ? FaCheckSquare : FaRegSquare;

          return (

            <li key={ index } className="border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow bg-white flex justify-between">

              <div className="flex align-middle items-center">
                <Icon size={ 25 } onClick={ action('update', item.id) } className="me-2 text-green-800 cursor-pointer hover:text-green-700" />
                <span className={ item.done ? "line-through text-gray-400" : "" } title={ item.created }>{ item.description }</span>
              </div>

              <div className="flex align-middle items-center">
                <FaTimes size={ 25 } onClick={ action('delete', item.id) } className="me-2 mt-1 text-red-800 cursor-pointer hover:text-red-700" />
              </div>

            </li>

        )}) }

      </ul>
    </div>

  )

}