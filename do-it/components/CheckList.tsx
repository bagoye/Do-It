import React, { FC } from 'react';
import { useRouter } from 'next/navigation';

interface CheckListItem {
  id: string;
  name: string;
  isCompleted: boolean;
}

interface CheckListProps {
  items: CheckListItem[];
  onToggle: (id: string) => void;
}

const CheckList: FC<CheckListProps> = ({ items, onToggle }) => {
  const router = useRouter();

  const handleItemClick = (id: string) => {
    router.push(`/items/${id}`);
  };

  return (
    <div className="checklist">
      {items.map((item) => (
        <div key={item.id} className={`checklist-item ${item.isCompleted ? 'completed' : ''}`}>
          <img
            src={item.isCompleted ? "/check2.png" : "/check1.png"}
            alt="Check"
            onClick={() => onToggle(item.id)}
            className="check-icon"
          />
          <span onClick={() => handleItemClick(item.id)}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckList;
