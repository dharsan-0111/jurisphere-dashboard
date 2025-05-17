import { Customer } from "@/types/customer";

export async function fetchCustomers(): Promise<Customer[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${baseUrl}/customers`);

    if (!res.ok) {
        throw new Error('Failed to fetch customers');
    }

    return res.json();
}
