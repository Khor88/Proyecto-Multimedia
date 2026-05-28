import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonButton,
  IonImg,
  IonAvatar,
  useIonViewWillEnter
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { addOutline, chevronForwardOutline } from 'ionicons/icons';
import api from '../services/api';
import LeagueIcon from '../images/LeagueIcon.png';

const LeaguePage: React.FC = () => {
  const history = useHistory();
  const [leagues, setLeagues] = React.useState<any[]>([]);

  const fetchLeagues = async () => {
    try {
      const response = await api.get('/leagues/my');
      setLeagues(response.data);
    } catch (err) {
      console.error('Error fetching leagues:', err);
    }
  };

  useIonViewWillEnter(() => {
    fetchLeagues();
  });

  const handleLeagueClick = (id: number) => {
    history.push(`/league/${id}`);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/main" />
          </IonButtons>
          <IonTitle style={{ fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Mis Ligas</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" routerLink="/league/create">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        <IonList style={{ background: 'transparent' }}>
          {leagues.map(league => (
            <IonItem 
              key={league.id} 
              button 
              detail={false} 
              lines="none" 
              onClick={() => handleLeagueClick(league.id)}
              style={{ 
                '--background': 'rgba(255,255,255,0.03)', 
                borderRadius: '15px', 
                marginBottom: '12px', 
                border: '1px solid var(--fcx-border-color)' 
              }}
            >
              <IonAvatar slot="start" style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', padding: '5px' }}>
                <IonImg src={LeagueIcon} />
              </IonAvatar>
              <IonLabel>
                <h2 style={{ fontWeight: '700', fontSize: '18px' }}>{league.nombre}</h2>
                <IonText color="medium"><p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{league.division}</p></IonText>
              </IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" color="medium" style={{ fontSize: '18px' }} />
            </IonItem>
          ))}
          {leagues.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <IonText color="medium">No perteneces a ninguna liga todavía.</IonText>
            </div>
          )}
        </IonList>

        <div style={{ height: '80px' }} />
      </IonContent>
    </IonPage>
  );
};

export default LeaguePage;
