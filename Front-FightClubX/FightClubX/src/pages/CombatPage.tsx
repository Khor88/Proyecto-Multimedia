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
  IonItem,
  IonInput,
  IonImg
} from '@ionic/react';
import { play, pause, refresh, settingsOutline, chevronBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

// Import icons
import CombatIcon from '../images/CombatIcon.png';

const CombatPage: React.FC = () => {
  const history = useHistory();
  // Config state
  const [roundTime, setRoundTime] = useState(180);
  const [restTime, setRestTime] = useState(60);
  const [isStarted, setIsStarted] = useState(false);

  // Timer state
  const [seconds, setSeconds] = useState(roundTime);
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [round, setRound] = useState(1);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0 && isActive) {
      if (!isResting) {
        setIsResting(true);
        setSeconds(restTime);
      } else {
        setIsResting(false);
        setRound(r => r + 1);
        setSeconds(roundTime);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isResting, roundTime, restTime]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const startCombat = () => {
    setSeconds(roundTime);
    setIsActive(false); // Ensure it's not active before starting
    setIsStarted(true);
  };

  const resetCombat = () => {
    setIsActive(false);
    setIsStarted(false);
    setIsResting(false);
    setRound(1);
    setSeconds(roundTime);
  };

  const finishCombat = () => {
    setIsActive(false);
    setIsStarted(false);
    setIsResting(false);
    setRound(1);
    setSeconds(roundTime);
    history.push('/tabs/main');
  };

  if (!isStarted) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/main" />
            </IonButtons>
            <IonTitle>Ajustes de Combate</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonImg src={CombatIcon} style={{ width: '120px', height: '120px', margin: '40px auto' }} />
          <IonItem lines="full" style={{ '--background': '#0D0D0D', borderRadius: '12px', marginBottom: '16px' }}>
            <IonInput 
              label="Round Duration (min)" 
              type="number" 
              value={roundTime / 60}
              onIonChange={e => setRoundTime(parseFloat(e.detail.value!) * 60)}
            />
          </IonItem>
          <IonItem lines="full" style={{ '--background': '#0D0D0D', borderRadius: '12px', marginBottom: '32px' }}>
            <IonInput 
              label="Rest Duration (min)" 
              type="number" 
              value={restTime / 60}
              onIonChange={e => setRestTime(parseFloat(e.detail.value!) * 60)}
            />
          </IonItem>
          <IonButton expand="block" onClick={startCombat} style={{ height: '50px' }}>
            START COMBAT
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={resetCombat}>
              <IonIcon icon={chevronBack} color="primary" slot="icon-only" />
            </IonButton>
          </IonButtons>
          <IonTitle>Combate Rápido</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={resetCombat}>
              <IonIcon icon={settingsOutline} color="primary" style={{ fontSize: '24px' }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <IonText style={{ color: isResting ? 'var(--ion-color-secondary)' : 'var(--fcx-text-muted)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '300', letterSpacing: '2px' }}>
            {isResting ? "RECOVERY" : `ROUND ${round}`}
          </h2>
        </IonText>
        <div style={{ margin: '40px 0' }}>
          <IonText style={{ fontSize: '100px', fontWeight: '800', color: isResting ? 'var(--ion-color-secondary)' : '#fff', fontFamily: 'monospace' }}>
            {formatTime(seconds)}
          </IonText>
        </div>
        <IonGrid>
          <IonRow><IonCol><IonButton expand="block" color={isActive ? "dark" : "primary"} onClick={() => setIsActive(!isActive)} style={{ height: '60px' }}>
            <IonIcon slot="start" icon={isActive ? pause : play} />
            {isActive ? "PAUSE" : "START"}
          </IonButton></IonCol></IonRow>
          <IonRow><IonCol><IonButton expand="block" fill="clear" color="medium" onClick={() => setSeconds(isResting ? restTime : roundTime)}>
            <IonIcon slot="start" icon={refresh} /> RESET ROUND
          </IonButton></IonCol></IonRow>
        </IonGrid>
        <div style={{ marginTop: '50px' }}>
          <IonButton 
            expand="block" 
            fill="outline" 
            color="danger" 
            onClick={finishCombat}
            style={{ '--border-radius': '12px' }}
          >
            Finalizar Combate
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CombatPage;
