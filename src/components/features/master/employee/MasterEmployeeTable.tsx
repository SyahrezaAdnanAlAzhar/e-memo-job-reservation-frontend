import { useMemo } from 'react';
import { useMasterEmployee, useMasterEmployeeActions } from '../../../../store/masterEmployeeStore';
import { ToggleCell } from '../ToggleCell';
import { CreateEditEmployeeModal } from './CreateEditEmployeeModal';
import { RelationCell } from './RelationCell';

const TableHeader = () => (
    <thead className="bg-mono-light-grey/70">
        <tr>
            <th className="px-4 py-3 text-left">NPK</th>
            <th className="px-4 py-3 text-left">Nama</th>
            <th className="px-4 py-3 text-left">Posisi</th>
            <th className="px-4 py-3 text-left">Departemen</th>
            <th className="px-4 py-3 text-left">Area</th>
            <th className="px-4 py-3 text-center">Aktif</th>
            <th className="px-4 py-3 text-right">Aksi</th>
        </tr>
    </thead>
);

export const MasterEmployeeTable = () => {
    const { employees, options, status } = useMasterEmployee();
    const { updateEmployee, updateEmployeeStatus, fetchAreasForDepartment } = useMasterEmployeeActions();

    const toComboboxOption = (items: { id: number; name: string }[]) => items.map(i => ({ value: i.id, label: i.name }));

    const positionOptions = useMemo(() => toComboboxOption(options.positions), [options.positions]);
    const departmentOptions = useMemo(() => toComboboxOption(options.departments), [options.departments]);
    const areaOptions = useMemo(() => toComboboxOption(options.areas), [options.areas]);

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <CreateEditEmployeeModal mode="create" />
            </div>
            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full table-auto">
                    <TableHeader />
                    <tbody>
                        {status === 'loading' && <tr><td colSpan={7} className="p-4 text-center">Loading...</td></tr>}
                        {employees.map(emp => (
                            <tr key={emp.npk} className="border-b">
                                <td className="px-4 py-3">{emp.npk}</td>
                                <td className="px-4 py-3">{emp.name}</td>
                                <td className="px-4 py-3">
                                    <RelationCell
                                        title={`Ganti Posisi untuk ${emp.name}`}
                                        displayName={emp.position.name}
                                        options={positionOptions}
                                        currentValue={positionOptions.find(o => o.value === emp.position.id) || null}
                                        onSave={async (opt) => updateEmployee(emp.npk, { employee_position_id: opt?.value })}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <RelationCell
                                        title={`Ganti Departemen untuk ${emp.name}`}
                                        displayName={emp.department_name}
                                        options={departmentOptions}
                                        currentValue={departmentOptions.find(o => o.value === emp.department_id) || null}
                                        onSave={async (opt) => updateEmployee(emp.npk, { department_id: opt?.value })}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <RelationCell
                                        title={`Ganti Area untuk ${emp.name}`}
                                        displayName={emp.area_name}
                                        options={areaOptions}
                                        currentValue={areaOptions.find(o => o.value === (emp.area_id.Valid ? emp.area_id.Int64 : null)) || null}
                                        onSave={async (opt) => updateEmployee(emp.npk, { area_id: opt?.value })}
                                        onOpen={() => fetchAreasForDepartment(emp.department_id)}
                                    />
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <ToggleCell
                                        initialValue={emp.is_active}
                                        onToggle={(newValue) => updateEmployeeStatus(emp.npk, newValue)}
                                    />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <CreateEditEmployeeModal mode="edit" employee={emp} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};