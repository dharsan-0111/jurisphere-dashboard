// hooks/useCustomers.ts
import { fetchCustomers } from '@/lib/api/customer/customer_api';
import { useQuery } from '@tanstack/react-query';

export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
}
