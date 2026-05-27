import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonSelect,
  IonSelectOption,
  IonList,
  IonTextarea,
  IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { trophyOutline, imageOutline, saveOutline, arrowBackOutline } from 'ionicons/icons';
import { dummyLeagues, addDummyLeague } from '../data/leagueData';
import LeagueIcon from '../images/LeagueIcon.png';

const LeagueCreatePage: React.FC = () => {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [leagueData, setLeagueData] = useState({
    name: '',
    division: '',
    description: '',
    type: 'public'
  });

  const handleCreate = () => {
    if (!leagueData.name || !leagueData.division) {
      return;
    }

    const newLeague = {
      id: dummyLeagues.length + 1,
      name: leagueData.name.toUpperCase(),
      division: leagueData.division.charAt(0).toUpperCase() + leagueData.division.slice(1),
      position: 'N/A',
      points: '0',
      image: LeagueIcon
    };

    addDummyLeague(newLeague);
    setShowToast(true);
    
    setTimeout(() => {
      history.push('/league');
    }, 1500);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
                <IonIcon icon={arrowBackOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Nueva Liga</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            background: 'rgba(255, 61, 113, 0.1)', 
            borderRadius: '25px', 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            border: '2px dashed var(--ion-color-primary)',
            boxShadow: '0 0 20px rgba(255, 61, 113, 0.2)'
          }}>
            <IonIcon icon={imageOutline} style={{ fontSize: '40px' }} color="primary" />
          </div>
          <IonText color="primary">
            <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '15px', letterSpacing: '1px' }}>Subir Logo de Liga</p>
          </IonText>
        </div>

        <IonList style={{ background: 'transparent' }}>
          <div style={{ marginBottom: '20px' }}>
            <IonLabel style={{ color: 'var(--ion-color-medium)', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '5px' }}>Nombre de la Competición</IonLabel>
            <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginTop: '8px', border: '1px solid var(--fcx-border-color)' }}>
                <IonInput 
                placeholder="Ej. TORNEO INTERNO FCX" 
                value={leagueData.name}
                onIonChange={e => setLeagueData({...leagueData, name: e.detail.value!})}
                style={{ fontWeight: '600' }}
                />
            </IonItem>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <IonLabel style={{ color: 'var(--ion-color-medium)', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '5px' }}>Categoría / División</IonLabel>
            <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginTop: '8px', border: '1px solid var(--fcx-border-color)' }}>
                <IonSelect 
                placeholder="Seleccionar división..." 
                value={leagueData.division}
                onIonChange={e => setLeagueData({...leagueData, division: e.detail.value!})}
                style={{ width: '100%', fontWeight: '600' }}
                >
                <IonSelectOption value="Regional">Regional</IonSelectOption>
                <IonSelectOption value="Nacional">Nacional</IonSelectOption>
                <IonSelectOption value="Elite">Elite</IonSelectOption>
                <IonSelectOption value="Amateur">Amateur</IonSelectOption>
                </IonSelect>
            </IonItem>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <IonLabel style={{ color: 'var(--ion-color-medium)', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '5px' }}>Visibilidad de Liga</IonLabel>
            <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginTop: '8px', border: '1px solid var(--fcx-border-color)' }}>
                <IonSelect 
                value={leagueData.type}
                onIonChange={e => setLeagueData({...leagueData, type: e.detail.value!})}
                style={{ width: '100%', fontWeight: '600' }}
                >
                <IonSelectOption value="public">Liga Pública (Abierta)</IonSelectOption>
                <IonSelectOption value="private">Liga Privada (Invitación)</IonSelectOption>
                </IonSelect>
            </IonItem>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <IonLabel style={{ color: 'var(--ion-color-medium)', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '5px' }}>Reglas o Descripción</IonLabel>
            <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginTop: '8px', border: '1px solid var(--fcx-border-color)' }}>
                <IonTextarea 
                placeholder="Indica las reglas básicas o el propósito de la liga..." 
                rows={4}
                value={leagueData.description}
                onIonChange={e => setLeagueData({...leagueData, description: e.detail.value!})}
                style={{ fontWeight: '500' }}
                />
            </IonItem>
          </div>
        </IonList>

        <div style={{ marginTop: '30px' }}>
          <IonButton 
            expand="block" 
            color="primary" 
            onClick={handleCreate} 
            disabled={!leagueData.name || !leagueData.division}
            style={{ '--border-radius': '15px', height: '60px', fontWeight: 'bold', fontSize: '16px' }}
          >
            <IonIcon icon={saveOutline} slot="start" />
            CREAR Y PUBLICAR LIGA
          </IonButton>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="¡Liga creada con éxito! Volviendo a la lista..."
          duration={1500}
          color="success"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default LeagueCreatePage;
