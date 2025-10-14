import { useState } from 'react';
import { EditRelationModal } from './EditRelationModal';
import { Pencil } from 'lucide-react';
import type { ComboboxOption } from '../../../ui/Combobox';
import { Text } from '../../../ui/Text';

interface RelationCellProps {
    title: string;
    displayName: string | null;
    options: ComboboxOption[];
    currentValue: ComboboxOption | null;
    onSave: (selectedOption: ComboboxOption | null) => Promise<boolean>;
    onOpen?: () => void;
}

export const RelationCell = ({ title, displayName, options, currentValue, onSave, onOpen }: RelationCellProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => {
        if (onOpen) {
            onOpen(); 
        }
        setIsModalOpen(true);
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="group flex items-center gap-2 text-left"
            >
                <Text>{displayName || '-'}</Text>
                <Pencil size={14} className="text-mono-grey opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            <EditRelationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                options={options}
                currentValue={currentValue}
                onSave={onSave}
                
            />
        </>
    );
};