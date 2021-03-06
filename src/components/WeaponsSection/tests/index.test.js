import WeaponsSection from '../index'

import { fromJS } from 'immutable'

import { skillsById } from 'mocks/skills'
import { weapon1, weapon2, weaponsById, newWeaponResponse } from 'mocks/weapons'

const mockHandleSubmit = jest.fn()
const mockOnWeaponChange = jest.fn()
const weapons = fromJS(weaponsById).toJS()
const defaultProps = {
  skills: fromJS(skillsById).toJS(),
  weapons,
  handleSubmit: mockHandleSubmit,
  onWeaponChange: mockOnWeaponChange,
}

const renderComponent = (props = {}) =>
  render(<WeaponsSection {...defaultProps} {...props} />)

describe('<WeaponsSection />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId, queryByTestId } = renderComponent()

    const weaponsSection = getByTestId(/weapons-section/gi)
    expect(weaponsSection).toBeInTheDocument()

    const editButton = queryByTestId(/edit/i)
    expect(editButton).not.toBeInTheDocument()

    const nonExistingNewWeapon = queryByTestId(/new-weapon/i)
    expect(nonExistingNewWeapon).not.toBeInTheDocument()

    Object.values(weapons).forEach(({ id, status }) => {
      const weapon = getByTestId(new RegExp(`weapon-${id}`, 'gi'))
      expect(weapon).toBeInTheDocument()

      const editWeaponButton = queryByTestId(
        status === 'complete' ? `revertButton-${id}` : `completeButton-${id}`,
      )
      expect(editWeaponButton).not.toBeInTheDocument()
    })
  })

  it('should render correctly when isCharacter', () => {
    const props = {
      characterWeapons: { [weapon1]: weapon1 },
      isCharacter: true,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const weaponsSection = getByTestId(/weapons-section/gi)
    expect(weaponsSection).toBeInTheDocument()

    const editButton = queryByTestId(/edit/i)
    expect(editButton).not.toBeInTheDocument()

    const nonExistingNewWeapon = queryByTestId(/new-weapon/i)
    expect(nonExistingNewWeapon).not.toBeInTheDocument()

    Object.values(weapons).forEach(({ id, status }) => {
      if (id === weapon1.id) {
        const weapon = getByTestId(new RegExp(`weapon-${id}`, 'gi'))
        expect(weapon).toBeInTheDocument()

        const editWeaponButton = queryByTestId(
          status === 'complete' ? `revertButton-${id}` : `completeButton-${id}`,
        )
        expect(editWeaponButton).not.toBeInTheDocument()
      } else {
        const weapon = queryByTestId(new RegExp(`weapon-${id}`, 'gi'))
        expect(weapon).not.toBeInTheDocument()
      }
    })
  })

  it('should render correctly when show adding new weapon', () => {
    const props = {
      showAdd: true,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const weaponsSection = getByTestId(/weapons-section/gi)
    expect(weaponsSection).toBeInTheDocument()

    const editButton = getByTestId(/edit/i)
    expect(editButton).toBeInTheDocument()

    const nonExistingNewWeapon = queryByTestId(/new-weapon/i)
    expect(nonExistingNewWeapon).not.toBeInTheDocument()

    Object.values(weapons).forEach(({ id, status }) => {
      const weapon = getByTestId(new RegExp(`weapon-${id}`, 'gi'))
      expect(weapon).toBeInTheDocument()

      const editWeaponButton = queryByTestId(
        status === 'complete' ? `revertButton-${id}` : `completeButton-${id}`,
      )
      expect(editWeaponButton).not.toBeInTheDocument()
    })

    fireEvent.click(editButton)

    const cancelButton = getByTestId(/cancel/i)
    expect(cancelButton).toBeInTheDocument()

    const submitButton = getByTestId(/submit/i)
    expect(submitButton).toBeInTheDocument()

    const newWeapon = getByTestId(/new-weapon/i)
    expect(newWeapon).toBeInTheDocument()

    fireEvent.click(cancelButton)

    const unmountedNewWeapon = queryByTestId(/new-weapon/i)
    expect(unmountedNewWeapon).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
  })

  it('should reset the form on cancel', () => {
    const props = {
      showAdd: true,
    }

    const {
      getByDisplayValue,
      getByPlaceholderText,
      getByTestId,
      queryByDisplayValue,
    } = renderComponent(props)

    const editButton = getByTestId(/edit/i)
    fireEvent.click(editButton)

    const cancelButton = getByTestId(/cancel/i)
    expect(cancelButton).toBeInTheDocument()

    const name = getByPlaceholderText(/weapon's name/i)
    expect(name).toBeInTheDocument()
    fireEvent.change(name, {
      target: {
        value: newWeaponResponse.name,
      },
    })
    const populatedName = getByDisplayValue(`${newWeaponResponse.name}`)
    expect(populatedName).toBeInTheDocument()

    fireEvent.click(cancelButton)

    fireEvent.click(editButton)

    const resetName = queryByDisplayValue(newWeaponResponse.name)
    expect(resetName).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
  })

  it('should render correctly when show adding character weapon', () => {
    const props = {
      showAdd: true,
      isCharacter: true,
      characterWeapons: { [weapon1]: weapon1 },
    }
    const { getByDisplayValue, getByTestId, queryByTestId } = renderComponent(
      props,
    )

    const weaponsSection = getByTestId(/weapons-section/gi)
    expect(weaponsSection).toBeInTheDocument()

    const editButton = getByTestId(/edit/i)
    expect(editButton).toBeInTheDocument()

    const nonExistingWeaponIdSelect = queryByTestId(/weaponId/gi)
    expect(nonExistingWeaponIdSelect).not.toBeInTheDocument()

    fireEvent.click(editButton)

    const newWeapon = queryByTestId(/new-weapon/i)
    expect(newWeapon).not.toBeInTheDocument()

    const weaponIdSelect = getByTestId(/weaponId/gi)
    expect(weaponIdSelect).toBeInTheDocument()
    const weaponIdValue = getByDisplayValue(`${Object.values(weapons)[0].id}`)
    expect(weaponIdValue).toBeInTheDocument()

    const cancelButton = getByTestId(/cancel/i)
    expect(cancelButton).toBeInTheDocument()

    const submitButton = getByTestId(/submit/i)
    expect(submitButton).toBeInTheDocument()

    fireEvent.click(cancelButton)

    const unmountedWeaponIdSelect = queryByTestId(/weaponId/gi)
    expect(unmountedWeaponIdSelect).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
  })

  it('should not break if weapons are empty', () => {
    const props = {
      weapons: {},
    }

    const { getByTestId } = renderComponent(props)

    const weaponsSection = getByTestId(/weapons-section/gi)
    expect(weaponsSection).toBeInTheDocument()
  })

  it('should not break if skills is empty', () => {
    const props = {
      skills: {},
    }
    const { getByTestId } = renderComponent(props)

    const weaponsSection = getByTestId(/weapons-section/gi)
    expect(weaponsSection).toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      deletedWeapons: { [weapon2.id]: true },
      editing: true,
    }
    const { getByTestId } = renderComponent(props)

    Object.values(weapons).forEach(({ id }) => {
      const weapon = getByTestId(new RegExp(`weapon-${id}`, 'gi'))
      expect(weapon).toBeInTheDocument()

      const deleteWeaponButton = getByTestId(`deleteWeaponButton-${id}`)
      expect(deleteWeaponButton).toBeInTheDocument()

      fireEvent.click(deleteWeaponButton)

      expect(mockOnWeaponChange).toHaveBeenCalledWith(
        `deletedWeapons.${id}`,
        id === weapon1.id ? true : false,
      )
    })
  })

  it('should correctly submit new weapon', async () => {
    const props = {
      showAdd: true,
    }
    const {
      getByDisplayValue,
      getByPlaceholderText,
      getByTestId,
    } = renderComponent(props)

    const editButton = getByTestId(/edit/i)
    fireEvent.click(editButton)

    const name = getByPlaceholderText(/weapon's name/i)
    expect(name).toBeInTheDocument()
    fireEvent.change(name, {
      target: {
        value: newWeaponResponse.name,
      },
    })
    const populatedName = getByDisplayValue(`${newWeaponResponse.name}`)
    expect(populatedName).toBeInTheDocument()

    const special = getByPlaceholderText(/special features/i)
    expect(special).toBeInTheDocument()
    fireEvent.change(special, {
      target: {
        value: newWeaponResponse.special,
      },
    })
    const populatedSpecial = getByDisplayValue(`${newWeaponResponse.special}`)
    expect(populatedSpecial).toBeInTheDocument()

    const submitButton = getByTestId(/submit/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
