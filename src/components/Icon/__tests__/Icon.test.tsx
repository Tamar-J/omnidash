import { cleanup, fireEvent, render, screen } from 'test-utils'

import { IconSVG, TouchableIcon } from '../Icon'
import { iconSVGMap, IconSVGMapKeyType } from '../iconPresets'

import { IconSizesKeyType } from '@/themes'

describe('<TouchableIcon />', () => {
  it('should call handlePressIcon when pressed', async () => {
    const handlePressMock = jest.fn()
    const touchableIconId = 'touchable-icon'

    render(<TouchableIcon iconName="gearSix" handlePressIcon={handlePressMock} testID={touchableIconId} />)

    const touchableIcon = await screen.findByTestId(touchableIconId)

    fireEvent.press(touchableIcon)

    expect(handlePressMock).toHaveBeenCalled()
  })

  it('should apply correct size when boxDimension is provided', async () => {
    const handlePressMock = jest.fn()
    const touchableIconId = 'touchable-icon'
    const iconSize: IconSizesKeyType = 'large'
    const boxDimension = 40

    render(
      <TouchableIcon
        iconName="gearSix"
        boxDimension={boxDimension}
        iconSize={iconSize}
        iconColor="highlightPrimary"
        handlePressIcon={handlePressMock}
        testID={touchableIconId}
      />
    )

    const touchableIcon = await screen.findByTestId(touchableIconId)

    expect(touchableIcon).toHaveStyle({ width: boxDimension, height: boxDimension })
  })
})

describe('<IconSVG />', () => {
  afterEach(cleanup)
  it.each(Object.keys(iconSVGMap))('should successfully render the "%s" icon', async (iconName) => {
    render(<IconSVG iconName={iconName as IconSVGMapKeyType} />)

    const icon = await screen.findByTestId('icon-svg')

    expect(icon).toBeOnTheScreen()
  })
})
