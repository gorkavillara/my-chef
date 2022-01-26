import React from "react";

const TableRow = ({ selected, toggleSelected, name, deleteItem, editItem }) => (
  <tr
    className={`hover:bg-gray-200 ${selected && "bg-gray-200"} cursor-pointer`}
    onClick={toggleSelected}
  >
    <td className="px-6 py-2 whitespace-nowrap">
      <div className="flex items-center">
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
            <input
              type="checkbox"
              checked={selected}
              onChange={toggleSelected}
            />
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-2 whitespace-nowrap">
      <div className="text-sm text-gray-500">{name}</div>
    </td>
    <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium flex gap-2">
      <button
        className="text-indigo-600 hover:text-indigo-900"
        onClick={editItem}
      >
        Edit
      </button>
      <button
        className="text-red-600 hover:text-red-900"
        onClick={() =>
          confirm(`¿Seguro que quieres eliminar la mesa ${name}?`) &&
          deleteItem()
        }
      >
        Delete
      </button>
    </td>
  </tr>
);

const Table = ({
  items = [],
  deleteItems,
  selectedTables,
  toggleSelected,
  editItem,
}) => {
  const itemsByName = () => {
    let newItems = items;
    newItems.sort((a, b) =>
      a.description > b.description ? 1 : b.description > a.description ? -1 : 0
    );
    return newItems;
  };
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {itemsByName().map((item, i) => (
                  <TableRow
                    key={i}
                    name={item.name}
                    selected={selectedTables.includes(item.id)}
                    editItem={() => editItem(item)}
                    toggleSelected={() => toggleSelected(item.id)}
                    deleteItem={() => deleteItems([item.id])}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
