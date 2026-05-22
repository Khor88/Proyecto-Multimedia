import React, { useState, useEffect } from 'react';
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
import { addOutline, trashOutline, play, trophyOutline, chevronBack } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useIonAlert } from '@ionic/react';
import TournamentIcon from '../images/TournamentIcon.png';

interface Fighter {
  name: string;
  winner: boolean;
}

interface TournamentState {
  isStarted: boolean;
  tournamentConfig: { name: string; rounds: number; roundTime: number; restTime: number };
  fighters: Fighter[];
  currentRoundWinners: Fighter[];
}

const TournamentPage: React.FC = () => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const location = useLocation<{ 
    winnerIndex?: number; 
    matchFinished?: boolean;
    savedState?: TournamentState;
  }>();

  const [isStarted, setIsStarted] = useState(false);
  const [tournamentConfig, setTournamentConfig] = useState({ name: '', rounds: 3, roundTime: 3, restTime: 1 });
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [newFighter, setNewFighter] = useState('');
  const [currentRoundWinners, setCurrentRoundWinners] = useState<Fighter[]>([]);

  // Restore state and handle winner
  useEffect(() => {
    if (location.state?.savedState) {
      const { isStarted, tournamentConfig, fighters, currentRoundWinners } = location.state.savedState;
      setIsStarted(isStarted);
      setTournamentConfig(tournamentConfig);
      setFighters(fighters);
      setCurrentRoundWinners(currentRoundWinners);

      // If we are returning from a finished match, update the winner
      if (location.state.matchFinished && location.state.winnerIndex !== undefined) {
        // We use the restored fighters list to apply the winner
        const updatedFighters = [...fighters];
        updatedFighters[location.state.winnerIndex].winner = true;
        setFighters(updatedFighters);
        
        const winner = updatedFighters[location.state.winnerIndex];
        if (!currentRoundWinners.find(w => w.name === winner.name)) {
            setCurrentRoundWinners([...currentRoundWinners, { ...winner, winner: false }]);
        }
      }
    }
  }, [location.state]);

  // Handle odd fighter automatic advancement
  useEffect(() => {
    if (isStarted && fighters.length % 2 !== 0 && fighters.length > 1) {
        const lastFighter = fighters[fighters.length - 1];
        if (!currentRoundWinners.find(w => w.name === lastFighter.name)) {
            setCurrentRoundWinners(prev => [...prev, { ...lastFighter, winner: false }]);
        }
    }
  }, [isStarted, fighters.length]);

  const addFighter = () => {
    if (newFighter.trim()) {
      setFighters([...fighters, { name: newFighter, winner: false }]);
      setNewFighter('');
    }
  };

  const startCombat = (idx1: number, idx2: number) => {
    history.push({
      pathname: '/tournament-combat',
      state: { 
        config: tournamentConfig,
        fighter1: { name: fighters[idx1].name, index: idx1 },
        fighter2: { name: fighters[idx2].name, index: idx2 },
        savedState: {
          isStarted,
          tournamentConfig,
          fighters,
          currentRoundWinners
        }
      }
    });
  };

  const advanceRound = () => {
    setFighters(currentRoundWinners);
    setCurrentRoundWinners([]);
  };

  const handleBackWithWarning = () => {
    if (isStarted && fighters.length > 1) {
      presentAlert({
        header: '¿Abandonar Torneo?',
        message: 'Si sales ahora se perderán todos los datos y el progreso del torneo actual.',
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          { 
            text: 'Salir', 
            role: 'destructive',
            handler: () => history.push('/tabs/main')
          }
        ]
      });
    } else {
      history.push('/tabs/main');
    }
  };

  const getRoundName = (count: number) => {
    if (count <= 2) return "Gran Final";
    if (count <= 4) return "Semifinales";
    if (count <= 8) return "Cuartos de Final";
    if (count <= 16) return "Octavos de Final";
    return "Ronda Eliminatoria";
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            {isStarted ? (
              <IonButton onClick={handleBackWithWarning}>
                <IonIcon slot="icon-only" icon={chevronBack} />
              </IonButton>
            ) : (
              <IonBackButton defaultHref="/tabs/main" />
            )}
          </IonButtons>
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
              <IonInput 
                label="Añadir Luchador" 
                value={newFighter} 
                onIonChange={e => setNewFighter(e.detail.value!)} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addFighter();
                  }
                }}
              />
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
            {fighters.length === 1 ? (
                <div style={{ 
                    marginTop: '50px', 
                    animation: 'fadeIn 1s ease-in',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh'
                }}>
                    <div style={{ position: 'relative', marginBottom: '30px' }}>
                        <IonImg src={TournamentIcon} style={{ width: '180px', height: '180px', filter: 'drop-shadow(0 0 20px rgba(255, 61, 113, 0.4))' }} />
                        <IonIcon icon={trophyOutline} color="warning" style={{ 
                            fontSize: '60px', 
                            position: 'absolute', 
                            bottom: '-10px', 
                            right: '-10px',
                            background: '#000',
                            borderRadius: '50%',
                            padding: '10px',
                            border: '2px solid var(--ion-color-warning)'
                        }} />
                    </div>
                    
                    <IonText color="primary"><h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0' }}>¡CAMPEÓN!</h1></IonText>
                    
                    <IonCard style={{ 
                        border: '2px solid var(--ion-color-primary)', 
                        background: 'rgba(255, 61, 113, 0.1)', 
                        borderRadius: '25px',
                        width: '100%',
                        marginTop: '20px'
                    }}>
                        <IonCardContent className="ion-text-center">
                            <IonText style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', textTransform: 'uppercase' }}>
                                {fighters[0].name}
                            </IonText>
                        </IonCardContent>
                    </IonCard>
                    
                    <IonButton 
                        expand="block" 
                        color="primary" 
                        onClick={() => history.push('/tabs/main')} 
                        style={{ height: '55px', width: '100%', marginTop: '40px', fontWeight: 'bold' }}
                    >
                        FINALIZAR TORNEO
                    </IonButton>
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: '30px' }}>
                        <IonImg src={TournamentIcon} style={{ width: '100px', height: '100px', margin: '0 auto' }} />
                        <IonText color="primary"><h2 style={{ fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '15px', marginBottom: '5px' }}>{tournamentConfig.name}</h2></IonText>
                        <IonText color="medium"><p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>{getRoundName(fighters.length)}</p></IonText>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
                      {Array.from({ length: Math.floor(fighters.length / 2) }).map((_, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            {rowIndex > 0 && <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--fcx-border-color), transparent)', margin: '5px 40px' }} />}
                            <div style={{ position: 'relative' }}>
                                <IonRow className="ion-align-items-center ion-no-padding">
                                    <IonCol size="9">
                                        <div style={{ 
                                            border: '1px solid var(--fcx-border-color)', 
                                            borderRadius: '15px', 
                                            overflow: 'hidden',
                                            background: 'rgba(255,255,255,0.03)'
                                        }}>
                                            <div style={{ 
                                                padding: '12px 16px', 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                background: fighters[rowIndex*2].winner ? 'rgba(255, 61, 113, 0.15)' : 'transparent',
                                                borderBottom: '1px solid var(--fcx-border-color)'
                                            }}>
                                                <IonText style={{ color: fighters[rowIndex*2].winner ? 'var(--ion-color-primary)' : '#fff', fontWeight: fighters[rowIndex*2].winner ? 'bold' : 'normal' }}>
                                                    {fighters[rowIndex*2].name}
                                                </IonText>
                                                {fighters[rowIndex*2].winner && <IonIcon icon={trophyOutline} color="primary" />}
                                            </div>
                                            <div style={{ 
                                                padding: '12px 16px', 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                background: fighters[rowIndex*2+1].winner ? 'rgba(255, 61, 113, 0.15)' : 'transparent'
                                            }}>
                                                <IonText style={{ color: fighters[rowIndex*2+1].winner ? 'var(--ion-color-primary)' : '#fff', fontWeight: fighters[rowIndex*2+1].winner ? 'bold' : 'normal' }}>
                                                    {fighters[rowIndex*2+1].name}
                                                </IonText>
                                                {fighters[rowIndex*2+1].winner && <IonIcon icon={trophyOutline} color="primary" />}
                                            </div>
                                        </div>
                                    </IonCol>
                                    <IonCol size="3" className="ion-text-right">
                                        <IonButton 
                                            fill="solid"
                                            color="primary"
                                            size="small"
                                            style={{ '--border-radius': '10px', height: '40px', width: '100%' }}
                                            onClick={() => startCombat(rowIndex*2, rowIndex*2+1)} 
                                            disabled={fighters[rowIndex*2].winner || fighters[rowIndex*2+1].winner}
                                        >
                                            <IonIcon icon={play} slot="icon-only" />
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </div>
                        </React.Fragment>
                      ))}
                      
                      {fighters.length % 2 !== 0 && fighters.length > 1 && (
                          <div style={{ padding: '0 5px' }}>
                            <div style={{ 
                                border: '1px solid var(--fcx-border-color)', 
                                borderRadius: '15px', 
                                padding: '12px 16px',
                                background: 'rgba(255,255,255,0.03)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <IonText>{fighters[fighters.length-1].name}</IonText>
                                <IonText color="medium" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Bye Round</IonText>
                            </div>
                          </div>
                      )}
                    </div>

                    {currentRoundWinners.length >= Math.ceil(fighters.length / 2) && fighters.length > 1 && (
                        <div style={{ marginTop: '30px' }}>
                            <IonButton expand="block" color="primary" onClick={advanceRound} style={{ height: '50px', fontWeight: 'bold', fontSize: '16px' }}>
                                SIGUIENTE RONDA
                            </IonButton>
                        </div>
                    )}
                </>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TournamentPage;
