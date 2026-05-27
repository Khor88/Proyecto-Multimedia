import React, { useState, useEffect } from 'react';
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
  IonToast,
  IonAlert,
  IonToggle
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { trashOutline, saveOutline, peopleOutline, settingsOutline, alertCircleOutline } from 'ionicons/icons';
import { dummyLeagues } from '../data/leagueData';

const LeagueConfigPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [showToast, setShowToast] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  
  const league = dummyLeagues.find(l => l.id === parseInt(id)) || dummyLeagues[0];

  const [leagueData, setLeagueData] = useState({
    name: league.name,
    division: league.division,
    description: 'Descripción de ejemplo para la liga ' + league.name,
    type: 'public',
    notifications: true,
    autoApprove: false
  });

  const handleUpdate = () => {
    // Aquí iría la lógica para actualizar en el backend
    console.log('Actualizando liga:', leagueData);
    setShowToast(true);
    setTimeout(() => {
      history.goBack();
    }, 1500);
  };

  const handleDelete = () => {
    console.log('Eliminando liga:', id);
    history.push('/league');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/league/${id}`} />
          </IonButtons>
          <IonTitle style={{ fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
        <IonText color="medium">
          <h3 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', paddingLeft: '5px' }}>Información General</h3>
        </IonText>

        <IonList style={{ background: 'transparent' }}>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonLabel position="stacked" style={{ color: 'var(--ion-color-primary)', fontWeight: 'bold', marginBottom: '10px' }}>NOMBRE DE LA LIGA</IonLabel>
            <IonInput 
              value={leagueData.name}
              onIonChange={e => setLeagueData({...leagueData, name: e.detail.value!})}
            />
          </IonItem>

          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonLabel position="stacked" style={{ color: 'var(--ion-color-primary)', fontWeight: 'bold', marginBottom: '10px' }}>DIVISIÓN / CATEGORÍA</IonLabel>
            <IonInput 
              value={leagueData.division}
              onIonChange={e => setLeagueData({...leagueData, division: e.detail.value!})}
            />
          </IonItem>

          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonLabel position="stacked" style={{ color: 'var(--ion-color-primary)', fontWeight: 'bold', marginBottom: '10px' }}>DESCRIPCIÓN</IonLabel>
            <IonTextarea 
              rows={4}
              value={leagueData.description}
              onIonChange={e => setLeagueData({...leagueData, description: e.detail.value!})}
            />
          </IonItem>
        </IonList>

        <IonText color="medium">
          <h3 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '30px', marginBottom: '15px', paddingLeft: '5px' }}>Preferencias y Privacidad</h3>
        </IonText>

        <IonList style={{ background: 'transparent' }}>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '10px', border: '1px solid var(--fcx-border-color)' }}>
            <IonLabel style={{ fontWeight: '600' }}>Notificaciones de Combates</IonLabel>
            <IonToggle 
              checked={leagueData.notifications}
              onIonChange={e => setLeagueData({...leagueData, notifications: e.detail.checked})}
            />
          </IonItem>

          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '10px', border: '1px solid var(--fcx-border-color)' }}>
            <IonLabel style={{ fontWeight: '600' }}>Aprobación Automática</IonLabel>
            <IonToggle 
              checked={leagueData.autoApprove}
              onIonChange={e => setLeagueData({...leagueData, autoApprove: e.detail.checked})}
            />
          </IonItem>

          <IonItem button detail lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '10px', border: '1px solid var(--fcx-border-color)' }}>
            <IonIcon icon={peopleOutline} slot="start" color="primary" />
            <IonLabel style={{ fontWeight: '600' }}>Gestionar Miembros</IonLabel>
          </IonItem>
        </IonList>

        <IonText color="danger">
          <h3 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '30px', marginBottom: '15px', paddingLeft: '5px' }}>Zona de Peligro</h3>
        </IonText>

        <div style={{ background: 'rgba(235, 68, 90, 0.05)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(235, 68, 90, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <IonIcon icon={alertCircleOutline} color="danger" style={{ fontSize: '24px' }} />
            <IonText color="danger"><h4 style={{ margin: 0, fontWeight: 'bold' }}>Borrar esta liga</h4></IonText>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--ion-color-medium)', margin: '0 0 15px 0' }}>
            Una vez que elimines una liga, no hay vuelta atrás. Por favor, asegúrate.
          </p>
          <IonButton expand="block" color="danger" fill="outline" onClick={() => setShowDeleteAlert(true)} style={{ '--border-radius': '10px' }}>
            ELIMINAR LIGA DEFINITIVAMENTE
          </IonButton>
        </div>

        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
          <IonButton expand="block" color="primary" onClick={handleUpdate} style={{ '--border-radius': '15px', height: '55px', fontWeight: 'bold' }}>
            <IonIcon icon={saveOutline} slot="start" />
            GUARDAR CAMBIOS
          </IonButton>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Configuración actualizada"
          duration={2000}
          color="success"
          position="top"
        />

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header={'¿Eliminar Liga?'}
          message={'Esta acción no se puede deshacer. Se perderán todos los datos de combates y clasificaciones.'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: 'Eliminar',
              handler: handleDelete,
              cssClass: 'danger-button'
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default LeagueConfigPage;
