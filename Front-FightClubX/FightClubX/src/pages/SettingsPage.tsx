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
  IonSelectOption,
  IonIcon,
  IonToggle,
  IonText,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { 
  languageOutline, 
  notificationsOutline, 
  moonOutline, 
  lockClosedOutline, 
  shieldCheckmarkOutline, 
  trashOutline,
  chevronForwardOutline,
  personOutline,
  colorPaletteOutline
} from 'ionicons/icons';

const SettingsPage: React.FC = () => {
  const [language, setLanguage] = useState('es');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/user" />
          </IonButtons>
          <IonTitle style={{ fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        {/* Account Section */}
        <IonText color="medium">
          <h3 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', paddingLeft: '5px' }}>Cuenta y Seguridad</h3>
        </IonText>
        <IonCard style={{ margin: '0 0 24px 0', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--fcx-border-color)', boxShadow: 'none' }}>
          <IonCardContent style={{ padding: '0' }}>
            <IonList style={{ background: 'transparent' }}>
              <IonItem button detail={false} lines="full" style={{ '--background': 'transparent' }}>
                <div style={{ background: 'rgba(255, 61, 113, 0.1)', padding: '8px', borderRadius: '10px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={personOutline} color="primary" />
                </div>
                <IonLabel style={{ fontWeight: '600' }}>Información Personal</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" color="medium" style={{ fontSize: '18px' }} />
              </IonItem>
              <IonItem button detail={false} lines="none" style={{ '--background': 'transparent' }}>
                <div style={{ background: 'rgba(61, 187, 255, 0.1)', padding: '8px', borderRadius: '10px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={lockClosedOutline} style={{ color: 'var(--ion-color-secondary)' }} />
                </div>
                <IonLabel style={{ fontWeight: '600' }}>Contraseña y Seguridad</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" color="medium" style={{ fontSize: '18px' }} />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Preferences Section */}
        <IonText color="medium">
          <h3 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', paddingLeft: '5px' }}>Preferencias de App</h3>
        </IonText>
        <IonCard style={{ margin: '0 0 24px 0', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--fcx-border-color)', boxShadow: 'none' }}>
          <IonCardContent style={{ padding: '0' }}>
            <IonList style={{ background: 'transparent' }}>
              <IonItem lines="full" style={{ '--background': 'transparent' }}>
                <div style={{ background: 'rgba(106, 100, 255, 0.1)', padding: '8px', borderRadius: '10px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={languageOutline} style={{ color: 'var(--ion-color-tertiary)' }} />
                </div>
                <IonLabel style={{ fontWeight: '600' }}>Idioma</IonLabel>
                <IonSelect 
                  value={language} 
                  onIonChange={e => setLanguage(e.detail.value)}
                  interface="popover"
                  style={{ fontSize: '14px' }}
                >
                  <IonSelectOption value="es">Español</IonSelectOption>
                  <IonSelectOption value="en">English</IonSelectOption>
                </IonSelect>
              </IonItem>
              
              <IonItem lines="full" style={{ '--background': 'transparent' }}>
                <div style={{ background: 'rgba(255, 196, 9, 0.1)', padding: '8px', borderRadius: '10px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={notificationsOutline} color="warning" />
                </div>
                <IonLabel style={{ fontWeight: '600' }}>Notificaciones</IonLabel>
                <IonToggle 
                  checked={notifications} 
                  onIonChange={e => setNotifications(e.detail.checked)}
                />
              </IonItem>

              <IonItem lines="none" style={{ '--background': 'transparent' }}>
                <div style={{ background: 'rgba(45, 211, 111, 0.1)', padding: '8px', borderRadius: '10px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={moonOutline} color="success" />
                </div>
                <IonLabel style={{ fontWeight: '600' }}>Modo Oscuro</IonLabel>
                <IonToggle 
                  checked={darkMode} 
                  onIonChange={e => setDarkMode(e.detail.checked)}
                />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Privacy & Danger Zone */}
        <IonText color="medium">
          <h3 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', paddingLeft: '5px' }}>Privacidad</h3>
        </IonText>
        <IonCard style={{ margin: '0 0 40px 0', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--fcx-border-color)', boxShadow: 'none' }}>
          <IonCardContent style={{ padding: '0' }}>
            <IonList style={{ background: 'transparent' }}>
              <IonItem button detail={false} lines="full" style={{ '--background': 'transparent' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '8px', borderRadius: '10px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={shieldCheckmarkOutline} color="medium" />
                </div>
                <IonLabel style={{ fontWeight: '600' }}>Términos y Privacidad</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" color="medium" style={{ fontSize: '18px' }} />
              </IonItem>
              <IonItem button detail={false} lines="none" style={{ '--background': 'transparent' }}>
                <div style={{ background: 'rgba(235, 68, 90, 0.1)', padding: '8px', borderRadius: '10px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={trashOutline} color="danger" />
                </div>
                <IonLabel color="danger" style={{ fontWeight: '600' }}>Eliminar Cuenta</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <div style={{ height: '40px' }} />
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
