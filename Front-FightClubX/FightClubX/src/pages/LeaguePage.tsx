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
  IonAvatar
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { addOutline, chevronForwardOutline } from 'ionicons/icons';
import { dummyLeagues } from '../data/leagueData';

const LeaguePage: React.FC = () => {
  const history = useHistory();

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
            <IonButton color="primary">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        <IonList style={{ background: 'transparent' }}>
          {dummyLeagues.map(league => (
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
                <IonImg src={league.image} />
              </IonAvatar>
              <IonLabel>
                <h2 style={{ fontWeight: '700', fontSize: '18px' }}>{league.name}</h2>
                <IonText color="medium"><p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{league.division}</p></IonText>
              </IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" color="medium" style={{ fontSize: '18px' }} />
            </IonItem>
          ))}
        </IonList>

        <div style={{ height: '80px' }} />
      </IonContent>
    </IonPage>
  );
};

export default LeaguePage;
