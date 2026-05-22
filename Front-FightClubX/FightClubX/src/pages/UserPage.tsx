import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/react';
import { logOutOutline, personCircleOutline, settingsOutline, shieldCheckmarkOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const UserPage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ '--padding-bottom': '80px' }}>
        <div className="ion-text-center" style={{ margin: '40px 0' }}>
          <IonIcon icon={personCircleOutline} style={{ fontSize: '120px', color: '#fff' }} />
          <div style={{ marginTop: '16px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '700', margin: '0' }}>Pablo Méndez</h1>
            <p style={{ color: 'var(--ion-color-primary)', fontWeight: '600', letterSpacing: '1px', fontSize: '14px' }}>
              AMATEUR FIGHTER
            </p>
          </div>
        </div>

        <IonList style={{ background: 'transparent' }}>
          <IonItem button detail={false} lines="full">
            <IonIcon icon={shieldCheckmarkOutline} slot="start" color="medium" />
            <IonLabel>Verified Account</IonLabel>
          </IonItem>
          <IonItem button detail={false} lines="full" routerLink="/settings">
            <IonIcon icon={settingsOutline} slot="start" color="medium" />
            <IonLabel>Preferences</IonLabel>
          </IonItem>
          <IonItem button detail={false} lines="none" onClick={() => history.push('/login')}>
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>

        <div style={{ marginTop: '40px', paddingBottom: '20px' }}>
          <IonButton expand="block" color="primary">
            Edit Information
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserPage;
