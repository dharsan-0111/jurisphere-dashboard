import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Modal } from './Modal'

describe('Modal Component', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
    document.body.style.overflow = 'auto'
  })

  it('renders nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    )
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('renders content when open and calls onClose on close button click', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Test Content</div>
      </Modal>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /close modal/i }))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('has proper ARIA attributes for accessibility', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Modal Title">
        <div>Content</div>
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')
  })
})
