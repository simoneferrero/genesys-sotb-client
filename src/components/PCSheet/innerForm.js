import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { playerCharacterType } from 'types/playersCharacters'

import * as yup from 'yup'

import { Form } from 'formik'

import FormButtons from 'components/FormButtons'
import PCSummary from 'components/PCSummary'

import { StyledSectionWrapper } from './styles'

// TODO: test me!
const InnerForm = ({ handleSubmit, isSubmitting, values }) => {
  const [editing, setEditing] = useState(false)

  return (
    <Form data-testid="pc-sheet" onSubmit={handleSubmit}>
      <FormButtons
        disabled={isSubmitting}
        editing={editing}
        setEditing={setEditing}
      />
      <StyledSectionWrapper
        as={PCSummary}
        hideLink
        sectionTitle="General"
        {...values}
      />
    </Form>
  )
}

InnerForm.validationSchema = yup.object({
  // TODO: add other fields
  name: yup.string().required('required'),
})

InnerForm.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  touched: PropTypes.object.isRequired,
  values: playerCharacterType.isRequired,
}

export default InnerForm
