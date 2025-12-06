import { Badge } from '@/components/ui/badge';

export default function VersionTag() {
  return (
    <Badge
      variant={'secondary'}
      className='fixed bottom-3 left-3 z-[9999] opacity-70'
    >
      v0.0.1
    </Badge>
  );
}
