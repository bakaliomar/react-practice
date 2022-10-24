import { useState, BaseSyntheticEvent, useEffect, Fragment } from "react";

function ID() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

class Item {
  name: string;
  id: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

const initialItems = [
  new Item(ID(), "First Item"),
  new Item(ID(), "Second Item"),
  new Item(ID(), "Third Item"),
];

// ListItem Component
interface ListItemProps {
  item: Item;
  onEdit: (item: Item) => void;
  onRemove: (item: Item) => void;
}

function ListItem({ item, onEdit, onRemove }: ListItemProps) {
  return (
    <p>
      <span>{item.name}</span>
      <button onClick={() => onEdit(item)}>Edit</button>
      <button onClick={() => onRemove(item)}>Remove</button>
    </p>
  )
}

//List Component
interface ListProps {
  items: Item[];
  onRemove: (item: Item) => void;
  onUpdate: (item: Item) => void;
}

function List({ items, onRemove, onUpdate }: ListProps) {
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleEdit = (item: Item): void => {
    setEditingItem(item);
  }

  const handleCancel = () => {
    setEditingItem(null);
  }

  return (
    <ul>
      {items.map((item: Item) => (
        <li key={item.id}>
          {item === editingItem ? (
            <Form item={item} onSubmit={onUpdate} onCancel={handleCancel} />
          ) : (
            <ListItem item={item} onEdit={handleEdit} onRemove={onRemove} />
          )}
        </li>
      ))}
    </ul>
  )
}

// Form Component
interface FormProps {
  item: Item | string;
  onSubmit: (item: Item) => void;
  onCancel?: () => void;
  buttonValue?: string;
}

function Form({ item, onSubmit, onCancel, buttonValue }: FormProps) {
  const [inputValue, setInputValue] = useState(typeof item !== "string" ? item!.name : "");

  const handleChange = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    setInputValue(event.target.value);
  }

  const handleFormSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    const submittedItem = {
      id: typeof item !== "string" ? item.id : ID(),
      name: inputValue,
    };

    onSubmit(submittedItem);
    setInputValue("");
  }

  const handleCancel = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    onCancel!();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input value={inputValue} onChange={handleChange} />
      <button>{buttonValue || "Save"}</button>
      {onCancel && (
        <a href="#" onClick={handleCancel}>Cancel</a>
      )}
    </form>
  );
}

// Comtainer Component
function Container() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => setItems(initialItems), []);

  const addItem = (item: Item) => {
    setItems([...items, item]);
  }

  const updateItem = (updatedItem: Item) => {
    let updatedItems = items.map((item: Item) => {
      return item.id === updatedItem.id
        ? Object.assign({}, item, updateItem)
        : item;
    });
    return setItems(updatedItems);
  }

  const removeItem = (removeThisItem: Item) => {
    const filteredItems = items.filter((item: Item) => item.id != removeThisItem.id);
    setItems(filteredItems);
  }

  return (
    <Fragment>
      <Form item="" onSubmit={addItem} buttonValue="Add" />
      <List items={items} onRemove={removeItem} onUpdate={updateItem} />
    </Fragment>
  );
}

export default Container;
