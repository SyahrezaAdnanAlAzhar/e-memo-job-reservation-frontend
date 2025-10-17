import { useEffect, useMemo } from "react";
import { useTicketTableActions, useTicketTableDateFilters, useTicketTableOldestYear } from "../../../store/ticketTableStore";
import { Combobox, type ComboboxOption } from "../../ui/Combobox";
import { Button } from "../../ui/Button";
import { RotateCcw } from "lucide-react";

const MONTHS: ComboboxOption[] = [
    { value: 1, label: 'Januari' }, { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' }, { value: 4, label: 'April' },
    { value: 5, label: 'Mei' }, { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' }, { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' }, { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' }, { value: 12, label: 'Desember' },
];

export const DateFilter = () => {
    const { fetchOldestYear, setDateFilter } = useTicketTableActions();
    const oldestYear = useTicketTableOldestYear();
    const dateFilters = useTicketTableDateFilters();

    useEffect(() => {
        fetchOldestYear();
    }, [fetchOldestYear]);

    const yearOptions = useMemo(() => {
        if (!oldestYear) return [];
        const currentYear = new Date().getFullYear();
        const years: ComboboxOption[] = [];
        for (let year = currentYear; year >= oldestYear; year--) {
            years.push({ value: year, label: String(year) });
        }
        return years;
    }, [oldestYear]);

    const selectedMonth = MONTHS.find((m) => m.value === dateFilters.month) || null;
    const selectedYear = yearOptions.find((y) => y.value === dateFilters.year) || null;

    const handleReset = () => {
        setDateFilter({ month: null, year: null });
    };

    return (
        <div className="flex items-center gap-4">
            <Combobox
                options={MONTHS}
                value={selectedMonth}
                onChange={(option) => setDateFilter({ month: option ? (option.value as number) : null })}
                placeholder="Semua Bulan"
                className="w-40"
            />
            <Combobox
                options={yearOptions}
                value={selectedYear}
                onChange={(option) => setDateFilter({ year: option ? (option.value as number) : null })}
                placeholder="Semua Tahun"
                className="w-32"
            />
            <Button variant="secondary" size="sm" className="h-10 w-10 p-0" onClick={handleReset}>
                <RotateCcw size={16} />
            </Button>
        </div>
    );
};