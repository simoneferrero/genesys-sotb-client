import Favor from '../index'

import { favor1, newFavor } from 'mocks/favors'

const mockHandleSubmit = jest.fn()
const mockSetAdding = jest.fn()
const defaultProps = {
  favor: favor1,
  handleSubmit: mockHandleSubmit,
  setAdding: mockSetAdding,
}

const renderComponent = (props = {}) =>
  render(<Favor {...defaultProps} {...props} />)

describe('<Favor />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly when not adding', () => {
    const {
      getByTestId,
      getByText,
      queryByDisplayValue,
      queryByPlaceholderText,
      queryByTestId,
    } = renderComponent()

    const existingFavor = getByTestId(`favor-${favor1.id}`)
    expect(existingFavor).toBeInTheDocument()

    const form = queryByTestId(/new-favor/i)
    expect(form).not.toBeInTheDocument()

    const type = getByTestId(`favor-${favor1.id}-type`)
    expect(type).toBeInTheDocument()
    const typeValue = getByText(new RegExp(favor1.type, 'i'))
    expect(typeValue).toBeInTheDocument()

    const typeSelect = queryByDisplayValue(/small/i)
    expect(typeSelect).not.toBeInTheDocument()

    const faction = getByTestId(`favor-${favor1.id}-faction`)
    expect(faction).toBeInTheDocument()
    const factionValue = getByText(new RegExp(favor1.faction, 'i'))
    expect(factionValue).toBeInTheDocument()

    const factionSelect = queryByDisplayValue(/jinteki/i)
    expect(factionSelect).not.toBeInTheDocument()

    const description = getByTestId(`favor-${favor1.id}-description`)
    expect(description).toBeInTheDocument()
    const descriptionValue = getByText(favor1.description)
    expect(descriptionValue).toBeInTheDocument()

    const descriptionTextarea = queryByPlaceholderText(/add description.../i)
    expect(descriptionTextarea).not.toBeInTheDocument()

    const cancelButton = queryByTestId('cancel')
    expect(cancelButton).not.toBeInTheDocument()

    const submitButton = queryByTestId(/submit/i)
    expect(submitButton).not.toBeInTheDocument()
  })

  it('should render correctly when adding', async () => {
    const props = {
      adding: true,
      favor: undefined,
    }
    const {
      getByDisplayValue,
      getByPlaceholderText,
      getByTestId,
      queryAllByTestId,
    } = renderComponent(props)

    const existingFavor = queryAllByTestId(/favor-/i)
    expect(existingFavor).toHaveLength(0)

    const form = getByTestId(/new-favor/i)
    expect(form).toBeInTheDocument()

    const typeSelect = getByDisplayValue(/small/i)
    expect(typeSelect).toBeInTheDocument()

    const factionSelect = getByDisplayValue(/jinteki/i)
    expect(factionSelect).toBeInTheDocument()

    const descriptionTextarea = getByPlaceholderText(/add description.../i)
    expect(descriptionTextarea).toBeInTheDocument()

    fireEvent.change(descriptionTextarea, {
      target: {
        value: newFavor.description,
      },
    })
    const populatedDescriptionTextarea = getByDisplayValue(newFavor.description)
    expect(populatedDescriptionTextarea).toBeInTheDocument()

    const cancelButton = getByTestId('cancel')
    expect(cancelButton).toBeInTheDocument()

    fireEvent.click(cancelButton)
    expect(mockSetAdding).toHaveBeenCalledWith(false)

    const submitButton = getByTestId(/submit/i)
    expect(submitButton).toBeInTheDocument()

    fireEvent.click(submitButton)
    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalled()
    })
  })
})
