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
      
      // If we are returning from a finished FINAL match, show victory screen immediately
      if (location.state.matchFinished && location.state.isFinal && location.state.winnerIndex !== undefined) {
        const updatedFighters = [...fighters];
        const winner = updatedFighters[location.state.winnerIndex];
        setIsStarted(true);
        setTournamentConfig(tournamentConfig);
        setFighters([{ ...winner, winner: true }]); // Show only the winner to trigger victory view
        setCurrentRoundWinners([]);
        return;
      }

      setIsStarted(isStarted);
      setTournamentConfig(tournamentConfig);
      setFighters(fighters);
      setCurrentRoundWinners(currentRoundWinners);

      // If we are returning from a regular finished match, update the winner
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
        isFinal: fighters.length === 2, // It's final if there are only 2 fighters left in this round
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

  const resetTournament = () => {
    setIsStarted(false);
    setTournamentConfig({ name: '', rounds: 3, roundTime: 3, restTime: 1 });
    setFighters([]);
    setNewFighter('');
    setCurrentRoundWinners([]);
    history.push('/tabs/main');
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
            handler: resetTournament
          }
        ]
      });
    } else {
      resetTournament();
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
                <IonCol size="6"><IonItem lines="none" style={{ '--background': '#0D0D0D', borderRadius: '12px' }}><IonInput label="Rounds" type="number" min="1" value={tournamentConfig.rounds} onIonChange={e => setTournamentConfig({...tournamentConfig, rounds: parseInt(e.detail.value! || '1')})} /></IonItem></IonCol>
                <IonCol size="6"><IonItem lines="none" style={{ '--background': '#0D0D0D', borderRadius: '12px' }}><IonInput label="Min/Round" type="number" min="1" value={tournamentConfig.roundTime} onIonChange={e => setTournamentConfig({...tournamentConfig, roundTime: parseInt(e.detail.value! || '3')})} /></IonItem></IonCol>
              </IonRow>
            </IonGrid>
            <IonItem lines="none" style={{ '--background': '#0D0D0D', borderRadius: '12px', marginBottom: '16px' }}>
              <IonInput label="Descanso (min)" type="number" min="1" value={tournamentConfig.restTime} onIonChange={e => setTournamentConfig({...tournamentConfig, restTime: parseInt(e.detail.value! || '1')})} />
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
                    marginTop: '20px', 
                    animation: 'fadeIn 1s ease-in',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh'
                }}>
                    <div style={{ position: 'relative', marginBottom: '30px' }}>
                        <IonImg src={TournamentIcon} style={{ width: '220px', height: '220px', filter: 'drop-shadow(0 0 30px rgba(255, 61, 113, 0.6))' }} />
                        <IonIcon icon={trophyOutline} color="warning" style={{ 
                            fontSize: '80px', 
                            position: 'absolute', 
                            bottom: '-15px', 
                            right: '-15px',
                            background: '#000',
                            borderRadius: '50%',
                            padding: '15px',
                            border: '3px solid var(--ion-color-warning)',
                            boxShadow: '0 0 20px rgba(255, 196, 9, 0.4)'
                        }} />
                    </div>
                    
                    <IonText color="primary"><h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '10px', textShadow: '0 0 10px rgba(255, 61, 113, 0.5)' }}>¡CAMPEÓN!</h1></IonText>
                    
                    <div style={{ 
                        border: '2px solid var(--ion-color-primary)', 
                        background: 'rgba(255, 61, 113, 0.1)', 
                        borderRadius: '25px',
                        width: '100%',
                        padding: '30px 20px',
                        marginTop: '20px',
                        boxShadow: 'inset 0 0 20px rgba(255, 61, 113, 0.2)'
                    }}>
                        <IonText style={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            {fighters[0].name}
                        </IonText>
                    </div>
                    
                    <IonButton 
                        expand="block" 
                        color="primary" 
                        onClick={resetTournament} 
                        style={{ height: '60px', width: '100%', marginTop: '50px', fontWeight: 'bold', fontSize: '18px', '--border-radius': '15px' }}
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
