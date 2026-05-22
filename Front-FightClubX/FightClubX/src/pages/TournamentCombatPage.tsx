import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonModal
} from '@ionic/react';
import { play, pause, refresh, trophy } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';

interface LocationState {
  config: {
    name: string;
    rounds: number;
    roundTime: number;
    restTime: number;
  };
  fighter1: { name: string; index: number };
  fighter2: { name: string; index: number };
  savedState?: any;
}

const TournamentCombatPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  
  // Robust defaults to prevent crashes if state is missing
  const state = location.state || {};
  const config = state.config || { name: 'Torneo', rounds: 3, roundTime: 3, restTime: 1 };
  const fighter1 = state.fighter1 || { name: 'Luchador 1', index: 0 };
  const fighter2 = state.fighter2 || { name: 'Luchador 2', index: 1 };
  const savedState = state.savedState || null;

  const roundTimeSec = (config.roundTime || 3) * 60;
  const restTimeSec = (config.restTime || 1) * 60;

  const [seconds, setSeconds] = useState(roundTimeSec);
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [round, setRound] = useState(1);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0 && isActive) {
      if (!isResting) {
        if (round >= config.rounds) {
          setIsActive(false);
          setShowWinnerModal(true);
        } else {
          setIsResting(true);
          setSeconds(restTimeSec);
        }
      } else {
        setIsResting(false);
        setRound(r => r + 1);
        setSeconds(roundTimeSec);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isResting, round, config.rounds, roundTimeSec, restTimeSec]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const selectWinner = (winnerIndex: number) => {
    setShowWinnerModal(false);
    history.push({
      pathname: '/tournament',
      state: { 
        winnerIndex, 
        matchFinished: true,
        savedState
      }
    });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tournament" />
          </IonButtons>
          <IonTitle>Combate de Torneo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <div style={{ marginBottom: '20px' }}>
            <IonText color="primary"><h1>{config.name}</h1></IonText>
            <IonGrid>
                <IonRow className="ion-align-items-center">
                    <IonCol size="5"><IonText><h3>{fighter1.name}</h3></IonText></IonCol>
                    <IonCol size="2"><IonText color="medium">VS</IonText></IonCol>
                    <IonCol size="5"><IonText><h3>{fighter2.name}</h3></IonText></IonCol>
                </IonRow>
            </IonGrid>
        </div>

        <IonText style={{ color: isResting ? 'var(--ion-color-secondary)' : 'var(--fcx-text-muted)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '300', letterSpacing: '2px' }}>
            {isResting ? "RECOVERY" : `ROUND ${round} / ${config.rounds}`}
          </h2>
        </IonText>
        
        <div style={{ margin: '30px 0' }}>
          <IonText style={{ fontSize: '80px', fontWeight: '800', color: isResting ? 'var(--ion-color-secondary)' : '#fff', fontFamily: 'monospace' }}>
            {formatTime(seconds)}
          </IonText>
        </div>

        <IonGrid>
          <IonRow>
            <IonCol>
                <IonButton expand="block" color={isActive ? "dark" : "primary"} onClick={() => setIsActive(!isActive)} style={{ height: '60px' }}>
                    <IonIcon slot="start" icon={isActive ? pause : play} />
                    {isActive ? "PAUSE" : "START"}
                </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <IonButton expand="block" fill="clear" color="medium" onClick={() => setSeconds(isResting ? restTimeSec : roundTimeSec)}>
                    <IonIcon slot="start" icon={refresh} /> RESET ROUND
                </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div style={{ marginTop: '40px' }}>
          <IonButton 
            expand="block" 
            fill="outline" 
            color="danger" 
            onClick={() => setShowWinnerModal(true)}
          >
            Finalizar Combate
          </IonButton>
        </div>

        <IonModal isOpen={showWinnerModal} onDidDismiss={() => setShowWinnerModal(false)} initialBreakpoint={0.5} breakpoints={[0, 0.5]}>
          <IonContent className="ion-padding ion-text-center">
            <IonIcon icon={trophy} color="primary" style={{ fontSize: '64px', marginBottom: '20px' }} />
            <IonText><h2>¿Quién ha ganado?</h2></IonText>
            <p style={{ color: 'var(--fcx-text-muted)' }}>Selecciona al vencedor para avanzar en el torneo</p>
            
            <div style={{ marginTop: '30px' }}>
                <IonButton expand="block" onClick={() => selectWinner(fighter1.index)} className="ion-margin-bottom">
                    {fighter1.name}
                </IonButton>
                <IonButton expand="block" color="secondary" onClick={() => selectWinner(fighter2.index)}>
                    {fighter2.name}
                </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TournamentCombatPage;
