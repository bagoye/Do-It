"use client";

import { FC, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchItemById, updateItem, deleteItem } from '@/utils/api';
import CheckListDetail from '@/components/CheckListDetail';

interface ChecklistItem {
  id: string;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
}

const ItemDetail: FC = () => {
    const router = useRouter();
    const params = useParams() as { itemId: string };
    const itemId = params?.itemId;
    const [item, setItem] = useState<ChecklistItem | null>(null);

    useEffect(() => {
        if (itemId) {
            const loadItem = async () => {
                try {
                    const data = await fetchItemById(itemId);
                    setItem(data);
                } catch (error) {
                    console.error('Error fetching item:', error);
                }
            };
            loadItem();
        } else {
            console.log('No itemId found in params');
        }
    }, [itemId]);

    const handleUpdate = async (data: any) => {
        if (item) {
            try {
                await updateItem(item.id, data);
                router.push('/');
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

    const handleDelete = async () => {
        if (item) {
            try {
                await deleteItem(item.id);
                router.push('/');
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    if (!item) return <div>Loading...</div>;

    return (
        <>
            <CheckListDetail
                item={item}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </>
    );
};

export default ItemDetail;
