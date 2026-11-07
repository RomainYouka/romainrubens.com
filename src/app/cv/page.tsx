import { redirect } from 'next/navigation';
import { resumePdfUrl } from '@/lib/resume';

export default function CVPage() {
  redirect(resumePdfUrl);
}
