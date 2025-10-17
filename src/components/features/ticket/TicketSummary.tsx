import { useEffect } from 'react';
import { TicketSummaryBar } from './TicketSummaryBar';
import { MessageBar } from '../../ui/MessageBar';
import { Text } from '../../ui/Text';
import { useSelectedDepartmentId } from '../../../store/departmentStore';
import { useTicketSummary, useTicketSummaryActions, useTicketSummaryStatus } from '../../../store/ticketSummaryStore';
import { useTicketTableDateFilters } from '../../../store/ticketTableStore';

export const TicketSummary = () => {
    const selectedDepartmentId = useSelectedDepartmentId();
    const dateFilters = useTicketTableDateFilters();
    const summaryData = useTicketSummary();
    const status = useTicketSummaryStatus();
    const { fetchSummaryData } = useTicketSummaryActions();

    useEffect(() => {
        if (selectedDepartmentId) {
            fetchSummaryData({
                departmentId: selectedDepartmentId,
                month: dateFilters.month,
                year: dateFilters.year,
            });
        }
    }, [selectedDepartmentId, dateFilters, fetchSummaryData]);

    const showYearWarning = dateFilters.month !== null && dateFilters.year === null;

    return (
        <div className="space-y-4">
            {showYearWarning && (
                <MessageBar variant="warning">
                    Harap pilih tahun untuk melihat data bulan yang spesifik.
                </MessageBar>
            )}

            <div className="flex flex-wrap items-center justify-between gap-12 rounded-lg px-24">
                <div className="flex-grow">
                    <TicketSummaryBar data={summaryData} />
                </div>
            </div>


            {status === 'loading' && <Text className="text-center">Loading summary...</Text>}
            {status === 'error' && <Text color="add-red" className="text-center">Failed to load summary.</Text>}
        </div>
    );
};