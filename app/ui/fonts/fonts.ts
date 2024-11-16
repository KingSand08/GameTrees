import { Inter, Monoton } from 'next/font/google';

// Available subsets: `cyrillic`, `cyrillic-ext`, `greek`, `greek-ext`, `latin`, `latin-ext`, `vietnamese`
export const inter = Inter({ subsets: ['latin'] });
export const monoton = Monoton({ subsets: ['latin'], weight: '400' });
