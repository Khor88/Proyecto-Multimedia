import React, { useState } from 'react';
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
  IonSelect,
  IonSelectOption
} from '@ionic/react';

const SettingsPage: React.FC = () => {
  const [language, setLanguage] = useState('es');

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/user" />
          </IonButtons>
          <IonTitle>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList style={{ background: 'transparent' }}>
          <IonItem lines="full">
            <IonLabel>Idioma</IonLabel>
            <IonSelect 
              value={language} 
              onIonChange={e => setLanguage(e.detail.value)}
              interface="popover"
            >
              <IonSelectOption value="es">Español</IonSelectOption>
              <IonSelectOption value="en">English</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
