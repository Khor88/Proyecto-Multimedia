import React, { useState } from 'react';
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
  IonText,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  useIonViewWillEnter
} from '@ionic/react';
import { 
  logOutOutline, 
  personOutline, 
  settingsOutline, 
  shieldCheckmarkOutline, 
  trophyOutline, 
  flameOutline, 
  statsChartOutline,
  createOutline,
  chevronForwardOutline,
  notificationsOutline,
  helpCircleOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const UserPage: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<any>(null);

  const fetchProfile = async () => {
    try {
      console.log('Fetching profile...');
      const response = await api.get('/user/profile');
      console.log('Profile data received:', response.data);
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      // Si hay error de auth, volver al login
      history.push('/login');
    }
  };

  useIonViewWillEnter(() => {
    console.log('UserPage entered');
    fetchProfile();
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };

  console.log('Rendering UserPage, user state:', user);
  if (!user) return (
    <IonPage>
        <IonContent className="ion-padding">
            <IonText>Cargando perfil...</IonText>
        </IonContent>
    </IonPage>
  );

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle style={{ fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Mi Perfil</IonTitle>
          <IonButton slot="end" fill="clear" onClick={handleLogout}>
            <IonIcon icon={logOutOutline} color="danger" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        {/* Profile Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0 30px 0' }}>
          <div style={{ position: 'relative' }}>
            <IonAvatar style={{ width: '120px', height: '120px', border: '3px solid var(--ion-color-primary)', padding: '5px', background: '#000' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IonIcon icon={personOutline} style={{ fontSize: '60px', color: '#fff' }} />
              </div>
            </IonAvatar>
            <div style={{ 
              position: 'absolute', 
              bottom: '5px', 
              right: '5px', 
              background: 'var(--ion-color-primary)', 
              borderRadius: '50%', 
              padding: '8px', 
              display: 'flex',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>
              <IonIcon icon={createOutline} style={{ fontSize: '16px', color: '#fff' }} />
            </div>
          </div>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0', color: '#fff' }}>{user.nombre}</h1>
            <IonText color="medium">
                <p style={{ margin: '5px 0', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {user.rol}
                </p>
            </IonText>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <div style={{ background: 'rgba(255, 61, 113, 0.1)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255, 61, 113, 0.3)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <IonIcon icon={shieldCheckmarkOutline} color="primary" style={{ fontSize: '14px' }} />
                    <IonText color="primary" style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Cuenta Verificada</IonText>
                </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <IonGrid style={{ marginBottom: '20px' }}>
          <IonRow>
            <IonCol size="4">
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '10px', textAlign: 'center', border: '1px solid var(--fcx-border-color)' }}>
                <IonText color="medium" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Peso</IonText>
                <h4 style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{user.peso} kg</h4>
              </div>
            </IonCol>
            <IonCol size="4">
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '10px', textAlign: 'center', border: '1px solid var(--fcx-border-color)' }}>
                <IonText color="medium" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Altura</IonText>
                <h4 style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{user.altura} m</h4>
              </div>
            </IonCol>
            <IonCol size="4">
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '10px', textAlign: 'center', border: '1px solid var(--fcx-border-color)' }}>
                <IonText color="medium" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Edad</IonText>
                <h4 style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{user.edad}</h4>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Navigation Section */}
        <IonText color="medium">
          <h3 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', paddingLeft: '5px' }}>Gestión</h3>
        </IonText>

        <IonCard style={{ margin: '0 0 30px 0', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--fcx-border-color)', boxShadow: 'none' }}>
          <IonCardContent style={{ padding: '0' }}>
            <IonList style={{ background: 'transparent' }}>
              <IonItem button detail={false} lines="full" onClick={() => history.push('/settings')} style={{ '--background': 'transparent', '--padding-start': '20px' }}>
                <div style={{ background: 'rgba(61, 187, 255, 0.1)', padding: '10px', borderRadius: '12px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={settingsOutline} style={{ color: 'var(--ion-color-secondary)' }} />
                </div>
                <IonLabel style={{ fontWeight: '600' }}>Preferencias</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" color="medium" style={{ fontSize: '18px' }} />
              </IonItem>
              
              <IonItem button detail={false} lines="full" style={{ '--background': 'transparent', '--padding-start': '20px' }}>
                <div style={{ background: 'rgba(106, 100, 255, 0.1)', padding: '10px', borderRadius: '12px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={notificationsOutline} style={{ color: 'var(--ion-color-tertiary)' }} />
                </div>
                <IonLabel style={{ fontWeight: '600' }}>Notificaciones</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" color="medium" style={{ fontSize: '18px' }} />
              </IonItem>

              <IonItem button detail={false} lines="none" style={{ '--background': 'transparent', '--padding-start': '20px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '12px', marginRight: '15px', display: 'flex' }}>
                    <IonIcon icon={helpCircleOutline} color="medium" />
                </div>
                <IonLabel style={{ fontWeight: '600' }}>Ayuda y Soporte</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" color="medium" style={{ fontSize: '18px' }} />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Logout Button */}
        <IonButton 
            expand="block" 
            fill="outline" 
            color="danger" 
            onClick={handleLogout}
            style={{ '--border-radius': '15px', height: '55px', fontWeight: 'bold' }}
        >
            <IonIcon slot="start" icon={logOutOutline} />
            Cerrar Sesión
        </IonButton>

        <div style={{ height: '100px' }} />
      </IonContent>
    </IonPage>
  );
};

export default UserPage;
