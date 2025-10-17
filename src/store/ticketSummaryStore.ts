import { create } from 'zustand';
import { HTTP_BASE_URL } from '../config/api';
import { apiClient } from '../lib/apiClient';

export interface TicketSummaryItem {
    status_id: number;
    status_name: string;
    hex_code: string;
    total: number;
}

interface TicketSummaryState {
    summaryData: TicketSummaryItem[];
    status: 'idle' | 'loading' | 'success' | 'error';
}

interface TicketSummaryActions {
    fetchSummaryData: (params: {
        departmentId: number | null;
        month: number | null;
        year: number | null;
    }) => Promise<void>;
    reset: () => void;
}

type TicketSummaryStore = TicketSummaryState & {
    actions: TicketSummaryActions;
};

const initialState: TicketSummaryState = {
    summaryData: [],
    status: 'idle',
};

export const useTicketSummaryStore = create<TicketSummaryStore>((set) => ({
    ...initialState,

    actions: {
        fetchSummaryData: async ({ departmentId, month, year }) => {
            if (departmentId === null) {
                set({ summaryData: [], status: 'idle' });
                return;
            }

            set({ status: 'loading' });

            const params = new URLSearchParams({
                section_id: '2',
                department_id: String(departmentId),
            });

            if (year) params.append('year', String(year));
            if (month) params.append('month', String(month));

            try {
                const response = await apiClient(`${HTTP_BASE_URL}/reports/ticket-summary?${params.toString()}`);

                if (!response.ok) throw new Error('Failed to fetch ticket summary');

                const { data } = await response.json();
                const sortedData = [...data].sort((a, b) => a.status_id - b.status_id);
                set({ summaryData: sortedData, status: 'success' });
            } catch (error) {
                console.error('Error fetching ticket summary:', error);
                set({ status: 'error' });
            }
        },
        reset: () => {
            initialState
        }
    },
}));

export const useTicketSummary = () => useTicketSummaryStore((state) => state.summaryData);
export const useTicketSummaryStatus = () => useTicketSummaryStore((state) => state.status);
export const useTicketSummaryActions = () => useTicketSummaryStore((state) => state.actions);