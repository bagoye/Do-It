'use client';

import React, { FC, useEffect, useState } from 'react';
import { fetchItems, createItem, updateItem } from "../utils/api";
import Search from "@/components/Search";
import CheckList from "@/components/CheckList";

interface ChecklistItem {
  id: string;
  name: string;
  isCompleted: boolean;
}

const Home: FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems();
      setItems(data);
    };
    loadItems();
  }, []);

  const addTodo = async (name: string) => {
    try {
      const newItem = await createItem(name);
      setItems([...items, newItem]);
      console.log("할 일이 성공적으로 추가되었습니다.");
    } catch (error) {
      console.error("할 일 추가 중 오류가 발생했습니다.");
    }
  };

  const toggleComplete = async (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const updatedItem = await updateItem(id, {
        isCompleted: !item.isCompleted,
      });
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
    }
  };

  return (
    <div>
      <Search onAdd={addTodo} hasItems={items.length > 0} />
      <div className="lists-container">
        <div className="list">
          <img src="/TODO.png" alt="TO DO" className="list-title" />
          {items.filter((item) => !item.isCompleted).length > 0 ? (
            <CheckList
              items={items.filter((item) => !item.isCompleted)}
              onToggle={toggleComplete}
            />
          ) : (
            <div className="empty-list">
              <img src="/IMG_1_B.png" alt="No TODO items" />
              <div>할 일이 없어요.</div>
              <div>TODO를 새롭게 추가해주세요!</div>
            </div>
          )}
        </div>
        <div className="list">
          <img src="/DONE.png" alt="DONE" className="list-title" />
          {items.filter((item) => item.isCompleted).length > 0 ? (
            <CheckList
              items={items.filter((item) => item.isCompleted)}
              onToggle={toggleComplete}
            />
          ) : (
            <div className="empty-list">
              <img src="/IMG_2_B.png" alt="No DONE items" />
              <div>아직 다 한 일이 없어요.</div>
              <div>해야 할 일을 체크해보세요</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
