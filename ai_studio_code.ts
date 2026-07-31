import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@lifeline/database';

const app = express();
const prisma = new PrismaClient();

app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'active', service: 'api-gateway' });
});

// Middleware: SOS Logger (Audit Trail)
app.use((req, res, next) => {
  if (req.path === '/emergency/sos') {
    console.log(`[CRITICAL] SOS Triggered at ${new Date().toISOString()}`);
  }
  next();
});

// Emergency Trigger Endpoint
app.post('/emergency/sos', async (req: Request, res: Response) => {
  const { userId, lat, lng } = req.body;
  
  try {
    const event = await prisma.emergencyEvent.create({
      data: { userId, lat, lng, status: 'ACTIVE' }
    });
    
    // In a real scenario, trigger Push Notifications / SMS here
    res.status(201).json({ message: 'Emergency protocols initiated', eventId: event.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initiate SOS' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 LifeLine AI Gateway running on port ${PORT}`);
});