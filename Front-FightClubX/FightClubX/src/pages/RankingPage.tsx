import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonText,
  IonImg
} from '@ionic/react';

// Import icons
import TournamentIcon from '../images/TournamentIcon.png';

const RankingPage: React.FC = () => {
  const ranking = [
    { pos: 1, name: 'Lucas García', wins: 15, losses: 2, points: 450 },
    { pos: 2, name: 'Pablo Méndez', wins: 12, losses: 4, points: 380 },
    { pos: 3, name: 'Mario Solis', wins: 10, losses: 5, points: 310 },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Ranking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg src={TournamentIcon} className="fcx-page-icon" />
        
        <IonList style={{ background: 'transparent' }}>
          {ranking.map(fighter => (
            <IonItem key={fighter.pos} lines="full" style={{ '--padding-top': '8px', '--padding-bottom': '8px' }}>
              <IonText style={{ width: '40px', fontSize: '18px', fontWeight: '800', color: fighter.pos === 1 ? 'var(--ion-color-primary)' : '#fff' }}>
                {fighter.pos}
              </IonText>
              <IonLabel>
                <h2 style={{ fontWeight: '500' }}>{fighter.name}</h2>
                <p style={{ color: 'var(--fcx-text-muted)' }}>{fighter.wins}W - {fighter.losses}L</p>
              </IonLabel>
              <IonBadge color="dark" slot="end" style={{ border: '1px solid var(--fcx-border-color)' }}>
                {fighter.points} pts
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RankingPage;
