import { useEffect, useMemo, useState } from "react";
import { Combobox, type ComboboxOption } from "../../../ui/Combobox";
import { useMasterEmployee, useMasterEmployeeActions } from "../../../../store/masterEmployeeStore";
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "../../../ui/Modal";
import { Button } from "../../../ui/Button";
import { Filter } from "lucide-react";

const ACTIVE_OPTIONS: ComboboxOption[] = [
    { value: 'true', label: 'Aktif' },
    { value: 'false', label: 'Tidak Aktif' },
];

export const EmployeeFilterModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { filters, options } = useMasterEmployee();
    const { setFilters, fetchAreasForDepartment } = useMasterEmployeeActions();

    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters);
            if (filters.department_id) {
                fetchAreasForDepartment(filters.department_id);
            }
        }
    }, [isOpen, filters, fetchAreasForDepartment]);

    const positionOptions = useMemo(() => options.positions.map(p => ({ value: p.id, label: p.name })), [options.positions]);
    const areaOptions = useMemo(() => options.areas.map(a => ({ value: a.id, label: a.name })), [options.areas]);

    const handleApply = () => {
        setFilters(localFilters);
        setIsOpen(false);
    };

    const handleReset = () => {
        const resetFilters = {
            area_id: null,
            employee_position_id: null,
            is_active: null,
        };
        setLocalFilters(prev => ({ ...prev, ...resetFilters }));
        setFilters(resetFilters);
        setIsOpen(false);
    };

    return (
        <Modal open={isOpen} onOpenChange={setIsOpen}>
            <ModalTrigger asChild>
                <Button variant="secondary" leftIcon={<Filter size={16} />}>
                    Filter Lanjutan
                </Button>
            </ModalTrigger>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Filter Karyawan Lanjutan</ModalTitle>
                </ModalHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <label>Posisi</label>
                        <Combobox
                            options={positionOptions}
                            value={positionOptions.find(o => o.value === localFilters.employee_position_id) || null}
                            onChange={opt => setLocalFilters(prev => ({ ...prev, employee_position_id: opt?.value as number | null }))}
                        />
                    </div>
                    <div>
                        <label>Area</label>
                        <Combobox
                            options={areaOptions}
                            value={areaOptions.find(o => o.value === localFilters.area_id) || null}
                            onChange={opt => setLocalFilters(prev => ({ ...prev, area_id: opt?.value as number | null }))}
                            disabled={!filters.department_id}
                            placeholder={!filters.department_id ? 'Pilih departemen terlebih dahulu' : 'Pilih area'}
                        />
                    </div>
                    <div>
                        <label>Status Aktif</label>
                        <Combobox
                            options={ACTIVE_OPTIONS}
                            value={ACTIVE_OPTIONS.find(o => String(o.value) === String(localFilters.is_active)) || null}
                            onChange={opt => setLocalFilters(prev => ({ ...prev, is_active: opt ? opt.value === 'true' : null }))}
                        />
                    </div>
                </div>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleReset}>Reset</Button>
                    <Button onClick={handleApply}>Terapkan</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};