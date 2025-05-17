import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DataTable } from './Table'
import type { ColumnDef } from '@tanstack/react-table'
import userEvent from '@testing-library/user-event'

// Test data types
interface TestData {
  id: string
  name: string
  email: string
  status: string
}

describe('Table Component', () => {
  // Sample data for testing
  const testData: TestData[] = [
    { id: '1', name: 'John', email: 'john@example.com', status: 'active' },
    { id: '2', name: 'Alice', email: 'alice@example.com', status: 'inactive' },
    { id: '3', name: 'Bob', email: 'bob@example.com', status: 'active' },
    { id: '4', name: 'Zoe', email: 'zoe@example.com', status: 'inactive' }
  ]

  // Column definitions
  const columns: ColumnDef<TestData, any>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ]

  it('renders skeleton rows when loading', () => {
    render(<DataTable columns={columns} data={[]} loading={true} />)
    
    // Check if skeleton components are rendered
    const skeletons = screen.getAllByTestId('skeleton')
    expect(skeletons).toHaveLength(25 * columns.length) // pageSize * number of columns
  })

  it('displays "No data" message when data array is empty', () => {
    render(<DataTable columns={columns} data={[]} />)
    
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders data rows correctly', () => {
    render(<DataTable columns={columns} data={testData} />)
    
    // Get all rows except header
    const rows = screen.getAllByRole('row').slice(1)
    
    // Check if all data is rendered in the correct cells
    testData.forEach((item, index) => {
      const row = rows[index]
      const cells = within(row).getAllByRole('cell')
      
      expect(cells[0]).toHaveTextContent(item.name)
      expect(cells[1]).toHaveTextContent(item.email)
      expect(cells[2]).toHaveTextContent(item.status)
    })
  })

  it('sorts data when clicking column headers', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={testData} />)
    
    // Get the Name column header
    const nameHeader = screen.getByText('Name')
    
    // Click for ascending sort
    await user.click(nameHeader)
    
    // Get all rows except header and check their name cells
    let rows = screen.getAllByRole('row').slice(1)
    expect(within(rows[0]).getAllByRole('cell')[0]).toHaveTextContent('Alice')
    expect(within(rows[1]).getAllByRole('cell')[0]).toHaveTextContent('Bob')
    expect(within(rows[2]).getAllByRole('cell')[0]).toHaveTextContent('John')
    expect(within(rows[3]).getAllByRole('cell')[0]).toHaveTextContent('Zoe')
    
    // Click again for descending sort
    await user.click(nameHeader)
    
    // Check if data is sorted alphabetically (Z to A)
    rows = screen.getAllByRole('row').slice(1)
    expect(within(rows[0]).getAllByRole('cell')[0]).toHaveTextContent('Zoe')
    expect(within(rows[1]).getAllByRole('cell')[0]).toHaveTextContent('John')
    expect(within(rows[2]).getAllByRole('cell')[0]).toHaveTextContent('Bob')
    expect(within(rows[3]).getAllByRole('cell')[0]).toHaveTextContent('Alice')
  })
})
