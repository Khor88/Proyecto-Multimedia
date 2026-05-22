import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
  IonCard,
  IonButton,
  IonItem,
  IonInput,
  IonList,
  IonLabel,
  IonIcon
} from '@ionic/react';
import { addOutline, trashOutline, play } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import TournamentIcon from '../images/TournamentIcon.png';

const TournamentPage: React.FC = () => {
  const history = useHistory();
  const [isStarted, setIsStarted] = useState(false);
  const [tournamentConfig, setTournamentConfig] = useState({ name: '', rounds: 3, roundTime: 3, restTime: 1 });
  const [fighters, setFighters] = useState<{name: string, winner: boolean}[]>([]);
  const [newFighter, setNewFighter] = useState('');

  const addFighter = () => {
    if (newFighter.trim()) {
      setFighters([...fighters, { name: newFighter, winner: false }]);
      setNewFighter('');
    }
  };

  const setWinner = (index: number) => {
    const updated = [...fighters];
    updated[index].winner = true;
    setFighters(updated);
  };

  const startCombat = () => {
    // Navigate to combat with tournament config (would be passed via state or context in real app)
    history.push({
      pathname: '/combat',
      state: { config: tournamentConfig }
    });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/tabs/main" /></IonButtons>
          <IonTitle>{isStarted ? "Torneo Activo" : "Configurar Torneo"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {!isStarted ? (
          <div style={{ padding: '0 16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <IonImg src={TournamentIcon} style={{ width: '80px', height: '80px', margin: '20px auto' }} />
            <IonItem lines="none" style={{ '--background': '#0D0D0D', borderRadius: '12px', marginBottom: '16px' }}>
              <IonInput label="Nombre del Torneo" value={tournamentConfig.name} onIonChange={e => setTournamentConfig({...tournamentConfig, name: e.detail.value!})} />
            </IonItem>
            <IonGrid className="ion-no-padding" style={{ marginBottom: '16px' }}>
              <IonRow>
                <IonCol size="6"><IonItem lines="none" style={{ '--background': '#0D0D0D', borderRadius: '12px' }}><IonInput label="Rounds" type="number" min="1" value={tournamentConfig.rounds} onIonChange={e => setTournamentConfig({...tournamentConfig, rounds: parseInt(e.detail.value!)})} /></IonItem></IonCol>
                <IonCol size="6"><IonItem lines="none" style={{ '--background': '#0D0D0D', borderRadius: '12px' }}><IonInput label="Min/Round" type="number" min="1" value={tournamentConfig.roundTime} onIonChange={e => setTournamentConfig({...tournamentConfig, roundTime: parseInt(e.detail.value!)})} /></IonItem></IonCol>
              </IonRow>
            </IonGrid>
            <IonItem lines="none" style={{ '--background': '#0D0D0D', borderRadius: '12px', marginBottom: '16px' }}>
              <IonInput label="Descanso (min)" type="number" min="1" value={tournamentConfig.restTime} onIonChange={e => setTournamentConfig({...tournamentConfig, restTime: parseInt(e.detail.value!)})} />
            </IonItem>
            <IonItem lines="none" style={{ '--background': '#0D0D0D', borderRadius: '12px', marginBottom: '16px' }}>
              <IonInput label="Añadir Luchador" value={newFighter} onIonChange={e => setNewFighter(e.detail.value!)} />
              <IonButton slot="end" onClick={addFighter} fill="clear"><IonIcon icon={addOutline} /></IonButton>
            </IonItem>
            <IonList style={{ flexGrow: 1, overflowY: 'auto' }}>
              {fighters.map((f, i) => (
                <IonItem key={i}><IonLabel>{f.name}</IonLabel><IonButton slot="end" fill="clear" color="danger" onClick={() => setFighters(fighters.filter((_, idx) => idx !== i))}><IonIcon icon={trashOutline} /></IonButton></IonItem>
              ))}
            </IonList>
            <IonButton expand="block" onClick={() => setIsStarted(true)} disabled={fighters.length < 2} className="ion-margin-vertical">GENERAR BRACKETS</IonButton>
          </div>
        ) : (
          <div className="ion-padding ion-text-center">
            <IonImg src={TournamentIcon} style={{ width: '60px', height: '60px', margin: '0 auto' }} />
            <IonText color="primary"><h2>{tournamentConfig.name}</h2></IonText>
            <IonButton color="primary" onClick={startCombat} className="ion-margin-top"><IonIcon icon={play} slot="start"/> INICIAR COMBATE</IonButton>
            
            <IonGrid style={{ marginTop: '20px' }}>
              {Array.from({ length: Math.ceil(fighters.length / 2) }).map((_, rowIndex) => (
                <IonRow key={rowIndex} className="ion-align-items-center">
                  <IonCol size="5">
                    <IonCard style={{ border: fighters[rowIndex*2].winner ? '2px solid var(--ion-color-primary)' : '1px solid var(--fcx-border-color)' }} onClick={() => setWinner(rowIndex*2)}>
                      <div className="ion-padding" style={{ color: fighters[rowIndex*2].winner ? 'var(--ion-color-primary)' : '#fff' }}>{fighters[rowIndex*2].name}</div>
                    </IonCard>
                  </IonCol>
                  <IonCol size="2" className="ion-text-center"><IonText color="medium">VS</IonText></IonCol>
                  <IonCol size="5">
                    {fighters[rowIndex*2+1] && (
                        <IonCard style={{ border: fighters[rowIndex*2+1].winner ? '2px solid var(--ion-color-primary)' : '1px solid var(--fcx-border-color)' }} onClick={() => setWinner(rowIndex*2+1)}>
                            <div className="ion-padding" style={{ color: fighters[rowIndex*2+1].winner ? 'var(--ion-color-primary)' : '#fff' }}>{fighters[rowIndex*2+1].name}</div>
                        </IonCard>
                    )}
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TournamentPage;
