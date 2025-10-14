import { useMemo } from 'react';
import { SearchBar } from '../../../ui/SearchBar';
import { useMasterEmployee, useMasterEmployeeActions } from '../../../../store/masterEmployeeStore';
import { Combobox, type ComboboxOption } from '../../../ui/Combobox';
import { EmployeeFilterModal } from './EmployeeFilterModal';

export const EmployeeToolbar = () => {
    const { filters, options } = useMasterEmployee();
    const { setFilters } = useMasterEmployeeActions();

    const handleSearch = (query: string) => {
        setFilters({ search: query });
    };

    const departmentOptions: ComboboxOption[] = useMemo(() => [
        { value: 'all', label: 'Semua Departemen' },
        ...options.departments.map(d => ({ value: d.id, label: d.name })),
    ], [options.departments]);

    const selectedDepartment = departmentOptions.find(d => d.value === filters.department_id) || departmentOptions[0];

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
                <Combobox
                    options={departmentOptions}
                    value={selectedDepartment}
                    onChange={(opt) => setFilters({ department_id: opt?.value === 'all' ? null : opt?.value as number })}
                />
            </div>
            <div className="md:col-span-7">
                <SearchBar
                    value={filters.search || ''}
                    onSearch={handleSearch}
                    placeholder="Cari berdasarkan NPK atau Nama..."
                />
            </div>
            <div className="md:col-span-2">
                <EmployeeFilterModal />
            </div>
        </div>
    );
};