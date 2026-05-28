import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import leagueRoutes from './routes/league.routes';
import combatRoutes from './routes/combat.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/combats', combatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'FightClubX API' });
});

export default app;
