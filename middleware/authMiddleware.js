import { jwtVerify } from 'jose'
import dotenv from 'dotenv'
dotenv.config()
import User from '../models/User.js'
import { JWT_SECRET } from '../utils/getJwtSecret'

export const protect = async () => {} 
