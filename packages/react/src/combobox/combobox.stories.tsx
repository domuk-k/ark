import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Portal } from '..'
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptionGroup,
  ComboboxOptionGroupLabel,
  ComboboxPositioner,
  ComboboxTrigger,
  type ComboboxOptionProps,
  type ComboboxProps,
} from './'
import './combobox.css'

type ComboboxType = typeof Combobox

const meta: Meta<ComboboxType> = {
  title: 'Combobox',
  component: Combobox,
}

export default meta

const comboboxData: Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[] = [
  { label: 'ReactJS', value: 'react' },
  { label: 'SolidJS', value: 'solid' },
  { label: 'VueJS', value: 'vue' },
  { label: 'AngularJS', value: 'angular', disabled: true },
]

export const Basic = () => {
  const [options, setOptions] = useState(comboboxData)

  const handleInputChange: ComboboxProps['onInputChange'] = ({ value }) => {
    const filtered = comboboxData.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase()),
    )
    setOptions(filtered.length > 0 ? filtered : comboboxData)
  }

  return (
    <Combobox onInputChange={handleInputChange}>
      {({ isInputValueEmpty, isOpen }) => (
        <>
          <ComboboxLabel>JS Frameworks</ComboboxLabel>
          <ComboboxControl>
            <ComboboxInput />
            <ComboboxTrigger>▼</ComboboxTrigger>
            <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
          </ComboboxControl>
          {isInputValueEmpty && !isOpen && <div>Give me you favorite framework!</div>}
          <Portal>
            <ComboboxPositioner>
              <ComboboxContent>
                <ComboboxOptionGroup id="framework">
                  <ComboboxOptionGroupLabel htmlFor="framework">
                    Frameworks
                  </ComboboxOptionGroupLabel>
                  {options.map((item, index) => (
                    <ComboboxOption
                      key={`${item.value}:${index}`}
                      label={item.label}
                      value={item.value}
                      disabled={item?.disabled}
                    >
                      {item.label}
                    </ComboboxOption>
                  ))}
                </ComboboxOptionGroup>
              </ComboboxContent>
            </ComboboxPositioner>
          </Portal>
        </>
      )}
    </Combobox>
  )
}
