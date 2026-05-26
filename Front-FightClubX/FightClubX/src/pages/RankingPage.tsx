import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonCardContent,
  IonAvatar
} from '@ionic/react';
import { trophyOutline, medalOutline, statsChartOutline, personOutline, chevronUpOutline } from 'ionicons/icons';

const RankingPage: React.FC = () => {
  const ranking = [
    { pos: 1, name: 'Lucas García', wins: 15, losses: 2, points: 450, trend: 'up' },
    { pos: 2, name: 'Pablo Méndez', wins: 12, losses: 4, points: 380, trend: 'up' },
    { pos: 3, name: 'Mario Solis', wins: 10, losses: 5, points: 310, trend: 'stable' },
    { pos: 4, name: 'Elena Rivas', wins: 9, losses: 6, points: 290, trend: 'down' },
    { pos: 5, name: 'Carlos Ruiz', wins: 8, losses: 7, points: 250, trend: 'up' },
  ];

  const topThree = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  const getRankColor = (pos: number) => {
    if (pos === 1) return '#FFD700'; // Gold
    if (pos === 2) return '#C0C0C0'; // Silver
    if (pos === 3) return '#CD7F32'; // Bronze
    return 'var(--fcx-text-muted)';
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle style={{ fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Ranking Global</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        {/* Podium Section */}
        <div style={{ marginBottom: '40px', marginTop: '20px' }}>
          <IonGrid>
            <IonRow className="ion-align-items-end ion-text-center">
              {/* 2nd Place */}
              <IonCol size="4">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IonAvatar style={{ width: '60px', height: '60px', border: `3px solid ${getRankColor(2)}`, padding: '3px', background: '#000', marginBottom: '10px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <IonIcon icon={personOutline} style={{ fontSize: '30px', color: '#fff' }} />
                    </div>
                  </IonAvatar>
                  <IonText style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{topThree[1].name}</IonText>
                  <IonText color="medium" style={{ fontSize: '12px' }}>{topThree[1].points} pts</IonText>
                  <div style={{ height: '70px', width: '100%', background: 'linear-gradient(to top, rgba(192, 192, 192, 0.3), transparent)', borderRadius: '10px 10px 0 0', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10px' }}>
                    <IonText style={{ color: getRankColor(2), fontWeight: '900', fontSize: '20px' }}>2</IonText>
                  </div>
                </div>
              </IonCol>

              {/* 1st Place */}
              <IonCol size="4">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <IonIcon icon={trophyOutline} color="warning" style={{ fontSize: '24px', position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)' }} />
                    <IonAvatar style={{ width: '85px', height: '85px', border: `4px solid ${getRankColor(1)}`, padding: '4px', background: '#000', marginBottom: '10px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <IonIcon icon={personOutline} style={{ fontSize: '40px', color: '#fff' }} />
                        </div>
                    </IonAvatar>
                  </div>
                  <IonText style={{ fontWeight: '900', fontSize: '16px', color: 'var(--ion-color-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{topThree[0].name}</IonText>
                  <IonText color="medium" style={{ fontSize: '13px', fontWeight: 'bold' }}>{topThree[0].points} pts</IonText>
                  <div style={{ height: '100px', width: '100%', background: 'linear-gradient(to top, rgba(255, 61, 113, 0.4), transparent)', borderRadius: '12px 12px 0 0', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10px' }}>
                    <IonText style={{ color: getRankColor(1), fontWeight: '900', fontSize: '28px' }}>1</IonText>
                  </div>
                </div>
              </IonCol>

              {/* 3rd Place */}
              <IonCol size="4">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IonAvatar style={{ width: '55px', height: '55px', border: `3px solid ${getRankColor(3)}`, padding: '3px', background: '#000', marginBottom: '10px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <IonIcon icon={personOutline} style={{ fontSize: '28px', color: '#fff' }} />
                    </div>
                  </IonAvatar>
                  <IonText style={{ fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{topThree[2].name}</IonText>
                  <IonText color="medium" style={{ fontSize: '11px' }}>{topThree[2].points} pts</IonText>
                  <div style={{ height: '50px', width: '100%', background: 'linear-gradient(to top, rgba(205, 127, 50, 0.3), transparent)', borderRadius: '10px 10px 0 0', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10px' }}>
                    <IonText style={{ color: getRankColor(3), fontWeight: '900', fontSize: '18px' }}>3</IonText>
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Stats Summary Header */}
        <IonGrid style={{ marginBottom: '20px' }}>
            <IonRow style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '10px', border: '1px solid var(--fcx-border-color)' }}>
                <IonCol className="ion-text-center">
                    <IonText color="medium" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Total Luchadores</IonText>
                    <IonText><h4 style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>128</h4></IonText>
                </IonCol>
                <div style={{ width: '1px', background: 'var(--fcx-border-color)', margin: '5px 0' }} />
                <IonCol className="ion-text-center">
                    <IonText color="medium" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Media Puntos</IonText>
                    <IonText><h4 style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>215</h4></IonText>
                </IonCol>
                <div style={{ width: '1px', background: 'var(--fcx-border-color)', margin: '5px 0' }} />
                <IonCol className="ion-text-center">
                    <IonText color="medium" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Combates/Mes</IonText>
                    <IonText><h4 style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>42</h4></IonText>
                </IonCol>
            </IonRow>
        </IonGrid>

        <IonText color="medium">
          <h3 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', paddingLeft: '5px' }}>Tabla de Clasificación</h3>
        </IonText>

        <IonList style={{ background: 'transparent' }}>
          {rest.map(fighter => (
            <IonCard key={fighter.pos} style={{ 
              margin: '0 0 10px 0', 
              borderRadius: '15px', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--fcx-border-color)',
              boxShadow: 'none'
            }}>
              <IonCardContent style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '35px', textAlign: 'center', marginRight: '10px' }}>
                    <IonText style={{ fontWeight: '900', fontSize: '18px', color: 'var(--fcx-text-muted)' }}>{fighter.pos}</IonText>
                  </div>
                  <IonAvatar style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', marginRight: '15px', padding: '5px' }}>
                    <IonIcon icon={personOutline} style={{ fontSize: '30px', color: '#fff' }} />
                  </IonAvatar>
                  <div style={{ flex: 1 }}>
                    <IonText><h2 style={{ fontWeight: '700', fontSize: '16px', margin: '0' }}>{fighter.name}</h2></IonText>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <IonText color="medium" style={{ fontSize: '12px' }}>{fighter.wins}W - {fighter.losses}L</IonText>
                        <div style={{ width: '3px', height: '3px', background: 'var(--fcx-text-muted)', borderRadius: '50%' }} />
                        <IonText color="primary" style={{ fontSize: '12px', fontWeight: 'bold' }}>{Math.round((fighter.wins / (fighter.wins + fighter.losses)) * 100)}% Win Rate</IonText>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <IonText style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>{fighter.points}</IonText>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px' }}>
                        <IonIcon icon={chevronUpOutline} color={fighter.trend === 'up' ? 'success' : fighter.trend === 'down' ? 'danger' : 'medium'} style={{ fontSize: '10px' }} />
                        <IonText style={{ fontSize: '10px', color: 'var(--fcx-text-muted)' }}>PTS</IonText>
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        <div style={{ height: '80px' }} />
      </IonContent>
    </IonPage>
  );
};

export default RankingPage;
