import { exec, execSync } from 'child_process'
import 'dotenv/config'
execSync('vite build', { stdio: 'inherit' })
execSync(`git clone ${process.env.VITE_URL_REPOSITORY_DATA} dist/data --depth 1`, { stdio: 'inherit' })
