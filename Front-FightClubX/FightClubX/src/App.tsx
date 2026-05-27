import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, calendarOutline, trophyOutline, personOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CalendarPage from './pages/CalendarPage';
import RankingPage from './pages/RankingPage';
import UserPage from './pages/UserPage';
import SettingsPage from './pages/SettingsPage';
import CombatPage from './pages/CombatPage';
import TournamentPage from './pages/TournamentPage';
import TournamentCombatPage from './pages/TournamentCombatPage';
import LeaguePage from './pages/LeaguePage';
import LeagueDetailPage from './pages/LeagueDetailPage';
import LeagueCreatePage from './pages/LeagueCreatePage';
import LeagueConfigPage from './pages/LeagueConfigPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route path="/tabs">
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tabs/main" component={MainPage} />
              <Route exact path="/tabs/calendar" component={CalendarPage} />
              <Route exact path="/tabs/user" component={UserPage} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="main" href="/tabs/main">
                <IonIcon icon={homeOutline} />
                <IonLabel>Inicio</IonLabel>
              </IonTabButton>
              <IonTabButton tab="calendar" href="/tabs/calendar">
                <IonIcon icon={calendarOutline} />
                <IonLabel>Eventos</IonLabel>
              </IonTabButton>
              <IonTabButton tab="user" href="/tabs/user">
                <IonIcon icon={personOutline} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/combat" component={CombatPage} />
        <Route exact path="/tournament" component={TournamentPage} />
        <Route exact path="/tournament-combat" component={TournamentCombatPage} />
        <Route exact path="/league/create" component={LeagueCreatePage} />
        <Route exact path="/league/:id(\d+)/config" component={LeagueConfigPage} />
        <Route exact path="/league/:id(\d+)/ranking" component={RankingPage} />
        <Route exact path="/league/:id(\d+)" component={LeagueDetailPage} />
        <Route exact path="/league" component={LeaguePage} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
