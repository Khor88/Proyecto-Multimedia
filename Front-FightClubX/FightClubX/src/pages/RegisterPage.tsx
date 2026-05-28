import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  IonButton,
  IonImg,
  IonText,
  IonSelect,
  IonSelectOption,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Logo from '../images/LogoFightClubX.png';
import api from '../services/api';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'Luchador',
    peso: '',
    altura: '',
    edad: '',
    disciplina: ''
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleRegister = async () => {
    try {
      setError('');
      await api.post('/auth/register', formData);
      history.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <IonPage style={{ '--background': '#000' }}>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#000' }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" color="primary" />
          </IonButtons>
          <IonTitle style={{ fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ '--background': '#000' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <IonImg src={Logo} style={{ width: '120px', margin: '0 auto', filter: 'grayscale(0.2)' }} />
          <IonText color="light">
            <h2 style={{ fontWeight: '800', marginTop: '20px' }}>Crea tu cuenta</h2>
          </IonText>
        </div>

        {error && <IonText color="danger" className="ion-text-center"><p>{error}</p></IonText>}

        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonInput label="Nombre" labelPlacement="stacked" value={formData.nombre} onIonChange={e => setFormData({...formData, nombre: e.detail.value!})} />
          </IonItem>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonInput label="Email" labelPlacement="stacked" type="email" value={formData.email} onIonChange={e => setFormData({...formData, email: e.detail.value!})} />
          </IonItem>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonInput label="Contraseña" labelPlacement="stacked" type="password" value={formData.password} onIonChange={e => setFormData({...formData, password: e.detail.value!})} />
          </IonItem>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonSelect label="Rol" labelPlacement="stacked" value={formData.rol} onIonChange={e => setFormData({...formData, rol: e.detail.value!})}>
              <IonSelectOption value="Luchador">Luchador</IonSelectOption>
              <IonSelectOption value="Árbitro">Árbitro</IonSelectOption>
              <IonSelectOption value="Espectador">Espectador</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonInput label="Peso (kg)" labelPlacement="stacked" type="number" value={formData.peso} onIonChange={e => setFormData({...formData, peso: e.detail.value!})} />
          </IonItem>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonInput label="Altura (m)" labelPlacement="stacked" type="number" value={formData.altura} onIonChange={e => setFormData({...formData, altura: e.detail.value!})} />
          </IonItem>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonInput label="Edad" labelPlacement="stacked" type="number" value={formData.edad} onIonChange={e => setFormData({...formData, edad: e.detail.value!})} />
          </IonItem>
          <IonItem lines="none" style={{ '--background': 'rgba(255,255,255,0.03)', borderRadius: '15px', marginBottom: '15px', border: '1px solid var(--fcx-border-color)' }}>
            <IonInput label="Disciplina" labelPlacement="stacked" value={formData.disciplina} onIonChange={e => setFormData({...formData, disciplina: e.detail.value!})} />
          </IonItem>

          <IonButton expand="block" onClick={handleRegister} className="ion-margin-top" style={{ height: '50px', fontWeight: 'bold', '--border-radius': '15px' }}>
            REGISTRARSE
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
