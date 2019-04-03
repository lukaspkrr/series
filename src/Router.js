import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from './pages/LoginPage';
import SeriesPage from './pages/SeriesPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';

const AppNavigator = createStackNavigator({
  'Main': {
    screen: SeriesPage,
    navigationOptions: {
      title: 'Minhas séries'
    }
  },
  'SerieDetail': {
    screen: SerieDetailPage,
    navigationOptions: ({ navigation }) => {
      const { serie } =  navigation.state.params;
      return {
        title: serie.title
      }
    }
  },
  'SerieForm': {
    screen: SerieFormPage,
    navigationOptions: {
        title: 'Serie Form'
      }
  },
  'Login': {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
}, {
  defaultNavigationOptions: {
    title: 'Séries',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTitleStyle: {
      color: '#DB202C',
      fontSize: 30
    }
  }
})

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;