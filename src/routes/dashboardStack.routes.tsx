import { createStackNavigator } from '@react-navigation/stack'

import { HomeStackParamList } from '@/@types/navigation'
import { Home } from '@/screens/Home'
import { Feed, FeedArticle } from '@/features/feed/screens'

export function DashboardStackRoutes() {
  const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="feed" component={Feed} />
      <Screen name="feedArticle" component={FeedArticle} />
    </Navigator>
  )
}
