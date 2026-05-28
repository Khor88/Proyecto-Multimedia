import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  IonButton,
  IonCard,
  IonCardContent,
  IonImg,
  IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import Logo from '../images/LogoFightClubX.png';
import api from '../services/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      setError('');
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      history.push('/tabs/main');
    } catch (err: any) {
      console.error('Error en login:', err);
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center" style={{ '--overflow': 'hidden', '--background': '#000' }}>
        <div style={{ marginTop: '10vh', marginBottom: '8vh' }}>
          <IonImg 
            src={Logo} 
            style={{ width: '200px', margin: '0 auto', filter: 'grayscale(0.2)' }}
          />
        </div>

        <div style={{ maxWidth: '320px', margin: '0 auto' }}>
          {error && (
            <IonText color="danger" style={{ marginBottom: '10px', display: 'block' }}>
              <p>{error}</p>
            </IonText>
          )}
          <IonItem lines="full" style={{ '--background': '#000', marginBottom: '24px' }}>
            <IonInput 
              label="Email"
              labelPlacement="floating"
              placeholder="nombre@ejemplo.com"
              type="email" 
              value={email} 
              onIonChange={e => setEmail(e.detail.value!)} 
            />
          </IonItem>

          <IonItem lines="full" style={{ '--background': '#000', marginBottom: '32px' }}>
            <IonInput 
              label="Contraseña"
              labelPlacement="floating"
              placeholder="••••••••"
              type="password" 
              value={password} 
              onIonChange={e => setPassword(e.detail.value!)} 
            />
          </IonItem>

          <IonButton 
            onClick={handleLogin}
            color="primary"
            style={{ height: '44px', padding: '0 40px', marginBottom: '20px' }}
          >
            Entrar
          </IonButton>

          <div style={{ marginTop: '10px' }}>
            <IonButton 
              fill="clear"
              color="primary"
              style={{ fontSize: '14px' }}
              onClick={() => history.push('/register')}
            >
              Crear cuenta nueva
            </IonButton>
          </div>
          
          <IonText style={{ color: 'var(--fcx-text-muted)', fontSize: '12px', marginTop: '16px', display: 'block' }}>
            ¿Problemas para acceder?
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
