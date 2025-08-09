import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'

import { DashboardStackRoutes } from './dashboardStack.routes'

export function Routes() {
  const navigationRef = useNavigationContainerRef()

  return (
    <NavigationContainer ref={navigationRef}>
      <DashboardStackRoutes />
    </NavigationContainer>
  )
}
