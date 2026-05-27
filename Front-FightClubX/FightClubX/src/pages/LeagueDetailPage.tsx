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
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonAvatar
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { 
  settingsOutline, 
  personOutline, 
  trophyOutline, 
  calendarOutline, 
  ribbonOutline, 
  chevronForwardOutline, 
  flashOutline,
  statsChartOutline
} from 'ionicons/icons';
import { dummyLeagues, dummyMembers } from '../data/leagueData';

const LeagueDetailPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const league = dummyLeagues.find(l => l.id === parseInt(id)) || dummyLeagues[0];

  const goToRanking = () => {
    history.push(`/league/${id}/ranking`);
  };

  const goToConfig = () => {
    history.push(`/league/${id}/config`);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/league" />
          </IonButtons>
          <IonTitle style={{ fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Detalle Liga</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={`/league/${id}/config`}>
              <IonIcon icon={settingsOutline} color="primary" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        {/* League Branding & Stats */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <IonImg src={league.image} style={{ width: '90px', height: '90px', margin: '0 auto', filter: 'drop-shadow(0 0 15px rgba(255, 61, 113, 0.3))' }} />
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '15px 0 5px 0' }}>{league.name}</h1>
          <IonText color="medium">
            <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', fontWeight: 'bold' }}>{league.division}</p>
          </IonText>
        </div>

        {/* League Quick Stats */}
        <IonGrid style={{ marginBottom: '20px' }}>
          <IonRow>
            <IonCol>
              <div style={{ background: 'rgba(255, 61, 113, 0.1)', borderRadius: '15px', padding: '12px', border: '1px solid rgba(255, 61, 113, 0.2)', textAlign: 'center' }}>
                <IonIcon icon={trophyOutline} color="primary" style={{ fontSize: '20px' }} />
                <h3 style={{ margin: '5px 0 0 0', fontWeight: '800' }}>{league.position}</h3>
                <IonText color="medium" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Posición</IonText>
              </div>
            </IonCol>
            <IonCol>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '15px', padding: '12px', border: '1px solid var(--fcx-border-color)', textAlign: 'center' }}>
                <IonIcon icon={flashOutline} color="warning" style={{ fontSize: '20px' }} />
                <h3 style={{ margin: '5px 0 0 0', fontWeight: '800' }}>{league.points}</h3>
                <IonText color="medium" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Puntos Liga</IonText>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Featured Next Match */}
        <IonText color="medium">
          <h3 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', paddingLeft: '5px' }}>Próximo Desafío</h3>
        </IonText>
        <IonCard style={{ margin: '0 0 30px 0', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(255, 61, 113, 0.15) 0%, rgba(0, 0, 0, 0) 100%)', border: '1px solid rgba(255, 61, 113, 0.3)', boxShadow: 'none' }}>
          <IonCardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <IonAvatar style={{ width: '50px', height: '50px', margin: '0 auto 10px auto', border: '2px solid var(--ion-color-primary)' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IonIcon icon={personOutline} style={{ fontSize: '24px' }} />
                    </div>
                </IonAvatar>
                <IonText style={{ fontWeight: 'bold', fontSize: '14px' }}>TÚ</IonText>
              </div>
              <div style={{ textAlign: 'center', flex: 0.5 }}>
                <IonText color="primary" style={{ fontWeight: '900', fontSize: '20px' }}>VS</IonText>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <IonAvatar style={{ width: '50px', height: '50px', margin: '0 auto 10px auto', border: '2px solid var(--fcx-border-color)' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IonIcon icon={personOutline} style={{ fontSize: '24px' }} />
                    </div>
                </IonAvatar>
                <IonText style={{ fontWeight: 'bold', fontSize: '14px' }}>M. SOLÍS</IonText>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <IonIcon icon={calendarOutline} color="medium" style={{ fontSize: '14px' }} />
                    <IonText color="medium" style={{ fontSize: '12px' }}>15 JUN, 20:30</IonText>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <IonIcon icon={ribbonOutline} color="primary" style={{ fontSize: '14px' }} />
                    <IonText color="primary" style={{ fontSize: '12px', fontWeight: 'bold' }}>MAIN EVENT</IonText>
                </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* League Members Section */}
        <IonText color="medium">
          <h3 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', paddingLeft: '5px' }}>Miembros de la Liga</h3>
        </IonText>
        <IonList style={{ background: 'transparent' }}>
          {dummyMembers.map(member => (
            <IonItem key={member.id} button detail={false} lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '10px', border: '1px solid var(--fcx-border-color)' }}>
              <IonAvatar slot="start" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', padding: '5px' }}>
                <IonIcon icon={member.image} style={{ fontSize: '30px', color: '#fff' }} />
              </IonAvatar>
              <IonLabel>
                <h2 style={{ fontWeight: '700', fontSize: '16px' }}>{member.name}</h2>
                <IonText color="medium"><p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.role}</p></IonText>
              </IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" color="medium" style={{ fontSize: '18px' }} />
            </IonItem>
          ))}
        </IonList>

        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <IonButton expand="block" color="primary" onClick={goToRanking} style={{ '--border-radius': '15px', height: '50px', fontWeight: 'bold' }}>
            <IonIcon icon={statsChartOutline} slot="start" />
            Ver Clasificación
          </IonButton>
          <IonButton expand="block" fill="outline" color="primary" routerLink={`/league/${id}/config`} style={{ '--border-radius': '15px', height: '50px', fontWeight: 'bold' }}>
            Gestionar Liga
          </IonButton>
        </div>

        <div style={{ height: '80px' }} />
      </IonContent>
    </IonPage>
  );
};

export default LeagueDetailPage;
