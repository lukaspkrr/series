import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from './pages/LoginPage';
import SeriesPage from './pages/SeriesPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
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
    navigationOptions: ({ navigation }) => {
      if (navigation.state.params && navigation.state.params.serieToEdit) {
        return {
          title: navigation.state.params.serieToEdit.title
        }
      }
      return { title: 'Cadastro de série' }
    }
  },
}, {
  defaultNavigationOptions: {
    title: 'Séries',
    headerTintColor: '#262626',
    headerStyle: {
      backgroundColor: '#fff',
      borderTopColor: '#fafafa',
      borderTopWidth: 22,
    },
    headerTitleStyle: {
      color: '#262626',
      fontSize: 20,
    }
  }
})

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;