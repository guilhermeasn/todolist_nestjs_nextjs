'use client';

import ClearButton from "@/components/ClearButton";
import Input from "@/components/Input";
import List from "@/components/List";
import Loading from "@/components/Loading";
import Navbar from "@/components/NavBar";
import { createItem, deleteAll, deleteItem, getAll, Item, status, updateItem } from "@/services";
import { useEffect, useState } from "react";

export default function Home() {

  const [ todolist, setTodolist ] = useState<Item[] | null>(null);
  const [ error, setError ] = useState<string | null>(null);

  const onUpdate = async (id: number) => {
    if(todolist === null) return;
    const idx = todolist.findIndex(item => item.id === id);
    if(idx < 0) return;
    const current = todolist[idx];
    const done = !todolist[idx].done;
    const updated = [...todolist];
    updated[idx] = { ...updated[idx], done };
    setTodolist(updated);
    const res = await updateItem(id, { done });
    if(!res.success) {
      updated[idx] = { ...current };
      setTodolist(updated);
    }
  }

  const onDelete = async (id: number) => {
    if(todolist === null) return;
    const idx = todolist.findIndex(item => item.id === id);
    if(idx < 0) return;
    const oldTodolist = [...todolist];
    setTodolist(todolist.filter(item => item.id !== id));
    const res = await deleteItem(id);
    if(!res.success) setTodolist(oldTodolist);
  }

  const onDeleteAll = async () => {
    if(todolist === null || todolist.length === 0) return;
    const oldTodolist = [...todolist];
    setTodolist([]); 
    const res = await deleteAll();
    if(!res.success) setTodolist(oldTodolist);
  }

  const onCreateItem = async (item: string) : Promise<boolean> => {
    if(todolist === null) return false;
    const res = await createItem(item);
    if(res.success) setTodolist([...todolist, res.data]);
    else if (res.data && typeof res.data === 'object' && 'message' in res.data && Array.isArray((res.data as { message?: string[] }).message)) {
      setError((res.data as { message: string[] }).message.join(' '));
    }
    return res.success;
  }

  useEffect(() => {
    status().then(console.log);
    getAll().then(res => setTodolist(res.success ? res.data : null));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      <header><Navbar titleLink="https://github.com/guilhermeasn/todolist_nestjs_nextjs" /></header>

      <main>

        { todolist === null ? <Loading>Loading ...</Loading> : (

          <List onUpdate={ onUpdate } onDelete={ onDelete } itens={ todolist.map(list => ({
            created: new Date(list.createdAt).toLocaleString(),
            description: list.item,
            done: list.done,
            id: list.id
          })) } />

        )}

        <ClearButton
          disabled={ todolist === null || todolist.length === 0 || todolist.some(item => !item.done) }
          onClick={ onDeleteAll }
        />
        
        <Input
          onInput={ onCreateItem }
          onUpdated={ () => setError(null) }
          error={ error }
        />

      </main>

    </div>
  );
}
