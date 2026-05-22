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
  IonBadge,
  IonIcon,
  IonButton,
  IonImg
} from '@ionic/react';
import { settingsOutline, personOutline } from 'ionicons/icons';

// Import icons
import LeagueIcon from '../images/LeagueIcon.png';

const LeaguePage: React.FC = () => {
  const members = [
    { id: 1, name: 'Pablo Méndez', role: 'Presidente' },
    { id: 2, name: 'Lucas García', role: 'Luchador' },
    { id: 3, name: 'Ana Belén', role: 'Árbitro' },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/main" />
          </IonButtons>
          <IonTitle>League</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={settingsOutline} color="primary" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg src={LeagueIcon} className="fcx-page-icon" />
        
        <IonList style={{ background: 'transparent' }}>
          {members.map(member => (
            <IonItem key={member.id} lines="full">
              <IonIcon icon={personOutline} slot="start" color="medium" />
              <IonLabel>
                <h2 style={{ fontWeight: '500' }}>{member.name}</h2>
              </IonLabel>
              <IonBadge color="dark" slot="end" style={{ border: '1px solid var(--fcx-border-color)', color: 'var(--ion-color-primary)' }}>
                {member.role}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>

        <div className="ion-padding" style={{ marginTop: '20px' }}>
          <IonButton expand="block" fill="outline" color="primary">
            League Settings
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LeaguePage;
