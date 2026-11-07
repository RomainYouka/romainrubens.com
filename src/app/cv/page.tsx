import { redirect } from 'next/navigation';
import { frenchResumePdfUrl } from '@/lib/resume';

export default function CVPage() {
  redirect(frenchResumePdfUrl);
}
